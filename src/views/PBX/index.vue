<template>
  <div class="app-container clearfix">
    <div id="PBX">
      <el-col id="PBX-prof" class="section">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="PBXLogo"/>
          <span>语音交换机</span>
        </div>
        <div id="PBX-info" class="section-info clearfix">
          <ul>
            <li class="clearfix"><span>品牌</span>：<i>西门子</i></li>
            <li class="clearfix"><span>型号</span>：<i>IMMC-100AC</i></li>
            <li class="clearfix"><span>序列号</span>：<i>YY-1026938</i></li>
            <li class="clearfix"><span>安装时间</span>：<i>2018年10月20日</i></li>
          </ul>
          <ul id="PBX-ul2">
            <li v-for="item in PBXProf2" :key="item.object" class="clearfix">
              <span>{{ item.profItem }}</span>：<i>{{ item.profParam }}</i> {{ item.unit }}
            </li>
          </ul>
          <div id="PBX-use-rate">
            <el-progress id="PBX-ratio-chart" :percentage="75" type="circle"/>
            <span>CPU使用率</span>
          </div>
        </div>
      </el-col>
      <el-col v-for="item in PBXPort" :key="item.object" :span="4" class="section PBX-port">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="portLogo"/>
          <span>SIP中继接口-{{ item.PBXPortNum }}</span>
        </div>
        <div class="section-info PBX-port-info">
          <ul class="PBX-port-ul">
            <li class="PBX-detail">IP:<span>{{ item.PBXIPAddress }}</span></li>
            <li class="PBX-detail">状态：
              <svg-icon :icon-class="item.PBXStatus" class="PBX-status-icon"/>
            </li>
          </ul>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  //  name: 'PBX',
  data() {
    return {
      PBXProf2: [
        {
          profItem: 'IP地址',
          profParam: '255.255.255.255'
        },
        {
          profItem: '电流',
          profParam: '0.8',
          unit: 'A'
        }
      ],
      PBXPort: [
        {
          PBXPortNum: '01',
          PBXIPAddress: '225.225.225.225',
          PBXStatus: 'PBXNormal'
        },
        {
          PBXPortNum: '02',
          PBXIPAddress: '225.225.225.225',
          PBXStatus: 'PBXNormal'
        },
        {
          PBXPortNum: '03',
          PBXIPAddress: '225.225.225.225',
          PBXStatus: 'PBXNormal'
        },
        {
          PBXPortNum: '04',
          PBXIPAddress: '225.225.225.225',
          PBXStatus: 'PBXNormal'
        },
        {
          PBXPortNum: '05',
          PBXIPAddress: '225.225.225.225',
          PBXStatus: 'PBXNormal'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  /*PBX*/
  #PBX-prof {
    #PBX-info {
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
      #PBX-ul2 {
        li {
          i {
            color: #00ffff;
          }
        }
      }
      #PBX-use-rate {
        float: left;
        flex-direction: column;
        justify-content: space-around;
        height: 110px !important;
        display: flex;
        #PBX-ratio-chart {
          width: 70px !important;
          height: 70px !important;
          .el-progress-circle {
            width: 100% !important;
            height: 100% !important;
            svg {
              path{
                &:first-child {
                  stroke: #000000;
                  stroke-width: 7;
                }
                &:last-child {
                  stroke: #fff100;
                  stroke-width: 7;
                }
              }
            }
          }
          .el-progress__text {
            color: #fff100;
          }
        }
        span {
          display: block;
          text-align: center;
        }
      }
    }
  }
  .PBX-port {
    margin: .5%;
    .PBX-port-info {
      .PBX-port-ul {
        list-style: none;
        .PBX-detail {
          padding: 5px 0;
          .PBX-status-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
    &:first-of-type {
      .PBX-port-info {
        .PBX-port-ul {
          .PBX-detail {
            .PBX-status-icon {}
          }
        }
      }
    }
  }
</style>
