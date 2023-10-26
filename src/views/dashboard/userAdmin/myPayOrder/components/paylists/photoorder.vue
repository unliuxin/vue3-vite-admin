<template>
  <div class="mypay">
    <div class="mypay-header">
      <ul>
        <li
          v-for="(v, index) in tableList"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="changeTabList(index)"
        >
          {{ v.name }}
        </li>
      </ul>
    </div>
    <div class="mypay-content">
      <MyTable v-if="tableList[activeTab].name == '全部'" :columns="columnData" :data="alldata" />
      <MyTable v-if="tableList[activeTab].name == '待支付'" :columns="columnData" :data="alldata" />
      <MyTable v-if="tableList[activeTab].name == '已支付'" :columns="columnData" :data="alldata" />
      <MyTable v-if="tableList[activeTab].name == '已关闭'" :columns="columnData" :data="alldata" />
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import MyTable from './mytable.vue';

  const tableList = reactive([
    {
      name: '全部',
    },
    {
      name: '待支付',
    },
    {
      name: '已支付',
    },
    {
      name: '已关闭',
    },
  ]);
  const activeTab = ref(0);
  //列
  const columnData = reactive([
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'goodscode',
      align: 'center',
    },
    {
      title: '预约名称',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '拍摄组数',
      dataIndex: 'photonnums',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: '影楼名称',
      dataIndex: 'movieFloor',
      align: 'center',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
    },
  ]);
  //表数据
  const alldata = reactive([
    {
      key: 1,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 2,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '待支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 3,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 4,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '待支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 5,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 6,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '待支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 7,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: 8,
      goodscode: '12873636536',
      username: '李四11111',
      phone: '154664456',
      photonnums: 10,
      price: 2000,
      movieFloor: '天虹',
      status: '待支付',
      createTime: '23-08-23 12:23:00',
    },
  ]);

  const changeTabList = (index) => {
    activeTab.value = index;
  };
</script>
<style lang="less" scoped>
  .mypay {
    .mypay-header {
      ul {
        display: flex;
        background: #ffff;
        width: 320px;
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
