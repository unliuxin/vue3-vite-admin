<template>
  <div class="coupon-code-page">
    <Card style="margin: 24px; border-radius: 10px">
      <div class="coupon-code-header">
        <div v-show="activeKey === 1">
          <Space>
            <div class="code-header-left">
              <span style="width: 80px">手机号：</span>
              <Input v-model:value="searchParams.tel" placeholder="输入手机号" allow-clear />
            </div>
            <div class="btn">
              <Space>
                <Button type="primary">查询</Button>
                <Button>重置</Button>
              </Space>
            </div>
          </Space>
        </div>
        <div class="table-header-btn">
          <Space>
            <Button type="primary" :disabled="btnDisable" @click="onTransfer">出售</Button>
            <Button type="primary" @click="onBuy">购买数字人</Button>
          </Space>
        </div>
      </div>
      <Tabs v-model:activeKey="activeKey" @change="onChangeTab">
        <Tabs.TabPane v-for="(item, index) in tabItems" :key="index">
          <template #tab>
            <div>
              <span>{{ item.name }}</span>
              <span>（{{ item.value }}个）</span>
            </div>
          </template>
        </Tabs.TabPane>
      </Tabs>
      <Table
        :rowKey="(record) => record.id"
        :dataSource="dataSource"
        :columns="initColumns"
        :row-selection="rowSelection"
        :pagination="false"
      >
        <template #status="{ record }">
          <span>{{ record.status === 0 ? '已转正' : '待转正' }}</span>
        </template>
        <template #useStatus="{ record }">
          <span>{{ record.useStatus === 0 ? '已转正' : '待转正' }}</span>
        </template>
      </Table>
      <Pagination
        :pagination="pagination"
        @handleChange="onHandleChange"
        @handleSizeChange="onHandleSizeChange"
      />
    </Card>
    <TransferModal ref="transferModalRef" />
    <BuyPackageModal ref="buyPackageModalRef" @buyCallBack="onBuyCallBack" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, watch, computed, onMounted } from 'vue';
  import { Table, Card, Space, Input, Button, Tabs } from 'ant-design-vue';
  import {
    getDigitalHuman,
    getDigitalHumanList,
    getSellDigitalHumanList,
  } from '/@/api/service/human';
  import { DigitalHumanNum } from '/@/api/service/model/service';
  import TransferModal from './components/transfer-modal.vue';
  import BuyPackageModal from './components/buy-package-modal.vue';
  import Pagination from '/@/components/Pagination/index.vue';

  const transferModalRef = ref();
  const buyPackageModalRef = ref();

  const selectedRowKeyDatas = ref([]);
  const selectedRowDatas = ref([]);
  const activeKey = ref(0);
  const btnDisable = ref<boolean>(true);
  const initColumns = ref<any>([]);

  const rowSelection = ref<any>();

  const queryPageParams = reactive<{ pageSize: number; page: number }>({
    pageSize: 10,
    page: 1,
  });
  const result = reactive<{ total: number; data: DigitalHumanNum[] }>({
    total: 0,
    data: [],
  });
  const pagination = computed(() => ({
    total: result.total,
    currentPage: queryPageParams.page,
    pageSize: queryPageParams.pageSize,
  }));
  const searchParams = reactive<any>({
    status: 0,
    useStatus: 0,
    tel: '',
  });
  const tabItems = reactive<{ name: string; value: number }[]>([
    { name: '我拥有', value: 10 },
    { name: '已转赠', value: 5 },
  ]);

  const dataSource = ref<any>([
    {
      id: '1111',
      code: 'WEDCGHJIJGHIK',
      status: 0,
      tel: '18254547878',
      useStatus: 0,
    },
    {
      id: '2222',
      code: 'WEDCGHJIJGHIK',
      status: 1,
      tel: '18254547878',
      useStatus: 1,
    },
  ]);
  const columns = ref<any>([
    {
      title: '数字人编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '数字人单价',
      dataIndex: 'writeoffPrice',
      key: 'writeoffPrice',
    },
    {
      title: '购买日期',
      dataIndex: 'buyDate',
      key: 'buyDate',
    },
  ]);
  const transferColumns = ref<any>([
    {
      title: '用户手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '出售日期',
      dataIndex: 'sellDate',
      key: 'sellDate',
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ]);

  // 表格选择
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    selectedRowDatas.value = selectedRows;
    selectedRowKeyDatas.value = selectedRowKeys;
    if (selectedRows.length === 0) {
      btnDisable.value = true;
    } else {
      btnDisable.value = false;
    }
  };

  // 获取统计数据
  const queryCountData = async () => {
    const res = await getDigitalHuman();
    console.log(res);
  };

  // 获取我的数字人列表
  const queryHumanList = async () => {
    const res = await getDigitalHumanList(queryPageParams);
    console.log(res);
  };

  // 获取已出售的数字人列表
  const querySellHumanList = async () => {
    const res = await getSellDigitalHumanList(queryPageParams);
    console.log(res);
  };

  // 打开转赠弹窗
  const onTransfer = () => {
    transferModalRef.value!.onOpenModal();
  };

  // 打开购买弹窗
  const onBuy = () => {
    buyPackageModalRef.value!.onOpenModal();
  };

  // tab切换
  const onChangeTab = (e) => {
    if (e === 0) {
      queryHumanList();
      if (selectedRowKeyDatas.value.length > 0) {
        btnDisable.value = false;
      }
    } else {
      querySellHumanList();
      selectedRowDatas.value = [];
      selectedRowKeyDatas.value = [];
      btnDisable.value = true;
    }
  };

  const onHandleChange = ({ current, size }) => {
    console.log(current, size);
  };

  const onHandleSizeChange = ({ current, size }) => {
    console.log(current, size);
  };

  // 转增回显
  const onBuyCallBack = () => {
    queryCountData();
  };

  watch(
    () => activeKey.value,
    (val) => {
      if (val === 1) {
        rowSelection.value = null;
        initColumns.value = columns.value.concat(transferColumns.value);
      } else if (val === 0) {
        rowSelection.value = { selectedRowKeys: selectedRowKeyDatas, onChange: onSelectChange };
        initColumns.value = columns.value;
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    queryCountData();
    queryHumanList();
  });
</script>
<style scoped lang="less">
  .coupon-code-page {
    .coupon-code-header {
      display: flex;
      justify-content: space-between;

      .table-header-btn {
        margin-bottom: 20px;
      }

      .code-header-left {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
