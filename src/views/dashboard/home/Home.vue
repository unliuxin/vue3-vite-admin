<template>
  <div class="home-box">
    <div class="header-box">
      <div class="logo-box">
        <img class="logo" src="@/assets/images/home/logo.png" />
        <img class="logo-text" src="@/assets/images/home/logo-text.png" alt="" />
      </div>
      <div class="login-box">
        <a-button
          v-if="!state.userInfo.mobile"
          type="primary"
          shape="round"
          size="large"
          @click="loginClick"
          >登录</a-button
        >
        <div v-else>
          <a-button
            type="primary"
            shape="round"
            size="large"
            @click="() => router.push({ path: '/userAdmin/mypayorder' })"
            >订单中心</a-button
          >
          <div class="user-box">
            <img src="@/assets/images/home/logo.png" />
            <Dropdown :overlayStyle="{ width: '190px' }" overlayClassName="menu-box">
              <span class="user-name" @click.prevent>
                {{ state.userInfo.real_name || state.userInfo.mobile }}
                <DownOutlined />
              </span>
              <template #overlay>
                <Menu>
                  <MenuItem>
                    <div class="name-item">
                      <img src="@/assets/images/home/logo.png" alt="" />
                      <span>{{ state.userInfo.mobile }}</span>
                    </div>
                    <div class="authentication" @click="navTo('realname')">
                      <span>未认证</span>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div class="login-out" @click="openOutModal = true">
                      <div class="button">
                        <img src="@/assets/images/home/login-out.png" alt="" />
                        <span>退出登录</span>
                      </div>
                    </div>
                  </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-box">
      <div class="content-box">
        <div class="text1">AI数字人</div>
        <div class="text2">打造视频运营新模式</div>
        <div class="text3">定制数字人专属IP创造无限商业价值</div>
        <a-button class="experience-btn" type="primary" shape="round" size="large"
          >立即体验</a-button
        >
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-title">
        <div class="text1">通过智能AI技术实现自动生成视频与虚拟人直播</div>
        <div class="text2"
          >数字人提供短视频、直播等不同优势套餐，适用对象:需要制作视频、做直播的各行业企业或个人</div
        >
      </div>
      <div class="list-box">
        <div class="content-box" v-for="item in state.mealList" :key="item.id">
          <!-- 类型 -->
          <div class="type" :class="item.id === 1 || item.id === 2 ? '' : 'bg2'">
            <span>{{ item.typeText }}</span>
          </div>

          <h1>{{ item.title }}</h1>
          <div class="describe">{{ item.description }}</div>
          <!-- 产品亮点、套餐 -->
          <div class="product-box">
            <div class="title">{{ item.introduce.name }}</div>
            <div class="introduce" v-for="(v, i) in item.introduce.content" :key="i">
              <CheckOutlined :style="{ color: item.introduce.iconColor || '#0B7CFF' }" />
              <span class="text">{{ v.text }}</span>
            </div>
          </div>
          <!-- 价格 -->
          <div class="price-box">
            <div class="price">
              <span class="text">￥</span>
              <span class="num">{{ item.price }}</span>
              <span class="text">.00</span>
            </div>
            <div class="price-describe" v-if="item.id === 1">
              <span>优惠后￥0.00</span>
            </div>
          </div>
          <!-- 免费体验 -->
          <div class="experience" v-if="item.id === 1">
            <img src="@/assets/images/home/xingxing.svg" />
            <span>免费体验5分钟数字人小视频</span>
          </div>
          <!-- 按钮 -->
          <div class="btn-box">
            <div v-if="item.id === 1" class="free-btn">立即咨询</div>
            <div v-else class="vip-btn">
              <div>资讯</div>
              <div :style="item.btnStyle" @click="navTo('gooddetail')">立即购买</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 数字人产品亮点 -->
    <Feature />
    <!-- 数字人应用场景 -->
    <Application />
    <!-- 数字人产品功能 -->
    <Product />
    <!-- 常见问题 -->
    <Question />
    <!-- 底部 -->
    <Bottom />

    <!-- 退出弹框 -->
    <Modal v-model:visible="openOutModal" :width="400" @ok="loginOutClick">
      <div>是否退出</div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { CheckOutlined } from '@ant-design/icons-vue';
  import Feature from './components/Feature.vue';
  import Application from './components/Application.vue';
  import Product from './components/Product.vue';
  import Question from './components/Question.vue';
  import Bottom from './components/Bottom.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { router } from '/@/router';
  import { LoginStateEnum, useLoginState } from '../sys/login/useLogin';
  import { Dropdown, Menu, MenuItem, Modal } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { doLogout } from '/@/api/sys/user';
  import { RoleEnum } from '@/enums/roleEnum';
  import { reactive, ref } from 'vue';
  const { setLoginState, getUserType } = useLoginState();

  const userStore = useUserStore();

  interface List {
    id: 1 | 2 | 3 | 4; // 1: 免费，2：热销，3：爆款，4：专享
    title: string; // 标题
    description: string; // 标题下的描述
    introduce: {
      name: string; // 套餐名称
      iconColor?: string; // ico颜色
      content: {
        text: string; // 套餐名称
      }[];
    };
    price: number;
    btnStyle?: any; // 按钮样式
    typeText?: string; // 状态类型
  }
  const state = reactive<{
    mealList: List[]; // 套餐列表
    userInfo: {
      mobile: string; // 手机号
      real_name: string; // 实名
    };
    userType: RoleEnum;
  }>({
    mealList: [
      {
        id: 1,
        title: '数字人小视频-5分钟',
        description: '免费体验、快速配置一键快速生成数字人小视频',
        introduce: {
          name: '产品亮点',
          iconColor: '#0B7CFF',
          content: [
            { text: '免费体验' },
            { text: '快速配置专属数字人小视频' },
            { text: '5分钟视频合成' },
          ],
        },
        price: 100,
        typeText: '免费',
      },
      {
        id: 2,
        title: '数字人小视频-基础版',
        description: '无需布置场地随时随地可以生成2D超写实数字人小视频，无需真人出镜，节省时间',
        introduce: {
          name: '套餐包含:',
          iconColor: '#04958A',
          content: [
            { text: '180分钟视频合成时长' },
            { text: '2个默认2D超写实数字人' },
            { text: '视频制作合成平台，助力生成数字人小视频' },
          ],
        },
        price: 2500,
        typeText: '热销',
        btnStyle: {
          background: '#04958A',
        },
      },
      {
        id: 3,
        title: '数字人直播-高阶版',
        description: '开启7*24小时数字人直播每分每秒帮你赚钱让直播带货、娱乐直播无忧',
        introduce: {
          name: '套餐包含:',
          iconColor: '#4F46E5',
          content: [
            { text: '2个默认2D超写实数字人' },
            { text: '企业可自助编辑内容、灵活高效' },
            { text: '真人驱动数字人进行直播，让直播内容更新颖' },
          ],
        },
        price: 5500,
        typeText: '爆款',
        btnStyle: {
          background: '#4F46E5',
        },
      },
      {
        id: 3,
        title: '数字人形象-形象定制',
        description: '满足各类需求场景，个性化定制专属于您的数字人',
        introduce: {
          name: '套餐包含:',
          iconColor: '#D97706',
          content: [
            { text: '专业高效快速定制超写实数字分身' },
            { text: '行业领先技术保障效果自然逼真' },
            { text: '形象可灵活应用于视频制作和直播等' },
          ],
        },
        price: 8000,
        typeText: '专享',
        btnStyle: {
          background: 'linear-gradient(316deg, #FF4B38 0%, #FF8538 100%) !important',
        },
      },
    ],
    userInfo: {
      mobile: userStore.getUserInfo.mobile || '',
      real_name: userStore.getUserInfo.real_name || '',
    },
    userType: getUserType.value,
  });

  const openOutModal = ref(false);

  const loginClick = () => {
    router.push({ path: '/login' });
    setLoginState(LoginStateEnum.LOGIN);
  };

  // 退出登录
  const loginOutClick = async () => {
    const res = doLogout();
    if (res.code === 1) {
      router.push({ path: '/home' });
    }
  };
  const navTo = (name) => {
    if (name == 'realname') {
      router.push({ path: '/home/realname' });
    }
    if (name == 'gooddetail') {
      router.push({ path: '/home/gooddetail' });
    }
  };
