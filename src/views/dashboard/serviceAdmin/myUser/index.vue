<template>
  <div>
    <Card style="margin: 24px; border-radius: 10px">
      <div class="my-user-header">
        <Space>
          <div class="filter-box">
            <span class="laber">手机号：</span>
            <Input v-model:value="searchParams.tel" allow-clear />
          </div>
          <div class="filter-box">
            <span class="laber">注册时间：</span>
            <RangePicker v-model:value="searchParams.date" />
          </div>
          <div><Button>重置</Button></div>
          <div><Button type="primary">搜索</Button></div>
        </Space>
      </div>
    </Card>
    <Card style="margin: 24px; border-radius: 10px">
      <Table :dataSource="dataSource" :columns="columns" :pagination="false">
        <template #buyCount="{ record }">
          <span style="cursor: pointer; color: red" @click="onViewBuyDetail(record)">{{
            record.buyCount
          }}</span>
        </template>
        <template #giveCount="{ record }">
          <span style="cursor: pointer; color: red" @click="onViewGiveDetail(record)">{{
            record.giveCount
          }}</span>
        </template>
      </Table>
    </Card>
    <ViewCountModal
      :columns="buyColumns"
      :source="buySource"
      :title="'购买详情'"
      ref="buyModalRef"
    />
    <!-- <ViewCountModal
      :columns="giveColumns"
      :source="giveSource"
      :title="'转增详情'"
      ref="giveModalRef"
    /> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Table, Card, Space, Input, Button, RangePicker } from 'ant-design-vue';
  import ViewCountModal from './components/view-count-modal.vue';
  const buyModalRef = ref();
  const giveModalRef = ref();
  const searchParams = reactive<any>({
    name: '',
    tel: '',
    date: [],
  });

  const dataSource = ref([
    { userName: '张三', tel: '1231564', time: '201244', buyCount: 2, giveCount: 5 },
    { userName: '李四', tel: '2456545', time: '201244', buyCount: 3, giveCount: 6 },
  ]);

  const columns = ref([
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '注册时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '购买次数',
      dataIndex: 'buyCount',
      key: 'buyCount',
      slots: { customRender: 'buyCount' },
    },
  ]);

  // 购买次数详情表格数据和列
  const buySource = ref([]);
  const buyColumns = ref([
    {
      title: '购买时间',
      dataIndex: 'buyTime',
      key: 'buyTime',
    },
    {
      title: '购买套餐',
      dataIndex: 'buyPackage',
      key: 'buyPackage',
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
    },
    {
      title: '使用时间',
      dataIndex: 'useTime',
      key: 'useTime',
    },
  ]);

  // 转赠详情表格数据和列
  // const giveSource = ref([]);
  // const giveColumns = ref([
  //   {
  //     title: '转赠时间',
  //     dataIndex: 'giveTime',
  //     key: 'giveTime',
  //   },
  //   {
  //     title: '数字人单价',
  //     dataIndex: 'price',
  //     key: 'price',
  //   },
  //   {
  //     title: '使用状态',
  //     dataIndex: 'useStatus',
  //     key: 'useStatus',
  //   },
  //   {
  //     title: '使用时间',
  //     dataIndex: 'useTime',
  //     key: 'useTime',
  //   },
  // ]);
  const onViewBuyDetail = (record) => {
    console.log(record);
    buyModalRef.value!.onOpenModal(record);
  };
  const onViewGiveDetail = (record) => {
    console.log(record);
    giveModalRef.value!.onOpenModal(record);
  };
</script>

<style scoped lang="less">
  .my-user-header {
    .filter-box {
      display: flex;
      align-items: center;

      .laber {
        width: 120px;
        text-align: right;
      }
    }
  }
</style>
