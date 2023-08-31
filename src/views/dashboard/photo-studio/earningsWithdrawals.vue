<template>
  <div>
    <Card style="margin: 24px; border-radius: 10px">
      <Space>
        <div class="withdrawal-header-box"
          ><span>已结算收益:</span><span class="num">{{ count.settled || 0 }}</span></div
        >
        <div class="withdrawal-header-box"
          ><span>已提现:</span><span class="num">{{ count.status_2 || 0 }}</span></div
        >
        <div class="withdrawal-header-box"
          ><span>提现中:</span><span class="num">{{ count.status_1 || 0 }}</span></div
        >
        <div class="withdrawal-header-box"
          ><span>待提现:</span><span class="num">{{ count.status_3 || 0 }}</span></div
        >
      </Space>
    </Card>
    <Card style="margin: 24px; border-radius: 10px">
      <Tabs v-model:activeKey="activeKey" @change="tabsChange">
        <Tabs.TabPane v-for="(item, index) in tabItems" :key="index" :tab="item" />
      </Tabs>
      <div class="withdrawal-box" v-if="activeKey === 0">
        <div class="box-item">
          <div class="box-item-input">
            <span>提现金额：</span
            ><input-number
              v-model:value="formData.withdrawal_amount"
              placeholder="输入金额"
              :controls="false"
              :precision="2"
              :disabled="!Number(count.status_3)"
              style="width: 250px !important"
            /><Button type="text" @click="onAll">全部提现</Button>
          </div>
          <div class="box-item-note"
            ><span style="color: red">*</span>可提现金额：{{ count.status_3 || 0 }}</div
          >
        </div>
        <div class="box-item">
          <span>提现方式：</span>
          <Radio v-model:checked="checked">提现至支付宝</Radio>
          <Button v-if="!userState.alipay_account" @click="binding('go')" type="text"
            >立即绑定</Button
          >
          <Button v-else type="text" @click="binding()">已绑定</Button>
        </div>
        <div class="box-btn">
          <Button
            type="primary"
            :disabled="!Number(count.status_3)"
            @click="confirmPayouts"
            :loading="buttonLoading"
            >确定提现</Button
          >
        </div>
        <div class="illustrate">
          <p><span>*</span>提现说明：</p>
          <p>1、提现后,无法撤回操作</p>
          <p>2、提现需要扣除X%的手续费</p>
        </div>
      </div>
      <div class="withdrawal-record" v-if="activeKey === 1">
        <Table
          :dataSource="dataSource"
          :columns="columns"
          :row-key="(record) => record.id"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              {{ selectFilter(withdrawalStatusSelect, record.status) }}
            </template>
          </template>
        </Table>
      </div>
    </Card>
    <Modal v-model:visible="modalState.visible" :title="modalState.title" width="700px">
      <Form
        class="form-class"
        layout="vertical"
        :model="modalFormState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <form-item label="手机号码" name="alipay_account">
          <Input v-model:value.trim="modalFormState.alipay_account" />
        </form-item>
        <form-item label="姓名" name="realname">
          <Input v-model:value.trim="modalFormState.realname" />
        </form-item>
      </Form>
      <template #footer>
        <Button type="primary" @click="handleOk">确定</Button>
        <Button @click="modalState.visible = false">取消</Button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import {
    Card,
    Space,
    Tabs,
    Input,
    Button,
    Radio,
    Table,
    InputNumber,
    Modal,
    Form,
    FormItem,
    message,
  } from 'ant-design-vue';
  import {
    getWithdrawalCount,
    withdrawalWithdrawalDo,
    getWithdrawalList,
  } from '/@/api/service/photo-studio-serve';
  const activeKey = ref(0);
  const tabItems = reactive(['提现', '提现记录']);
  const checked = ref(true);

  const formData = reactive({
    withdrawal_amount: 0,
  });
  const count = ref({});

  const dataSource = ref([]);

  const withdrawalStatusSelect = [
    { name: '待审核', key: '1' },
    { name: '已通过', key: '2' },
    { name: '已拒绝', key: '3' },
  ];

  const selectFilter = (list, key: string) => {
    const value = list.find((e) => e.key == key);
    if (value) {
      return value.name;
    } else {
      return '';
    }
  };

  const columns = ref([
    {
      title: '提现时间',
      dataIndex: 'createtime',
    },
    {
      title: '金额（元）',
      dataIndex: 'withdrawal_amount',
    },
    {
      title: '手续费（元）',
      dataIndex: 'charge',
    },
    {
      title: '支付宝账号',
      dataIndex: 'alipay_account',
    },
    {
      title: '提现状态',
      dataIndex: 'status',
    },
  ]);

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

  const modalState = reactive({
    visible: false,
    title: '',
    flag: '',
  });
  const modalFormState = ref({});
  const userState = ref({});
  const labelCol = { style: { width: '150px' } };
  const wrapperCol = { span: 14 };

  const binding = (flag) => {
    modalState.visible = true;
    modalFormState.value.alipay_account = userState.value.alipay_account;
    modalFormState.value.realname = userState.value.realname;
    if (flag == 'go') {
      modalState.title = '绑定支付宝账号';
    } else {
      modalState.title = '重新绑定支付宝账号';
    }
  };
  const handleOk = () => {
    if (!modalFormState.value.alipay_account) {
      message.info('手机号码必填');
      return;
    } else if (!modalFormState.value.realname) {
      message.info('姓名必填');
      return;
    }
    userState.value.alipay_account = modalFormState.value.alipay_account;
    userState.value.realname = modalFormState.value.realname;
    modalState.visible = false;
  };

  const onAll = () => {
    formData.withdrawal_amount = count.value.status_3;
  };
  const getWithdrawalCountFn = async () => {
    try {
      const res = await getWithdrawalCount();
      if (res.code == 1) {
        count.value = res.data;
        if (res.data.alipay_account) {
          userState.value.alipay_account = res.data.alipay_account;
          userState.value.realname = res.data.realname;
        }
      }
    } catch (error) {}
  };
  const buttonLoading = ref(false);
  const confirmPayouts = async () => {
    try {
      buttonLoading.value = true;
      const { alipay_account, realname } = userState.value;
      const res = await withdrawalWithdrawalDo({
        alipay_account,
        realname,
        withdrawal_amount: formData.withdrawal_amount,
      });
      buttonLoading.value = false;
      message.info(res.msg);
      getWithdrawalCountFn();
    } catch (error) {}
  };
  getWithdrawalCountFn();

  const loading = ref(false);

  const getWithdrawalListFn = async () => {
    try {
      const res = await getWithdrawalList({
        page: paginationValue.current,
        pageSize: paginationValue.pageSize,
      });
      loading.value = false;
      if (res.code == 1) {
        const { current_page, total, per_page, data } = res.data;
        paginationValue.total = total;
        paginationValue.current = current_page;
        paginationValue.pageSize = per_page;
        dataSource.value = [...data];
      }
    } catch (error) {}
  };

  const handleTableChange = (e) => {
    const { current, pageSize } = e;
    paginationValue.current = current;
    paginationValue.pageSize = pageSize;
    getWithdrawalListFn();
  };

  getWithdrawalListFn();

  const tabsChange = (e) => {
    if (e == 0) {
      getWithdrawalCountFn();
    } else {
      getWithdrawalListFn();
    }
  };
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
