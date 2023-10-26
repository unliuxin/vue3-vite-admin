<template>
  <div class="question-box">
    <div class="title1">数字人常见问题</div>
    <div class="title2">一些您在下单前可能有的疑问</div>
    <div class="content-box">
      <div class="collapse-box">
        <Collapse v-model:activeKey="activeKey">
          <!-- <template #expandIcon="{ isActive }">
            <CaretRightOutlined :rotate="isActive ? 90 : 0" />
          </template> -->
          <CollapsePanel :key="item.id" :showArrow="false" v-for="item in state.collapseList">
            <template #header>
              <div class="header-box">
                <div class="left">
                  <img src="@/assets/images/home/question.png" />
                  <span>{{ item.title }}</span>
                </div>
                <div>
                  <DownOutlined v-show="activeKey.indexOf('1') !== -1" />
                  <RightOutlined v-show="activeKey.indexOf('1') === -1" />
                </div>
              </div>
            </template>
            <div class="content">{{ item.content }}</div>
          </CollapsePanel>
          <!-- <CollapsePanel key="2" header="This is panel header 2">
            <p>{{ text }}</p>
          </CollapsePanel>
          <CollapsePanel key="3" header="This is panel header 3" collapsible="disabled">
            <p>{{ text }}</p>
          </CollapsePanel> -->
        </Collapse>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, reactive } from 'vue';
  import { CollapsePanel, Collapse } from 'ant-design-vue';
  import { DownOutlined, RightOutlined } from '@ant-design/icons-vue';
  const activeKey = ref(['1']);

  interface CollapseItem {
    id: string;
    title: string;
    content: string;
  }
  const state = reactive<{
    collapseList: CollapseItem[];
  }>({
    collapseList: [
      {
        id: '1',
        title: '如何定制数字人形象?',
        content:
          '定制数字人需要您提供一段符合要求的3-5分种的绿幕视频素材，我们根据素材来训练视频中的形象，训练好的模型可用于视频制作、虚拟直播等.',
      },
      {
        id: '2',
        title: '如何用数字人生成视频?',
        content:
          '主要有两种方式:a直接输入文案，选择您需要的AI配音，生成视烦:真人提前录音，在平台上传录音文件，生成原声视烦，所生成视频为通用格式，可导出用在所需场景。',
      },
      {
        id: '3',
        title: '如何用数字人进行直播?',
        content:
          '用户先登录平台，通过对直播背景，数字人主播、直播贴片，直播话术及其它直播素材的选择配置完成虚拟直播间搭建，然后设置好抖音或其它平台的直播地址，一键即可完成开播。',
      },
    ],
  });

  watch(activeKey, (val) => {
    console.log(val);
  });
</script>

<style scoped lang="less">
  .question-box {
    width: 100%;
    height: 1028px;
    background: linear-gradient(
      138deg,
      #ffffff 0%,
      #f5f5f6 0%,
      #f7f6fd 40%,
      #e4f5ff 68%,
      #ebedff 84%,
      rgba(245, 245, 246, 0) 100%
    );
    box-sizing: border-box;
    padding-top: 100px;

    .title1 {
      font-size: 36px;
      color: #1a1a1a;
      font-family: 'SOURCEHANSANSSC-BOLD';
      text-align: center;
      font-weight: bold;
    }

    .title2 {
      font-size: 24px;
      color: #767676;
      text-align: center;
      font-weight: 'SOURCEHANSANSSC-MEDIUM';
      margin-top: 30px;
      margin-bottom: 60px;
    }

    .content-box {
      width: 1024px;
      // min-height: 638px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      padding: 50px 0;

      .collapse-box {
        width: 650px;
        height: 100%;
        margin: 0 auto;

        .header-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            width: 70%;

            img {
              display: inline-block;
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }

            > span {
              text-align: left;
              margin-left: 10px;
              font-size: 24px;
              color: #1a1a1a;
              vertical-align: middle;
              font-family: 'SOURCEHANSANSSC-BOLD';
            }
          }
        }

        .content {
          font-size: 16px;
          color: #767676;
          padding-bottom: 32px;
          // padding-top: 20px;
        }
      }
    }
  }
</style>
