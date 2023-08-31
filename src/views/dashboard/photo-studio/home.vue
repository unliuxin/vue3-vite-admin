<template>
  <div class="content">
    <Card>
      <div class="content-on">
        <div class="user-img">
          <Avatar :src="studioInfo.image" :size="100" style="margin-bottom: 20px" />
          <div class="font-white">{{ studioInfo.name }}</div>
        </div>
        <div class="user-region">
          <div class="font-prompt">
            所在地区：
            <div class="prompt-region">{{
              (studioInfo?.city || '') + ' ' + (studioInfo?.address || '')
            }}</div>
          </div>
          <div class="font-prompt">
            已缴纳保证金：
            <div class="prompt-gold">￥ {{ studioInfo.earnest_money || 0 }}</div>
          </div>
        </div>
      </div>
    </Card>
    <div class="content-bottom">
      <dataCard title="数据总览" :dataList="dataList" />
      <dataCard title="本月数据统计" :dataList="totalDataList" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, Avatar } from 'ant-design-vue';
  import dataCard from './components/data-card.vue';
  import { getStatistics } from '/@/api/service/photo-studio-serve';
  const dataList = ref([
    { name: '总订单数', key: 'totalOrder', num: 0, right: true, orange: true },
    {
      name: '总收益',
      key: 'revenue',
      num: 0,
      prompt: true,
      right: true,
      promptText: '总收益=已结算收益+待结算收益',
    },
    {
      name: '已结算收益',
      key: 'settled',
      num: 0,
      prompt: true,
      right: true,
      promptText: '已结算收益：完成了数字人拍摄全流程，且用户审核和平台审核均通过',
    },
    {
      name: '待结算收益',
      key: 'notSettled',
      num: 0,
      prompt: true,
      right: true,
      promptText: '待结算收益：核销成功了',
    },
  ]);

  const totalDataList = ref([
    {
      name: '总订单数',
      key: 'currentMonthTotalOrder',
      num: 0,
      orange: true,
    },
    {
      name: '总收益',
      key: 'currentMonthTotalRevenue',
      num: 0,
    },
    {
      name: '已结算收益',
      key: 'currentMonthSettled',
      num: 0,
    },
    {
      name: '待结算收益',
      key: 'currentMonthNotSettled',
      num: 0,
    },
  ]);

  const studioInfo = ref({});
  async function getStatisticsFn() {
    try {
      const res = await getStatistics();
      if (res.code == 1) {
        dataList.value.forEach((e) => {
          e.num = res.data[e.key];
        });
        totalDataList.value.forEach((e) => {
          e.num = res.data[e.key];
        });
        studioInfo.value = res.data.studioInfo;
      }
    } catch (error) {}
  }

  getStatisticsFn();
</script>
<style lang="less" scoped>
  .content {
    margin: 15px;

    .content-on {
      display: flex;
      justify-content: space-evenly;

      .user-img {
        width: 418px;
        height: 330px;
        border-radius: 20px;
        background-image: url('/@/assets/images/bg-yl.png');
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .font-white {
          font-size: 26px;
          font-weight: 500;
          color: #f9f9f9;
        }
      }

      .user-region {
        width: 1125px;
        height: 326px;
        background: #f9f9f9;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .font-prompt {
          font-size: 20px;
          color: #767676;
        }

        .prompt-region {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 500;
          color: #3d3d3d;
        }

        .prompt-gold {
          margin-top: 20px;
          font-size: 30px;
          font-weight: 700;
          color: #3d3d3d;
        }
      }
    }

    .content-bottom {
      display: flex;
      margin-top: 20px;
    }
  }
</style>
