<template>
  <div class="content">
    <Card>
      <div class="my-user-header">
        <Form layout="inline" ref="formRef" :model="searchFormState" @finish="searchHandleFinish">
          <form-item label="名称/手机号" name="username">
            <Input v-model:value="searchFormState.username" />
          </form-item>
          <form-item label="审核状态" name="status">
            <Select v-model:value="searchFormState.status" allowClear>
              <select-option v-for="item of auditStatus" :key="item.key" :value="item.key">
                {{ item.name }}
              </select-option>
            </Select>
          </form-item>
          <form-item>
            <Button @click="resetForm">重置</Button>
            <Button style="margin-left: 10px" type="primary" html-type="submit">搜索</Button>
            <Button style="margin-left: 10px" type="primary" @click="upload('up')">上传</Button>
          </form-item>
        </Form>
      </div>
    </Card>
    <Card style="margin-top: 20px">
      <Table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operate'">
            <Button type="link" @click="upload('re', record)">重新上传</Button>
            <!-- <Button
              v-if="record.platform_check_status == '3'"
              type="link"
              @click="upload('re', record)"
              >重新上传</Button
            > -->
            <Button type="link" @click="upload('view', record)">查看</Button>
          </template>
          <template v-else-if="column.dataIndex === 'user_check_status'">
            {{ selectFilter(auditStatus, record.user_check_status) }}
          </template>
          <template v-else-if="column.dataIndex === 'platform_check_status'">
            {{ selectFilter(auditStatus, record.platform_check_status) }}
          </template>
          <template v-else-if="column.dataIndex === 'current_node'">
            <steps
              :current="
                record.platform_check_status == '1' ? 3 : record.user_check_status == '1' ? 2 : 1
              "
            >
              <step title="影楼上传" />
              <step title="用户审核" />
              <step title="平台审核" />
            </steps>
          </template>
        </template>
      </Table>
    </Card>
    <Modal
      v-model:visible="modalState.visible"
      @cancel="handleCancel"
      @ok="handleOk"
      :title="modalState.title"
      class="modal-class"
      width="700px"
      v-bind="modalState.flag == 'view' ? modalBind : {}"
    >
      <Form :model="modalFormState" :rules="rules">
        <template v-if="modalState.flag == 'view'">
          <div class="title">订单信息</div>
          <div class="form">
            <Form.Item label="订单号"> {{ modalFormState.order_sn }} </Form.Item>
            <Form.Item label="下单时间"> {{ modalFormState.paytime }} </Form.Item>
            <Form.Item label="用户名称"> {{ modalFormState.username }} </Form.Item>
            <Form.Item label="拍摄套数"> {{ modalFormState.number }} </Form.Item>
            <Form.Item label="手机号"> {{ modalFormState.phone }} </Form.Item>
            <Form.Item label="核销状态">
              {{ '已核销' }}
            </Form.Item>
          </div>
          <div class="title">视频信息</div>
          <div class="form">
            <Form.Item label="模特名称"> {{ modalFormState.model_name }} </Form.Item>
            <Form.Item label="百度网盘链接"> {{ modalFormState.material_addr }} </Form.Item>
          </div>
          <div class="title">审核详情</div>
          <div class="form">
            <Form.Item label="当前节点" style="flex-basis: 85%">
              <steps
                :current="
                  modalFormState.platform_check_status == '1'
                    ? 3
                    : modalFormState.user_check_status == '1'
                    ? 2
                    : 1
                "
              >
                <step title="影楼上传" />
                <step title="用户审核" />
                <step title="平台审核" />
              </steps>
            </Form.Item>
            <Form.Item label="用户审核状态">
              {{ selectFilter(auditStatus, modalFormState.user_check_status) }}
            </Form.Item>
            <Form.Item label="平台审核状态">
              {{ selectFilter(auditStatus, modalFormState.platform_check_status) }}
            </Form.Item>
            <Form.Item label="审核不通过原因"> {{ modalFormState.number }} </Form.Item>
          </div>
        </template>
        <template v-else>
          <template v-if="modalState.flag !== 're'">
            <form-item label="模特名称" name="model_name">
              <Input v-model:value="modalFormState.model_name" />
            </form-item>
            <form-item label="关联订单号" name="order_sn">
              <Input v-model:value="modalFormState.order_sn" @change="inputChange" />
            </form-item>
            <form-item label="用户名" name="username">
              <Input v-model:value="modalFormState.username" disabled />
            </form-item>
            <form-item label="手机号" name="mobile">
              <Input v-model:value="modalFormState.mobile" disabled />
            </form-item>
          </template>
          <form-item label="上传百度网盘" name="material_addr">
            <Input v-model:value="modalFormState.material_addr" />
          </form-item>
        </template>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  interface FormState {
    user: string;
    password: string;
  }
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  import { ref, reactive, computed } from 'vue';
  import {
    Table,
    Card,
    Form,
    FormItem,
    Input,
    Button,
    Select,
    SelectOption,
    Modal,
    Steps,
    Step,
    message,
  } from 'ant-design-vue';
  import { getMaterialList, getMaterialDetail } from '../../api/service/photo-studio-serve';
  import { throttling } from '/@/utils/index';

  const auditStatus = [
    { name: '待审核', key: '2' },
    { name: '不通过', key: '3' },
    { name: '已通过', key: '1' },
  ];

  const selectFilter = (list, key: string) => {
    const value = list.find((e) => e.key == key);
    if (value) {
      return value.name;
    } else {
      return '';
    }
  };

  const columns = [
    {
      title: '所属用户',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '上传时间',
      dataIndex: 'upload_file_time',
      align: 'center',
    },
    {
      title: '当前节点',
      dataIndex: 'current_node',
      align: 'center',
    },
    {
      title: '用户审核状态',
      dataIndex: 'user_check_status',
      align: 'center',
    },
    {
      title: '平台审核状态',
      dataIndex: 'platform_check_status',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
    },
  ];

  const rules: Record<string, Rule[]> = {
    model_name: [{ required: true, trigger: 'change' }],
    order_sn: [{ required: true, trigger: 'change' }],
    material_addr: [{ required: true, trigger: 'change' }],
  };

  const modalState = reactive({
    visible: false,
    title: '',
    flag: '',
  });
  const modalBind = computed(() => ({
    footer: null,
  }));

  const modalFormState = ref({});
  const formRef = ref<FormInstance>();

  const upload = (flag, e?) => {
    modalState.visible = true;
    modalState.flag = flag;
    modalFormState.value = {};
    if (flag == 'up') {
      modalState.title = '上传视频';
    } else if (flag == 're') {
      modalState.title = '重新上传';
    } else {
      modalState.title = '查看详情';
      modalFormState.value = e;
    }
  };

  const handleCancel = () => {
    // console.log(e);
  };
  const handleOk = async () => {
    const res = await formRef.value.validate();
    console.log(res);
  };

  const searchFormState: UnwrapRef<FormState> = reactive({
    username: '',
    order_sn: '',
    time: [],
  });

  const loading = ref(false);
  const dataSource = ref([]);

  const searchHandleFinish = async (e) => {
    const { username, status } = e;

    loading.value = true;
    const data = await getMaterialList({
      page: paginationValue.current,
      pageSize: paginationValue.pageSize,
      username,
      status,
    });
    loading.value = false;
    if (data.code == 1) {
      const { current_page, total, per_page, data: res } = data.data;
      paginationValue.total = total;
      paginationValue.current = current_page;
      paginationValue.pageSize = per_page;
      dataSource.value = [...res];
    }
  };

  const resetForm = () => {
    formRef.value.resetFields();
  };

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
    const { current, pageSize } = e;
    paginationValue.current = current;
    paginationValue.pageSize = pageSize;
    searchHandleFinish(searchFormState);
  };

  const getMaterialDetailFn = async () => {
    try {
      const res = await getMaterialDetail({
        order_sn: modalFormState.value.order_sn,
      });
      if (res.code == 1) {
        modalFormState.value.username = res.data?.username;
        modalFormState.value.mobile = res.data?.mobile;
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    } catch (error) {}
  };

  const throttlingFn = throttling(getMaterialDetailFn, 1500);

  const inputChange = () => {
    throttlingFn();
  };

  searchHandleFinish(searchFormState);
</script>

<style scoped lang="less">
  .content {
    margin: 15px;
  }

  .modal-class {
    .title {
      padding: 15px;
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
  }
</style>
