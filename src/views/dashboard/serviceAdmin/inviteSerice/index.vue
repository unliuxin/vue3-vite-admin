<template>
  <div>
    <Card style="margin: 24px; border-radius: 10px">
      <Table :dataSource="dataSource" :columns="columns" :pagination="false" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Table, Card } from 'ant-design-vue';
  const dataSource = ref<any>([]);
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
      title: '服务商等级',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '成为服务商日期',
      dataIndex: 'date',
      key: 'date',
    },
  ]);
</script>
