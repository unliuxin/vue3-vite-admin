<template>
  <div>
    <Card style="margin: 24px; border-radius: 10px">
      <Space>
        <div class="withdrawal-header-box"
          ><span>已结算总佣金:</span><span class="num">15000</span></div
        >
        <div class="withdrawal-header-box"><span>已提现:</span><span class="num">5000</span></div>
        <div class="withdrawal-header-box"><span>提现中:</span><span class="num">1000</span></div>
        <div class="withdrawal-header-box"><span>余额:</span><span class="num">10000</span></div>
      </Space>
    </Card>
    <Card style="margin: 24px; border-radius: 10px">
      <Tabs v-model:activeKey="activeKey">
        <Tabs.TabPane v-for="(item, index) in tabItems" :key="index" :tab="item" />
      </Tabs>
      <div class="withdrawal-box" v-if="activeKey === 0">
        <div class="box-item">
          <div class="box-item-input">
            <span>提现金额：</span
            ><Input v-model:value="formData.amount" placeholder="输入金额" /><Button
              type="text"
              @click="onDrawal"
              >全部提现</Button
            >
          </div>
          <div class="box-item-note"><span style="color: red">*</span>可提现金额：{{ price }}</div>
        </div>
        <div class="box-item">
          <span>提现方式：</span>
          <Radio v-model:checked="checked">提现至支付宝</Radio>
          <Button type="text">立即绑定</Button>
          <Button type="text">已绑定</Button>
        </div>
        <div class="box-btn">
          <Button type="primary">确定提现</Button>
        </div>
        <div class="illustrate">
          <p><span>*</span>提现说明：</p>
          <p>1、提现后,无法撤回操作</p>
          <p>2、提现需要扣除X%的手续费</p>
        </div>
      </div>
      <div class="withdrawal-record" v-if="activeKey === 1">
        <Table :dataSource="dataSource" :columns="columns">
          <template #status="{ record }">
            <span v-if="record.status === 0">提现成功</span>
            <span v-if="record.status === 1" style="color: red">
              <Tooltip placement="topLeft">
                <template #title>
                  <span>失败原因</span>
                </template>
                <QuestionCircleOutlined :style="{ color: 'red' }" /> </Tooltip
              >提现失败</span
            >
            <span v-if="record.status === 2">审核中</span>
          </template>
        </Table>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { Card, Space, Tabs, Input, Button, Radio, Tooltip, Table } from 'ant-design-vue'
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  const activeKey = ref(0)
  const checked = ref(true)
  const tabItems = reactive(['提现', '提现记录'])
  const price = ref(1000)
  const formData = reactive<any>({
    amount: 0,
  })

  const dataSource = ref([])
  const columns = ref([
    {
      title: '提现时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '金额（元）',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '手续费（元）',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: '支付宝账号',
      dataIndex: 'accountnumber',
      key: 'accountnumber',
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      key: 'status',
      slots: { customRender: 'status' },
    },
  ])

  const onDrawal = () => {
    formData.amount = price
  }
</script>
<style scoped lang="less">
  .withdrawal-header-box {
    display: flex;
    align-items: center;
    margin-right: 36px;
    color: #767676;

    .num {
      color: #3d3d3d;
      font-weight: 700;
      font-size: 28px;
      margin-left: 12px;
    }
  }

  .withdrawal-box {
    margin-left: 300px;

    .box-item {
      margin-bottom: 45px;

      .ant-btn {
        color: #065dfb;
      }

      .box-item-input {
        display: flex;
        align-items: center;

        .ant-input {
          width: 200px;
          margin-left: 12px;
        }
      }

      .box-item-note {
        color: #767676;
        font-size: 12px;
        margin-left: 80px;
        margin-top: 4px;
      }
    }

    .illustrate {
      margin-top: 40px;

      p {
        margin: 0;
        color: #767676;
      }
    }
  }
</style>
