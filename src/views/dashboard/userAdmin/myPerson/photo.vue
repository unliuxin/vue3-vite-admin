<script lang="ts" setup>
  import Guide from '../components/guide.vue'
  import { Card, Tabs, Form, Input, Button, Col, Select } from 'ant-design-vue'
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import type { FormInstance } from 'ant-design-vue'
  import type { Rule } from 'ant-design-vue/es/form'
  // import { uploadFileApi } from '@/api/userAdmin/person'

  interface userFormState {
    name: string
    storageUrl?: string
  }

  interface serverFormState {
    username: string
    phone: string
  }

  const router = useRouter()

  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: '模特名称不能为空' , trigger: 'blur' }],
    storageUrl: [{ required: true, message: '百度网盘链接不能为空', trigger: 'blur' }],
  }

  // 自我拍摄表单数据
  const myForm = reactive<userFormState>({
    name: '', // 模板名称
    storageUrl: '', // 百度网盘链接
  })

  // 影楼拍摄数据
  const serverForm = reactive<serverFormState>({
    username: '',
    phone: '',
  })

  // 训练视频
  // const fileList = ref<UploadProps['fileList']>([])
  // 形象授权

  // tabs
  const activeKey = ref<number>(1)
  
  const userFormRef = ref<FormInstance>()
  // 文件上传
  // const uploadFile = async (e:any) => {
  //   const fd = new FormData()
  //   fd.append('file', e.file)

  //   const res = await uploadFileApi (fd)
  //   console.log(res)
  // }
  // 用户自我上传拍摄提交
  const submit = () => {
    // if()
    userFormRef.value!.validate().then(() => {
      
    })
  }
  
</script>

