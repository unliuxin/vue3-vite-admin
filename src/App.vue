
<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
