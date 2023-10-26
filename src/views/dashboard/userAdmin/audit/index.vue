<!-- 审核与训练 -->
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Tabs, Table, Button, Modal, Card, Form, Input } from 'ant-design-vue';
  // import { orderAuditApi } from '@/api/userAdmin/audit'
  import DetailModal from './detailModal.vue';
  import Pagination from '@/components/Pagination/index.vue'

  interface ItabType {
    name: string
    value: string
  }

  // tabs
  const activeKey = ref<number>(0);

  const userTabs = reactive<ItabType[]>([
    { name: '全部', value: "" },
    { name: '待用户审核', value: "1" },
    { name: '已驳回', value: "2" },
    { name: '审核通过', value: "3" },
  ]);

  const platformTabs = reactive<ItabType[]>([
    { name: '全部', value: "" },
    { name: '待平台审核', value: "1" },
    { name: '已驳回', value: "2" },
    { name: '训练中', value: "3" },
    { name: '训练完成', value: "4" },
  ]);

  // 副tabs
  const activeTab = ref<number>(0);

  const changeTab = () => {
    activeTab.value = 0;
  };
  const changeSubTab = (index: number) => {
    activeTab.value = index;
  };

  // 用户表格
  const userColumns = [
    {
      title: '单号',
      dataIndex: 'name',
    },
    {
      title: '用户名称',
      dataIndex: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'name',
    },
    {
      title: '拍摄组数',
      dataIndex: 'name',
    },
    {
      title: '数字人名称',
      dataIndex: 'name',
    },
    {
      title: '影楼名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'name',
    },
    {
      title: '提交时间',
      dataIndex: 'name',
    },
    {
      title: '用户审核时间',
      dataIndex: 'name',
    },
    {
      title: '用户审核意见',
      dataIndex: 'name',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
  // 平台表格
  const platformColumns = [
    {
      title: '单号',
      dataIndex: 'name',
    },
    {
      title: '用户名称',
      dataIndex: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'name',
    },
    {
      title: '拍摄组数',
      dataIndex: 'name',
    },
    {
      title: '数字人名称',
      dataIndex: 'name',
    },
    {
      title: '影楼名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'name',
    },
    {
      title: '审核意见',
      dataIndex: 'name',
    },
    {
      title: '提交时间',
      dataIndex: 'name',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const auditMap = [
    { tabs: userTabs, columns: userColumns },
    { tabs: platformTabs, columns: platformColumns },
  ];

  // 模态框的显示
  const auditVisible = ref<boolean>(false);
  // 查看详情
  const detailVisible = ref<boolean>(false);
  // 审核意见
  const remark = ref<string>('');

  // 点击审核
  const openAuditModal = () => {
    auditVisible.value = true;
  };

  // 审核
  // const hAudit = async (checkStatus: number) => {
  //   const res = await orderAuditApi({
  //     studioOrderId: 0,
  //     checkStatus,
  //     remark: remark.value
  //   })
  //   console.log(res)
  //   // 关闭
  //   auditVisible.value = false
  // }
  const onHandleChange = ({ current, size }) => {
    console.log(current, size);
  };

  const onHandleSizeChange = ({ current, size }) => {
    console.log(current, size);
  };

  // 订单审核通过
  const hAuditOK = () => {
    // hAudit(1)
  };
  // 订单审核不通过
  const hAuditCancel = () => {
    // hAudit(0)
  };
</script>

<template>
  <div class="p-4 audit">
    <Card class="!my-4 enter-y">
      <Tabs v-model:activeKey="activeKey" @change="changeTab">
        <Tabs.TabPane :key="0" tab="用户审核" />
        <Tabs.TabPane :key="1" tab="平台审核/训练" />
      </Tabs>

      <div class="tabs">
        <div
          class="tab"
          v-for="(item, index) in auditMap[activeKey].tabs"
          :key="item.name"
          :class="{ active: activeTab === index }"
          @click="changeSubTab(index)"
        >
          {{ item.name }}
        </div>
      </div>

      <Table :dataSource="data" :columns="auditMap[activeKey].columns" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Button type="link" v-if="activeKey === 0" @click="openAuditModal">审核</Button>
            <Button type="link" @click="detailVisible = true">查看</Button>
          </template>
        </template>
      </Table>
      <Pagination @handleChange="onHandleChange" @handleSizeChange="onHandleSizeChange" />

      <Modal
        v-model:visible="auditVisible"
        title="审核"
        width="50%"
        cancel-text="不通过"
        ok-text="审核通过/提交平台"
        @ok="hAuditOK"
        @cancel="hAuditCancel"
      >
        <div>
          <div class="content">
            <div class="title">基础信息</div>
            <div class="form">
              <Form.Item label="订单"> 193676872554 </Form.Item>
              <Form.Item label="提交时间"> 193676872554 </Form.Item>
              <Form.Item label="预约名称"> 193676872554 </Form.Item>
              <Form.Item label="预约电话"> 193676872554 </Form.Item>
              <Form.Item label="影楼名称"> 193676872554 </Form.Item>
              <Form.Item label="影楼电话"> 193676872554 </Form.Item>
              <Form.Item label="拍摄组数"> 193676872554 </Form.Item>
              <Form.Item label="模特名称"> 193676872554 </Form.Item>
            </div>
          </div>
          <div class="content">
            <div class="title">视频信息</div>
            <div class="form">
              <Form.Item label="训练视频"> 193676872554 </Form.Item>
              <Form.Item label="百度网盘"> 193676872554 </Form.Item>
              <Form.Item label="形象授权"> 193676872554 </Form.Item>
            </div>
          </div>
          <div class="content">
            <div class="title">审核详情</div>
            <div class="form">
              <Form.Item label="意见和反馈">
                <Input.TextArea
                  v-model:value="remark"
                  :auto-size="{ minRows: 3 }"
                  placeholder="请输入意见和反馈"
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Modal>

      <!-- 查看 -->
      <DetailModal v-model:detail-visible="detailVisible" />
    </Card>
  </div>
</template>

<style lang="less" scoped>
  .tabs {
    display: flex;
    .tab {
      cursor: pointer;
      padding: 8px 16px;
      margin-bottom: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
    }
    .tab + .tab {
      border-left: none;
    }
    .active {
      background-color: #000;
      color: #fff;
    }
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    padding-left: 60px;
    .ant-form-item {
      width: 50%;
      margin-bottom: 0;
    }
  }
  .content {
    padding: 20px;
  }
</style>
