<template>
    <div id="detail">
        <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>

        <scroll class="content"
         ref="scroll" 
         :probe-type="3"
          @scroll="contentScroll">
        <DetailSwiper :top-images="topImages"></DetailSwiper>
        <DetailBaseInfo :goods="goods"></DetailBaseInfo>
        <DetailShopInfo :shop="shop"></DetailShopInfo>
        <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
        <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
        <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
        <GoodsList ref="recommend" :goods="recommends"></GoodsList>
        </scroll>
        <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
        <BackTop @click.native="backClick" v-show="isShowBackTop" ></BackTop>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail,Goods, Shop,GoodsParam,getRecommend} from "../../network/detail"

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'
import {debounce} from '../../common/utils'
import {backTopMixin} from '../../common/mixin'

import {mapActions} from 'vuex'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
  },
    mixins:[backTopMixin],
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
        }
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            // console.log(res);
        // 2.1获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 2.2获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 2.3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        // 2.4 保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 2.5获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 2.6取出评论的信息
        if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
        }
        // 4.给getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
        })      
 }) 
        // 3.请求推荐数据
        getRecommend().then(res => {
            console.log(res);
            this.recommends = res.data.list
        })
      
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad(){
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        titleClick(index){
            console.log(index);
            this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i= 0; i< length;i++){
               if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i=== length - 1 && positionY>= this.themeTopYs[i]))){
                   this.currentIndex = i;
                   this.$refs.nav.currentIndex = this.currentIndex
               }
           }
           this.listenShowBackTop(position)
        },
        addToCart(){
            // 1.获取购物车需要展示的信息
            const product ={}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid

            // 2.将商品添加到购物车里(1.mapActions 2.Promise)
            // this.$store.cartList.push(product)
            // this.$store.commit('addCart',product)
            this.addCart(product).then(res => {
                this.$toast.show(res,2000)
                
            })
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res);
            // })
        }
    },
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>