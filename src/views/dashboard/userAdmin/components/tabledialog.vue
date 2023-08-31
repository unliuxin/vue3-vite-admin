<template>
  <div class="mytabledialog">
    <Modal v-model:visible="visible" title="记录" :footer="null" :width="1200" :mask="false">
      <MyTable :columns="columnsData" :data="dataList"></MyTable>
    </Modal>
  </div>
</template>
<script  setup>
  import { Modal } from 'ant-design-vue';
  import MyTable from '../myPayOrder/components/paylists/mytable.vue';
  import { reactive, ref } from 'vue';
  const visible = ref(false);
  //表格组件 表的列数据等
  //列
  const columnsData = reactive([
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'goodscode',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '拍摄组数',
      dataIndex: 'photonnums',
      align: 'center',
    },
    {
      title: '数字人名称',
      dataIndex: 'digitalName',
      align: 'center',
    },
    {
      title: '影楼名称',
      dataIndex: 'movieFloor',
      align: 'center',
    },
    {
      title: '购买时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '使用时间',
      dataIndex: 'useTime',
      align: 'center',
    },
    {
      title: '训练完成时间',
      dataIndex: 'finishTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
    },
  ]);
  const dataList = reactive([
    {
      key: '1',
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      digitalName:'数字人1',
      movieFloor:'天虹',
      createTime: '23-08-23 12:23:00',
      useTime:'23-08-23 12:23:00',
      finishTime:'23-08-23 12:23:00',
    },
    {
      key: '2',
      goodscode: '12873636536',
      username: '李四22222',
      phone: '154664456',
      photonnums: 10,
      digitalName:'数字人1',
      movieFloor:'天虹',
      createTime: '23-08-23 12:23:00',
      useTime:'23-08-23 12:23:00',
      finishTime:'23-08-23 12:23:00',
    },
    {
      key: '3',
      goodscode: '12873636536',
      username: '李四33333',
      phone: '154664456',
      photonnums: 10,
      digitalName:'数字人1',
      movieFloor:'天虹',
      createTime: '23-08-23 12:23:00',
      useTime:'23-08-23 12:23:00',
      finishTime:'23-08-23 12:23:00',
    },
   
  ]);
  const open = () => {
    visible.value = true;
  };
  defineExpose({
    open,
  });
</script>
<style lang="less" scoped></style>
