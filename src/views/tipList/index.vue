<template>
  <div class="app-container clearfix">
    <ex-table :data="data" show-pagination :search-method="handleSearch" ref="table">
      <el-table-column label="column1" prop="prop1" />
    </ex-table>
    <el-button @click="$refs.table.setCurrentPage(1)">回到首页</el-button>
    <!--<div id="tipList">-->
      <!--<el-col class="section" id="senCurve-section">-->
        <!--<div class="section-title" id="senCurve-title">-->
          <!--<el-col id="senCurve-title-left" :span="6">-->
            <!--<svg-icon class="svg-logo" icon-class="" />-->
            <!--<span>历史告警列表</span>-->
          <!--</el-col>-->
          <!--<el-col id="senCurve-title-right">-->
          <!--</el-col>-->
        <!--</div>-->
        <!--<div class="senCurve-info">-->
          <!--<el-input style="width:200px;"></el-input>-->
          <!--<el-table border style="width:100%;" :data="list">-->
            <!--<el-table-column :label="table.title" min-width="100px">-->
              <!--<template slot-scope="scope"></template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</div>-->
  </div>
</template>

<script>
  import ExTable from '@/components/ExTable/table.js';
  export default {
    name: 'tipList',
    components: { ExTable },
    data() {
      return {
        data: []
//        list: null
      }
    },
    methods: {
      handleSearch(pagination, { currentPage, pageSize }) {
        this.fetchRemoteData(currentPage, pageSize)
      },
      fetchRemoteData(currentPage, pageSize) {
        //currentPage：当前页， pageSize: 每页最大条目数， 用于服务端分页
        //假设http请求数据，结果返回｛data_list: [...], total: ..｝
        //设置表格数据
        this.data = request.data_list;
        //设置分页总数
        const pagination = this.$refs.table.pagination;
        pagination .total = request.total;
      },
    },
    mounted() {
      this.$refs.table.fetchData();
    }
  }
</script>

<style lang="scss">
</style>
