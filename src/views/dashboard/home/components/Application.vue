<template>
  <div class="application-box">
    <div class="title1">数字人应用场景</div>
    <div class="title2"
      >数字人可以广泛应用于不同的行业领域,打破行业限制,结合箕多模态表现方提供更好的服务,赋能产业</div
    >
    <div class="content">
      <div class="left-box">
        <h1>金融领域</h1>
        <div class="line"></div>
        <div class="description"
          >在银行、保险、基金等金融行业，数字人广泛应用于数字经理、 理财视频、直播营销、
          客服咨询、代理人形象打造、 内部服务等相关场景，提升企业工作效率。</div
        >
        <div class="application-list">
          <div class="item" v-for="(item, i) in state.list" :key="i">
            <img :src="item.active ? item.selectImg : item.img" />
            <div :style="{ color: item.active ? '#0B7CFF' : '#1A1A1A' }">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { applicationImgJson } from './img';
  import { reactive } from 'vue';
  // import

  interface ListItem {
    img: string; // 未选中的图片
    selectImg: string; // 选中的图片
    name: string;
    active: boolean;
  }
  const state = reactive<{
    list: ListItem[];
  }>({
    list: [
      {
        img: applicationImgJson.ap1,
        selectImg: applicationImgJson.apc1,
        name: '金融领域',
        active: true,
      },
      {
        img: applicationImgJson.ap2,
        selectImg: applicationImgJson.apc2,
        name: '企业服务',
        active: false,
      },
      {
        img: applicationImgJson.ap3,
        selectImg: applicationImgJson.apc3,
        name: '客户服务',
        active: false,
      },
      {
        img: applicationImgJson.ap4,
        selectImg: applicationImgJson.apc4,
        name: '娱乐与文化',
        active: false,
      },
    ],
  });
</script>

<style scoped lang="less">
  .application-box {
    width: 100%;
    height: 1000px;
    background: linear-gradient(
      37deg,
      rgba(250, 245, 240, 0.6) 7%,
      rgba(223, 250, 249, 0.6) 48%,
      rgba(208, 225, 247, 0.6) 97%
    );
    padding-top: 100px;

    .title1 {
      color: #1a1a1a;
      font-size: 36px;
      text-align: center;
      font-family: SOURCEHANSANSSC-BOLD;
    }

    .title2 {
      color: #767676;
      font-size: 24px;
      text-align: center;
      margin-top: 30px;
    }

    .content {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 1204px;
      height: 505px;
      background-color: #eaf3ff;
      margin: 0 auto;
      margin-top: 164px;
      border-radius: 20px;
      // padding: 106px 52px;
      .left-box {
        width: 55%;
        padding-top: 106px;
        padding-left: 52px;

        h1 {
          color: #1a1a1a;
          font-size: 24px;
          font-family: SOURCEHANSANSSC-BOLD;
        }

        .line {
          width: 51px;
          height: 4px;
          background-color: #0b7cff;
        }

        .description {
          color: #767676;
          font-size: 16px;
          margin-top: 31px;
        }

        .application-list {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 47px;

          .item {
            width: 24%;
            background-color: #ffffff;
            // height: 100px;
            text-align: center;
            padding: 15px 0;
            border-radius: 10px;
            cursor: pointer;

            > img {
              width: 40px;
              height: 40px;
              margin: 0 auto;
            }

            > div {
              color: #1a1a1a;
              font-size: 16px;
              font-family: SOURCEHANSANSSC-MEDIUM;
              margin-top: 8px;
            }
          }
        }
      }

      .right-box {
        position: absolute;
        width: 296px;
        height: 525px;
        right: 142px;
        bottom: 79px;
        background: url('@/assets/images/home/phone.png') no-repeat;
        background-size: 100%;
      }
    }
  }
</style>
