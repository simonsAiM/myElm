import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'
import { cat } from 'shelljs';

export default {
  // 记录当前经度纬度
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    }
    if (!state.login) {
      return;
    }
    if (!info.message) {
      state.userInfo = {...info};
    } else {
      state.userInfo = null;
    }
  },
	// 保存geohash
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash
	},
	// 加入购物车
	[ADD_CART](state,{
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
	}) {
		let cart = state.cartList
		let shop = cart[shopid] = (cart[shopid] || {})
		let category = shop[category_id] = (shop[category_id] || {})
		let item = category[item_id] = (category[item_id] || {})
		if (item[food_id]) {
			item[food_id]['num']++
		} else {
			item[food_id] = {
				"num": 1,
				"id": food_id,
				"name": name,
				"price": price,
				"specs": specs,
				"spacking_fee": packing_fee,
				"sku_id": sku_id,
				"stock": stock
			}
		}

		state.cartList = {...cart}
		setStore('buyCart', state.careList)
	},
	// 一处购物车
	[REDUCE_CART](state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs
	}) {
		let cart = state.cartList
		let shop = cart[shopid] || {}
		let category = shop[category_id] || {}
		let item = category[item_id] || {}
		if (item && item[food_id]) {
			if (item[food_id]['num'] > 0) {
				item[food_id]['num']--
				state.cartList = {...cart}
				setStore('buyCart',state.cartList)
			} else {
				// 商品数量为0，则清空当前购物车的信息
				item[food_id] = null
			}
			
		}
	},
	// 页面初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart')
		if (initCart) {
			state.careList = JSON.parse(initCart)
		}
	},
	// 清空购物车
	[CLEAR_CART](state,shopid) {
		state.cartList[shopid] = null
		state.cartList = {...state.cartList}
		setStore('buyCart', state.cartList)
	},
	// 记录购物车详情
	[RECORD_SHOPDETAIL](state,detail) {
		state.shopDetail = detail
	}
}