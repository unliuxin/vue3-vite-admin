<template>
  <div class="real">
    <div class="title">
      <IdcardOutlined :style="{ fontSize: '32px' }" />
      <span class="text">个人实名认证</span>
      <Button type="text" @click="navTo('back')"> <span class="btntext">返回</span></Button>
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
        ref="formRef"
        :model="formState.form"
        :label-col="formState.labelCol"
        :wrapper-col="formState.wrapperCol"
        :rules="rules"
      >
        <Form.Item label="真实姓名" name="name">
          <Input v-model:value="formState.form.name" />
        </Form.Item>
        <Form.Item label="身份证号码" name="cardno">
          <Input v-model:value="formState.form.cardno" />
        </Form.Item>
        <Form.Item label="手机号码" name="tel">
          <Button type="text">
            <span class="btntext">{{ formState.form.tel }}</span>
          </Button>
        </Form.Item>
        <Form.Item label="验证码" name="code">
          <Row>
            <Col :span="10">
              <Input v-model:value="formState.form.code" />
            </Col>
            <Col :span="8" :offset="1">
              <Button v-if="formState.form.codeText" disabled type="primary" @click="getCode">
                {{ formState.form.codeText }}
              </Button>
              <Button v-else type="primary" @click="getCode">获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item :wrapper-col="{ span: 14, offset: 4 }" style="padding-top: 20px">
          <Button type="primary" @click="onSubmit">提交认证</Button>
        </Form.Item>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { certification, smsSend } from '/@/api/model/realname';
  import { onMounted, reactive, ref } from 'vue';
  import { Row, Col, Alert, Form, Input, Button } from 'ant-design-vue';
  import { IdcardOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  // console.log(userStore);
  const { createMessage } = useMessage();
  const formRef = ref();
  const formState = reactive({
    form: {
      cardType: 1, // 证件类型
      name: '', // 真实姓名
      cardno: '', // 证件号码
      area: [], // 所在地区
      tel: userStore.getUserInfo.mobile, // 手机号码
      code: '', // 验证码
      isLook: '', // 阅读并同意
      codeText: '', // 验证码文本
      codeTimer: '', // 验证码实例
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

  // 真实姓名验证规则
  let nameValidate = async (rule: RuleObject, value: string) => {
    // 为空时
    if (value === '') {
      return Promise.reject('请输入真实姓名');
    }
    // let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    let regName = /^[\u4e00-\u9fa5]*$/;
    // 不全为汉字时
    if (!regName.test(value)) {
      return Promise.reject('真实姓名格式错误');
    }
    let len = value.length;
    // 字符长度不在2-4时
    if (len == 1 || len > 4) {
      return Promise.reject('真实姓名必须在2-4个字符之间');
    }
  };
  // 身份证号码验证规则
  let cardnoValidate = async (rule: RuleObject, value: string) => {
    // 为空时
    if (value === '') {
      return Promise.reject('请输入身份证号码');
    }
    // 前17位号码全为数字
    if (value.length < 17 && isNaN(+value)) {
      return Promise.reject('身份证号码格式错误');
    }
    // 18位，且第十八位可为数字、X、x
    if (value.length >= 18) {
      let v = value.slice(0, 18);
      formState.form.cardno = v;
      let card =
        /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      if (!card.test(v)) {
        return Promise.reject('身份证号码格式错误');
      }
    }
  };
  // 验证码验证规则
  let codeValidate = async (rule: RuleObject, value: string) => {
    // 为空时
    if (value === '') {
      return Promise.reject('请输入验证码');
    }
    let v = value.slice(0, 4);
    formState.form.code = v;
    if (isNaN(+v)) {
      return Promise.reject('验证码格式错误');
    }
  };
  // 验证规则数组
  const rules = reactive({
    name: [
      // {
      //   required: true,
      //   max: 4,
      //   min: 2,
      //   tigger: 'blur',
      // },
      {
        required: true,
        validator: nameValidate,
      },
    ],
    cardno: [
      // {
      //   required: true,
      //   len: 18,
      //   tigger: 'blur',
      //   validator: cardnoValidate,
      // },
      {
        required: true,
        validator: cardnoValidate,
      },
    ],
    code: [
      // { required: true, len: 4, tigger: 'blur', type: 'number' },
      {
        required: true,
        validator: codeValidate,
      },
    ],
  });
  // 路由跳转
  const navTo = (name) => {
    if (name == 'back') {
      router.go(-1);
    }
  };
  // 提交认证
  const onSubmit = () => {
    router.go(-1);
    formRef.value.validate().then((v) => {
      console.log('提交', v);
      certification({
        real_name: v.name,
        id_card: v.cardno,
        mobile: v.tel,
        code: v.code,
      }).then((res) => {
        if (res.code == 0) {
          formRef.value.resetFields();
          createMessage.error(res.msg);
        }
        if (res.code == 1) {
          navTo('back');
        }
      });
    });
  };
  // 获取验证码
  const getCode = () => {
    smsSend({
      params: {
        mobile: formState.form.tel,
        event: 'certification',
      },
    }).then((res) => {
      if (res.code == 1) {
        let n = 60;
        if (formState.form.codeTimer) {
          clearInterval(formState.form.codeTimer);
          formState.form.codeTimer = '';
        }
        formState.form.codeTimer = setInterval(() => {
          n--;
          if (n == 0) {
            clearInterval(formState.form.codeTimer);
            formState.form.codeTimer = '';
            formState.form.codeText = '';
          } else {
            formState.form.codeText = `(${n - 1}) 后重新获取`;
          }
        }, 1000);
      } else {
        createMessage.error(res.msg);
      }
    });
  };

  onMounted(() => {});
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
