<!-- 订单详情弹框组件 -->
<template>
  <div class="detailDialog">
    <Modal v-model:visible="visible" title="订单详情" :footer="null" :width="800">
      <div class="content">
        <div class="title">基础信息</div>
        <div class="message">
          <div class="messageLeft">
            <p>订单: {{ detailData.goodscode }}</p>
            <p v-if="detailData.goodsname">产品名称：{{ detailData.goodsname }}</p>
            <p v-if="detailData.username">预约名称：{{ detailData.username }}</p>
            <p v-if="detailData.digitalseat">数字人席位：{{ detailData.digitalseat }}位</p>
            <p v-if="detailData.photonnums">拍摄组数：{{ detailData.photonnums }}个</p>
            <p v-if="detailData.movieFloor">影楼名称：{{ detailData.movieFloor }}</p>
          </div>
          <div class="messageRight">
            <p>下单时间：{{ detailData.createTime }}</p>
            <p>电话：{{ detailData.phone }}</p>
            <p>价格：{{ detailData.price }}</p>
            <p v-if="detailData.status">订单状态：{{ detailData.status }}</p>
          </div>
        </div>
        <button @click="closeBtn">确认</button>
      </div>
    </Modal>
  </div>
</template>
<script setup>
  import { onMounted, reactive, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  const visible = ref(false);
  defineProps({
    detailData: {
      type: Object,
    },
  });

  const detailopen = () => {
    visible.value = true;
  };
  const closeBtn = () => {
    visible.value = false;
  };
  defineExpose({
    detailopen,
  });
</script>
<style lang="less" scoped>
  .content {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-top: 20px;
    position: relative;
    .message {
      margin-left: 60px;
      margin-top: 10px;
      margin-bottom: 80px;
      display: flex;
      .messageRight {
        margin-left: 120px;
      }
    }
    button {
      width: 70px;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-bottom: 10px;
      margin-left: 330px;
    }
  }
</style>
