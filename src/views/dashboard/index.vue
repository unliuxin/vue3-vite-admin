<template>
  <div>
    <Button @click="onClick" type="primary">首页</Button>
    <Button @click="onClickDetail" type="primary">详情</Button>
    <div>工作台</div>
    <TTable :columns="column" :scroll="{
      y: 'calc(100vh - 450px)'
    }">

    </TTable>
    <TModal v-model:visible="visibleModal" v-bind="{ ...modalProps }">
      <div>弹窗</div>
    </TModal>
    <TDrawer v-model:visible="visibleDrawer">
      <div>详情</div>
    </TDrawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from 'ant-design-vue';
import TTable from '@/components/t-table';
import TModal from '@/components/t-modal';
import TDrawer from '@/components/t-drawer';


const visibleModal = ref(false)
const visibleDrawer = ref(false)
const onClick = () => {
  visibleModal.value = true
}

const onClickDetail = () => {
  visibleDrawer.value = true
}
const onOk = () => {
  console.log('ok');
}

const modalProps = reactive({
  width: '500px',
  title: '补录合同',
  onOk
})

const column = reactive<any>([
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '单位',
    dataIndex: 'teleUnitName',
    key: 'teleUnitName'
  },
  {
    title: '性质',
    dataIndex: 'type',
    key: 'type',
    slots: { customRender: 'type' }
  },
  {
    title: '总金额',
    dataIndex: 'amountTotal',
    key: 'amountTotal',
    slots: { customRender: 'amountTotal' }
  },
  {
    title: '剩余金额',
    dataIndex: 'restAmount',
    key: 'restAmount',
    slots: { customRender: 'restAmount' }
  },
  {
    title: '状态',
    dataIndex: 'dateStatus',
    key: 'dateStatus',
    slots: { customRender: 'dateStatus' }
  }
]);
</script>