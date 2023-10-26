<template>
  <div class="menu-header">

  </div>
  <div class="menu-content">
    <TTable :columns="columns">

    </TTable>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import TTable from '@/components/t-table';

const columns = ref<any>([
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName'
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    key: 'orderNum'
  },
  {
    title: '路由',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
])

const state = reactive({

})

const result = reactive({
  records: [],
  total: 0
})
</script>
<style scoped></style>