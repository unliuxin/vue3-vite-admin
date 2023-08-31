<!-- 我的数字人首页 -->
<template>
  <div class="myperson">
    <div class="content-sum bgcolor">
      <div class="myperson-header">
        <div class="textLeft">
          <p

            ><span>数字人席位:</span> 共计<span>{{ state.total }}</span
            >
            个</p
          >
        </div>
        <div class="textRight">
          <p>已使用: <span>0个</span></p>
          <p>剩余: <span>1个</span></p>
        </div>
      </div>

      <CardList :cards="groupedData.group0" class="cardlist"></CardList>
    </div>
    <div class="content-finish bgcolor content-sum">
      <div class="myperson-header headertextLeft">
        <p><span>训练完成:</span> <span>{{ groupedData.group1.length }}</span>个</p></div
      >

      <CardList :cards="groupedData.group1" class="cardlist"></CardList>
    </div>
    <div class="content-unfinish bgcolor content-sum">
      <div class="myperson-header headertextLeft">
        <p><span>训练中:</span> <span>{{ groupedData.group2.length }}</span>个</p></div
      >
      <CardList :cards="groupedData.group2" class="cardlist"></CardList>
    </div>
    <div class="record" @click="showTableDialog"><span>记录</span></div>
    <!-- 表格弹框 -->
    <TableDialog ref="showDialog" />
    <!-- 表单弹框 -->
    <FormDialog ref="showForm" />

  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue';
  import TableDialog from '../components/tabledialog.vue';
  // import FormDialog from '../components/formdialog.vue';
  import CardList from '../components/cardlist.vue';
  import { myPersonApi } from '@/api/userAdmin/person';
  import { MyPersonParams } from '@/api/userAdmin/model/personModel';

  const showDialog = ref();
  // const showForm = ref();
  const query = reactive<MyPersonParams>({
    page: 1,
    pageSize: 10,
    status: -1,
  });
  
  const state = reactive({
    total: 0,
    current_page: 0,
    list: [] as any,
  });

  //显示表格弹框组件
  const showTableDialog = () => {
    showDialog.value.open();
  };
  //调接口
  const getMyPersonData = async () => {
    const res = await myPersonApi(query);
    // console.log('111', res.data);
    state.total = res.data.total;
    state.list = res.data.data;
    console.log('2222', state.list);
  };
  //根据status 加不同的背景和name
  const processedList = computed(() => {
    return state.list.map((item) => {
      if (item.status == 0) {
        return {
          ...item,
          imgPath: '/src/assets/images/myorder/listimg1.png',
          btnName: '去定制',
        };
      }
      if (item.status == 1) {
        return {
          ...item,
          imgPath: '/src/assets/images/myorder/listimg1.png',
          btnName: '下载',
        };
      }
      if (item.status == 2) {
        return {
          ...item,
          imgPath: '/src/assets/images/myorder/listimg2.png',
          btnName: '训练中',
        };
      }
      return item;
    });
  });
  //根据不同的status过滤该状态的数据
  const groupedData = computed(() => {
    const group0 = processedList.value.filter((item) => item.status === 0);
    const group1 = processedList.value.filter((item) => item.status === 1);
    const group2 = processedList.value.filter((item) => item.status === 2);
    return {
      group0,
      group1,
      group2,
    };
  });

  onMounted(() => {
    getMyPersonData();
  });
</script>
<style lang="less" scoped>
  .myperson {
    position: relative;
    padding-left: 16px;
    padding-top: 32px;
    padding-right: 16px;
    .bgcolor {
      background: #ffffff;
      border-radius: 10px;
    }
    .content-sum {
      padding: 20px;
      .myperson-header {
        width: 100%;
        height: 40px;
        background: #eef5ff;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          margin-bottom: 0;
        }
        .textLeft {
          margin-left: 23px;
          > p {
            font-size: 16px;
            font-weight: 400;
            color: #0b7cff;
            span:nth-of-type(1) {
              font-size: 20px;
              font-weight: 700;
              color: #1a1a1a;
            }
          }
        }
        .textRight {
          display: flex;
          font-size: 16px;
          font-weight: 500;
          color: #767676;
          margin-right: 30px;
          p:nth-of-type(1) {
            margin-right: 36px;
          }
        }
      }
    }
    .headertextLeft {
      padding-left: 23px;
      > p {
        font-size: 16px;
        font-weight: 400;
        color: #0b7cff;
        span:nth-of-type(1) {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
        }
      }
    }

    .content-finish {
      margin-top: 24px;
    }
    .content-unfinish {
      margin-top: 24px;
    }
    .record {
      bottom: 70px;
      right: 20px;
      position: fixed;
      border: 2px solid #ccc;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
</style>
