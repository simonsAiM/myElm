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
		console.log('latitude:',latitude)
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
	},
	// 进入订单详情页前保存该订单信息
	[SAVE_ORDER](state,orderDetail) {
		state.orderDetail = orderDetail
	},
	// 保存图片
	[SAVE_AVANDER](state,imgPath) {
		state.imgPath = imgPath
	},
	// 记录用户信息
	[RECORD_USERINFO](state,info) {
		state.userInfo = info
		state.login = true
		setStore('user_id', info.user_id)
	},
	// 下单成功，保存订单返回信息
	[ORDER_SUCCESS](state, order) {
		state.cartPrice = null
		state.orderMessage = order
	},
	// 会员卡价格记录
	[BUY_CART](state,price) {
		state.cartPrice = price
	},
	// 记录订单页面用户选择的备注, 传递给订单确认页面
	[CONFIRM_REMARK](state, {
		remarkText,
		inputText
	}) {
		state.remarkText = remarkText
		state.inputText = inputText
	},
	//是否开发票
	[CONFIRM_INVOICE](state, invoice) {
		state.invoice = invoice;
	},
	//选择的地址
	[CHOOSE_ADDRESS](state, {
		address,
		index
	}) {
		state.choosedAddress = address;
		state.addressIndex = index;
	},
	//保存下单需要验证的返回值
	[NEED_VALIDATION](state, needValidation) {
		state.needValidation = needValidation;
	},
	//保存下单后购物id 和 sig
	[SAVE_CART_ID_SIG](state, {
		cart_id,
		sig
	}) {
		state.cart_id = cart_id;
		state.sig = sig;
	},
	//保存下单参数，用户验证页面调用
	[SAVE_ORDER_PARAM](state, orderParam) {
		state.orderParam = orderParam;
	},
	//保存商铺id
	[SAVE_SHOPID](state, shopid) {
		state.shopid = shopid;
	},
	//修改下单参数
	[CHANGE_ORDER_PARAM](state, newParam) {
		state.orderParam = Object.assign({}, state.orderParam, newParam);
	},
	//选择搜索的地址
	[CHOOSE_SEARCH_ADDRESS](state, place) {
		state.searchAddress = place;
	},
	//确认订单页添加新的的地址
	[CONFIRM_ADDRESS](state, newAddress) {
		state.newAddress.push(newAddress);
	},
	//保存所选问题标题和详情
	[SAVE_QUESTION](state, question) {
		state.question = {...question};
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//删除地址列表
	[SAVE_ADDRESS](state, newAdress) {
		state.removeAddress = newAdress
	},
	//添加地址name
	[SAVE_ADDDETAIL](state, addAddress){
		state.addAddress=addAddress;
	},
}
