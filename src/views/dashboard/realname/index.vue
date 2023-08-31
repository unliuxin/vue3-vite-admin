<template>
  <div class="real-name-page">
    <Card style="margin: 24px; border-radius: 10px">
      <div class="title">
        <IdcardOutlined :style="{ fontSize: '32px' }" />
        <span class="text">个人实名认证</span>
        <Button type="text"> <span class="btntext">返回</span></Button>
      </div>
      <div class="tip">
        <Row>
          <Col :xxl="16" :xl="20" :lg="24">
            <Alert
              type="warning"
              show-icon
              message="为了您的账号安全，平台将对未实名认证用户进行权益限制，建议您优先完成实名认证"
            />
          </Col>
        </Row>
      </div>

      <div class="form">
        <Form
          :model="formState.form"
          :label-col="formState.labelCol"
          :wrapper-col="formState.wrapperCol"
        >
          <Form.Item label="真实姓名">
            <Input v-model:value="formState.form.name" />
          </Form.Item>
          <Form.Item label="身份证号码">
            <Input v-model:value="formState.form.cardno" />
          </Form.Item>
          <Form.Item label="手机号码">
            <Button type="text">
              <span class="btntext">{{ formState.form.tel }}</span>
            </Button>
          </Form.Item>
          <Form.Item label="验证码">
            <Row>
              <Col :span="10">
                <Input v-model:value="formState.form.code" />
              </Col>
              <Col :span="8" :offset="1">
                <Button type="primary" @click="getCode">获取验证码</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item :wrapper-col="{ span: 14, offset: 4 }">
            <Button type="primary" @click="onSubmit">提交认证</Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { Card, Row, Col, Form, Button, Input } from 'ant-design-vue';
  import { IdcardOutlined } from '@ant-design/icons-vue';

  const formState = reactive({
    form: {
      cardType: 1, // 证件类型
      name: '', // 真实姓名
      cardno: '', // 证件号码
      area: [], // 所在地区
      tel: '13088848031', // 手机号码
      code: '', // 验证码
      isLook: '', // 阅读并同意
    },
    // form label配置
    labelCol: {
      // span: 2
      xxl: { span: 2 },
      xl: { span: 3 },
      lg: { span: 4 },
    },
    // form wrapper配置
    wrapperCol: {
      // span: 8
      xxl: { span: 10 },
      xl: { span: 10 },
      lg: { span: 16 },
    },
  });
  const query = async () => {};

  const onSubmit = () => {};
  const getCode = () => {};
  onMounted(() => {
    query();
  });
</script>
<style lang="less" scoped>
  .real {
    margin: 0px auto;
    width: 100%;
    max-width: 1200px;
    padding-top: 60px;

    .btntext {
      color: #40a9ff;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .text {
        margin: 0px 20px;
        font-size: 32px;
        line-height: 90px;
        font-weight: 500;
      }
    }

    .form {
      margin-top: 20px;

      .isLook {
        display: flex;
        width: 100%;

        p {
          white-space: nowrap;
          margin: 0;
          padding: 0;
        }

        .prot {
          color: #40a9ff;
        }
      }
    }
  }
</style>
