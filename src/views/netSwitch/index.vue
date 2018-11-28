<template>
  <div class="app-container">
    <el-col id="netSw-prof" class="section">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="wljhj" />
        <span>网络交换机-S2700-26TP-EI-AC型</span>
      </div>
      <div id="netSw-info" class="section-info">
        <ul id="netSw-info-ul">
          <li v-for="item in netSwProf" :key="item.object">{{ item.profItem }}：<span>{{ item.profParam }}</span> {{ item.unit }}</li>
        </ul>
      </div>
    </el-col>
    <el-col class="section">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="portLogo" />
        <span>网络交换机端口</span>
      </div>
      <div id="netSw-detail">
        <!--图标接口tab上部--切换-->
        <div id="netSw-tab">
          <ul id="netSw-tab-ul">
            <li
              v-for="(item,index) in netSwTab"
              :key="item.object"
              :class="item.doTabIconActive?'tabIconChange':'tabIconNotChange'"
              class="netSw-tab-li"
              @click="isTabActive(index)">
              <svg-icon :icon-class="item.netSwTabIcon" class="netSw-tab-icon" />
            </li>
          </ul>
        </div>
        <!--接口大区块详情-->
        <div id="netSw-port1" class="netSw-port">
          <div class="netSw-port-box clearfix">
            <!--接口sub切换-->
            <ul class="netSw-ul">
              <li v-for="(item,index) in netSwLi" :key="item.object" class="netSw-li" @click="isSubActive(index)">
                <svg-icon
                  :class="item.doSubIconActive?'subIconChange':'subIconNotChange'"
                  :icon-class="item.netSwItemIcon"
                  class="netSw-item-icon" />
              </li>
            </ul>
            <!--各接口盒子-->
            <div v-for="i in netSwBlock" :key="i.object" class="netSw-items-box">
              <div v-for="item in i.netSwItem" :key="item.object" class="section netSw-item">
                <div class="section-title">
                  <svg-icon class="svg-logo" icon-class="portLogo" />
                  <span>接口</span>
                </div>
                <div class="section-info">
                  <ul class="section-ul">
                    <li class="netSw-detail">状态：<i :class="item.netSwStatusIcon"/></li>
                    <li class="netSw-detail">流入量：<span>{{ item.netSwInflux }}</span> Byte</li>
                    <li class="netSw-detail">流出量：<span>{{ item.netSwEfflux }}</span> Byte</li>
                    <li class="netSw-detail">IP：<span>{{ item.netSwIP }}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  //    name: 'netSwitch',
  data() {
    return {
      netSwProf: [
        {
          profItem: '品牌',
          profParam: '华为HUAWEI'
        },
        {
          profItem: '型号',
          profParam: 'S2700-26TP-EI-AC型'
        },
        {
          profItem: '安装时间',
          profParam: '2018年10月10日'
        },
        {
          profItem: '序列号',
          profParam: 'SN-123456789'
        },
        {
          profItem: '电流',
          profParam: '0.6',
          unit: 'A'
        }
      ],
      netSwTab: [
        {
          netSwTabIcon: 'netSwitch-jk-big',
          doTabIconActive: true
        },
        {
          netSwTabIcon: 'netSwitch-jk-big',
          doTabIconActive: false
        },
        {
          netSwTabIcon: 'netSwitch-jk-big',
          doTabIconActive: false
        },
        {
          netSwTabIcon: 'netSwitch-jk-small',
          doTabIconActive: false
        }
      ],
      netSwLi: [
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: true
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        },
        {
          netSwItemIcon: 'portLogo',
          doSubIconActive: false
        }
      ],
      netSwBlock: [
        {
          netSwItem: [
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            }
          ]
        },
        {
          netSwItem: [
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            }
          ]
        }
      ]
    }
  },
  methods: {
    isTabActive(key) {
      this.netSwTab.forEach((val) => {
        val.doTabIconActive = false
      })
      this.netSwTab[key].doTabIconActive = !this.netSwTab[key].doTabIconActive
    },
    isSubActive(key) {
      this.netSwLi.forEach((val) => {
        val.doSubIconActive = false
      })
      this.netSwLi[key].doSubIconActive = !this.netSwLi[key].doSubIconActive
    }
  }
}
</script>

<style lang="scss">
  .section {
    margin: .5%;
  }
  /*netSwitch*/
  #netSw-prof {
    #netSw-info {
      #netSw-info-ul {
        list-style: none;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        li {
          //display: inline-block;
          //width: 20%;
          &:last-child {
            span {
              color: #00ffff;
            }
          }
        }
      }
    }
  }
  #netSw-detail {
    #netSw-tab {
      width: 100%;
      border-bottom: 1px solid #434343;
      #netSw-tab-ul {
        list-style: none;
        width: 50%;
        margin: 0 auto;
        display: flex;
        justify-content:space-around;
        align-items: center;
        .netSw-tab-li {
          position: relative;
          cursor:pointer;
          &:after {
            content: '';
            width: 100%;
            height: 3px;
            display: inline-block;
            position: absolute;
            bottom: 16px;
            left: 0;
            right: 0;
          }
          &:nth-child(-n+3):nth-child(n) {
            .netSw-tab-icon {
              font-size: 100px;
            }
          }
          &:last-of-type {
            .netSw-tab-icon {
              font-size: 45px;
              height: 100px;
            }
          }
        }
        .tabIconChange {
          color: #00ffff;
          &:after {
            background-color: #00ffff;
          }
        }
      }
    }
    .netSw-port {
      padding: 8px;
      .netSw-port-box {
        background-color: #434343;
        position: relative;
        .netSw-ul {
          list-style: none;
          width: 20%;
          margin: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          .netSw-li {
            width: 25%;
            display: inline-block;
            text-align: center;
            padding: 5px 0;
            .netSw-item-icon {
              font-size: 19px;
              cursor: pointer;
            }
            .subIconChange {
              color: #00ffff;
            }
          }
        }
        .netSw-items-box {
          display: inline-flex;
          width: 100%;
          justify-content: space-around;
          margin: 50px 0;
          .netSw-item {
            width: 20%;
            .section-info {
              .section-ul {
                list-style: none;
                .netSw-detail {
                  padding: 4px 0;
                  .normal {
                    background-color: #0eff0e;
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    border-radius: 50%;
                  }
                  span {
                    color: #00ffff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