</script>

<style scoped lang="less">
  .home-box {
    width: 100%;
    // height: 300px;
    background-color: #fafafa;

    .header-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 0;
      padding-left: 50px;
      padding-right: 50px;

      .logo-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .logo {
          width: 60px;
          height: 60px;
        }

        .logo-text {
          width: 80px;
          // height: 12px;
          margin-left: 13px;
        }
      }
      // 登入模块
      .login-box {
        button {
          color: #ffffff;
          background: #0b7cff;
          font-size: 24px;
          font-weight: bold;
          // padding-top: 15px;
          // padding-bottom: 15px;
          min-width: 120px;
          min-height: 65px;
          font-family: 'SOURCEHANSANSSC-BOLD';
        }

        > div {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .user-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 66px;

            > img {
              width: 65px;
              height: 65px;
              margin-right: 24px;
            }

            .user-name {
              font-size: 16px;
              color: #282c30;
              cursor: pointer;
            }
          }
        }
      }
    }

    .banner-box {
      position: relative;
      width: 100%;
      height: 980px;
      background: url('@/assets/images/home/head-bg.png') no-repeat;
      background-size: 100% 100%;

      .content-box {
        position: absolute;
        color: #ffffff;
        bottom: 102px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        .text1 {
          font-size: 72px;
          font-family: 'SOURCEHANSANSSC-BOLD';
        }

        .text2 {
          font-size: 50px;
          font-family: 'SOURCEHANSANSSC-MEDIUM';
          margin-top: 17px;
        }

        .text3 {
          font-size: 24px;
          font-family: 'SOURCEHANSANSSC-MEDIUM';
          margin-top: 25px;
        }

        .experience-btn {
          background: #0b7cff;
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          font-family: 'SOURCEHANSANSSC-BOLD';
          padding-top: 0;
          height: 65px;
          min-width: 168px;
          margin-top: 40px;
        }
      }
    }

    .menu-list {
      // cursor: pointer;
      width: 100%;
      background-color: #fafafa;
      padding-top: 100px;
      padding-bottom: 100px;

      .menu-title {
        width: 100%;
        text-align: center;

        .text1 {
          font-size: 36px;
          color: #1a1a1a;
          font-family: 'SOURCEHANSANSSC-BOLD';
        }

        .text2 {
          font-family: 'SOURCEHANSANSSC-MEDIUM';
          font-size: 24px;
          color: #767676;
          margin-top: 30px;
          padding-bottom: 60px;
        }
      }

      .list-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 360px;
        padding-right: 360px;

        .content-box {
          position: relative;
          width: 290px;
          height: 500px;
          background-color: #ffffff;
          padding: 0 20px;
          padding-bottom: 32px;
          border-radius: 10px;
          box-sizing: border-box;

          h1 {
            color: #1a1a1a;
            font-size: 24px;
            padding-top: 60px;
            font-family: 'SOURCEHANSANSSC-BOLD';
            font-weight: bold;
          }

          .type {
            position: absolute;
            right: 0;
            top: 0;
            width: 85px;
            height: 30px;
            background: linear-gradient(293deg, #0b7cff 0%, #0baaff 100%);
            border-radius: 0px 10px 0px 10px;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            color: #ffffff;

            &.bg2 {
              background: linear-gradient(43deg, #fc7175 0%, #ff9e5b 100%);
            }
          }

          .describe {
            font-size: 14px;
            color: #282c30;
            font-family: 'SOURCEHANSANSSC-REGULAR';
            margin-top: 8px;
          }
          // 产品亮点
          .product-box {
            color: #292d31;
            margin-top: 36px;

            .title {
              font-size: 16px;
              font-weight: 500;
              font-family: 'SOURCEHANSANSSC-MEDIUM';
              margin-bottom: 5px;
            }

            .introduce {
              margin-bottom: 2px;
              vertical-align: middle;

              > .text {
                margin-left: 12px;
                color: #2f3337;
                font-size: 14px;
              }
            }
          }
          // 价格
          .price-box {
            display: flex;
            justify-content: flex-start;
            // justify-items: bottom;
            .price {
              color: #3d3d3d;
              font-weight: bold;
              font-family: 'SOURCEHANSANSSC-REGULAR';

              .text {
                font-size: 14px;
              }

              .num {
                font-size: 36px;
              }
            }

            .price-describe {
              color: #e6b383;
              font-size: 14px;
              font-weight: bold;
              margin-left: 12px;
              position: relative;
              width: 40%;

              > span {
                position: absolute;
                bottom: 6px;
                left: 0;
                right: 0;
              }
              // line-height: 50px;
            }
          }
          // 体验
          .experience {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 227px;
            background-color: #f0f2fa;
            height: 35px;
            line-height: 35px;
            margin-top: 6px;

            span {
              font-size: 14px;
              color: #0b7cff;
              font-family: 'SOURCEHANSANSSC-MEDIUM';
              margin-top: 6px;
            }
          }
          // 按钮
          .btn-box {
            position: absolute;
            bottom: 32px;
            width: 250px;
            left: 50%;
            transform: translateX(-50%);

            > .free-btn {
              width: 100%;
              background-color: #f5f5f6;
              color: #282c30;
              height: 50px;
              line-height: 50px;
              text-align: center;
              margin-top: 37px;
              border-radius: 5px;
              font-family: 'SOURCEHANSANSSC-MEDIUM';
              cursor: pointer;
            }

            .vip-btn {
              display: flex;
              justify-content: space-between;
              align-items: center;

              > div {
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-family: 'SOURCEHANSANSSC-MEDIUM';
                border-radius: 5px;
                cursor: pointer;

                &:first-child {
                  width: 30%;
                  background-color: #f5f5f6;
                }

                &:last-child {
                  width: 60%;
                  // background-color: #04958A;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
    }
  }

  .menu-box {
    text-align: center;

    .name-item {
      color: #282c30;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 30px !important;
        height: 30px !important;
      }

      span {
        margin-left: 13px;
      }
    }

    .authentication {
      text-align: center;
      color: #767676;
      font-size: 14px;
      margin-top: 8px;

      > span {
        display: inline-block;
        padding: 3px 16px;
        background-color: #f2f3f5;
      }
    }

    .login-out {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;

      .button {
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
          width: 24px;
          height: 24px;
        }

        > span {
          margin-left: 10px;
          color: #282c30;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
</style>
