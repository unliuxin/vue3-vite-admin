<template>
  <div>
    <Card style="margin: 24px; border-radius: 10px">
      <Space>
        <div>
          <span>购买方式：</span>
          <Select v-model:value="searchParams.buyWay" style="width: 120px" />
        </div>
        <div>
          <span>结算状态：</span>
          <Select v-model:value="searchParams.settlement" style="width: 120px" />
        </div>
        <div>
          <span>结算时间：</span>
          <RangePicker v-model:value="searchParams.settlementTime" />
        </div>
        <div>
          <span>手机号：</span>
          <Input v-model:value="searchParams.tel" style="width: 120px" />
        </div>
        <div>
          <Space>
            <Button type="primary">查询</Button>
            <Button @click="reset">重置</Button>
          </Space>
        </div>
      </Space>
    </Card>
    <Card style="margin: 24px; border-radius: 10px">
      <Tabs v-model:activeKey="activeKey" @change="onChangeTab">
        <Tabs.TabPane v-for="(item, index) in tabItems" :key="index">
          <template #tab>
            <div>
              <span>{{ item.name }}</span>
              <span>（{{ item.value }}元）</span>
            </div>
          </template>
        </Tabs.TabPane>
      </Tabs>
      <Table :dataSource="dataSource" :columns="columns" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { Card, Space, Input, Tabs, Table, Select, RangePicker, Button } from 'ant-design-vue'
  const searchParams = ref<any>({
    buyWay: '',
    settlement: '',
    settlementTime: [],
    tel: '',
  })
  const dataSource = ref([])

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
      title: '购买方式',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '获得佣金',
      dataIndex: 'buyCount',
      key: 'buyCount',
    },
    {
      title: '结算状态',
      dataIndex: 'giveCount',
      key: 'giveCount',
    },
    {
      title: '结算时间',
      dataIndex: 'giveCount',
      key: 'giveCount',
    },
  ])
  const activeKey = ref(0)
  const tabItems = ref([
    { name: '获得总佣金', value: 120 },
    { name: '已结算佣金', value: 130 },
    { name: '待结算佣金', value: 150 },
  ])

  const querData = () => {}
  const reset = () => {
    searchParams.value.buyWay = ''
    searchParams.value.settlement = ''
    searchParams.value.tel = ''
    searchParams.value.tel = []
    querData()
  }
  const onChangeTab = (e) => {
    console.log(e)
    querData()
  }
</script>
