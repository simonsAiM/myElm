import fetch from "../config/fetch"
import { getStore } from '../config/mUtils'

/**
 * 获取首页默认地址
 * @returns 
 */
export const cityGuess = () => fetch('/api/v1/cities', {
  type: 'guess'
})

/**
 * 获取首页热门城市
 * @returns
 */
export const hotcity = () => fetch('/api/v1/cities', {
  type: 'hot'
})

/**
 * 获取所有城市
 * @returns
 */
export const groupcity = () => fetch('/api/v1/cities', {
  type: 'group'
})

/**
 * 获取当前所在城市
 * @returns
 */
 export const currentcity = number => fetch('/api/v1/cities/' + number)

 /**
  * 获取搜索地址
  * @param {*} cityid 
  * @param {*} value 
  * @returns 
  */
 export const searchplace = (cityid, value) => fetch('/api/v1/pois', {
   type: 'search',
   city_id: cityid,
   keyword: value
 })

 /**
  * 获取msite页面地址信息
  * @param {*} geohash
  * @returns
  */
 export const msiteAttress = geohash => fetch('/api/v1/pois/' + geohash)

 /**
  * 获取用户信息
  * @returns 
  */
 export const getUser = () => fetch('/api/v1/user', {user_id: getStore('user_id')})

 export const getAddressList = user_id => fetch('/api/v1/users/' + user_id)

/**
 * 获取msite页面地址信息
 * @returns 
 */
export const msiteAddress = geohash => fetch('/api/v2/pois/' + geohash)

/**
 * 获取msite页面视频分类列表
 * @returns 
 */
 export const msiteFoodTypes = geohash => fetch('/api/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
 })

export const shopList = (latitude, longitude, offset, restaurant_category_id  = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += `&support_ids[]=${item.id}`
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_ctegory_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };

  return fetch('/api/shopping/restaurants', data)
}

/**
 * 获取shop页面商铺详情
 * @param {*} shopid 
 * @param {*} latitude 
 * @param {*} longitude 
 * @returns 
 */
export const shopDetails = (shopid, latitude, longitude) => fetch('/api/shopping/restaurant/' + shopid, {
  latitude,
  longitude: `${longitude}&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics`
})

/**
 * 获取shop页面菜单列表
 * @param {*} restaurant_id 
 * @returns 
 */
export const foodMenu = restaurant_id => fetch('/api/shopping/v2/menu',{restaurant_id})

/**
 * 获取商铺评价列表
 * @param {*} shopid 
 * @param {*} offset 
 * @param {*} tag_name 
 * @returns 
 */
export const getRatingList = (shopid, offset, tag_name = '') => fetch('/api/ugc/v2/restaurants/' + shopid + '/ratings', {
  has_content: true,
  offset,
  limit: 0,
  tag_name
})

/**
 * 获取商铺评价分数
 * @param {*} shopid 
 * @returns 
 */
export const ratingScores = shopid => fetch('/api/ugc/v2/restaurants/' + shopid + '/ratings/scores')

export const ratingTags = shopid => fetch('/api/ugc/v2/restaurants/' + shopid + '/ratings/tags')

/**
 * 获取search页面搜索结果
 * @param {*} geohash 
 * @param {*} value 
 * @returns 
 */
export const searchRestaurant = (geohash, keyword) => fetch('/api/v4/restaurants', {
  'extras[]': 'restaurant_activity',
  geohash,
  keyword,
  type: 'search'
})


/**
 * 获取food页面的 category 种类列表
 */
export const foodCategory = (latitude, longitude) => fetch('/api/shopping/v2/restaurant/category', {
  latitude,
  longitude
})

/**
 * 获取food页面的配送方式
 * @param {*} latitude 
 * @param {*} longitude 
 * @returns 
 */
export const foodDelivery = (latitude, longitude) => fetch('/api/shopping/v1/restaurants/delivery_modes', {
  latitude,
  longitude,
  kw: ''
})

/**
 * 获取food页面的活动列表
 * @param {*} latitude 
 * @param {*} longitude 
 * @returns 
 */
export const foodActivity = (latitude, longitude) => fetch('/api/shopping/v1/restaurants/activity_attributes', {
  latitude,
  longitude,
  kw: ''
})
