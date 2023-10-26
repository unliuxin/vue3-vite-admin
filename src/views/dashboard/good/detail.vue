<template>
  <div class="detail">
    <div class="detail-box">
      <!-- 商品图片 -->
      <div class="detail-img">
        <div class="detail-preview">
          <img :src="goodInfo.info.image" />
        </div>
        <div class="detail-swiper">
          <div class="detail-swiper-left" @click="changeGImg(1, -1)">
            <img src="./img/left-arrow.png" />
          </div>
          <div
            class="detail-swiper-item"
            :class="{ active: gn == goodInfo.index }"
            v-for="(g, gn) in goodInfo.list"
            :key="'img' + gn"
            @click="changeGImg(2, gn)"
            :style="{ transform: `translateX(-${goodInfo.index * 100}%)` }"
          >
            <img :src="g" />
          </div>
          <div class="detail-swiper-right" @click="changeGImg(1, 1)">
            <img src="./img/right-arrow.png" />
          </div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="detail-info">
        <div class="title detail-info-item">
          <div class="left-label"></div>
          <div class="name">{{ goodInfo.info.title }}</div>
        </div>
        <div class="text detail-info-item">
          <div class="left-label"></div>
          <div class="name">
            {{ goodInfo.info.desc }}
          </div>
        </div>
        <div class="price detail-info-item">
          <div class="left-label">总计</div>
          <div class="name">￥{{ goodInfo.info.sale_price }}</div>
        </div>
        <div v-if="false" class="specs detail-info-item">
          <div class="left-label">规格</div>
          <div class="name">拓世数字人</div>
        </div>
        <div class="num detail-info-item">
          <div class="left-label">数量</div>
          <div class="name">{{ goodInfo.info.num }}</div>
        </div>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class="btn">
      <div class="left-label"></div>
      <div class="pay" @click="setOrderCreate">立即购买</div>
    </div>
    <div class="pay" style="position: fixed; z-index: -1" v-html="goodInfo.payHtml"></div>
  </div>
</template>

<script lang="ts" setup>
  // import { goodDetail } from '@/api/model/good';
  import { goodDetail, orderCreate } from '/@/api/model/good';
  import { reactive, onMounted, nextTick } from 'vue';
  // 商品信息参数
  const goodInfo = reactive({
    payHtml: '',
    index: 0, // 当前商品图片索引
    info: {}, // 当前商品图片参数
    list: [], // 商品信息数组
    len: 0, // 商品信息数组长度
  });

  // 切换商品图片
  const changeGImg = (type, n) => {
    // 箭头切换
    if (type == 1) {
      goodInfo.index += n;
    }
    // 点击切换
    if (type == 2) {
      goodInfo.index = n;
    }
    // 判断是否小于第一位
    if (goodInfo.index < 0) {
      goodInfo.index = 0;
    }
    // 判断是否大于最后一位
    if (goodInfo.index >= goodInfo.len) {
      goodInfo.index = goodInfo.len - 1;
    }
    goodInfo.info.image = goodInfo.list[goodInfo.index];
  };
  // 获取商品详情
  const getGoodDetail = (id) => {
    goodDetail({
      params: { id },
    }).then((res) => {
      // console.log(res);
      if (res.code == 1) {
        let d = res.data;
        goodInfo.info = d;
        goodInfo.list = d.images;
        goodInfo.len = d.images.length;
        goodInfo.index = 0;
      }
    });
  };

  // 提交订单
  const setOrderCreate = () => {
    let params = {
      goodsId: goodInfo.info.id,
      payMoney: goodInfo.info.sale_price,
      payType: 1,
      remark: '',
    };
    orderCreate({ params }).then((res) => {
      console.log('提交订单', res);
      let d = res.split('<script>');
      goodInfo.payHtml = d[0];
      nextTick(() => {
        let f = d[1].split('<')[0];
        eval(f);
      });
    });
  };

  onMounted(() => {
    getGoodDetail(1);
  });
</script>

<style scoped lang="less">
  .detail {
    margin: 0px auto;
    max-width: 1200px;

    .detail-box {
      display: flex;
      flex-direction: row;
      justify-items: flex-start;
      align-content: flex-start;

      .detail-img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 60px;

        .detail-preview {
          height: 280px;
          width: 392px;
          background: #dfdfdf;
          border-radius: 4px;
        }

        .detail-swiper {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          height: 68px;
          width: 392px;
          padding: 0px 40px;
          overflow: hidden;

          .detail-swiper-left,
          .detail-swiper-right {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0px;
            right: 0px;
            z-index: 1;
            height: 100%;
            width: 40px;
            background: #f0f2f5;
          }

          .detail-swiper-left {
            left: 0px;
          }

          .detail-swiper-item {
            box-shadow: border-box;
            padding: 0px 10px;
            min-width: 92px;
            height: 54px;
            transition: all 0.3s;

            &.active {
              img {
                border: 2px solid #e53e41;
              }
            }

            img {
              height: 100%;
              width: 100%;
              background: #dfdfdf;
            }
          }
        }
      }

      .detail-info {
        padding: 60px 0px;

        .detail-info-item {
          cursor: default;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 0px;

          .left-label {
            min-width: 68px;
            font-size: 13px;
            font-weight: 400;
            color: #333333;
          }
        }

        .title {
          font-size: 18px;
          font-weight: 600;
        }

        .price {
          font-size: 30px;
          font-weight: 700;
        }

        .num,
        .specs {
          cursor: pointer;
          font-size: 13px;
          font-weight: 400;
          color: #333333;

          .name {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 106px;
            height: 38px;
            background: #d7d7d7;
            border: 1px solid #797979;
            border-radius: 20px;
          }
          // .pay {
          //   margin-top: 20px;
          //   width: 116px;
          //   color: #fff;
          //   border: 0px;
          //   background: #55d187;
          // }
        }
      }
    }

    .btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding-left: 512px;

      .left-label {
        min-width: 68px;
        font-size: 13px;
        font-weight: 400;
        color: #333333;
      }

      .pay {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 0px;
        width: 116px;
        height: 38px;
        color: #fff;
        border: 0px;
        border-radius: 20px;
        background: #55d187;
      }
    }
  }
</style>
