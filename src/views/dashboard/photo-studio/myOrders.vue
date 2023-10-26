<template>
  <div class="content">
    <Card>
      <div class="my-user-header">
        <Form layout="inline" ref="formRef" :model="searchFormState" @finish="searchHandleFinish">
          <form-item label="名称/手机号" name="username">
            <Input v-model:value="searchFormState.username" />
          </form-item>
          <form-item label="订单号" name="order_sn">
            <Input v-model:value="searchFormState.order_sn" />
          </form-item>
          <form-item label="下单时间" name="time">
            <RangePicker
              v-model:value="searchFormState.time"
              :format="formatTime"
              :placeholder="['开始日期', '结束日期']"
            />
          </form-item>
          <form-item label="核销状态" name="status">
            <Select v-model:value="searchFormState.status" allowClear>
              <select-option v-for="item of verificationSelect" :key="item.key" :value="item.key">
                {{ item.name }}
              </select-option>
            </Select>
          </form-item>
          <form-item>
            <Button @click="resetForm">重置</Button>
            <Button style="margin-left: 10px" type="primary" html-type="submit">搜索</Button>
            <Button style="margin-left: 10px" type="primary" @click="verification('input')"
              >核销</Button
            >
          </form-item>
        </Form>
      </div>
    </Card>
    <Card style="margin-top: 20px">
      <Table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operate'">
            <Button
              v-if="record.status == '1'"
              type="link"
              @click="verification('enterNow', record)"
              >核销</Button
            >
            <Button type="link" @click="verification('view', record)">详情</Button>
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            {{ selectFilter(verificationSelect, record.status) }}
          </template>
        </template>
      </Table>
    </Card>
    <Modal
      v-model:visible="modalState.visible"
      :title="modalState.title"
      destroyOnClose
      width="700px"
      v-bind="modalState.flag == 'view' ? modalBind : {}"
    >
      <div v-if="modalState.flag !== 'view'">
        <span>输入核销码</span>
        <Input v-model:value.trim="modalState.verify_code" @change="inputChange" />
      </div>
      <Form
        class="form-class"
        v-if="modalState.flag !== 'enterNow'"
        layout="inline"
        :model="modalFormState"
        noStyle
      >
        <form-item label="订单号" name="order_sn">
          <Input v-model:value="modalFormState.order_sn" disabled />
        </form-item>
        <form-item label="下单时间" name="paytime">
          <Input v-model:value="modalFormState.paytime" disabled />
        </form-item>
        <form-item label="用户名称" name="username">
          <Input v-model:value="modalFormState.username" disabled />
        </form-item>
        <form-item label="拍摄套数" name="number">
          <Input v-model:value="modalFormState.number" disabled />
        </form-item>
        <form-item label="手机号" name="mobile">
          <Input v-model:value="modalFormState.mobile" disabled />
        </form-item>
        <form-item label="核销状态" name="statusValue">
          <Input v-model:value="modalFormState.statusValue" disabled />
        </form-item>
      </Form>

      <template #footer>
        <Button @click="handleCancel">取消</Button>
        <Button type="primary" :disabled="!modalFormState.order_sn" @click="handleOk"
          >立即核销</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  type RangeValue = [Dayjs, Dayjs];

  interface FormState {
    username: string;
    order_sn: string;
    time: RangeValue;
    status: string;
    begin_time: string;
    end_time: string;
  }
  import type { Dayjs } from 'dayjs';
  import type { FormInstance } from 'ant-design-vue';

  import { ref, reactive, computed, UnwrapRef } from 'vue';
  import {
    Table,
    Card,
    Form,
    FormItem,
    Input,
    Button,
    RangePicker,
    Modal,
    Select,
    SelectOption,
    message,
  } from 'ant-design-vue';
  import {
    getOrderList,
    getOrderByVerifyCode,
    writeOffOrders,
  } from '../../api/service/photo-studio-serve';
  import dayjs from 'dayjs';
  import { throttling } from '/@/utils/index';

  const formRef = ref<FormInstance>();
  const formatTime = 'YYYY-MM-DD';
  const verificationSelect = [
    { name: '待核销', key: '1' },
    { name: '已核销', key: '2' },
  ];
  const selectFilter = (list, key: string) => {
    const value = list.find((e) => e.key == key);
    if (value) {
      return value.name;
    } else {
      return '';
    }
  };
  const columns = [
    {
      title: '订单号',
      dataIndex: 'order_sn',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '拍摄套数',
      dataIndex: 'number',
    },
    {
      title: '下单时间',
      dataIndex: 'paytime',
    },
    {
      title: '核销状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'operate',
    },
  ];
  const dataSource = ref([]);
  const loading = ref(false);

  const paginationValue = reactive({
    total: 0,
    current: 1,
    pageSize: 15,
  });

  const modalState = reactive({
    visible: false,
    title: '',
    flag: '',
  });

  const modalBind = computed(() => ({
    footer: null,
  }));

  const pagination = computed(() => ({
    total: paginationValue.total,
    current: paginationValue.current,
    pageSize: paginationValue.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
  }));

  const searchFormState: UnwrapRef<FormState> = reactive({
    username: '',
    order_sn: '',
    time: [],
  });

  const modalFormState = ref({});

  const searchHandleFinish = async (e) => {
    const { username, order_sn, status, time } = e;
    const begin_time = time[0] ? dayjs(time[0]).format(formatTime) : '';
    const end_time = time[1] ? dayjs(time[1]).format(formatTime) : '';
    loading.value = true;
    const data = await getOrderList({
      page: paginationValue.current,
      pageSize: paginationValue.pageSize,
      username,
      order_sn,
      status,
      begin_time,
      end_time,
    });
    loading.value = false;
    if (data.code == 1) {
      const { current_page, total, per_page, data: res } = data.data;
      paginationValue.total = total;
      paginationValue.current = current_page;
      paginationValue.pageSize = per_page;
      dataSource.value = [...res];
    }
  };

  const resetForm = () => {
    formRef.value.resetFields();
  };

  const handleTableChange = (e) => {
    const { current, pageSize } = e;
    paginationValue.current = current;
    paginationValue.pageSize = pageSize;
    searchHandleFinish(searchFormState);
  };

  const verification = (flag, record?) => {
    modalFormState.value = {};
    modalState.verify_code = '';
    modalState.flag = flag;
    modalState.visible = true;
    if (flag === 'input') {
      modalState.title = '输入核销码';
    } else if (flag === 'enterNow') {
      modalState.title = '输入核销码';
      modalFormState.value.order_sn = record.order_sn;
    } else if (flag == 'view') {
      modalState.title = '查看详情';
      record.statusValue = selectFilter(verificationSelect, record.status);
      modalFormState.value = record;
    }
  };

  const getOrderByVerifyCodeFn = async () => {
    try {
      const res = await getOrderByVerifyCode({
        verify_code: modalState.verify_code,
      });
      if (res.code == 1) {
        res.data.statusValue = selectFilter(verificationSelect, res.data.status);
        modalFormState.value = res.data;
      }
      message.info(res.msg);
    } catch (error) {}
  };

  const throttlingFn = throttling(getOrderByVerifyCodeFn, 1500);

  const inputChange = () => {
    if (modalState.flag === 'enterNow') return;
    throttlingFn();
  };

  const handleCancel = () => {
    modalState.visible = false;
  };
  const handleOk = async () => {
    try {
      const res = await writeOffOrders({
        verify_code: modalState.verify_code,
        order_sn: modalFormState.value.order_sn,
      });

      if (res.code == 1) {
        modalState.visible = false;
      }
      message.info(res.msg);
    } catch (error) {}
  };

  searchHandleFinish(searchFormState);
</script>

<style scoped lang="less">
  .content {
    margin: 15px;
  }

  .form-class {
    ::v-deep(.ant-form-item) {
      margin: 20px;
    }
  }
</style>
