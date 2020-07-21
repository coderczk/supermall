module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            wiewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
            viewportHeght: 667, //视窗的高度，对应的是我们设计稿的高度(也可以不配置)
            unitPrecision: 5, //指定'px'转换位视窗单位，建议使用vw
            selectorBlackList: ['ignore', 'tab-bar-item'], //指定不需要转换的类，
            minPixelValue: 1, //小于或等于'1px'不需要转为视窗单位
            mediaQuery: false, //允许在媒体查询中转换'px'
            exclude: [/TabBar/], //必须是正则，匹配文件的
        }
    }
}