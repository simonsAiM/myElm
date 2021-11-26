<template>
  <div>
    <h1>店铺详情</h1>
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback" @click="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
        </svg>
      </nav>
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities ? '14' : '10'}">
        <div class="header_cover_img_con">
          <img :src="imgBaseUrl + shopDetailData.image_path" alt="" class="header_cover_img">
        </div>
        <section class="description_header">
          <router-link to="/shop/shopDetail" class="description_top">
            <section class="description_left">
              <img :src="imgBaseUrl + shopDetailData.image_path" alt="">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{showDetailData.name}}</h4>
              <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费¥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
          <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].ico_color, borderColor: '#' + shopDetailData.activities[0].icon_color}"></span>
              <span>{{shopDetailData.activities[0].description}}(APP专享)</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <transition  name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating="shopDetailData.rating"></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style"><span>优惠信息</span></header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                <span>{{item.description}}（APP专享）</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style"><span>商家公告</span></header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
              <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
              <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
              <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
          </svg>
        </section>
      </transition>
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class="{activity_show: changeShowType == 'food'}" @click="changeShowType='food'">商品</span>
        </div>
        <div>
          <span :class="{activity_show: changeShowType=='rating'}" @click="changeShowType='rating'">评价</span>
        </div>
      </section>
      <transition name="fad-choose">
        <section class="food_container">
          <section class="menu_cotainer">
            <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                <li v-for="(item, index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <img :src="getImgPath(item.icon_url)" v-if="item.icon_url" alt="">
                  <span>{{item.name}}</span>
                  <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item,index) in menuList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                    <p class="description_tip" v-if="index == TitleDetailIndex">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section></section>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
    </section>
  </div>
</template>
<script>
  export default {
    
  }
</script>