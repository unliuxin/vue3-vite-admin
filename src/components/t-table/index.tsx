import { computed, defineComponent, PropType, createVNode, watch, reactive, ref, nextTick } from 'vue';
import { Table, Pagination, Tooltip, Divider, Modal } from 'ant-design-vue';
import type { PaginationProps } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { getActivePinia } from 'pinia';
import { PAGINATION_CONFIG } from '@/models/common';
import type { ColumnProps } from 'ant-design-vue/lib/table/interface';

import './style.less';

export default defineComponent({
  name: 't-table',
  // directives: { auth: directives.auth },
  props: {
    pagination: {
      type: Object as PropType<PaginationProps>,
      default: null
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    columns: {
      type: Array as PropType<ColumnProps[]>,
      default: []
    },
    dataSource: {
      type: Array,
      default: []
    },
    scroll: {
      type: Object,
      default: {
        x: '100vw',
        y: 'calc(100vh - 250px)'
      }
    },
    hasActionColumn: {
      type: Boolean,
      default: true
    },
    hasSelectionColumn: {
      type: Boolean,
      default: true
    },
    actionCustomRender: {
      type: Function,
      default: null
    },
    selectedRowKeys: {
      type: Array as PropType<string[]>,
      default: []
    },
    selectedRows: {
      type: Array as PropType<any[]>,
      default: []
    },
    rowSelectionType: {
      type: String as PropType<'radio' | 'checkbox'>,
      default: 'checkbox'
    },
    auth: {
      type: Object,
      default: {
        edit: 'edit',
        delete: 'delete'
      }
    }
  },
  emits: [
    'update:selectedRowKeys',
    'update:selectedRows',
    'handleChange',
    'handleSizeChange',
    'handleSelectionChange',
    'handleAction',
    'handleClick',
    'handleDblclick'
  ],
  setup(props, { emit, slots, attrs }) {
    const tbRef = ref<any>(null);
    const columns = ref<any[]>([]);
    const checkedList = ref<string[]>([]);

    if (!props.pagination) {
      props.scroll.y = 'calc(100vh - 200px)';
    }

    const selectedRowKeys = computed({
      get: () => props.selectedRowKeys,
      set: (val) => {
        emit('update:selectedRowKeys', val);
      }
    });

    const selectedRows = computed({
      get: () => props.selectedRows,
      set: (val) => {
        emit('update:selectedRows', val);
      }
    });

    // const activePinia = getActivePinia();
    // const userInfo: any | null = activePinia?.state.value.user.userInfo;

    const actionColumnRender = (dom: any, auth: string) => {
      // if (userInfo?.type !== 'super-admin') {
      //   return <span v-auth={auth}>{dom}</span>;
      // }
      return dom;
    };

    const fixedColums = reactive<any>({
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 120,
      align: 'center',
      slots: { customRender: 'operation' }
    });

    const indexColum: ColumnProps = {
      title: '序号',
      key: 'index',
      width: 60,
      // fixed: 'left',
      align: 'center',
      customRender: ({ index }: { index: number }) => {
        const idx = index + 1;

        if (props.pagination) {
          return idx + props.pagination?.pageSize! * (props.pagination?.current! - 1);
        }

        return idx;
      }
    };

    const scroll = computed(() => {
      const defaultScroll = {
        x: 1500,
        y: 'calc(100vh - 250px)'
      };

      return Object.assign({}, defaultScroll, props.scroll);
    });

    const onShowSizeChange = (current: number, size: number) => {
      emit('handleSizeChange', { current: 1, size });
    };

    const onChange = (current: number, size: number) => {
      emit('handleChange', { current, size });
    };

    const onDelete = (row: any) => {
      Modal.confirm({
        title: () => '确认要删除吗？',
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => '删除后相关信息将不可恢复。',
        async onOk() {
          emit('handleAction', { action: 'delete', row });
        }
      });
    };

    const onRowClick = (record: any, event: any) => {
      if (event.type !== 'click' || !props.hasSelectionColumn || event.target.nodeName === 'A') {
        return;
      }

      const key = props.rowKey;

      const selectedRKs = [...selectedRowKeys.value];

      if (selectedRKs.indexOf(record[key]) >= 0) {
        selectedRKs.splice(selectedRKs.indexOf(record[key]), 1);
      } else {
        selectedRKs.push(record[key]);
      }
      selectedRowKeys.value = selectedRKs;

      const selectedRs = [...selectedRows.value];
      const fIndex = selectedRs.findIndex((srs) => srs[key] === record[key]);

      if (fIndex >= 0) {
        selectedRs.splice(fIndex, 1);
      } else {
        selectedRs.push(record);
      }
      selectedRows.value = selectedRs;

      emit('handleClick', { record, event });
    };

    const onRowDblclick = (record: any, event: any) => {
      if (event.type === 'dblclick') {
        emit('handleDblclick', { record, event });
      }
    };

    const rowSelectionComputed = computed(() => {
      return {
        selectedRowKeys: selectedRowKeys.value,
        onChange: (selectedRKs: string[], selectRs: any[]) => {
          selectedRowKeys.value = selectedRKs;
          selectedRows.value = selectRs;

          emit('handleSelectionChange', { selectedRowKeys: selectedRKs, selectedRows: selectRs });
        },
        columnWidth: 30,
        type: props.rowSelectionType
      };
    });

    const computedColumnsHelp = (checkedList?: string[]) => {
      let cols = [...props.columns];

      if (checkedList) {
        cols = cols.filter((col) => checkedList.includes(col.key as string));
      }

      if (props.hasActionColumn) {
        cols = cols.concat(fixedColums);
      }

      // if (!cols.some((col: any) => col.key === 'index')) {
      //   cols.unshift(indexColum);
      // }

      columns.value = cols;
    };

    const onClosed = (checkedList: string[]) => {
      computedColumnsHelp(checkedList);
    };

    watch(
      () => props.columns,
      (cols) => {
        checkedList.value = cols.reduce((cks: string[], col) => cks.concat(col.key as string), []);

        computedColumnsHelp();
      },
      { immediate: true }
    );

    /** 简单粗暴表格自动滚到顶部 */
    watch(
      () => props.dataSource,
      () => {
        nextTick(() => {
          tbRef.value.querySelector('.ant-table-body')?.scrollTo({ top: 0 });
        });
      }
    );

    return () => (
      <div ref={tbRef} class="table-panel">
        <Table
          {...props}
          {...attrs}
          row-selection={props.hasSelectionColumn ? rowSelectionComputed.value : null}
          columns={columns.value}
          scroll={scroll.value}
          pagination={false}
          size="small"
          class="t-table-striped"
          rowClassName={(_, index) => (index % 2 === 1 ? 'table-striped' : null)}
          customRow={(record: any) => {
            return {
              onClick: (event: any) => onRowClick(record, event),
              onDblclick: (event: any) => onRowDblclick(record, event)
            };
          }}
        >
          {{
            // actionFilter: () => (
            //   // <TTableFilterColumn checkedList={checkedList.value} columns={props.columns} onClosed={onClosed} />
            // ),
            operation: (row: any) => (
              <>
                {props.actionCustomRender && props.actionCustomRender(row)}

                {props.auth?.edit &&
                  actionColumnRender(
                    <>
                      <Tooltip>
                        {{
                          title: () => '编辑',
                          default: () => (
                            <a onClick={() => emit('handleAction', { action: 'edit', row })}>
                              <EditOutlined />
                            </a>
                          )
                        }}
                      </Tooltip>

                      <Divider type="vertical" />
                    </>,
                    props.auth.edit
                  )}

                {props.auth?.delete &&
                  actionColumnRender(
                    <Tooltip>
                      {{
                        title: () => '删除',
                        default: () => (
                          <a onClick={() => onDelete(row)}>
                            <DeleteOutlined style="color:#f5222d;" />
                          </a>
                        )
                      }}
                    </Tooltip>,
                    props.auth.delete
                  )}
              </>
            ),
            ...slots
          }}
        </Table>

        {props.pagination && (
          <div class="table-panel-footer">
            <Pagination
              {...props.pagination}
              {...PAGINATION_CONFIG}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        )}
      </div>
    );
  }
});
