import * as types from '~/store/ajaxAPI/mutations_types'
import   getData  from '~/store/ajaxAPI/getData'

//声明state
export const state = () => ({
    orderDetail:{}, //订单详情页数据
    orderDetailNo:{}, //订单详情页数据  == 无需登录
    _productType:[], //套餐产品服务类型
})

//声明Mutations
export const mutations = {
    [types.REQUEST_ORDERDETAIL](state, data){
        state.orderDetail = data;
        // console.log(state.orderDetail)
    },
    [types.REQUEST_ORDERDETAILNO](state, data){
        state.orderDetailNo = data;
    },
}

//声明Actions
export const actions = {
    // 订单详情接口
    request_orderdetail({ commit },data){
        return getData.orderDetail(data).then( (res)=>{ 
            // console.log("订单详情接口",res.data);
            var arr = [];
            res.data.OrderDetails.forEach((items,index) => {
                items.ProductName = items.Name;
                if(items.type == "套餐" ){
                    items.type = 1;
                    items.ProductDetails.forEach(val => {
                        arr.push(val.Name);
                    })
                }else if(items.type == "产品"){
                    items.type = 0;
                    items.ProductType = items.ProductType.replace(/,/gi,"*");
                }
                if(items.ProductDetails.length>0){
                    items._productType = arr.join("*");
                    arr = []
                }
            })
            return commit(types.REQUEST_ORDERDETAIL, res.data);
         },(error)=>{
            console.log("订单详情接口错误");
         })  
    },
    // 订单详情接口（不需登录）
    request_orderdetailno({ commit,state },data){
        // console.log(data)
        return getData.getOrderDetail(data).then( (res)=>{ 
            // console.log("订单详情接口（不需登录）",res.data);
            var arr = [];
            res.data.OrderDetails.forEach((items,index) => {
                items.ProductName = items.Name;
                if(items.type == "套餐" ){
                    items.type = 1;
                    items.ProductDetails.forEach(val => {
                        arr.push(val.Name);
                    })
                }else if(items.type == "产品"){
                    items.type = 0;
                    items.ProductType = items.ProductType ? items.ProductType.replace(/,/gi,"*") : "";
                }
                if(items.ProductDetails.length>0){
                    items._productType = arr.join("*");
                    arr = []
                }
            })
            return commit(types.REQUEST_ORDERDETAILNO, res.data);
         },(error)=>{
            console.log("订单详情接口（不需登录）错误");
         })  
    },
}

export const getters = {
    orderDetails(state){
        // console.log("getter",state.orderDetail)
        return state.orderDetail
    },
    orderDetailsNo(state){
        // console.log("getter",state.orderDetailNo)    
        return state.orderDetailNo
    },
}
