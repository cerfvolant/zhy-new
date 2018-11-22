<template>
  <div class="navbar">
    <div class="logo-container">
      <img class="png-logo" src="@/assets/img/zhy-logo.png" alt="logo">
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <!--<breadcrumb class="breadcrumb-container"/>-->

    <div class="right-menu">
      <template v-if="device!=='mobile'"></template>
      <div :class="item.isTabColorChange?'tabChange':'tabNotChange'" v-for="(item,index) in navTab" :key="item.object" @click="isNavTabActive(item,index)" class="right-menu-item menu-item-nav clearfix">
        <svg-icon class="tab-svg-logo" :icon-class="item.tabIcon"></svg-icon>
        <span>{{item.tabName}}</span>
      </div>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              个人设置
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
//    Breadcrumb,
    Hamburger,
  },
  data () {
      return {
        navTab: [
          {
            tabIcon: 'home',
            tabName: '首页',
            tag: 'home',
            page: '/home',
            isTabColorChange: true
          },
          {
            tabIcon: 'jk',
            tabName: '监控',
            tag: 'monitor',
            page: '/monitor/sensor/index',
            isTabColorChange: false
          },
          {
            tabIcon: 'stateRIcon',
            tabName: '报表报告',
            tag: 'stateReport',
            page: '/stateReport/sensorCurve/index',
            isTabColorChange: false
          },
          {
            tabIcon: 'xtgl',
            tabName: '系统管理',
            tag: 'xtgl',
            isTabColorChange: false
          }
        ],
        sysUserName: '管理员',
      }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'module',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    isNavTabActive(item,index) {
      this.navTab.forEach((val) => {
        val.isTabColorChange = false
      });
      this.navTab[index].isTabColorChange = !this.navTab[index].isTabColorChange;
//      console.log(item);
      this.$store.dispatch('ToggleModule', item.tag);
      this.$router.push({ path: item.page })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: $navBarBg !important;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 999;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    fill: #fff;
  }
  .logo-container {
    float: left;
    height: 100%;
    margin: 0 6px 0 11px;
    .png-logo {
      cursor: pointer;
      width:120px;
      height: 35px;
      vertical-align: middle;
    }
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    overflow: hidden;
    &:focus{
     outline: none;
    }

    .right-menu-item {
      float: left;
      margin: 0 10px;
      color: $navMenuItem;
      &.tabChange {
        color: #00ffff;
      }
      .tab-svg-logo {
        font-size: 17px;
      }
      span {
        font-size: 14px;
      }
    }
    .menu-item-nav {
      cursor: pointer;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        height: 100%;
        display: inline-flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
