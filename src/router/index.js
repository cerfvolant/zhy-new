import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/home',
    component: Layout,
    hidden: true,
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '环境概览', icon: 'weather' }
    }]
  },
  {
    path: '/home',
    component: Layout,
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '环境概览', icon: 'weather' }
    }]
  },

  {
    path: '/monitor/sensor',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Sensor',
        component: () => import('@/views/sensor/index'),
        meta: { title: '温湿度传感器', icon: 'wenshidu' }
      }
    ]
  },
  {
    path: '/monitor/detactor',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Detactor',
        component: () => import('@/views/detactor/index'),
        meta: { title: '烟感', icon: 'ygLogo' }
      }
    ]
  },
  {
    path: '/monitor/intellPDU',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'IntellPDU',
        component: () => import('@/views/intellPDU/index'),
        meta: { title: '智能PDU', icon: 'PDU' }
      }
    ]
  },
  {
    path: '/monitor/intellFan',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'IntellFan',
        component: () => import('@/views/intellFan/index'),
        meta: { title: '智能风扇', icon: 'intellFanLogo' }
      }
    ]
  },
  {
    path: '/monitor/netSwitch',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'netSwitch',
        component: () => import('@/views/netSwitch/index'),
        meta: { title: '网络交换机', icon: 'wljhj' }
      }
    ]
  },
  {
    path: '/monitor/PBX',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'PBX',
        component: () => import('@/views/PBX/index'),
        meta: { title: '语音交换机', icon: 'PBXLogo' }
      }
    ]
  },
  {
    path: '/monitor/DVRecorder',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'DVRecorder',
        component: () => import('@/views/DVRecorder/index'),
        meta: { title: '硬盘录像机', icon: 'DVRecorder' }
      }
    ]
  },
  {
    path: '/monitor/brodSys',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'brodSys',
        component: () => import('@/views/brodSys/index'),
        meta: { title: '广播系统', icon: 'broSys' }
      }
    ]
  },
  {
    path: '/monitor/weather',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'weather',
        component: () => import('@/views/weather/index'),
        meta: { title: '气象', icon: 'weather' }
      }
    ]
  },

  {
    path: '/stateReport/sensorCurve',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'sensorCurve',
        component: () => import('@/views/sensorCurve/index'),
        meta: { title: '温湿度曲线', icon: 'stateRIcon' }
      }
    ]
  },
  {
    path: '/stateReport/tipList',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'tipList',
        component: () => import('@/views/tipList/index'),
        meta: { title: '告警列表', icon: 'warning' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
