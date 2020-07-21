<template>
    <div class="cart">
        <NavBar class="nav-bar"> 
            <div slot="center">购物车({{length}})</div>
        </NavBar>
        <CartList></CartList>
        <CartBottomBar></CartBottomBar>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import CartList from './childComps/CartList'

import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters} from 'vuex'

export default {
    name:'Cart',
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        // 两种语法
        ...mapGetters({
            length:'cartLength'
        })
    //    ...mapGetters(['cartLength','cartList'])
    },
}
</script>

<style scoped>
    .cart{
       height: 100vh;
    }
    .nav-bar{
        background-color: red;
        color: white;
    }
</style>