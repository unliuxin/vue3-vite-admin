<template>
  <div class="feature-box">
    <div class="title1">数字人产品亮点</div>
    <div class="title2">数字人产品具备以下四大亮点，帮助使用者快速了解产品</div>
    <div class="content">
      <div class="list-content">
        <div class="box">
          <img src="@/assets/images/home/icon1.png" />
          <div class="right">
            <div>超写实的形象复刻</div>
            <div>帮您打造一个活生生的专属数字分身</div>
          </div>
        </div>
        <div class="box">
          <img src="@/assets/images/home/icon2.png" />
          <div class="right">
            <div>广泛的场景适用性</div>
            <div>面向各个行业及场景，适配满足您的业务诉求</div>
          </div>
        </div>
        <div class="box">
          <img src="@/assets/images/home/icon3.png" />
          <div class="right">
            <div>快速的视频制作</div>
            <div>支持灵活配置，一键合成您要的规频</div>
          </div>
        </div>
        <div class="box">
          <img src="@/assets/images/home/icon4.png" />
          <div class="right">
            <div>逼真的虚拟直播</div>
            <div>快速搭建直强间，像真人一样直播带货</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <img src="@/assets/images/home/to.png" />
      <span>立即抢购</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import { ref } from 'vue'
</script>

<style scoped lang="less">
  .feature-box {
    width: 100%;
    background: #ffffff;
    padding-top: 100px;
    padding-bottom: 101px;

    > .title1 {
      text-align: center;
      font-size: 36px;
      color: #1a1a1a;
      font-family: SOURCEHANSANSSC-BOLD;
    }

    > .title2 {
      text-align: center;
      font-size: 24px;
      color: #767676;
      font-family: SOURCEHANSANSSC-MEDIUM;
      margin-top: 30px;
      margin-bottom: 60px;
    }

    .content {
      width: 100%;
      padding: 0 360px;

      .list-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .box {
          display: flex;
          justify-content: flex-start;
          width: 47%;
          background: #faf9fc;
          padding: 64px 0;
          padding-left: 61px;
          margin-bottom: 30px;

          > img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
          }

          > .right {
            > div {
              &:first-child {
                color: #1a1a1a;
                font-size: 24px;
                font-weight: bold;
              }

              &:last-child {
                color: #767676;
                font-size: 16px;
                font-family: SOURCEHANSANSSC-REGULAR;
              }
            }
          }
        }
      }
    }

    .btn-box {
      width: 224px;
      height: 70px;
      background: linear-gradient(293deg, #0b7cff 0%, #0baaff 100%);
      margin: 0 auto;
      line-height: 70px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 35px;
      margin-top: 80px;
      cursor: pointer;

      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }

      > span {
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
</style>
