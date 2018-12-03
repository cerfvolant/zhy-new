<template>
  <div class="navbar primaryColor">
    <div class="logo-container">
      <img class="png-logo" src="@/assets/img/zhy-logo.png" alt="logo">
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <!--<breadcrumb class="breadcrumb-container"/>-->

    <div class="right-menu">
      <template v-if="device!=='mobile'"/>
      <div v-for="(item,index) in navTab" :key="item.object" :class="item.isTabColorChange?'tabChange':'tabNotChange'" class="right-menu-item menu-item-nav clearfix" @click="isNavTabActive(item,index)">
        <svg-icon :icon-class="item.tabIcon" class="tab-svg-logo"/>
        <span>{{ item.tabName }}</span>
      </div>
      <el-color-picker v-model="colors.primary" @change="colorChange"/>
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
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import generateColors from '@/utils/color'
import objectAssign from '../../../../node_modules/object-assign'
export default {
  components: {
    //    Breadcrumb,
    Hamburger
  },
  data() {
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
      color1: '#409EFF',
      sysUserName: '管理员',
      originalStylesheetCount: -1, // 记录当前已引入style数量
      originalStyle: '', // 获取拿到的.css的字符串
      colors: {// 颜色选择器默认颜色值,这个值要和element-variables一样
        primary: '#409EFF'
      },
      // primaryColor: '', // 提交成功后设置默认颜色
      cssUrl: [
        '../../../../node_modules/element-ui/lib/theme-chalk/index.css',
        '../../../../static/css/index.css'
      ]
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
  mounted() {
    // 默认从线上官方拉取最新css,2秒钟后做一个检查没有拉到就从本地在拉下
    // const that = this
    // 如果是记住用户的状态就需要，在主题切换的时候记录颜色值，在下次打开的时候从新赋值
    this.colors.primary = localStorage.getItem('color') || this.colors.primary // 例如
    // this.getIndexStyle(this.cssUrl[0])
    // setTimeout(function() {
    //   if (that.originalStyle) {
    //     return
    //   } else {
    //     that.getIndexStyle(that.cssUrl[1])
    //   }
    // }, 2000)
    this.$nextTick(() => {
      // 获取页面一共引入了多少个style 文件
      this.originalStylesheetCount = document.styleSheets.length
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    isNavTabActive(item, index) {
      this.navTab.forEach((val) => {
        val.isTabColorChange = false
      })
      this.navTab[index].isTabColorChange = !this.navTab[index].isTabColorChange
      //      console.log(item)
      this.$store.dispatch('ToggleModule', item.tag)
      this.$router.push({ path: item.page })
    },
    colorChange(e) {
      if (!e) return
      localStorage.setItem('color', e)
      this.primaryColor = this.colors.primary
      this.colors = objectAssign(
        {},
        this.colors,
        generateColors(this.colors.primary)
      )
      this.writeNewStyle()
    },
    writeNewStyle() {
      let cssText = this.originalStyle
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp('(:|\\s+)' + key, 'g'),
          '$1' + this.colors[key]
        )
      })
      if (this.originalStylesheetCount === document.styleSheets.length) {
        // 如果之前没有插入就插入
        const style = document.createElement('style')
        style.innerText = '.primaryColor{background-color:' + this.colors.primary + ' !important; }' + cssText
        document.head.appendChild(style)
      } else {
        // 如果之前没有插入就修改
        document.head.lastChild.innerText = '.primaryColor{background-color:' + this.colors.primary + ' !important; } ' + cssText
      }
    }
    //    getIndexStyle(url) {
    //      const that = this
    //      var request = new XMLHttpRequest()
    //      request.open('GET', url)
    //      request.onreadystatechange = function() {
    //        if (
    //          request.readyState === 4 &&
    //          (request.status === 200 || request.status === 304)
    //        ) {
    //          // 调用本地的如果拿不到会得到html,html是不行的
    //          if (request.response && !/DOCTYPE/gi.test(request.response)) {
    //            that.originalStyle = that.getStyleTemplate(request.response)
    //            that.writeNewStyle()
    //          } else {
    //            that.originalStyle = ''
    //          }
    //        } else {
    //          that.originalStyle = ''
    //        }
    //      }
    //      request.send(null)
    //    },
    //    getStyleTemplate(data) {
    //      const colorMap = {
    //        '#3a8ee6': 'shade-1',
    //        '#409eff': 'primary',
    //        '#53a8ff': 'light-1',
    //        '#66b1ff': 'light-2',
    //        '#79bbff': 'light-3',
    //        '#8cc5ff': 'light-4',
    //        '#a0cfff': 'light-5',
    //        '#b3d8ff': 'light-6',
    //        '#c6e2ff': 'light-7',
    //        '#d9ecff': 'light-8',
    //        '#ecf5ff': 'light-9'
    //      }
    //      Object.keys(colorMap).forEach(key => {
    //        const value = colorMap[key]
    //        data = data.replace(new RegExp(key, 'ig'), value)
    //      })
    //      return data
    //    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  background-color: $navBarBg;
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
          border-radius: 50%;
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
