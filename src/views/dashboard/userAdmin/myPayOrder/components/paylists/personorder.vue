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
      <MyTable
        v-if="tableList[activeTab].name == '全部'"
        :columns="columnData"
        :data="alldata"
      ></MyTable>
      <MyTable
        v-if="tableList[activeTab].name == '待支付'"
        :columns="columnData"
        :data="waitPayData"
      ></MyTable>
      <MyTable
        v-if="tableList[activeTab].name == '已支付'"
        :columns="columnData"
        :data="finishPayData"
      ></MyTable>
      <MyTable
        v-if="tableList[activeTab].name == '已关闭'"
        :columns="columnData"
        :data="closeData"
      ></MyTable>
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
      title: '产品名称',
      dataIndex: 'goodsname',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '数字人席位',
      dataIndex: 'digitalseat',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
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
  //全部
  let alldata = reactive([
    {
      key: '1',
      goodscode: '12873636536',
      goodsname: '套餐1',
      username: '李四11111',
      phone: '154664456',
      digitalseat: 20,
      price: 5000,
      status: '待支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: '2',
      goodscode: '12873636536',
      goodsname: '套餐1',
      username: '王五11111',
      phone: '154664456',
      digitalseat: 20,
      price: 4000,
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: '3',
      goodscode: '12873636536',
      goodsname: '套餐1',
      username: '埃霍夫大锅饭',
      phone: '154664456',
      digitalseat: 20,
      price: 4000,
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: '4',
      goodscode: '2222636536',
      goodsname: '高精度',
      username: '王五11111',
      phone: '154664456',
      digitalseat: 9,
      price: 3000,
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: '5',
      goodscode: '12873636536',
      goodsname: '套餐1',
      username: '埃霍夫大锅饭',
      phone: '154664456',
      digitalseat: 20,
      price: 4000,
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
    {
      key: '6',
      goodscode: '2222636536',
      goodsname: '高精度',
      username: '王五11111',
      phone: '154664456',
      digitalseat: 9,
      price: 3000,
      status: '已支付',
      createTime: '23-08-23 12:23:00',
    },
  ]);
  const changeTabList = (index) => {
    activeTab.value = index;
  };
  //已关闭数据  closeData
  //超过5分钟未支付，状态改为"已关闭"
  // const changeStatus = (item) => {
  //   return new Promise((resolve) => {
  //     if (item.status === '待支付') {
  //       let timer = setTimeout(() => {
  //         item.status = '已关闭';
  //         // console.log('status', item.status);
  //         resolve(item);
  //         clearTimeout(timer);
  //       }, 10000);
  //     } else {
  //       resolve(item);
  //     }
  //   });
  // };
  // Promise.all(alldata.map(changeStatus)).then((dataList) => {
  //    console.log('初始数据', dataList);
  //   // 渲染初始的 dataList
  //   const waitPayData = dataList.filter((v) => v.status == '待支付');
  //   const finishPayData = dataList.filter((v) => v.status == '已支付');
  //   const closeData = dataList.filter((v) => v.status === '已关闭');

  //   const allData = [...waitPayData, ...finishPayData, ...closeData];

  // });
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
