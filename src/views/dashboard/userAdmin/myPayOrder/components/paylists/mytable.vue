<template>
  <div class="mypay">
    <Table :columns="columns" :data-source="data" bordered :scroll="{ y: 325 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'operate' && record.status == '待支付'">
          <Button type="link" @click="showPayMoney(record.key)">支付</Button>
        </template>
        <template v-if="column.dataIndex == 'operate'">
          <Button type="link" @click="showDetail(record.key)">查看</Button>
        </template>
      </template>
    </Table>
    <SortDetail ref="myDetail" :detailData="selectData" />
  </div>
</template>
<script setup>
  import { reactive, onMounted, ref, computed } from 'vue';
  import { Table, Button } from 'ant-design-vue';
  import SortDetail from '../formdialog/sortdetail.vue';

  const props = defineProps({
    columns: {
      type: Array,
    },
    data: {
      type: Array,
    },
  });
  // const columns = ref(props.columns);
  // const data = ref(props.data);
  const columns=computed(()=>{
    return props.columns
  })
  const data=computed(()=>{
    return props.data
  })
  const myDetail = ref();
  //点击选中的数据
  const selectData = ref();
  //点击支付
  const showPayMoney = (key) => {
    console.log('点击跳到支付页');
  };
  const showDetail = (key) => {
    const dataItem = data.value.find((v) => v.key === key);
    if (dataItem) {
      selectData.value = dataItem;
      // console.log('111111', selectData.value);
      myDetail.value.detailopen();
    }
  };
  onMounted(() => {
    // console.log('434242', data.value);
  });
</script>
<style lang="less" scoped>
  :deep(.ant-pagination) {
    display: none;
  }
</style>
