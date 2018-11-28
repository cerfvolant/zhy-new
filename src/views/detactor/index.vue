<template>
  <div class="app-container clea">
    <el-col id="detactor-section" class="section">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="ygLogo" />
        <span>烟雾情况</span>
      </div>
      <div class="section-info detactor-info">
        <svg-icon class="detactor-img" icon-class="ygLogo" />
        <svg-icon :icon-class="ygIcon" class="detactor-icon" />
        <h1 class="detactor-status">{{ ygStatus }}</h1>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Detactor',
  data() {
    return {
      ygIcon: 'ygNormal',
      ygStatus: '正常'
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  $dark_gray:red;
  span.svg-container {
    color: $dark_gray;
  }
  .section {
    margin: 0;
  }
  /*detactor*/
  #detactor-section {
    height: 10rem;
    .detactor-info {
      .detactor-img {
        margin: 0 auto;
        display: block;
        width: 300px;
        height: 180px;
      }
      .detactor-icon {
        margin: 40px auto 20px;
        display: block;
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }
      .detactor-status {
        font-weight: normal;
        font-size: 26px;
        text-align: center;
      }
    }
  }
</style>
