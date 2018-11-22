<template>
  <div class="app-container clearfix">
    <div id="DVRecorder">
      <el-col class="section" id="DVR-prof">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="DVRIcon"></svg-icon>
          <span>硬盘录像机</span>
        </div>
        <div class="section-info" id="DVR-info">
          <ul>
            <li class="clearfix"><span>品牌</span>：<i>索尼爱立信</i></li>
            <li class="clearfix"><span>型号</span>：<i>SN-33690</i></li>
            <li class="clearfix"><span>序列号</span>：<i>SN-12345</i></li>
            <li class="clearfix"><span>安装时间</span>：<i>2018年10月20日</i></li>
          </ul>
          <ul id="DVR-ul2">
            <li class="clearfix" v-for="item in DVRProf2">
              <span>{{item.profItem}}</span>：<i>{{item.profParam}}</i> {{item.unit}}
            </li>
          </ul>
          <div id="DVR-use-rate">
            <el-progress id="DVR-ratio-chart" type="circle" :percentage="75"></el-progress>
            <span>硬盘空余率</span>
          </div>
        </div>
      </el-col>
      <el-col class="section DVR-serial" :span="4" v-for="item in DVRSerial">
        <div class="section-title">
          <svg-icon class="svg-logo" icon-class="DVRecorder"></svg-icon>
          <span>录像机-{{item.DVRNum}}</span>
        </div>
        <ul id="DVR-detail">
          <li class="DVR-detail-item">IP: <span class="DVR-IPAddress">{{item.DVRIPAddress}}</span></li>
          <li class="DVR-detail-item">当前状态：<span class="DVR-status">{{item.DVRStatus}}</span></li>
        </ul>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DVRecorder',
    data() {
      return {
        DVRProf2: [
          {
            profItem: 'IP地址',
            profParam: '255.255.255.255'
          },
          {
            profItem: '硬盘个数',
            profParam: '100'
          },
          {
            profItem: '电流',
            profParam: '1.0',
            unit: 'A'
          }
        ],
        DVRSerial: [
          {
            DVRNum: '01',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '02',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '03',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '04',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '05',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '06',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '07',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '08',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '09',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '10',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '11',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '12',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '13',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '14',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '15',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '16',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '17',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '18',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '19',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '20',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '21',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '22',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '23',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '24',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '25',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '26',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '27',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '28',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '29',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '30',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '31',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          },
          {
            DVRNum: '32',
            DVRIPAddress: '255.255.255.255',
            DVRStatus: '在线'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  /*DVRecorder*/
  #DVR-prof {
    margin: 0;
    #DVR-info {
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
      #DVR-ul2 {
        li {
          i {
            color: #00ffff;
          }
          &:nth-child(2) {
            i {
              color: #fff100;
            }
          }
        }
      }
      #DVR-use-rate {
        float: left;
        flex-direction: column;
        justify-content: space-around;
        height: 110px !important;
        display: flex;
        #DVR-ratio-chart {
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
  .DVR-serial {
    margin: .5%;
    #DVR-detail {
      list-style: none;
      .DVR-detail-item {
        padding: 5px 10px;
        border-bottom: 1px solid #434343;
        .DVR-IPAddress {
          color: #00ffff;
        }
        .DVR-status {
          color: #00ff02;
        }
      }
    }
  }
</style>
