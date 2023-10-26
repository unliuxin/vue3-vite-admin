<template>
  <div class="myFormDialog">
    <Modal v-model:visible="visible" title="模型详情" :footer="null" :width="800" :mask="false">
      <div class="content">
        <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="" />
        <div class="formRight">
          <p>订单号: <span>{{ state.list.ai_sn }}</span></p>
          <p>购买日期：<span>{{ state.list.createtime }}</span></p>
          <p v-if="state.list.studio_order_id===0">使用状态: <span>未使用</span></p>
          <p v-if="state.list.studio_order_id!=0">使用状态: <span>已使用</span></p>
          <p>核销码：<span>1190832673</span></p>
          <p>购买方式：<span>A服务商转售</span></p>
          <button @click="goToDigital">去定制</button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
  import { Modal } from 'ant-design-vue';
  import { ref, defineExpose,onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { myPersonDetailApi } from '@/api/userAdmin/person';
  const router = useRouter()
  const visible = ref(false);
  const props = defineProps({
    selectId:{
      type:Number
    }
  })
  let state=reactive({
    list:[]
  })

  const formOpen = () => {
    visible.value = true;
  };
  //点击去定制
  const goToDigital=(id)=>{
    // console.log('点击去定制');
    router.push({
      path: '/userAdmin/photo/' + id
    })
  }
  //调详情接口
  const getMyPersonDetail=async(selectId)=>{
    // console.log(selectId)
    const res = await myPersonDetailApi({ id: selectId })
    // console.log('selectId',res.data);
    state.list=res.data
    console.log('222222',state.list);
  }
  defineExpose({
    formOpen,
    getMyPersonDetail
  });
</script>
<style lang="less" scoped>
  .content {
    display: flex;
    padding-left: 40px;
    padding-top: 20px;
    padding-bottom: 50px;
    img {
      width: 200px;
      height: 400px;
    }
    .formRight {
      margin-left: 20px;
      margin-top: 20px;
      font-size: 20px;
      button {
        cursor: pointer;
        font-size: 16px;
        border-radius: 5px;
        width: 120px;
        text-align: center;
        height: 30px;
        border: 1px solid #ccc;
      }
    }
  }
</style>
