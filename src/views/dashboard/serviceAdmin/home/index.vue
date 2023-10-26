<template>
  <div class="home-page">
    <Card style="margin: 24px; border-radius: 10px">
      <div class="home-page-header">
        <div class="header-left">
          <Avatar :size="64">U</Avatar>
          <div class="user-name">{{ state.real_name }}</div>
        </div>
        <div class="header-right">
          <div class="box-left">
            <div class="box"
              ><span class="box-span">我的级别</span><span>{{ state.grade_level }}级</span></div
            >
            <div class="box"
              ><span class="box-span">我的邀请码</span><span>{{ state.rd_code }}</span></div
            >
          </div>
          <div class="box-right">
            <div class="box coin">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  margin-bottom: 47px;
                "
              >
                <div class="box-span">我的虚拟币</div
                ><Button @click="onRecharge" shape="round" type="primary">
                  <template #icon>
                    <LeftOutlined />
                  </template>
                  充值</Button
                ></div
              >
              <div style="display: block; margin: 0 auto">{{ state.money }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div class="home-page-content">
      <Card style="border-radius: 10px">
        <template #title>
          <div class="card-title">数据统计</div>
        </template>

        <div class="content-left">
          <div class="card-box">
            <div class="card-box-num" style="color: #ff7300" @click="onJump('')"
              >{{ state.invite_user_num
              }}<Tooltip placement="top">
                <template #title>
                  <span> 邀请总用户数：被邀请成为用户的总人数，点击后跳转至“我的用户”页</span>
                </template>
                <InfoCircleOutlined :style="{ fontSize: '24px', marginLeft: '4px' }" /> </Tooltip
            ></div>
            <div
              ><span>邀请总用户数</span
              ><RightOutlined :style="{ color: '#767676', marginRight: '4px' }"
            /></div>
          </div>

          <div class="card-box">
            <div class="card-box-num" @click="onJump('')"
              >{{ state.invite_grade_num
              }}<Tooltip placement="top">
                <template #title>
                  <span
                    >成为服务商总人数：被邀请成为服务商的总人数，点击后跳转至“我邀请的服务商”页</span
                  >
                </template>
                <InfoCircleOutlined :style="{ fontSize: '24px', marginLeft: '4px' }" /> </Tooltip
            ></div>
            <div
              ><span>成为服务商人数</span
              ><RightOutlined :style="{ color: '#767676', marginRight: '4px' }"
            /></div>
          </div>

          <div class="card-box">
            <div class="card-box-num" @click="onJump('')"
              >{{ state.goods_num
              }}<Tooltip placement="top">
                <template #title>
                  <span
                    >我拥有数字人：目前未被转增的数字人库存数，点击后跳转到“我的数字人-我拥有”页签</span
                  >
                </template>
                <InfoCircleOutlined :style="{ fontSize: '24px', marginLeft: '4px' }" /> </Tooltip
            ></div>
            <div
              ><span>我拥有数字人</span
              ><RightOutlined :style="{ color: '#767676', marginRight: '4px' }"
            /></div>
          </div>

          <div class="card-box">
            <div class="card-box-num" @click="onJump('')"
              >{{ state.give_goods_num
              }}<Tooltip placement="top">
                <template #title>
                  <span
                    >已转增数字人：包括购买数字人时直接转增、从数字人库存中转增的数字人总数，点击后跳转到“我的数字人-已转增”页签</span
                  >
                </template>
                <InfoCircleOutlined :style="{ fontSize: '24px', marginLeft: '4px' }" /> </Tooltip
            ></div>
            <div
              ><span>已转赠数字人</span
              ><RightOutlined :style="{ color: '#767676', marginRight: '4px' }"
            /></div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { Card, Avatar, Tooltip, Button, message } from 'ant-design-vue';
  import { InfoCircleOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import { GradeResponse } from '/@/api/service/model/service';
  import { getStatistics } from '/@/api/service/home';
  const state = reactive<GradeResponse>({
    id: null,
    real_name: '用户甲',
    grade_id: null,
    grade_level: '6',
    rd_code: '12',
    money: '1000',
    invite_user_num: 123,
    invite_grade_num: 456,
    goods_num: 125,
    give_goods_num: 548,
    url: '',
  });
  const onJump = (url) => {
    // 跳转url 点击邀请总用户数：跳转到我的用户页面
    console.log(url);
  };

  const query = async () => {
    const res = await getStatistics();
    console.log(res);
  };

  const onRecharge = () => {
    message.warning('请联系客服进行充值');
  };
  onMounted(() => {
    query();
  });
</script>
<style scoped lang="less">
  .home-page {
    .home-page-header {
      display: flex;

      .header-left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-right: 1px solid #eee;
        width: 420px;
        height: 330px;
        padding: 75px 0;
        background: linear-gradient(138deg, #0b7cff 0%, #23c1ff 100%);
        border-radius: 20px 20px 20px 20px;

        .user-name {
          font-size: 26px;
          color: #ffffff;
          margin-top: 37px;
        }
      }

      .header-right {
        display: flex;
        flex-wrap: wrap;
        margin-left: 25px;

        .box-right {
          margin-left: 24px;

          .box {
            height: 330px;
          }

          .coin {
            align-items: baseline;
            padding-top: 40px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        }

        .box {
          width: 548px;
          height: 143px;
          background: #f9f9f9;
          border-radius: 10px 10px 10px 10px;

          margin-bottom: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          font-size: 36px;
          font-weight: 700;
          color: #3d3d3d;

          .box-span {
            margin-right: 14px;
            color: #767676;
            font-size: 20px;
            font-weight: 400;
          }
        }
      }
    }

    .home-page-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 24px;

      :deep(.ant-card) {
        width: 100%;

        .card-title {
          font-size: 26px;
          font-weight: 700;
          color: #3d3d3d;
          border-left: 6px solid #0b7cff;
          padding-left: 14px;
        }

        .ant-card-head {
          border-bottom: none;
        }
      }

      .content-left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        .card-box {
          background: #f9f9f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 23%;
          height: 407px;
          margin-bottom: 24px;
          color: #767676;
          font-size: 20px;
          margin-right: 30px;

          .card-box-num {
            margin-bottom: 16px;
            font-size: 36px;
            font-weight: 700;
            color: #3d3d3d;
          }
        }
      }
    }
  }
</style>
