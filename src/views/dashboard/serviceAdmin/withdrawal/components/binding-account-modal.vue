<template>
  <Modal v-model:visible="visible" title="绑定支付宝账号" @ok="handleOk">
    <div class="modal-page">
      <Form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <Form.Item
          label="姓名"
          name="username"
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
          <Input v-model:value="formState.username" />
        </Form.Item>

        <Form.Item
          label="手机号码"
          name="tel"
          :rules="[{ required: true, message: '手机号码有误' }]"
        >
          <Input v-model:value="formState.tel" />
        </Form.Item>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue'
  import { Modal, Form, Input } from 'ant-design-vue'
  const visible = ref(false)

  const formState = reactive({
    username: '',
    tel: '',
  })

  watch(
    () => visible.value,
    (val) => {
      if (!val) {
        formState.username = ''
        formState.tel = ''
      }
    },
  )
  const onOpenModal = () => {
    visible.value = true
  }

  const handleOk = () => {}
  defineExpose({
    onOpenModal,
  })
</script>
