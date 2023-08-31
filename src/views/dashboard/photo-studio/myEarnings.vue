<template>
  <div class="content">
    <Card>
      <div class="my-user-header">
        <Form layout="inline" :model="formState" @finish="handleFinish">
          <form-item label="结算状态" name="username1">
            <Select v-model:value="value1">
              <select-option v-for="item of resultStatus" :key="item.key" :value="item.key">
                {{ item.name }}
              </select-option>
            </Select>
          </form-item>
          <form-item label="结算时间" name="username2">
            <RangePicker v-model:value="formState.date" />
          </form-item>

          <form-item label="手机号" name="username">
            <Input v-model:value="formState.Username" />
          </form-item>
          <form-item>
            <Button type="primary" html-type="submit">查询</Button>
            <Button style="margin-left: 10px" @click="resetForm">重置</Button>
          </form-item>
        </Form>
      </div>
    </Card>
    <Card style="margin-top: 20px">
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
      <Table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
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
        <span>输入核销码</span> <Input v-model:value="formState.Username" />
      </div>
      <Form
        class="form-class"
        v-if="modalState.flag !== 'enterNow'"
        layout="inline"
        :model="formState"
        @finish="handleFinish"
      >
        <form-item label="订单号" name="username">
          <Input v-model:value="formState.Username" />
        </form-item>
        <form-item label="下单时间" name="username1">
          <Input v-model:value="formState.username1" />
        </form-item>
        <form-item label="用户名称" name="username1">
          <Input v-model:value="formState.username1" />
        </form-item>
        <form-item label="拍摄套数" name="username1">
          <Input v-model:value="formState.username1" />
        </form-item>
        <form-item label="手机号" name="username1">
          <Input v-model:value="formState.username1" />
        </form-item>
        <form-item label="核销状态" name="username1">
          <Input v-model:value="formState.username1" />
        </form-item>
      </Form>

      <template #footer>
        <Button @click="handleCancel">取消</Button>
        <Button type="primary" @click="handleOk">立即核销</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  interface FormState {
    user: string;
    password: string;
  }
  import { ref, reactive, computed } from 'vue';
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
    Tabs,
  } from 'ant-design-vue';
  // import { getGoodsList } from '../../api/service/photo-studio-serve';

  const tabItems = ref([
    { name: '获得总佣金', value: 120 },
    { name: '已结算佣金', value: 130 },
    { name: '待结算佣金', value: 150 },
  ]);

  const resultStatus = [
    { name: '已结算', key: '1' },
    { name: '未结算', key: '1' },
  ];

  const columns = [
    {
      title: '订单号',
      dataIndex: 'content',
    },
    {
      title: '用户名称',
      dataIndex: 'sale_price',
    },
  ];
  // const columns = [
  //   {
  //     title: '订单号',
  //     dataIndex: 'name',
  //   },
  //   {
  //     title: '用户名称',
  //     dataIndex: 'gender',
  //   },
  //   {
  //     title: '手机号',
  //     dataIndex: 'email',
  //   },
  //   {
  //     title: '拍摄套数',
  //     dataIndex: 'email',
  //   },
  //   {
  //     title: '下单时间',
  //     dataIndex: 'email',
  //   },
  // ];
  const modalBind = computed(() => ({
    footer: null,
  }));
  const modalState = reactive({
    visible: false,
    title: '',
    flag: '',
  });

  const dataSource = ref([]);

  const formState: UnwrapRef<FormState> = reactive({
    user: '',
    password: '',
  });

  const resetForm = () => {};

  const paginationValue = reactive({
    total: 0,
    current: 1,
    pageSize: 15,
  });

  const pagination = computed(() => ({
    total: paginationValue.total,
    current: paginationValue.current,
    pageSize: paginationValue.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
  }));

  const handleTableChange = (e) => {
    console.log(e);
  };
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
../../api/service/photo-studio-serve
