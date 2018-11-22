<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#1b1b1b"
      text-color="#ffffff"
      active-text-color="#00ffff"
    >
      <sidebar-item v-for="route in routes" :key="route.path" v-if="route.path.indexOf(activeModule())!=-1" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'module',
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  methods: {
    activeModule() {
      return this.module.active
    }
  }
}
</script>
