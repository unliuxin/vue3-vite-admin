<template>
  <Layout class="layout-container">
    <Layout.Sider theme="light" v-model:collapsed="collapsed" collapsible @collapse="onCollapse">
      <div class="logo" />
      <Menu mode="inline" @select="onSelect" class="sider-menu">
        <Menu.Item v-for="(item, index) in menus" :key="item.key">
          <TAntdIcon :icon="item.icon" />
          <span>{{ item.name }}</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
    <Layout>
      <Layout.Header style="background-color:#ffffff">
        <LayoutHeader />
      </Layout.Header>
      <Layout.Content class="content">
        <RouterView />
      </Layout.Content>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Layout, Menu, Spin } from 'ant-design-vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import TAntdIcon from '@/components/t-ant-icon/index.vue'
import LayoutHeader from './layout-header.vue';

const collapsed = ref<boolean>(false)
const router = useRouter();
const menus = ref<any>([
  {
    name: '系统管理',
    icon: 'BookOutlined',
    key: ''
  },
  {
    name: '平台管理',
    icon: 'CalendarOutlined',
    key: ''
  },
])

const onCollapse = () => { }

const onSelect = ({ key }: any) => {
  router.push(key);
};

</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  min-height: 100vh;

  .ant-layout-sider-light,
  .ant-menu {
    background-color: #fafafa;
  }

  .ant-menu-inline-collapsed {
    width: 50px;

    .ant-menu-item-group {
      .ant-menu-item {
        padding: 0 18px !important;
      }
    }
  }

  .content {
    padding: 10px;
  }
}
</style>