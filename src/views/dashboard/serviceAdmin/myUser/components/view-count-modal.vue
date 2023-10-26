<template>
  <Modal v-model:visible="visible" :title="props.title" :footer="null" @ok="handleOk">
    <div class="modal-page">
      <Table :dataSource="props.dataSource" :columns="props.columns" :pagination="false" />
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { Modal, Table } from 'ant-design-vue'

  const props: any = defineProps({
    title: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    source: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
  })
  const visible = ref(false)
  const onOpenModal = (val) => {
    console.log(val)
    visible.value = true
  }
  const handleOk = () => {}
  defineExpose({
    onOpenModal,
  })
</script>
<style scoped lang="less">
  .transfer-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .transfer-modal-title {
      margin-right: 12px;
    }
  }
</style>
