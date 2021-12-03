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
  console.log(latitude);
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
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


/**
 * 获取订单列表
 * @param {*} userId 
 * @param {*} offset 
 * @returns 
 */
export const getOrderList = (userId,offset) => fetch('/api/bos/v2/users/' + userId + '/orders',{
  offset,
  limit: 10
})


/**
 * 获取短信验证码
 * @param {*} mobile 
 * @returns 
 */
export const mobileCode = mobile => fetch('/api/v4/mobile/verify_code/send', {
  mobile,
  scenn: 'login',
  type: 'sms',
}, 'POST')


/**
 * 检测账号是否存在
 * @param {*} checkNumber 
 * @param {*} type 
 * @returns 
 */
export const checkExsis = (checkNumber, type) => fetch('/api/v1/users/exists', {
  [type]: checkNumber,
  type
})


/**
 * 手机号登录
 * @param {*} code 
 * @param {*} mobile 
 * @param {*} validate_token 
 * @returns 
 */
export const sendLogin = (code, mobile, validate_token) => fetch('/api/v1/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST')


/**
 * 获取图片验证码
 * @returns 
 */
export const getcaptchas = () => fetch('/api/v1/captchas', {}, 'POST')

export const accountLogin = (username, password, captcha_code) => fetch('/api/v2/login', {
  username,
  password,
  captcha_code
}, 'POST')


/**
 * 改密码
 */
 export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');


/**
 * 重新发送订单验证码
 * @param {*} merchantOrderNo 
 * @param {*} userId 
 * @returns 
 */
 export const payRequest = (merchantOrderNo, userId) => fetch('/api/payapi/payment/queryOrder',{
  merchantId: 5,
  merchantOrderNo,
  source: 'MOBILE_WAP',
  userId,
  version: '1.0.0',
 })

 
/**
 * 确认订单
 */
export const checkout = (geohash, entities, shopid) => fetch('/api/v1/carts/checkout', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 下订单
 */
 export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/api/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
}, 'POST');


/**
*个人中心里编辑地址
*/
export const getAddressList = (user_id) => fetch('/api/v1/users/'+user_id+'/addresses')


/**
 * 获取快速备注列表
 */
 export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
	sig
});


/**
 * 重新发送订单验证码
 */
 export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
	sig,
	type,
}, 'POST');


/**
 * 下订单
 */
 export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
	validation_code,
	validation_token,
}, 'POST');



/**
 * 添加地址
 */

 export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
	address,
	address_detail,
	geohash,
	name,
	phone,
	phone_bk,
	poi_type,
	sex,
	tag,
	tag_type,
}, 'POST');



/**
 * 搜索地址
 */

 export const searchNearby = keyword => fetch('/v1/pois', {
	type: 'nearby',
	keyword
});


/**
 * 获取服务中心信息
 */
 export const getService = () => fetch('/api/v3/profile/explain');


 /**
 * 获取红包
*/
export const getHongbaoNum = id => fetch('/api/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');


/**
 * 兑换红包
*/
export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/api/v1/users/' + id + '/hongbao/exchange',{
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取过期红包
*/
export const getExpired = id => fetch('/api/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
* 删除地址
*/
export const deleteAddress = (userid, addressid) => fetch( '/api/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')




