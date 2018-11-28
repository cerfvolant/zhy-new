<template>
  <div class="app-container">
    <div id="intellFan">
      <el-col v-for="item in intellFanSec" :key="item.object" :span="7" class="section intellFan-section">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="intellFanLogo"/>
          <span>智能风扇-{{ item.intellFanNum }}</span>
        </div>
        <div class="section-info intellFan-info">
          <svg-icon class="intellFan-svg" icon-class="fanDynamic"/>
          <div class="intellFan-calc">
            <span class="count count-minus el-icon-minus" @click="minusBox(item)"/>
            <span class="count count-add el-icon-plus" @click="addBox(item)"/>
            <div class="intellFan-dot">
              <span :class="{ active : item.count >= 1}"/>
              <span :class="{ active : item.count >= 2}"/>
              <span :class="{ active : item.count >= 3}"/>
              <span :class="{ active : item.count >= 4}"/>
            </div>
          </div>
          <div id="intellFan-detail">
            <span>{{ item.count }}</span>
            <span>风扇转速等级</span>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  //  name: '',
  data() {
    return {
      intellFanSec: [
        {
          intellFanNum: '01',
          count: 3
        },
        {
          intellFanNum: '02',
          count: 2
        },
        {
          intellFanNum: '03',
          count: 1
        }
      ]
    }
  },
  methods: {
    minusBox: function(item) {
      if (item.count >= 1) {
        item.count = item.count - 1
      }
    },
    addBox: function(item) {
      if (item.count <= 3) {
        item.count = item.count + 1
      }
    }
  }
}
</script>

<style lang="scss">
  /*intellFan*/
  .intellFan-section {
    float: left;
    .intellFan-info {
      padding: 20px 0 50px;
      .intellFan-svg {
        width: 150px;
        height: 150px;
        display: block;
        margin: 50px auto;
      }
      .intellFan-calc {
        width: 45%;
        margin: 0 auto;
        position: relative;
        .count {
          position: absolute;
          width: 40px;
          height: 20px;
          line-height: 20px;
          background-color: #00ffff;
          border-radius: 14px;
          color: #000000;
          font-weight: 800;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
        }
        .count-minus {
          left: -45px;
        }
        .count-add {
          right: -45px;
        }
        .intellFan-dot {
          width: 100%;
          display: inline-flex;
          justify-content: space-around;
          span {
            width: 20px;
            height: 20px;
            background-color: #000000;
            display: inline-block;
            border-radius: 50%;
          }
          .active {
            background-color: #fff100;
          }
        }
      }
      #intellFan-detail {
        text-align: center;
        span {
          display: block;
          font-size:14px;
          &:first-child {
            color: #fff100;
            padding: 10px 0;
          }
        }
      }
    }
    &:first-of-type {
      .intellFan-info {
        .intellFan-svg {
          animation: spin .95s linear infinite forwards !important;
        }
      }
    }
    &:nth-of-type(2) {
      .intellFan-info {
        .intellFan-svg {
          animation: spin 1s linear infinite forwards !important;
        }
      }
    }
    &:nth-of-type(3) {
      .intellFan-info {
        .intellFan-svg {
          animation: spin 2s linear infinite forwards !important;
        }
      }
    }
  }
</style>
