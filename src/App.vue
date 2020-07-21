<template>
  <div id="app">
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
    
    <MainTabar></MainTabar>
  </div>
</template>

<script>
import MainTabar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