<template>
  <div class="p-4 wrapper">
    <Card class="!my-4 enter-y">
      <Button type="primary" @click="router.back()">返回</Button>
      <Tabs v-model:activeKey="activeKey">
        <!-- 自我拍摄 -->
        <Tabs.TabPane :key="1" tab="自我拍摄">
          <Form
            ref="userFormRef"
            :rules="rules"
            :model="myForm"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <Col :span="18">
              <Form.Item label="自我拍摄的劣势" :label-col="{ span: 3 }" style="font-weight: 600;">
                <span style="font-weight: 400;">
                  缺乏专业设备和技术支持，难以达到高质量的效果。需要花费大量时间和精力进行后期制作，包括剪辑、特效等。对于非专业人士来说，
                  可能需要学习一些专业知识才能达到预期效果。视屏质量不高可能会导致数字人的细节不够清晰，影响视觉效果和动态效果不流畅，影响观看体验
                </span>
              </Form.Item>
            </Col>
            <Col :span="9">
              <Form.Item label="模特名称" name="name" :colon="false">
                <Input v-model:value="myForm.name" placeholder="模特名称" />
              </Form.Item>
            </Col>
            <Col :span="9">
              <Form.Item label="百度网盘链接" name="storageUrl" :colon="false">
                <Input v-model:value="myForm.storageUrl" placeholder="百度网盘链接"/>
              </Form.Item>
            </Col>
            <!-- <Col :span="9">
              <Form.Item label="训练视频" required :colon="false">
                <Upload.Dragger
                  v-model:file-list="fileList"
                  accept="application/x-zip-compressed"
                  :showUploadList="false"
                  :max-count="1"
                  action="#"
                  :customRequest="uploadFile"
                >
                  <div class="tips">
                    <img src="@/assets/images/user/upload.png">
                    <Button type="link" class="upload">上传zip文件</Button>
                  </div>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col :span="9">
              <Form.Item label="示例视频" :colon="false">
                <video src="" controls class="video"></video>
              </Form.Item>
            </Col>
            <Col :span="9">
              <Form.Item label="形象授权" required :colon="false">
                <Upload.Dragger
                  v-model:file-list="fileList"
                  accept="video/*, image/*"
                  :showUploadList="false"
                  :max-count="1"
                  action="#"
                  :customRequest="uploadFile"
                > 
                  <div class="tips">
                    <img src="@/assets/images/user/upload.png">
                    <Button type="link" class="upload">上传授权视频或者授权书图</Button>
                  </div>
                </Upload.Dragger>
                <Button type="link" class="upload">下载授权书</Button>
              </Form.Item>
            </Col>
            <Col :span="9">
              <Form.Item label="示例视频" :colon="false">
                <video src="" controls class="video"></video>
              </Form.Item>
            </Col> -->
          </Form>

          <!-- 拍摄介绍 -->
          <Guide />
        </Tabs.TabPane>
        <!-- 数字服务商拍摄 -->
        <Tabs.TabPane :key="2" tab="数字服务商拍摄">
        <!-- <Card class="!my-4 enter-y"> -->
          <div class="server">
            <div class="title">影楼拍摄</div>
            <div>
              <Col :span="24">
                <Form.Item label="服务内容" />
              </Col>
            </div>
          </div>
          <div class="photo">
            <div class="title">预约拍摄</div>
            <div>
              <Form :model="myForm">
                <Col :span="13">
                  <Form.Item label="所在地区" class="area">
                    <Select
                      :options="[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'tom', label: 'Tom' },
                      ]"
                      style="width: 32%"
                    />
                    <Select
                      :options="[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'tom', label: 'Tom' },
                      ]"
                      style="width: 32%"
                    />
                    <Select
                      :options="[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'tom', label: 'Tom' },
                      ]"
                      style="width: 32%"
                    />
                  </Form.Item>
                </Col>
                <Col :span="13">
                  <Form.Item label="选择影楼">
                    <Select
                      :options="[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'tom', label: 'Tom' },
                      ]"
                    />
                  </Form.Item>
                </Col>
                <Col :span="13">
                  <Form.Item label="影楼地点" />
                </Col>
                <Col :span="13">
                  <Form.Item label="拍摄组款" />
                </Col>
                <Col :span="13">
                  <Form.Item label="姓名">
                    <Input v-model:value="serverForm.username" placeholder="姓名"></Input>
                  </Form.Item>
                </Col>
                <Col :span="13">
                  <Form.Item label="电话">
                    <Input v-model:value="serverForm.phone" placeholder="电话"></Input>
                  </Form.Item>
                </Col>
              </Form>
            </div>
          </div>
          <Guide />
        </Tabs.TabPane>
      </Tabs>
      <div class="fixed">
        <template v-if="activeKey === 1">
          <Button type="primary" @click="submit">确认提交</Button>
        </template>
        <template v-if="activeKey === 2">
          <div class="price">¥ 1000</div>
          <Button type="primary">立即支付</Button>
        </template>
      </div>
    </Card>
  </div>
</template>

<style lang="less" scoped>
  .ant-form {
    display: flex;
    flex-wrap: wrap;

    .ant-form-item {
      .video {
        height: 220px;
        border-radius: 6px;
      }

      .tips {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 220px;
        line-height: 220px;
        img {
          width: 24px;
          height: 21px;
        }
      }

      :deep(.ant-upload) {
        padding: 0;
      }
    }
    .ant-btn-link {
      font-size: 14px;
      color: #0B7CFF;
      text-decoration: underline;
    }
    .ant-btn {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .wrapper {
    position: relative;
    height: 100%;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 600;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 16px;
        margin-right: 12px;
        background: #0B7CFF;
        border-radius: 2px;
      }
    }

    .fixed {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background-color: #fff;
      height: 100px;
      width: 100%;
      padding: 0 60px;
      z-index: 9;
      box-shadow: 0px 1px 13px 0px rgba(5,109,230,0.14);

      button {
        display: flex;
        align-items: center;
        padding: 12px 40px;
        background-color: #0B7CFF;
        border-radius: 8px;
      }

      .price {
        margin-right: 40px;
        font-size: 30px;
        color: #F32901;
      }
    }
  }

  .area {
    :deep(.ant-form-item-control-input-content) {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
