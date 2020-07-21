<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
     pullUpLoad:{
        type:Boolean,
        default:false
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad
    });
    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll',position)
    });
    
    //监听上拉事件
    this.scroll.on('pullingUp',() => {
        // console.log('上拉加载');
        this.$emit('pullingUp')
    })

    //返回顶部
    this.scroll.scrollTo(0, 0);
  },
  methods: {
      finishPullUp(){
          this.scroll.finishPullUp()
      },
      scrollTo(x,y,time){
        this._scroll && this._scroll.scrollTo && this._scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getCurrentY(){
        return this.scroll.y ? this.scroll.y : 0
      }
      
  },
};
</script>

<style scoped>
</style>