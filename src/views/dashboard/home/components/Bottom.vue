<template>
  <div class="bottom-box">
    <div class="content-box">
      <div class="left-box">
        <div class="title">服务咨询</div>
        <div class="introduce-box">
          <span>
            产品问题请点击下方按钮或拔打950808-6进行免费咨询， 还可享五分钟视频合成免费体验
          </span>
        </div>
        <div class="btn-box">
          <span>立即咨询</span>
        </div>
      </div>
      <div class="right-box">
        <div class="title">服务咨询</div>
        <div class="introduce-box">
          <span> 扫描下方二维码，联系拓世法宝专家，获取更多帮助 </span>
        </div>
        <div class="img-box">
          <img src="@/assets/images/home/pr4.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import { ref } from 'vue'
</script>

<style scoped lang="less">
  .bottom-box {
    width: 100%;
    height: 400px;
    background-color: #282828;
    color: #fff;
    box-sizing: border-box;
    padding-top: 78px;
    padding-bottom: 111px;

    .content-box {
      width: 1024px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;

      .left-box {
        width: 406px;
        height: 200px;
        box-sizing: border-box;

        .title {
          font-size: 24px;
          font-family: 'SOURCEHANSANSSC-BOLD';
          font-weight: bold;
        }

        .introduce-box {
          margin-top: 16px;
          margin-bottom: 26px;
          color: #d8d8d8;
        }

        .btn-box {
          width: 160px;
          height: 59px;
          background-color: #0b7cff;
          line-height: 59px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
        }
      }

      .right-box {
        width: 406px;
        height: 200px;
        box-sizing: border-box;

        .title {
          font-size: 24px;
          font-family: 'SOURCEHANSANSSC-BOLD';
          font-weight: bold;
        }

        .introduce-box {
          margin-top: 16px;
          margin-bottom: 18px;
          color: #d8d8d8;
        }

        .img-box {
          img {
            width: 110px;
            height: 110px;
          }
        }
      }
    }
  }
</style>
