<template>
  <div class="app-container clearfix">
    <div id="brodSys">
      <el-col id="brodSys-prof" class="section">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="broSys"/>
          <span>广播设备信息</span>
        </div>
        <div id="brodSys-info" class="section-info clearfix">
          <ul>
            <li class="clearfix"><span>品牌</span>：<i>ZIZTELZEST</i></li>
            <li class="clearfix"><span>型号</span>：<i>PAGA</i></li>
            <li class="clearfix"><span>序列号</span>：<i>123456789</i></li>
            <li class="clearfix"><span>安装时间</span>：<i>2018.11.5-18:00:00</i></li>
            <li class="clearfix"><span>电流</span>：<i>0.9A</i></li>
          </ul>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  //  name: 'brodSys',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
  .section {
    margin: 0;
  }
  /*brodSys-prof*/
  #brodSys-prof {
    ul {
      list-style: none;
      float: left;
      margin-right: 120px;
      li {
        span {
          width: 50px;
          float: left;
          text-align: justify;
          &:after {
            display: inline-block;
            width: 100%;
            content: '';
          }
        }
        i {
          font-style: normal;
          padding-left: 10px;
        }
      }
    }
  }
</style>
