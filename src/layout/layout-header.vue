<template>
  <div class="header-page">
    <div>
      <Avatar>logo</Avatar>
    </div>
    <div class="right">
      <Space size="middle">
        <div>
          <Badge dot>
            <NotificationOutlined />
          </Badge>
        </div>
        <Avatar>头像</Avatar>
        <Popover v-model:visible="visiblePopover" trigger="click">
          <template #content>
            <Space direction="vertical">
              <div class="cursor">个人信息</div>
              <div class="cursor">退出登录</div>
            </Space>
          </template>
          <span>张三</span>
        </Popover>
      </Space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Avatar, Badge, Space, Popover } from 'ant-design-vue';
import { NotificationOutlined } from '@ant-design/icons-vue';

const visiblePopover = ref(false)
</script>

<style scoped lang="less">
.cursor {
  cursor: pointer;
}

.header-page {
  display: flex;
  justify-content: space-between;

  .right {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

}
</style>