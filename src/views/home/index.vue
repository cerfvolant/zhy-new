<template>
  <div class="home-container">
    <!--<div class="home-text">name:{{ name }}</div>-->
    <!--<div class="home-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <!--1、wet-temperature-sensor-->
    <el-col :span="7" class="section home-section primaryColor">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="wenshidu"/>
        <span>机柜平均温湿度</span>
      </div>
      <div id="senser-block" class="section-info clearfix">
        <div id="batcher" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
        <div id="batcher2" :style="{width: '50%', height: '300px', position: 'absolute'}"/>
      </div>
    </el-col>
    <!--2、weather-->
    <el-col :span="9" class="section home-section primaryColor">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="weather"/>
        <span>气象</span>
      </div>
      <div class="section-info clearfix">
        <div id="campus" :style="{width: '100%',height: '300px'}"/>
      </div>
    </el-col>
    <!--3、smoke-detactor-->
    <el-col :span="7" class="section home-section primaryColor">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="ygLogo"/>
        <span>烟感状态</span>
      </div>
      <div id="yg-sec" class="section-info clearfix">
        <svg-icon class="yg-icon" icon-class="ygNormal"/>
        <p>{{ ygStatus }}</p>
      </div>
    </el-col>
    <!--4、intellPDU-->
    <el-col :span="10" class="section home-section primaryColor">
      <div id="intellPDU-Title" class="section-title">
        <svg-icon class="svg-logo svg-PDU" icon-class="PDU"/>
        <span>智能PDU</span>
      </div>
      <div id="intellPDU-info" class="section-info clearfix">
        <el-col id="progress-wrap" :span="16">
          <div v-for="item in intellPDUProgress" :key="item.object" class="prof-item">
            <el-col :span="7" class="prof-title">{{ item.profTitle }}</el-col>
            <el-col :span="9" class="progress-box">
              <el-progress :color="item.progressBgColor" :percentage="item.progPercentage" :show-text="false" class="progress-item"/>
            </el-col>
            <el-col :span="8" class="progress-value"><span :class="item.progValueColor">{{ item.progressValue }}</span> <i>{{ item.progressUnit }}</i></el-col>
          </div>
        </el-col>
        <el-col id="pdu-right" :span="8">
          <div class="pdu-connect-num">连接设备数量：<span>{{ PDUConnectNum }}</span></div>
          <div class="pdu-port-utilization">
            <el-progress id="pdu-ratio-chart" :percentage="75" type="circle"/>
            <span>端口占用率</span>
          </div>
        </el-col>
      </div>
    </el-col>
    <!--5、intellFan-->
    <el-col :span="7" class="section home-section primaryColor">
      <div class="section-title">
        <svg-icon class="svg-logo" icon-class="intellFanLogo"/>
        <span>智能风扇</span>
      </div>
      <div id="fan-sec" class="section-info clearfix">
        <p class="fan-mode">当前风扇模式：<span>{{ intFanMode }}</span></p>
        <p>风扇转速等级：</p>
        <el-col v-for="item in fanStatus" id="fan-item" :span="8" :key="item.object">
          <svg-icon class="fan-logo" icon-class="fanDynamic"/>
          <p>{{ item.intFanGrade }}级</p>
        </el-col>
      </div>
    </el-col>
    <!--6、warning-->
    <el-col :span="6" class="section home-section primaryColor">
      <div id="tip-title" class="section-title">
        <el-col id="tip-title-left" :span="14">
          <svg-icon id="svg-logo" class="svg-logo" icon-class="warning"/>
          <span>历史告警条目</span>
        </el-col>
        <el-col id="tip-time" :span="9">{{ tipDate }}</el-col>
      </div>
      <div id="warning-info" class="section-info clearfix">
        <ul>
          <li v-for="item in warningItem" :key="item.object">
            <el-col :span="11" class="warning-left">
              <svg-icon class="tip-icon" icon-class="tipIcon"/>
              <span>{{ item.tipTime }}</span>
            </el-col>
            <el-col :span="13" class="warning-right">
              <span>{{ item.tipName }}</span>{{ item.tipNameStatus }}
            </el-col>
          </li>
        </ul>
      </div>
    </el-col>
    <!--<el-button type="primary">按钮</el-button>-->
    <!--<el-button type="success">成功按钮</el-button>-->
    <!--<el-button type="info">信息按钮</el-button>-->
    <!--<el-button type="warning">警告按钮</el-button>-->
    <!--<el-button type="danger">危险按钮</el-button>-->
    <!--<div id="primaryColor" style="width:100%;height:80px;"/>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const echarts = require('echarts/lib/echarts')

