import App from '../App'

const home = r => require.ensure([], () => r(require('../views/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../views/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../views/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../views/search/search')), 'search')
const shop = r => require.ensure([], () => r(require('../views/shop/shop')), 'shop')
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('../views/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../views/forget/forget')), 'forget')
const order = r => require.ensure([], () => r(require('../views/order/order')), 'order')
// const orderDetail = r => require.ensure([], () => r(require('../views/order/children/orderDetail')), 'orderDetail')
const vipcard = r => require.ensure([], () => r(require('../views/vipcard/vipcard')), 'vipcard')
const invoiceRecord = r => require.ensure([], () => r(require('../views/vipcard/children/invoiceRecord')), 'invoiceRecord')
const useCart = r => require.ensure([], () => r(require('../views/vipcard/children/useCart')), 'useCart')
const vipDescription = r => require.ensure([], () => r(require('../views/vipcard/children/vipDescription')), 'vipDescription')
const food = r => require.ensure([], () => r(require('../views/food/food')), 'food')
const confirmOrder = r => require.ensure([], () => r(require('../views/confirmOrder/confirmOrder')), 'confirmOrder')
const remark = r => require.ensure([], () => r(require('../views/confirmOrder/children/remark')), 'remark')
const payment = r => require.ensure([], () => r(require('../views/confirmOrder/children/payment')), 'payment')
const userValidation = r => require.ensure([], () => r(require('../views/confirmOrder/children/userValidation')), 'userValidation')
const invoice = r => require.ensure([], () => r(require('../views/confirmOrder/children/invoice')), 'invoice')
const chooseAddress = r => require.ensure([], () => r(require('../views/confirmOrder/children/chooseAddress')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../views/confirmOrder/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], () => r(require('../views/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
const foodDetail = r => require.ensure([], () => r(require('../views/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../views/shop/children/shopDetail')), 'shopDetail')
const shopSafe = r => require.ensure([], () => r(require('../views/shop/children/children/shopSafe')), 'shopSafe')
const info = r => require.ensure([], () => r(require('../views/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../views/profile/children/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../views/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../views/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../views/profile/children/children/children/children/addDetail')), 'addDetail')
const balance = r => require.ensure([], () => r(require('../views/balance/balance')), 'balance')
const balanceDetail = r => require.ensure([], () => r(require('../views/balance/children/detail')), 'balanceDetail')
const benefit = r => require.ensure([], () => r(require('../views/benefit/benefit')), 'benefit')
const coupon = r => require.ensure([], () => r(require('../views/benefit/children/coupon')), 'coupon')
const hbDescription = r => require.ensure([], () => r(require('../views/benefit/children/hbDescription')), 'hbDescription')
const hbHistory = r => require.ensure([], () => r(require('../views/benefit/children/hbHistory')), 'hbHistory')
const exchange = r => require.ensure([], () => r(require('../views/benefit/children/exchange')), 'exchange')
const commend = r => require.ensure([], () => r(require('../views/benefit/children/commend')), 'commend')
const points = r => require.ensure([], () => r(require('../views/points/points')), 'points')
const pointsDetail = r => require.ensure([], () => r(require('../views/points/children/detail')), 'pointsDetail')
const service = r => require.ensure([], () => r(require('../views/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../views/service/children/questionDetail')), 'questionDetail')
// const find = r => require.ensure([], () => r(require('../views/find/find')), 'find')
const download = r => require.ensure([], () => r(require('../views/download/download')), 'download')




export default [{
    path: '/',
    component: App, //?????????????????????index.html
    children: [ //?????????????????????App.vue
        //?????????????????????home??????
        {
            path: '',
            redirect: '/home'
        },
        //?????????????????????
        {
            path: '/home',
            component: home
        },
        //?????????????????????
        {
            path: '/city/:cityid',
            component: city
        },
        //?????????????????????
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true },
        },
        //?????????????????????
        {
            path: '/food',
            component: food
        },
        //?????????
        {
            path: '/search/:geohash',
            component: search
        },
        //???????????????
        {
            path: '/shop',
            component: shop,
            children: [{
                path: 'foodDetail', //???????????????
                component: foodDetail,
            }, {
                path: 'shopDetail', //???????????????
                component: shopDetail,
                children: [{
                    path: 'shopSafe', //?????????????????????
                    component: shopSafe,
                }, ]
            }]
        },
        //???????????????
        {
            path: '/confirmOrder',
            component: confirmOrder,
            children: [{
                path: 'remark', //????????????
                component: remark,
            }, {
                path: 'invoice', //????????????
                component: invoice,
            }, {
                path: 'payment', //????????????
                component: payment,
            }, {
                path: 'userValidation', //????????????
                component: userValidation,
            }, {
                path: 'chooseAddress', //????????????
                component: chooseAddress,
                children: [{
                    path: 'addAddress', //????????????
                    component: addAddress,
                    children: [{
                        path: 'searchAddress', //????????????
                        component: searchAddress,
                    }]
                }, ]
            }, ]
        },
        // //???????????????
        {
            path: '/login',
            component: login
        },
        // //???????????????
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //?????????????????????
                component: info,
                children: [{
                    path: 'setusername',
                    component: setusername,
                },{
                    path: 'address',
                    component: address,     //????????????
                    children:[{
                        path:'add',
                        component:add,
                        children:[{
                            path:'addDetail',
                            component:addDetail
                        }]
                    }]
                }]
            },
            {
                path: 'service', //????????????
                component: service,
            },]
        },
        // //???????????????
        {
            path: '/forget',
            component: forget
        },
        // //???????????????
        {
            path: '/order',
            component: order,
            // children: [{
            //     path: 'orderDetail', //???????????????
            //     component: orderDetail,
            // }, ]
        },
        // //vip??????
        {
            path: '/vipcard',
            component: vipcard,
            children: [{
                path: 'invoiceRecord', //?????????
                component: invoiceRecord,
            }, {
                path: 'useCart', //???????????????
                component: useCart,
            }, {
                path: 'vipDescription', //????????????
                component: vipDescription,
            },]
        },
        // //?????????
        // {
        //     path: '/find',
        //     component: find
        // },
        // //?????????
        {
            path: '/download',
            component: download
        },
        // //????????????
        {
            path: '/service',
            component: service,
             children: [{
                path: 'questionDetail', //???????????????
                component: questionDetail,
            }, ]
        },
        // //??????
        {
            path: 'balance',
            component: balance,
            children: [{
                path: 'detail', //????????????
                component: balanceDetail,
            }, ]
        },
        // //???????????????
        {
            path: 'benefit',
            component: benefit,
            children: [{
                path: 'coupon', //???????????????
                component: coupon,
            }, {
                path: 'hbDescription', //????????????
                component: hbDescription,
            }, {
                path: 'hbHistory', //????????????
                component: hbHistory,
            }, {
                path: 'exchange', //????????????
                component: exchange,
            }, {
                path: 'commend', //????????????
                component: commend,
            },]
        },
        // //???????????????
        {
            path: 'points',
            component: points,
            children: [{
                path: 'detail', //????????????
                component: pointsDetail,
            }, ]
        },
    ]
}]
