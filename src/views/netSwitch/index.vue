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
      <div id="details" class="section-info">
        <ul id="nav">
          <li
            v-for="(item, index) in navArr" :key="item.object"
            :class="{ active : index === num }"
            @click="navTab(index)"
            class="nav-item">
            <svg-icon :iconClass="item.netSwTabIcon" class="nav-tab-icon"/>
          </li>
        </ul>
        <div
          v-for='(navCon,index) in navContents' :key="navCon.object"
          v-show=" index === num" class="nav-con">
          <ul class="sub-nav">
            <li
              v-for="(subItem,index) in navCon.subArr" :key="subItem.object"
              :class="{active:index === subNum}"
              @click="subNavTab(index)" class="sub-nav-item">
              <svg-icon :iconClass="subItem.subIcon" class="sub-tab-icon"/>
            </li>
          </ul>
          <div class="sub-con">
            <div class="sub-inner">
              <div
                v-for='(subCon,index) in navCon.subDetail' :key="subCon.object"
                :class="{active:index === subConNum}"
                class="section sub-con-part">
                <div class="section-title">
                  <svg-icon class="svg-logo" icon-class="portLogo" />
                  <span>接口</span>
                </div>
                <ul class="section-info">
                  <li class="netSw-detail">状态：<i :class="subCon.netSwStatusIcon"/></li>
                  <li class="netSw-detail">流入量：<span>{{ subCon.netSwInflux }}</span> Byte</li>
                  <li class="netSw-detail">流出量：<span>{{ subCon.netSwEfflux }}</span> Byte</li>
                  <li class="netSw-detail">IP：<span>{{ subCon.netSwIP }}</span></li>
                </ul>
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
  data () {
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
      navArr: [
        {
          netSwTabIcon: 'netSwitch-jk-big'
        },
        {
          netSwTabIcon: 'netSwitch-jk-big'
        },
        {
          netSwTabIcon: 'netSwitch-jk-big'
        },
        {
          netSwTabIcon: 'netSwitch-jk-small'
        }
      ],
      navContents: [
        {
          subArr: [
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            },
            {
              subIcon: 'portLogo'
            }
          ],
          subDetail: [
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
            },
            {
              netSwStatusIcon: 'normal',
              netSwInflux: '1024',
              netSwEfflux: '1024',
              netSwIP: '225.225.225.225'
            }
          ]
        }
      ],
      num: 0,
      subNum: 0,
      subConNum: 0
    }
  },
  methods: {
    navTab(index) {
      this.num = index
    },
    subNavTab(index) {
      this.subNum = index;
      console.log(this.subNum)
      const box = document.getElementsByClassName("sub-con-part")
      console.log(box[this.subNum])
      this.subConNum = index
    }
  }
}
</script>

<style lang="scss">
  @import "@/styles/variables.scss";
  .section {
    margin: .5% 0;
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
  #details {
    #nav {
      margin: 0 auto;
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .nav-item {
        position: relative;
        .nav-tab-icon {
          font-size: 100px;
          cursor: pointer;
        }
        &:last-child {
          .nav-tab-icon {
            font-size: 45px;
            height: 100px;
          }
        }
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
        &.active {
          &:after {
            background-color: #00ffff;
          }
          .nav-tab-icon {
            color: #00ffff;
          }
        }
      }
    }
    .nav-con {
      background-color: $navBarBg;
      .sub-nav {
        margin: 0 auto;
        width: 20%;
        .sub-nav-item {
          width: 25%;
          display: inline-block;
          text-align: center;
          padding: 5% 0;
          .sub-tab-icon {
            font-size: 19px;
            cursor: pointer;
          }
          &.active {
            color: #00ffff;
          }
        }
      }
      .sub-con {
        width: 80%;
        margin: 0 auto;
        .sub-inner {
          text-align: center;
          .sub-con-part {
            display: inline-block;
            width: 20%;
            margin: .5%;
            &.active {
              background-color: #ffffff;
              color: #000000;
            }
            .section-info {
              list-style: none;
              .netSw-detail {
                padding: 4px 0;
                text-align: left;
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
</style>