export default {
  name: 'Home',
  data() {
    return {
      ygStatus: '正常',
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
      PDUConnectNum: '16',
      intFanMode: '手动模式',
      fanStatus: [
        {
          intFanGrade: '3'
        },
        {
          intFanGrade: '2'
        },
        {
          intFanGrade: '1'
        }
      ],
      tipDate: '2018/10/15',
      warningItem: [
        {
          tipTime: '06 : 45',
          tipName: '烟感',
          tipNameStatus: '检测到烟雾'
        },
        {
          tipTime: '08 : 23',
          tipName: '温度',
          tipNameStatus: '超过正常水平'
        },
        {
          tipTime: '12 : 20',
          tipName: '烟感',
          tipNameStatus: '检测到烟雾'
        },
        {
          tipTime: '12 : 22',
          tipName: '温度',
          tipNameStatus: '超过正常水平'
        },
        {
          tipTime: '13 : 15',
          tipName: '烟感',
          tipNameStatus: '检测到烟雾'
        },
        {
          tipTime: '15 : 45',
          tipName: '温度',
          tipNameStatus: '超过正常水平'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.batcherBox()
    this.batcherBox2()
    this.campusInfo()
  },
  methods: {
    batcherBox() {
      const batcher = echarts.init(document.getElementById('batcher'))
      var TP_value = 26//  ===>>温度的值
      var kd = []
      var Gradient = []
      var leftColor = ''
      var showValue = ''
      var boxPosition = [45, 0]//  ===>> 文字与温度计的间距
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
          barWidth: 14, //  ===>> 温度计里面的第二个条宽
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
          symbolSize: 8, //  ===>>温度计的最小的圆点
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
      batcher.setOption(option)
    },
    batcherBox2() {
      const batcher2 = echarts.init(document.getElementById('batcher2'))
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
          //  data: ['', '', '', '', '', '', '', '', '', '', '°C'],
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
          symbolSize: 8, //  ===>>温度计的最小的圆点
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
    },
    campusInfo() {
      const campus = echarts.init(document.getElementById('campus'))
      var option = {
        title: {
          x: 'center',
          top: 0,
          text: '风速/风向模拟',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15,
            color: '#ffffff'
          }
        },
        tooltip: {
          show: true,
          backgroundColor: '#fff',
          borderColor: '#f60',
          borderWidth: '1px',
          textStyle: {
            color: '#333'
          },
          formatter: function(param) {
            if (param.seriesIndex === 2) {
              return '<em style="color:' + param.color + ';">当前风向:' + param.value + '</em> °'
            }
            if (param.seriesIndex === 3) {
              return '<em style="color:' + param.color + ';">当前风速:' + param.value + '</em> m/s'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'gauge',
            radius: '83%',
            min: 0,
            max: 360,
            startAngle: 90,
            endAngle: 449.9,
            splitNumber: 0,
            axisLine: {
              lineStyle: {
                color: [
                  [0.5, '#ccc'],
                  [1, '#ccc']
                ],
                width: 4
              }
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          },
          {
            type: 'gauge',
            radius: '80%',
            splitNumber: 1,
            min: 0,
            max: 360,
            startAngle: 90,
            endAngle: 449.9,
            axisLine: {
              show: false,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [
                  [1, '#8f8f8f']
                ]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#8f8f8f',
                width: 1
              },
              length: '-2%',
              splitNumber: 60
            },
            splitLine: {
              show: true,
              length: 12,
              lineStyle: {
                color: '#8f8f8f'
              }
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          },
          {
            name: '',
            type: 'gauge',
            min: 0,
            max: 360,
            startAngle: 90,
            endAngle: -269.9999,
            radius: '80%',
            splitNumber: 12,
            axisLine: {
              lineStyle: {
                width: 5,
                shadowBlur: 0,
                color: [
                  [0.25, '#DDBD4D'],
                  [0.5, '#E43F3D'],
                  [0.75, '#7CBB55'],
                  [1, '#9CD6CE']
                ]
              }
            },
            axisTick: {
              show: true,
              splitNumber: 1
            },
            splitLine: {
              length: 10,
              lineStyle: {
                width: 2
              }
            },
            axisLabel: {
              formatter: function(e) {
                switch (e + '') {
                  case '0':
                    return '正北'
                  case '360':
                    return '正北'
                  case '180':
                    return '正南'
                  case '90':
                    return '正东'
                  case '270':
                    return '正西'
                  default:
                    return e
                }
              },
              textStyle: {
                fontSize: 12,
                fontWeight: ''
              }
            },
            pointer: {
              show: true
            },
            detail: {
              formatter: function(param) {
                var level = ''
                if (param > 0 && param < 90) {
                  level = '东北'
                } else if (param > 90 && param < 180) {
                  level = '东南'
                } else if (param > 180 && param < 270) {
                  level = '西南'
                } else if (param > 270 && param < 360) {
                  level = '西北'
                } else if (param === 360) {
                  level = '正北'
                } else if (param === 270) {
                  level = '正西'
                } else if (param === 90) {
                  level = '正东'
                } else if (param === 180) {
                  level = '正南'
                }
                return '当前风向:' + level + '(' + param + '°)'
              },
              offsetCenter: [0, 140],
              textStyle: {
                fontSize: 15
              }
            },
            data: [{
              value: 279,
              name: ''
            }]
          },
          {
            name: '风速',
            type: 'gauge',
            center: ['60%', '35%'],
            radius: '22%',
            min: 0,
            max: 60,
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber: 12,
            animation: 0,
            pointer: {
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {
              normal: {
                color: '#00b0b0',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            axisLine: {
              lineStyle: {
                color: [
                  [1, '#337ab7']
                ],
                width: 6
              }
            },
            splitLine: {
              show: 1,
              length: 6,
              lineStyle: {
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: 1,
              distance: 1,
              textStyle: {
                color: '#0000ff'
              },
              formatter: function(t) {
                switch (t + '') {
                  case '10':
                    return '10'
                  case '20':
                    return '20'
                  case '30':
                    return '30'
                  case '40':
                    return '40'
                  case '50':
                    return '50'
                  case '60':
                    return '60'
                }
              }
            },
            detail: {
              formatter: function(param) {
                return '当前风速:' + param + 'm/s'
              },
              offsetCenter: [0, 60],
              textStyle: {
                fontSize: 12
              }
            },
            data: [{
              value: 3.2,
              name: ''
            }]
          }
        ]
      }
      setInterval(function() {
        var datavalue = (Math.random() * 360).toFixed(2)
        var datavalue2 = (Math.random() * 60).toFixed(2)
        option.series[2].data[0].value = datavalue
        option.series[3].data[0].value = datavalue2
        campus.setOption(option, true)
      }, 1000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .section {
    margin: .5%;
  }
/*home*/
.home-section {
  &:nth-child(n+4) {
    .section-info {
      height: 200px;
    }
  }
  .section-info {
    //padding-left: 20px;
    //padding-right: 20px;
  }
  #senser-block {
    height: 300px;
    position: relative;
    #batcher {
      top: -27%;
    }
    #batcher2 {
      right: 0;
      top: 2%;
    }
  }
  #yg-sec {
    text-align: center;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    width: inherit;
    .yg-icon {
      font-size: 100px;
    }
    p {
      color: #00bd0b;
      margin: 15px 0;
      font-size: 16px;
    }
  }
  #intellPDU-Title {
    .svg-PDU {
      font-size: 33px;
      /*margin-top: 6px;*/
    }
  }
  #intellPDU-info {
    #progress-wrap {
      .prof-item {
        width: 100%;
        height: 31px;
        display: inline-flex;
        align-items: center;
        .progress-box {
          //display: inline-flex;
          //align-items: center;
          //width: 100%;
          .progress-item {
            //margin: 10px 20px 10px 0;
            //width: 51%;
            //display: inline-block;
            .el-progress-bar {
              .el-progress-bar__outer {
                height: 11px !important;
                border-radius: initial;
                background-color: #000000;
                .el-progress-bar__inner {
                  border-radius: initial;
                }
              }
            }
          }
        }
        .progress-value {
          text-indent: 8px;
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
    #pdu-right {
      text-align: center;
      .pdu-connect-num {
        span {
          color: #5245ff;
          font-size: 16px;
        }
      }
      .pdu-port-utilization {
        #pdu-ratio-chart {
          width: 70px !important;
          height: 70px !important;
          margin: 23px 0 10px;
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
        }
      }
    }
  }
  #fan-sec {
    p {
      padding: 5px 0;
    }
    .fan-mode {
      span {
        color: #00ffff;
      }
    }
    #fan-item {
      text-align: center;
      margin: 0 0 20px;
      .fan-logo {
        font-size: 50px;
        margin: 10px 0;
      }
      p {
        color: #00ffff;
      }
      &:first-of-type {
        .fan-logo {
          animation: spin .95s linear infinite forwards !important;
        }
      }
      &:nth-of-type(2) {
        .fan-logo {
          animation: spin 1s linear infinite forwards !important;
        }
      }
      &:nth-of-type(3) {
        .fan-logo {
          animation: spin 2s linear infinite forwards !important;
        }
      }
    }
  }
  #tip-title {
    #tip-title-left {
      #svg-logo {
        margin: 0 0 0 10px;
      }
    }
  }
  #warning-info {
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        .warning-left {
          @keyframes shakeSign {
            0% {
              transform: rotate(0deg);
            }
            45% {
              transform: rotate(0deg);
            }
            47.5% {
              transform: rotate(-2deg);
            }
            55% {
              transform: rotate(2deg);
            }
            57.5% {
              transform: rotate(-2deg);
            }
            60% {
              transform: rotate(2deg);
            }
            62.5%  {
              transform: rotate(-2deg);
            }
            65% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
          .tip-icon {
            color: #fff100;
            font-size: 14px;
            animation: shakeSign 3.5s infinite;
            transform-origin: 50% 100%;
            transition: all .2s ease-in-out;
          }
          span {
            padding-left: 3px;
          }
        }
        .warning-right {
          span {
            color: #ff0048;
          }
        }
      }
    }
  }
}
</style>
