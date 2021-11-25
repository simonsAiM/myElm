<template>
  <div>
    <head-top signin-up="msite">
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" clas="msite_title">
        <span class="title_text ellipsis">{{ msiteTitle }}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide foo_types_container"
            v-for="(item, index) in foodTypes"
            :key="index"
          >
            <router-link
              :to="{
                path: '/food',
                query: {
                  geohash,
                  title: foodItem.title,
                  restaurant_category_id: getCategoryId(foodItem.link)
                },
              }" v-for="foodItem in item" :key="foodItem.id"
              class="link_to_food"
            >
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt=""/>
                <figcaption>{{ foodItem.title }}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/fl.svg" class="fl_black animation_opacity" alt="" v-else/>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#shop"
          ></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
      <foot-guide></foot-guide>
    </div>
  </div>
</template>

<script>
import headerTop from 'components/header/head'
import shopList from 'components/commpon/shopList'
import footGuide from 'components/footGuide/footGuide'
import { mapMutations } from 'vuex'
import {msiteAddress, msiteFoodTypes, cityGuess} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com'  //图片域名地址
    }
  },
  async beforeMount () {
    if (!this.$route.query.geohash) {
      const address = await cityGuess()
      this.geohash = `${address.latitude},${address.longitude}`
    }else {
      this.geohash = this.$route.query.geohash
    }

    // 保存geohash到vuex
    this.SAVE_GEOHASH(this.geohash)
    // 获取位置信息
    let res = await msiteAddress(this.geohash)
    this.msiteTitle = res.name
    // 记录当前您经度纬度
    this.RECORD_ADDRESS(re)

    this.hasGetData = true
  },
  mounted() {
    // 获取当行食品类型
    msiteFoodTyped(this.geohash)
      .then(res => {
        let resLen = res.length
        let resArr = [...res] // 返回一个新的数组
        let foodArr = []
        for (let i = 0, j = 0; i < resLen; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
      })
  },
  methods:{
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH']),
  },
  components: {
    headerTop,
    shopList,
    footGuide
  }
}
</script>