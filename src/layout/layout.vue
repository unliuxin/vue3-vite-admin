<template>
  <Layout class="layout-container">
    <Layout.Sider theme="light" v-model:collapsed="collapsed" collapsible @collapse="onCollapse">
      <div class="logo" />
      <Menu mode="inline" @select="onSelect" class="sider-menu">
        <Menu.Item v-for="(item, index) in menuItems" :key="item.path">
          <TAntdIcon :icon="item?.icon" />
          <span>{{ item.meta?.title }}</span>
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
import { computed, ref } from 'vue';
import { Layout, Menu, Spin } from 'ant-design-vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { MenuType } from '/@/models/common';
import { useMenuStore } from '@/store/modules/menu';
import TAntdIcon from '@/components/t-ant-icon/index.vue'
import LayoutHeader from './layout-header.vue';

const collapsed = ref<boolean>(false)
const router = useRouter();

const onCollapse = () => { }

const onSelect = ({ key }: any) => {
  router.push(key);
};

const menuItems = computed(() => {
  return useMenuStore().menuList?.filter((item) => !item.hideMenu)
})

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