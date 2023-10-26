<template>
  <Card>
    <h1 class="data-title">{{ title }}</h1>
    <div class="data-content">
      <div class="data-box" v-for="item of dataList" :key="item.key">
        <div>
          <div class="data-num" :class="{ orange: item.orange }">{{ item.num || 0 }}</div>
          <Popover placement="right">
            <template #content>
              <p>{{ item.promptText }}</p>
            </template>
            <template #title>
              <span>提示：</span>
            </template>
            <info-circle-filled style="color: #767676" v-if="item.prompt" />
          </Popover>
        </div>
        <div style="margin-top: 20px">
          <div class="data-name">{{ item.name }}</div>
          <right-outlined style="color: #767676" v-if="item.right" />
        </div>
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, Popover } from 'ant-design-vue';
  import { InfoCircleFilled, RightOutlined } from '@ant-design/icons-vue';
  defineProps({
    dataList: {
      type: Array,
      required: true,
    },
    title: { type: String, required: true },
  });
</script>
<style lang="less" scoped>
  .data-title {
    font-size: 26px;
    font-weight: 700;
    color: #3d3d3d;
    position: relative;
  }

  .data-title::before {
    content: '';
    background-color: #0b7cff;
    width: 6px;
    height: 26px;
    position: absolute;
    left: -1%;
    top: 22%;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  .data-content {
    display: flex;
    flex-wrap: wrap;

    .data-box {
      min-width: 360px;
      min-height: 196px;
      background: #f9f9f9;
      border-radius: 10px;
      flex: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .data-num {
        display: inline-block;
        font-size: 36px;
        font-weight: 700;
        color: #3d3d3d;
        vertical-align: sub;
      }

      .orange {
        color: #ff7300;
      }

      .data-name {
        display: inline-block;
        font-size: 20px;
        color: #767676;
      }
    }

    .data-box:nth-child(1) {
      margin-bottom: 20px;
      margin-right: 20px;
    }

    .data-box:nth-child(2) {
      margin-bottom: 20px;
    }

    .data-box:nth-child(3) {
      margin-right: 20px;
    }
  }
</style>
