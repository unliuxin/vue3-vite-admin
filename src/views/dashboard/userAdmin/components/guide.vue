<!-- 拍摄文档流程介绍 -->
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import Step1 from '@/assets/images/user/step1.jpg';
  import Step2 from '@/assets/images/user/step2.jpg';
  import Step3 from '@/assets/images/user/step3.jpg';
  interface setpState {
    title: string
    subTitle: string
    imgUrl: string
  }

  const setpList = reactive<setpState[]>([
    {
      title: '拍摄前',
      subTitle: '拍摄前的准备工作',
      imgUrl: Step1
    },
    {
      title: '拍摄中',
      subTitle: '拍摄中的4点注意事项',
      imgUrl: Step2
    },
    {
      title: '拍摄后',
      subTitle: '拍摄后的2点优化Tips',
      imgUrl: Step3
    },
  ]);

  const activeIndex = ref<number>(0);
</script>

<template>
  <div class="guide">
    <div class="head">
      <img src="~@/assets/images/user/video.png" class="video" alt="">
      <span>2D数字人拍摄文档</span>
      <img src="~@/assets/images/user/download.png" class="download" alt="">
      <span>下滑参考以下内容帮助您提高拍摄质量</span>
    </div>
    <div class="steps">
      <div
        v-for="(item, index) in setpList"
        :key="item.title"
        class="step"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >
        <span class="index">{{ index + 1 }} </span>
        <span class="title">{{ item.title }}</span>
        <span class="line"></span>
        <span class="sub-title">{{ item.subTitle }}</span>
      </div>

    </div>
    
    <div style="margin-bottom: 100px">
      <img :src="setpList[activeIndex].imgUrl" style="width: 100%;" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
  .guide {
    margin-top: 50px;
    .head {
      padding: 21px 0;
      padding-left: 33px;
      background-color: #dbebff;
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      .video {
        width: 30px;
        height: 23px;
        margin-right: 17px;
      }
      .download {
        width: 24px;
        height: 24px;
        margin-left: 20px;
        margin-right: 32px;
      }
    }
    .steps {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .step {
        display: flex;
        align-items: center;
        margin-right: 26px;
        padding: 13px 20px;
        background-color: #F2F4F7;
        border-radius: 8px;
        color: #1A1A1A;
        cursor: pointer;

        .index {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border-radius: 50%;
          background-color: #cbcdcf;
          color: #1A1A1A;
          font-size: 16px;
        }
        .title {
          font-size: 14px;
          font-weight: 600;
        }

        .line {
          display: inline-block;
          width: 2px;
          height: 10px;
          margin: 0 10px;
          border-radius: 1px;
          background-color: #0B7CFF;
        }

        .sub-title {
          font-size: 10px;
          color: #1A1A1A;
        }
      }

      .active {
        background-color: #0B7CFF;
        color: #fff;
        .index {
          background-color: #fff;
          color: #0B7CFF;
        }
        .line {
          background-color: #fff;
        }
        .sub-title {
          color: #fff;
        }
      }
    }
  }
</style>
