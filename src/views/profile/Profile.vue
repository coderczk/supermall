<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">coderCzk</div></nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo></UserInfo>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <div class="box">
        <div class="box1">
            <img src="../../assets/img/common/消息.png"><span>我的消息</span>
        </div>
          <div class="box2">
            <img src="../../assets/img/common/商城.png"><span>积分商城</span>
        </div>
        <div class="box3">
            <img src="../../assets/img/common/会员.png"><span>会员卡</span>
        </div>
          <div class="box4">
            <img src="../../assets/img/common/app.png"><span>下载购物APP</span>
        </div>
    </div>
        
   
   
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'
  import NavBar from '../../components/common/navbar/NavBar'

	export default {
		name: "Profile",
    components: {
		  UserInfo, ListView, NavBar
    },
    data: function () {
		  return {
		    orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
    mounted: function () {
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: red;
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
  .box{
      width: 100%;
      background-color: #fff;
      
  }
  .box1 {
      height: 40px;
      border-bottom: 1px solid wheat;
      margin: 6px 10px;
      line-height: 40px;
  }
  .box2{
      height: 40px;
      margin: 6px 10px;
      line-height: 40px;
      border-bottom: 1px solid wheat;
  }
   .box3 {
      height: 40px;
      border-bottom: 1px solid wheat;
      margin: 6px 10px;
      line-height: 40px;
  }
  .box4{
      height: 40px;
      margin: 6px 10px;
      line-height: 40px;
      border-bottom: 1px solid wheat;
  }
    img{
        position: relative;
        width: 20px;
        height: 20px;
        left: 5px;
        top: 5px;
    }
   .box span{
        margin-left: 30px;
    }
</style>
