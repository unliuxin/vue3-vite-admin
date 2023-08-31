<template>
  <Modal v-model:visible="visible" :width="1300" :footer="null">
    <div class="package-list">
      <div class="list-left">
        <Image
          :width="576"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="list-right">
        <div class="title">{{ packageList.title }}</div>
        <div class="desc">{{ packageList.desc }}</div>
        <div class="account">
          <Space :size="24">
            <div class="list-title">单价</div>
            <div class="present"
              >￥<span class="bold">{{ packageList.presentPrice }}</span
              >虚拟币</div
            >
            <div class="original"
              >原价￥<span class="bold">{{ packageList.originalPrice }}</span
              >虚拟币</div
            >
          </Space>
        </div>
        <div class="rule">
          <Space :size="24">
            <div class="list-title">规格</div>
            <div class="rule-box">数字人形象</div>
          </Space>
        </div>
        <div class="pro-num">
          <Space :size="24">
            <div class="list-title">数量</div>
            <InputNumber id="inputNumber" v-model:value="stateParams.numValue" :min="1" :max="10" />
          </Space>
        </div>
        <div class="deal-price">
          <Space :size="24">
            <div class="list-title">成交价</div>
            <div class="price"><span>231</span>虚拟币</div>
          </Space>
        </div>
      </div>
    </div>
    <div class="buy-btn">
      <Button class="btn" shape="round" type="primary" @click="onBuy">立即购买</Button>
    </div>
    <Modal v-model:visible="buyVisible" @ok="handleOk">
      <div style="padding: 35px 0">
        <Form
          ref="formRef"
          :model="buyParams"
          :rules="rules"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 13 }"
        >
          <Form.Item label="类型" name="buyType">
            <Select ref="select" v-model:value="buyParams.buyType" style="width: 120px">
              <Select.Option v-for="(item, index) in typeSelect" :key="index" :value="item.value">{{
                item.name
              }}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="用户手机号" name="tel">
            <Input v-model:value="buyParams.tel" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  </Modal>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import {
    Space,
    Modal,
    Button,
    InputNumber,
    message,
    Form,
    Input,
    Select,
    Image,
  } from 'ant-design-vue';

  const visible = ref<boolean>(false);
  const buyVisible = ref<boolean>(false);
  const formRef = ref();

  const emit = defineEmits(['buyCallBack']);
  const packageList = ref<any>({
    title: '购买数字人',
    desc: '基于数字人技术，客户可以利用数字人，快速通过配置一键快速生成视频，可以快速搭建虚拟直播间，无需真人出镜，无需设备，无需场地。',
    rule: '数字人形象',
    num: 1,
    originalPrice: '8000',
    presentPrice: '1000',
    discount: '7.8',
  });

  const rules: any = {
    tel: [{ required: true, message: '请输入用户手机号', trigger: 'change' }],
    buyType: [{ required: true, message: '请选择类型', trigger: 'change' }],
  };
  const stateParams = reactive({
    numValue: 1,
  });

  const buyParams = reactive({
    buyType: '',
    tel: '',
  });

  const typeSelect = reactive([
    {
      name: '买给自己',
      value: 'self',
    },
    {
      name: '买给他人',
      value: 'other',
    },
  ]);
  // 获取套餐数据
  const getData = () => {};

  // 立即购买
  const onBuy = () => {
    buyVisible.value = true;
  };

  const onOpenModal = () => {
    visible.value = true;
    getData();
  };

  const handleOk = () => {
    formRef.value
      .validate()
      .then(() => {
        message.success('消耗XXX虚拟币，购买成功');
        emit('buyCallBack');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  defineExpose({
    onOpenModal,
  });
</script>

<style scoped lang="less">
  .package-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0;

    .list-left {
      width: 576px;
      margin-right: 80px;
    }

    .list-right {
      width: 450px;

      .list-title {
        font-size: 20px;
        color: #3d3d3d;
        font-weight: 500;
      }

      .title {
        font-weight: 700;
        font-size: 26px;
        margin-bottom: 24px;
        color: #3d3d3d;
      }

      .desc {
        font-size: 20px;
        margin-bottom: 24px;
        font-weight: 400;
        color: #3d3d3d;
      }

      .account {
        margin-bottom: 24px;

        .present {
          font-weight: 500;
          color: #0b7cff;
          font-size: 30px;
        }

        .original {
          text-decoration: line-through;
          font-weight: 400;
          color: #cccccc;
          font-size: 16px;
        }
      }

      .rule {
        margin-bottom: 24px;

        .rule-box {
          background: #f4f4f4;
          border-radius: 40px 40px 40px 40px;
          font-size: 20px;
          color: #3d3d3d;
          font-weight: 500;
          padding: 14px 21px;
        }
      }

      .deal-price {
        .price {
          font-size: 30px;
          font-weight: 500;
          color: #ff5d5d;
        }
      }
    }
  }

  .buy-btn {
    text-align: center;
    padding-bottom: 45px;

    .btn {
      background: #ff5d5d;
      border: none;
    }
  }
</style>
