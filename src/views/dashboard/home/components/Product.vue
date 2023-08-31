<template>
  <div class="product-box">
    <div class="title1">数字人产品功能</div>
    <div class="title2">数字人产品功能多样，满足各种场景使用需求</div>
    <div class="content-box">
      <div class="item">
        <img src="@/assets/images/home/pr1.png" />
        <h1>数字人视频合成</h1>
        <div
          >支持灵活配置场景、声音
          动作、动效。轻松用数字人制作短视频，无需真人出镜，大批量视频生成</div
        >
      </div>
      <div class="item">
        <img src="@/assets/images/home/pr2.png" />
        <h1>数字人克隆</h1>
        <div
          >平台有多种形态的
          A数字人模型，用户可基于模型进行克隆，形打造后可用于IP形象的打造、视频的制作、直播及其它应用场景。</div
        >
      </div>
      <div class="item">
        <img src="@/assets/images/home/pr3.png" />
        <h1>数字人直播</h1>
        <div
          >支持虚拟人自助直播，简易操作，可接入多个直播平台并具备弹幕、点赞、商品推送、录屏等多种互动功能</div
        >
      </div>
      <div class="item">
        <img src="@/assets/images/home/pr4.png" />
        <h1>数字人交互</h1>
        <div
          >支持TTSA、STA、唱歌、DUIX交互能力
          、阿凡达模式等，支持动作捕捉、面部捕捉，也支持虚拟场景下，真人和数字人同时出场的虚拟直播.</div
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import {productImgJson} from './img'
  // import { reactive } from 'vue'
</script>

<style scoped lang="less">
  .product-box {
    width: 100%;
    height: 1074px;
    background-color: #fafafa;
    box-sizing: border-box;
    padding-top: 100px;

    .title1 {
      text-align: center;
      padding-bottom: 30px;
      color: #1a1a1a;
      font-size: 36px;
      font-family: SOURCEHANSANSSC-BOLD;
    }

    .title2 {
      text-align: center;
      font-size: 24px;
      color: #767676;
    }

    .content-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 1204px;
      // min-height: 640px;
      margin: 0 auto;
      margin-top: 60px;

      .item {
        width: 48%;
        // height: 320px;
        background-color: #ffffff;
        text-align: center;
        padding-bottom: 20px;
        padding-top: 47px;
        margin-bottom: 45px;

        > img {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }

        > h1 {
          font-size: 24px;
          color: #1a1a1a;
          font-family: SOURCEHANSANSSC-BOLD;
        }

        > div {
          padding: 0 60px;
          font-size: 14px;
          color: #767676;
          margin-top: 12px;
          line-height: 30px;
        }
      }
    }
  }
</style>
