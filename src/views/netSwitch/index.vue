<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName1"
      type="card"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="sortItem in sortArr"
        :key="sortItem.object"
        :label="sortItem.sortTitle"
        :name="sortItem.sortNum">
        <el-col id="netSw-prof" class="section">
          <div class="section-title">
            <svg-icon class="svg-logo" icon-class="wljhj" />
            <span>{{ sortItem.sortName }}</span>
          </div>
          <div id="netSw-info" class="section-info">
            <ul id="netSw-info-ul">
              <li
                v-for="item in sortItem.netSwProf"
                :key="item.object">{{ item.profItem }}：<span>{{ item.profParam }}</span> {{ item.unit }}</li>
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
                v-for="(item, index) in sortItem.navArr"
                :key="item.object"
                :class="{ active : index === num }"
                class="nav-item"
                @click="navTab(index)">
                <svg-icon :icon-class="item.netSwTabIcon" class="nav-tab-icon"/>
              </li>
            </ul>
            <div
              v-for="(navCon, index) in sortItem.navContents"
              v-show=" index === num"
              :key="navCon.object"
              class="nav-con">
              <ul class="sub-nav">
                <li
                  v-for="(subItem, index) in navCon.subArr"
                  :key="subItem.object"
                  :class="{active:index === subNum}"
                  class="sub-nav-item"
                  @click="subNavTab(index)">
                  <svg-icon :icon-class="subItem.subIcon" class="sub-tab-icon"/>
                </li>
              </ul>
              <div class="sub-con">
                <div class="sub-inner">
                  <div
                    v-for="(subCon, index) in navCon.subDetail"
                    :key="subCon.object"
                    :class="{ active : index === subConNum }"
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName1: 'first',
      sortArr: [
        {
          sortTitle: '机型一',
          sortNum: 'first',
          sortName: '网络交换机-S2700-26TP-EI-AC型',
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
          ]
        },
        {
          sortTitle: '机型二',
          sortNum: 'second',
          sortName: '内容二'
        }
      ],
      num: 0,
      subNum: 0,
      subConNum: 0
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    navTab(index) {
      this.num = index
    },
    subNavTab(index) {
      this.subNum = index
      console.log(this.subNum)
      const box = document.getElementsByClassName('sub-con-part')
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
              color: $themeColor;
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
            background-color: $themeColor;
          }
          .nav-tab-icon {
            color: $themeColor;
          }
        }
      }
    }
    .nav-con {
      background-color: $navBarBg;
      height: 530px;
      position: relative;
      margin-top: 3%;
      .sub-nav {
        /*margin: 0 auto;*/
        width: 20%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
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
        /*width: 80%;*/
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        .sub-inner {
          text-align: center;
          .sub-con-part {
            display: inline-block;
            width: 20%;
            margin: 8% 1.5%;
            &.active {
              background-color: $fontWhite;
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
                  color: $themeColor;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
