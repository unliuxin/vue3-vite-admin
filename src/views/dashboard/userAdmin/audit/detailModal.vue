<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { Form, Modal } from 'ant-design-vue'

  withDefaults(defineProps<{
    detailVisible: boolean
  }>(), {
    detailVisible: false
  })

  defineEmits<{
    (e: 'update:detailVisible', show: false):void
  }>()

  const detailTab = reactive([
    {
      name: '审核'
    },
    {
      name: '训练'
    }
  ])
  // 审核or训练
  const activeIndex = ref<number>(0)

  // 是否审核
  const isAudit = ref<boolean>(true)

  const hChangeTab = (index:number) => {
    activeIndex.value = index
    if (detailTab[index].name === '审核') {
      isAudit.value = true
    } else {
      isAudit.value = false
    }
  }
</script>

<template>
  <Modal
    v-model:visible="detailVisible"
    title="详情"
    width="50%"
    :footer="null"
    @cancel="$emit('update:detailVisible', false)"
  >
    <div class="tabs content">
      <div
        class="tab"
        v-for="(item, index) in detailTab"
        :key="item.name"
        :class="{ active: activeIndex === index }"
        @click="hChangeTab(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div v-if="isAudit">
      <div class="content">
        <div class="title">基础信息</div>
        <div class="form">
          <Form.Item label="订单">
            193676872554
          </Form.Item>
          <Form.Item label="提交时间">
            193676872554
          </Form.Item>
          <Form.Item label="预约名称">
            193676872554
          </Form.Item>
          <Form.Item label="预约电话">
            193676872554
          </Form.Item>
          <Form.Item label="影楼名称">
            193676872554
          </Form.Item>
          <Form.Item label="影楼电话">
            193676872554
          </Form.Item>
          <Form.Item label="拍摄组数">
            193676872554
          </Form.Item>
          <Form.Item label="模特名称">
            193676872554
          </Form.Item>
        </div>
      </div>
      <div class="content">
        <div class="title">视频信息</div>
        <div class="form">
          <Form.Item label="训练视频">
            193676872554
          </Form.Item>
          <Form.Item label="百度网盘">
            193676872554
          </Form.Item>
          <Form.Item label="形象授权">
            193676872554
          </Form.Item>
        </div>
      </div>
      <div class="content">
        <div class="title">用户审核详情</div>
        <div class="form">
          <Form.Item label="审核状态">
            审核通过
          </Form.Item>
          <Form.Item label="审核时间">
            23-05-06 12:23:00
          </Form.Item>
          <Form.Item label="审核意见">
            193676872554
          </Form.Item>
        </div>
      </div>
      <div class="content">
        <div class="title">平台审核详情</div>
        <div class="form">
          <Form.Item label="审核状态">
            已驳回
          </Form.Item>
          <Form.Item label="审核时间">
            23-05-06 12:23:00
          </Form.Item>
          <Form.Item label="审核意见">
            拍摄角度有问题
          </Form.Item>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="content">
        <div class="title">基础信息</div>
        <div class="form">
          <Form.Item label="订单">
            193676872554
          </Form.Item>
          <Form.Item label="提交时间">
            23-05-06 12:23:00
          </Form.Item>
          <Form.Item label="训练状态">
            已完成
          </Form.Item>
          <Form.Item label="完成时间">
            23-05-06 12:23:00
          </Form.Item>
        </div>
      </div>
      <div class="content">
        <div class="title">训练素材</div>
        <div class="form">
          <Form.Item label="训练视频">
            娜娜数字人.zip
          </Form.Item>
          <Form.Item label="百度网盘">
            链接：
          </Form.Item>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="less" scoped>
.tabs {
  display: flex;
  .tab {
    cursor: pointer;
    padding: 8px 16px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .tab + .tab {
    border-left: none;
  }
  .active {
    background-color: #000;
    color: #fff;
  }
}
  
.form {
  display: flex;
  flex-wrap: wrap;
  padding-left: 60px;
  .ant-form-item {
    width: 50%;
    margin-bottom: 0;
  }
}
.content {
  padding: 20px;
}
</style>