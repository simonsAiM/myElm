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
