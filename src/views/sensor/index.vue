<template>
  <div class="app-container clearfix">
    <div id="sensor">
      <el-row :gutter="20">
        <el-col id="front-sensor" :span="8" class="sensor-wrap">
          <div v-for="item in frontSec" :key="item.object" class="section">
            <div class="section-title">
              <svg-icon class="svg-logo" icon-class="wenshidu" />
              <span>{{ item.frontTitle }}</span>
            </div>
            <div class="section-info senser-block clearfix">
              <div :id="'temp'+item.id" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
              <div :id="'hum'+item.id" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
            </div>
          </div>
        </el-col>
        <el-col id="sensor-img" :span="8">
          <div class="sensor-svg-wrap">
            <!--<svg-icon class="sensor-jigui" icon-class="jigui"/>-->
            <div class="gauge-tab-icon">
              <div v-for="item in gaugeTab" class="icon-box">
                <svg-icon class="tab-icon" :icon-class="item.tabIcon"/>
              </div>
            </div>
            <div class="gauge-tab-icon">
              <div v-for="item in gaugeTab" class="icon-box">
                <svg-icon class="tab-icon" :icon-class="item.tabIcon"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col id="back-sensor" :span="8" class="sensor-wrap">
          <div v-for="item in backSec" :key="item.object" class="section">
            <div class="section-title">
              <svg-icon class="svg-logo" icon-class="wenshidu"/>
              <span>{{ item.backTitle }}</span>
            </div>
            <div class="section-info senser-block clearfix">
              <div :id="'temp'+item.id" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
              <div :id="'hum'+item.id" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
  export default {
    //  name: 'sensor',
    data() {
      return {
        gaugeTab: [
          {
            tabIcon: 'wenshidu'
          },
          {
            tabIcon: 'wenshidu'
          },
          {
            tabIcon: 'wenshidu'
          }
        ],
        frontSec: [
          {
            frontTitle: '前上温湿度',
            id: '1'
          },
          {
            frontTitle: '前中温湿度',
            id: '2'
          },
          {
            frontTitle: '前下温湿度',
            id: '3'
          }
        ],
        backSec: [
          {
            backTitle: '后上温湿度',
            id: '4'
          },
          {
            backTitle: '后中温湿度',
            id: '5'
          },
          {
            backTitle: '后下温湿度',
            id: '6'
          }
        ]
      }
    },
    mounted() {
      this.init()
      //  this.batcherBox();
      //  this.batcherBox2();
    },
    methods: {
      init() {
        var that = this
        this.frontSec.forEach(function(item) {
          that.batcherBox('temp' + item.id)
          that.batcherBox2('hum' + item.id)
        })
        this.backSec.forEach(function(item) {
          that.batcherBox('temp' + item.id)
          that.batcherBox2('hum' + item.id)
        })
      },
      batcherBox(eId) {
        const batcher = echarts.init(document.getElementById(eId))
        var TP_value = 26// ===>>温度的值
        var kd = []
        var Gradient = []
        var leftColor = ''
        var showValue = ''
        var boxPosition = [45, 0]// ===>> 文字与温度计的间距
        var TP_txt = ''
        // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
        for (var i = 0, len = 135; i <= len; i++) {
          if (i < 10 || i > 130) {
            kd.push('')
          } else {
            if ((i - 10) % 20 === 0) {
              kd.push('-3')
            } else if ((i - 10) % 4 === 0) {
              kd.push('-1')
            } else {
              kd.push('')
            }
          }
        }
        // 中间线的渐变色和文本内容
        if (TP_value > 20) {
          TP_txt = '温度'
          Gradient.push({
            offset: 0,
            color: '#ff0048'
          }, {
            offset: 0.5,
            color: '#ff0048'
          }, {
            offset: 1,
            color: '#ff0048'
          })
        } else if (TP_value > -20) {
          TP_txt = '温度'
          Gradient.push({
            offset: 0,
            color: '#ff0048'
          }, {
            offset: 1,
            color: '#ff0048'
          })
        } else {
          TP_txt = '温度'
          Gradient.push({
            offset: 1,
            color: '#ff0048'
          })
        }
        if (TP_value > 62) {
          showValue = 62
        } else {
          if (TP_value < -60) {
            showValue = -60
          } else {
            showValue = TP_value
          }
        }
        if (TP_value < -10) {
          boxPosition = [65, -120]
        }
        leftColor = Gradient[Gradient.length - 1].color
        // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
        var option = {
          title: {
            text: '温度计',
            show: false
          },
          yAxis: [{
            show: false,
            data: [],
            min: 0,
            max: 255, // ===>>温度计整体的高
            axisLine: {
              show: false
            }
          }, {
            show: false,
            min: 0,
            max: 50
          }, {
            type: 'category',
            //   data: ['', '', '', '', '', '', '', '', '', '', '°C'],
            position: 'left',
            offset: -80,
            axisLabel: {
              fontSize: 10,
              color: 'white'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          xAxis: [{
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -5,
            max: 80
          }],
          series: [{
            name: '条',
            type: 'bar',
            // 对应上面XAxis的第一个对)象配置
            xAxisIndex: 0,
            data: [{
              value: (showValue + 70),
              label: {
                normal: {
                  show: true,
                  position: boxPosition,
                  width: 10,
                  height: 10,
                  formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                  rich: {
                    back: {//  ===>>number
                      align: 'center',
                      lineHeight: 50,
                      fontSize: 18,
                      fontFamily: 'digifacewide',
                      color: leftColor
                    },
                    unit: {//  ===>>unit
                      fontFamily: '微软雅黑',
                      fontSize: 18,
                      lineHeight: 10,
                      color: leftColor
                    },
                    downTxt: {//  ===>>downText
                      lineHeight: 10,
                      fontSize: 12,
                      align: 'center',
                      color: '#fff'
                    }
                  }
                }
              }
            }],
            barWidth: 4, // ===>> 温度计最里面的最小条宽
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
              }
            },
            z: 2
          }, {
            name: '白框',
            type: 'bar',
            xAxisIndex: 1,
            barGap: '-100%',
            data: [134],
            barWidth: 14, // ===>> 温度计里面的第二个条宽
            itemStyle: {
              normal: {
                color: '#ffffff',
                barBorderRadius: 50
              }
            },
            z: 1
          }, {
            name: '外框',
            type: 'bar',
            xAxisIndex: 2,
            barGap: '-100%',
            data: [135],
            barWidth: 16, // ===>> 温度计的最大条宽
            itemStyle: {
              normal: {
                color: '#434343',
                barBorderRadius: 50
              }
            },
            z: 0
          }, {
            name: '圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 0,
            symbolSize: 8, // ===>>温度计的最小的圆点
            itemStyle: {
              normal: {
                color: '#ff0048',
                opacity: 1
              }
            },
            z: 2
          }, {
            name: '白圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 1,
            symbolSize: 25, // ====>>温度计的第二个圆形
            itemStyle: {
              normal: {
                color: '#ffffff',
                opacity: 1
              }
            },
            z: 1
          }, {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 2,
            symbolSize: 36, //  ===>> 温度计的最大圆
            itemStyle: {
              normal: {
                color: '#434343',
                opacity: 1
              }
            },
            z: 0
          }
            //          {
            //            name: '刻度',
            //            type: 'bar',
            //            yAxisIndex: 0,
            //            xAxisIndex: 3,
            //            label: {
            //              normal: {
            //                show: true,
            //                position: 'left',
            //                distance: 10,
            //                color: 'white',
            //                fontSize: 12,
            //                formatter: function(params) {
            //                  if(params.dataIndex > 130 || params.dataIndex < 10) {
            //                    return '';
            //                  } else {
            //                    if((params.dataIndex - 10) % 20 === 0) {
            //                      return params.dataIndex - 70;
            //                    } else {
            //                      return '';
            //                    }
            //                  }
            //                }
            //              }
            //            },
            //            barGap: '-100%',
            //            data: kd,
            //            barWidth: 1,
            //            itemStyle: {
            //              normal: {
            //                color: 'white',
            //                barBorderRadius: 120,
            //              }
            //            },
            //            z: 0
            //          }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        batcher.setOption(option)
      },
      batcherBox2(eId) {
        const batcher2 = echarts.init(document.getElementById(eId))
        var TP_value = 40//  ===>>温度的值
        var kd = []
        var Gradient = []
        var leftColor = ''
        var showValue = ''
        var boxPosition = [45, 0]
        var TP_txt = ''
        // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
        for (var i = 0, len = 135; i <= len; i++) {
          if (i < 10 || i > 130) {
            kd.push('')
          } else {
            if ((i - 10) % 20 === 0) {
              kd.push('-3')
            } else if ((i - 10) % 4 === 0) {
              kd.push('-1')
            } else {
              kd.push('')
            }
          }
        }
        // 中间线的渐变色和文本内容
        if (TP_value > 20) {
          TP_txt = '湿度'
          Gradient.push({
            offset: 0,
            color: '#5245ff'
          }, {
            offset: 0.5,
            color: '#5245ff'
          }, {
            offset: 1,
            color: '#5245ff'
          })
        } else if (TP_value > -20) {
          TP_txt = '湿度'
          Gradient.push({
            offset: 0,
            color: '#5245ff'
          }, {
            offset: 1,
            color: '#5245ff'
          })
        } else {
          TP_txt = '湿度'
          Gradient.push({
            offset: 1,
            color: '#5245ff'
          })
        }
        if (TP_value > 62) {
          showValue = 62
        } else {
          if (TP_value < -60) {
            showValue = -60
          } else {
            showValue = TP_value
          }
        }
        if (TP_value < -10) {
          boxPosition = [65, -120]
        }
        leftColor = Gradient[Gradient.length - 1].color
        // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
        var option = {
          title: {
            text: '温度计',
            show: false
          },
          yAxis: [{
            show: false,
            data: [],
            min: 0,
            max: 255, //  ===>>温度计整体的高
            axisLine: {
              show: false
            }
          }, {
            show: false,
            min: 0,
            max: 50
          }, {
            type: 'category',
            //   data: ['', '', '', '', '', '', '', '', '', '', '°C'],
            position: 'left',
            offset: -80,
            axisLabel: {
              fontSize: 10,
              color: 'white'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          xAxis: [{
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -10,
            max: 80,
            data: []
          }, {
            show: false,
            min: -5,
            max: 80
          }],
          series: [{
            name: '条',
            type: 'bar',
            // 对应上面XAxis的第一个对)象配置
            xAxisIndex: 0,
            data: [{
              value: (showValue + 70),
              label: {
                normal: {
                  show: true,
                  position: boxPosition,
                  width: 10,
                  height: 10,
                  formatter: '{back| ' + TP_value + ' }{unit|%}\n{downTxt|' + TP_txt + '}',
                  rich: {
                    back: {//  ===>>number
                      align: 'center',
                      lineHeight: 50,
                      fontSize: 18,
                      fontFamily: 'digifacewide',
                      color: leftColor
                    },
                    unit: {//  ===>>unit
                      fontFamily: '微软雅黑',
                      fontSize: 18,
                      lineHeight: 10,
                      color: leftColor
                    },
                    downTxt: {//  ===>>downText
                      lineHeight: 10,
                      fontSize: 12,
                      align: 'center',
                      color: '#fff'
                    }
                  }
                }
              }
            }],

            barWidth: 4, //  ===>> 温度计最里面的最小条宽
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
              }
            },
            z: 2
          }, {
            name: '白框',
            type: 'bar',
            xAxisIndex: 1,
            barGap: '-100%',
            data: [134],
            barWidth: 12, //  ===>> 温度计里面的第二个条宽
            itemStyle: {
              normal: {
                color: '#ffffff',
                barBorderRadius: 50
              }
            },
            z: 1
          }, {
            name: '外框',
            type: 'bar',
            xAxisIndex: 2,
            barGap: '-100%',
            data: [135],
            barWidth: 16, //  ===>> 温度计的最大条宽
            itemStyle: {
              normal: {
                color: '#434343',
                barBorderRadius: 50
              }
            },
            z: 0
          }, {
            name: '圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 0,
            symbolSize: 8, // ===>>温度计的最小的圆点
            itemStyle: {
              normal: {
                color: '#5245ff',
                opacity: 1
              }
            },
            z: 2
          }, {
            name: '白圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 1,
            symbolSize: 25, //  ====>>温度计的第二个圆形
            itemStyle: {
              normal: {
                color: '#ffffff',
                opacity: 1
              }
            },
            z: 1
          }, {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 2,
            symbolSize: 36, //  ===>> 温度计的最大圆
            itemStyle: {
              normal: {
                color: '#434343',
                opacity: 1
              }
            },
            z: 0
          }
            //          {
            //            name: '刻度',
            //            type: 'bar',
            //            yAxisIndex: 0,
            //            xAxisIndex: 3,
            //            label: {
            //              normal: {
            //                show: true,
            //                position: 'left',
            //                distance: 10,
            //                color: 'white',
            //                fontSize: 12,
            //                formatter: function(params) {
            //                  if(params.dataIndex > 130 || params.dataIndex < 10) {
            //                    return '';
            //                  } else {
            //                    if((params.dataIndex - 10) % 20 === 0) {
            //                      return params.dataIndex - 70;
            //                    } else {
            //                      return '';
            //                    }
            //                  }
            //                }
            //              }
            //            },
            //            barGap: '-100%',
            //            data: kd,
            //            barWidth: 1,
            //            itemStyle: {
            //              normal: {
            //                color: 'white',
            //                barBorderRadius: 120,
            //              }
            //            },
            //            z: 0
            //          }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        batcher2.setOption(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  #front-sensor, #back-sensor {
    .senser-block {
      //height: 300px;
      position: relative;
      #temp1,#temp2 , #temp3 , #temp4 ,#temp5, #temp6 {
        top: -390%;
      }
      #hum1,#hum2 , #hum3 , #hum4 ,#hum5, #hum6 {
        right: 0;
        top: -390%;
      }
    }
  }
  .sensor-wrap {
    .section {
      height: 200px;
    }
  }
  #sensor-img {
    height: 600px;
    margin: .5% 0;
    position: relative;
    background-color: $sectionBg;
    .sensor-svg-wrap {
      height: 100%;
      background: url("../../assets/img/jigui.png");
      background-repeat: no-repeat;
      background-size: 262% 100%;
      background-position: 50% 60%;
      .gauge-tab-icon {
        height: 100%;
        width: 50%;
        position: relative;
        .icon-box {
          font-size: 55px;
          position: absolute;
        }
        &:first-of-type {
          float: left;
          .icon-box {
            &:first-of-type {
              top: 5%;
              left: 28%;
            }
            &:nth-child(2) {
              top: 44%;
              left: 28%;
            }
            &:last-of-type {
              bottom: 4%;
              left: 28%;
            }
          }
        }
        &:last-of-type {
          float: right;
          .icon-box {
            &:first-of-type {
              top: 5%;
              right: 28%;
            }
            &:nth-child(2) {
              top: 44%;
              right: 28%;
            }
            &:last-of-type {
              bottom: 4%;
              right: 28%;
            }
          }
        }
      }
      // .sensor-jigui {
      //   font-size: 600px;
      //   margin: 0 auto;
      //   position: absolute;
      //   top: 50%;
      //   left: 50%;
      //   transform: translateX(-50%) translateY(-50%);
      // }
    }
  }
</style>

