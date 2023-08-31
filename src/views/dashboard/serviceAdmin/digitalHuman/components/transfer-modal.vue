<template>
  <Modal v-model:visible="visible" title="出售" @ok="handleOk">
    <div class="transfer-modal">
      <div class="transfer-modal-title">用户手机号：</div>
      <Select
        v-model:value="telValue"
        show-search
        allowClear
        placeholder="请输入用户手机号"
        style="width: 100%"
        :options="options"
        :filter-option="filterOption"
      />
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Modal, Select, message } from 'ant-design-vue';
  const visible = ref(false);
  const telValue = ref('');

  const options = ref([]);
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const onOpenModal = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
    telValue.value = '';
    message.success('出售成功');
  };
  defineExpose({
    onOpenModal,
  });
</script>
<style scoped lang="less">
  .transfer-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .transfer-modal-title {
      margin-right: 12px;
      width: 130px;
    }
  }
</style>
