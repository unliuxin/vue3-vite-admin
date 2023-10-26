<template>
  <!-- 我的数字人卡片组件 -->
  <div class="myCardList">
    <Card hoverable style="width: 225px" v-for="(item, index) in cards" :key="index">
      <template #cover>
        <div class="cardcontent">
          <img
            :src="item.imgPath"
            alt=""
            :style="{
              width: item.status === 2 || item.status === 1 ? '100%' : '100px',
              height: item.status === 2 || item.status === 1 ? '100%' : '100px',
            }"
          />
          <Button class="btnCenter" @click="showPersonDetail(item.id)"
            >查看详情 <img src="@/assets/images/myorder/direction_active.png" alt=""
          /></Button>
        </div>
      </template>
      <Button v-if="item.status == 0" class="btnFloor" @click="goToDigital(item.ai_sn)">{{
        item.btnName
      }}</Button>
      <Button v-if="item.status == 1" class="btnFloor" @click="goToDownLoad">{{
        item.btnName
      }}</Button>
      <Button v-if="item.status == 2" class="btnFloor">{{ item.btnName }}</Button>
    </Card>
     <!-- 表单弹框 -->
     <FormDialog ref="showForm"></FormDialog>
  </div>
</template>
<script setup>
  import { Card, Button } from 'ant-design-vue';
  import FormDialog from './formdialog.vue';
  import { ref, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  defineProps({
    cards: {
      type: Array,
    },
  });
  const showForm = ref(null);
  //点击选中的id
  const selectId=ref()
  //点击查看详情
  const showPersonDetail = (id) => {
    // console.log('22222===>>>',id);
    // selectId.value=id
    showForm.value.formOpen();
    nextTick(() => {
      showForm.value.getMyPersonDetail(id)
    })
  };
  //点击直接跳到定制页
  const goToDigital = (id) => {
    router.push({
      path: '/userAdmin/photo/' + id,
    });
  };
  //去下载
  const goToDownLoad = () => {
    console.log('goToDownLoad去下载');
  };
</script>
<style lang="less" scoped>
  .myCardList {
    margin-top: 20px;
    max-width: 1900px;
    overflow-x: auto;
    display: flex;
    .ant-card {
      height: 370px;
      background: #ffffff;
      box-shadow: 0px 4px 20px 0px rgba(11, 124, 255, 0.08);
      border-radius: 10px 10px 10px 10px;
      margin-right: 36px;
      margin-bottom: 20px;
      .bgcActive {
        background: red;
      }
      .cardcontent {
        width: 225px;
        height: 305px;
        background: #eef5ff;
        border-radius: 10px 10px 10px 10px;
        // padding-left: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        // > img {
        //   width: 100px;
        //   height: 100px;
        // }
        .btnCenter {
          position: absolute;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          width: 190px;
          height: 44px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px 10px 10px 10px;
          font-size: 14px;
          font-weight: 400;
          color: #3d3d3d;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }
      :deep(.ant-card-body) {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        .btnFloor {
          margin-top: 12px;
          width: 80px;
          height: 39px;
          border: 2px solid #0b7cff;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 500;
          color: #0b7cff;
        }
      }
    }
  }
  ::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f9f9f9; /* 滚动条背景颜色 */
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
</style>
