<template>
  <div class="paybox">
    <div class="mypay">
      <ul>
        <li
          v-for="(item, index) in tableLists"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="changeTabList(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="mypay-content">
      <component :is="tableLists[activeTab].component"></component>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import PersonOrder from './components/paylists/personorder.vue';
  import PhotoOrder from './components/paylists/photoorder.vue';
  const tableLists = [
    {
      name: '数字人订单',
      component: PersonOrder,
    },
    {
      name: '拍摄订单',
      component: PhotoOrder,
    },
  ];
  const activeTab = ref<number>(0);
  const changeTabList = (index) => {
    activeTab.value = index;
  };
</script>
<style lang="less" scoped>
  .paybox {
    margin: 32px 16px 32px 16px;
    padding: 20px;
    background: #fff;
    .mypay {
      ul {
        display: flex;
        background: #ffff;
        width: 160px;
        height: 30px;
        border: 1px solid #ccc;
        li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .active {
          background: black;
          color: #fff;
        }
      }
    }
  }
</style>
