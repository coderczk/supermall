import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-type'

export default {
    addCart(context, payload) {
        // payload新添加的商品
        // 面试题。数组常用的方法有那些？ push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
        // let oldProduct =null;
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item
        //     }
        // }
        // // 2.判断oldProduct
        // if(oldProduct){
        //     oldProduct.count += 1;
        // }else{
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }
        return new Promise((resolve, reject) => {


            // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                // 2.判断oldProduct
            if (oldProduct) { //数量加1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else { //添加新的商品
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }

}