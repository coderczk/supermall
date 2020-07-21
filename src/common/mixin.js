import { debouce } from './utils';
import BackTop from '../components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debouce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)

    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = position.y < -1000
        }
    },
}