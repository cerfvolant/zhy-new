<template>
  <div class="app-container clearfix">
    <div id="intellPDU" class="clearfix">
      <el-col id="intellPDU-prof" :span="6" class="section">
        <div class="section-title">
          <svg-icon id="svg-PDU" class="svg-logo" icon-class="PDU" />
          <span>智能PDU参数</span>
        </div>
        <div class="section-info">
          <div v-for="item in intellPDUProgress" :key="item.object" class="prof-item">
            <div class="prof-title">{{ item.profTitle }}</div>
            <div class="progress-box">
              <el-progress :color="item.progressBgColor" :percentage="item.progPercentage" :show-text="false" class="progress-item"/>
              <span class="progress-value"><span :class="item.progValueColor">{{ item.progressValue }}</span> <i>{{ item.progressUnit }}</i></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-for="item in intellPDUSec" :key="item.object" :span="4" class="section intellPDU-port">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="PDUPort" />
          <span>智能PDU端口-{{ item.intellPDUNum }}</span>
        </div>
        <div id="intellPDU-info" class="section-info">
          <ul id="intellPDU-ul">
            <li class="intellPDU-detail">当前状态：<i :class="item.intellPDUStatusIcon" class="intellPDU-status-icon"/></li>
            <li class="intellPDU-detail">连接设备：<span>{{ item.intellPDUDevice }}</span></li>
            <li class="intellPDU-detail">通路电流：<span>{{ item.intellPDUCurrent }}</span> A</li>
          </ul>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  //  name: 'IntellPDU',
  data() {
    return {
      intellPDUProgress: [
        {
          profTitle: 'A相电压：',
          progPercentage: 52,
          progressBgColor: '#00ffff',
          progressValue: '250',
          progValueColor: 'voltage-value-color',
          progressUnit: 'V'
        },
        {
          profTitle: 'A相电流：',
          progPercentage: 40,
          progressBgColor: '#ffff00',
          progressValue: '2.0',
          progValueColor: 'current-value-color',
          progressUnit: 'A'
        },
        {
          profTitle: 'A相功率：',
          progPercentage: 52,
          progressBgColor: '#5245ff',
          progressValue: '2.0',
          progValueColor: 'power-value-color',
          progressUnit: 'kw'
        },
        {
          profTitle: '频率：',
          progPercentage: 40,
          progressBgColor: '#00ff7e',
          progressValue: '60',
          progValueColor: 'frequency-value-color',
          progressUnit: 'Hz'
        },
        {
          profTitle: '电能：',
          progPercentage: 57,
          progressBgColor: '#ff7815',
          progressValue: '250',
          progValueColor: 'eleEnergy-value-color',
          progressUnit: 'kw•h'
        }
      ],
      intellPDUSec: [
        {
          intellPDUNum: '01',
          intellPDUStatusIcon: 'intellPDU-green-icon',
          intellPDUDevice: '智能风扇',
          intellPDUCurrent: '0.5'
        },
        {
          intellPDUNum: '02',
          intellPDUStatusIcon: 'intellPDU-red-icon'
        },
        {
          intellPDUNum: '03'
        },
        {
          intellPDUNum: '04'
        },
        {
          intellPDUNum: '05'
        },
        {
          intellPDUNum: '06'
        },
        {
          intellPDUNum: '07'
        },
        {
          intellPDUNum: '08'
        },
        {
          intellPDUNum: '09'
        },
        {
          intellPDUNum: '10'
        },
        {
          intellPDUNum: '11'
        },
        {
          intellPDUNum: '12'
        },
        {
          intellPDUNum: '13'
        },
        {
          intellPDUNum: '14'
        },
        {
          intellPDUNum: '15'
        },
        {
          intellPDUNum: '16'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  /*intellPDU*/
  #intellPDU-prof {
    //width: 30%;
    float: left;
    //position: fixed;
    //top: 0;
    //left: 0;
    min-height: 650px;
    .prof-item {
      .progress-box {
        display: inline-flex;
        align-items: center;
        width: 100%;
        .progress-item {
          margin: 10px 20px 10px 0;
          width: 51%;
          display: inline-block;
          .el-progress-bar__outer {
            height: 11px !important;
            border-radius: initial;
            background-color: #000000;
            .el-progress-bar__inner {
              border-radius: initial;
            }
          }
        }
        .progress-value {
          font-size: 15px;
          i{
            font-style: normal;
          }
          /*voltage-value-color*/
          .voltage-value-color {
            color: #00ffff;
          }
          /*current-value-color*/
          .current-value-color {
            color: #ffff00;
          }
          /*power-value-color*/
          .power-value-color {
            color: #5245ff;
          }
          /*frequency-value-color*/
          .frequency-value-color {
            color: #00ff7e;
          }
          /*eleEnergy-value-color*/
          .eleEnergy-value-color {
            color: #ff7815;
          }
        }
      }
    }
  }
  .intellPDU-port {
    #intellPDU-info {
      #intellPDU-ul {
        list-style: none;
        .intellPDU-detail {
          padding: 4px 0;
          .intellPDU-status-icon {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            background-color: #0eff0e;
            border: 1px solid #ffffff;
          }
          .intellPDU-green-icon {
            background-color: #0eff0e;
          }
          .intellPDU-red-icon {
            background-color: #dc143c;
          }
          span {
            color: #00ffff;
          }
        }
      }
    }
  }
</style>
