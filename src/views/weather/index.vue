<template>
  <div class="app-container clearfix">
    <div id="weather">
      <el-row :gutter="5">
        <el-col :span="11">
          <div class="section weather-prof">
            <div class="section-title">
              <svg-icon class="svg-logo" icon-class="weather"/>
              <span>气象基本参数</span>
            </div>
            <div id="weather-info" class="section-info clearfix">
              <!--<ul>-->
              <!--<li class="clearfix"><span>品牌</span>：<i>美的</i></li>-->
              <!--<li class="clearfix"><span>型号</span>：<i>GY-250</i></li>-->
              <!--<li class="clearfix"><span>序列号</span>：<i>GY-123456</i></li>-->
              <!--<li class="clearfix"><span>安装时间</span>：<i>2018年10月20日</i></li>-->
              <!--</ul>-->
              <ul id="weather-ul2">
                <li v-for="item in weatherProf2" :key="item.object" class="clearfix">
                  <span>{{ item.profItem }}</span>：<i>{{ item.profParam }}</i> {{ item.unit }}
                </li>
              </ul>
            </div>
          </div>
          <div class="section weather-plate">
            <div class="section-title">
              <svg-icon class="svg-logo" icon-class="fengxiang"/>
              <span>风向风速</span>
            </div>
            <div class="section-info">
              <div id="campus" :style="{width: '100%',height: '300px'}"/>
            </div>
          </div>
        </el-col>
        <el-col :span="13" class="weather-wrap">
          <div class="section weather-hour">
            <div class="section-title weather-title">
              <el-col :span="11" class="weather-title-left">
                <svg-icon class="svg-logo" icon-class="intellFanLogo"/>
                <span>时段风速</span>
              </el-col>
              <el-col :span="8" class="weather-title-right">
                <el-date-picker
                  :picker-options="pickerOptions1"
                  v-model="value2"
                  align="right"
                  type="date"
                  placeholder="选择日期"/>
              </el-col>
            </div>
            <div class="section-info">
              <div id="graph" :style="{width: '100%', height: '300px'}"/>
            </div>
          </div>
          <div class="section weather-hour">
            <div class="section-title weather-title">
              <el-col :span="11" class="weather-title-left">
                <svg-icon class="svg-logo" icon-class="intellFanLogo"/>
                <span>2min/10min 平均风速</span>
              </el-col>
              <el-col :span="13" class="weather-title-right">
              </el-col>
            </div>
            <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
            <!--<el-tab-pane label="2min" name="first">-->
            <!--<div id="average" :style="{width: '100%', height: '300px'}"></div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="10min" name="second">-->
            <!--<div id="average2" :style="{width: '100%', height: '300px'}"></div>-->
            <!--</el-tab-pane>-->
            <!--</el-tabs>-->
            <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
            <!--<el-tab-pane v-for="item in avSpeedArr" :label="item.avSpeedName" :name="item.avSpeedSeries">-->
            <!--<div id="average" :style="{width: '100%', height: '300px'}"></div>-->
            <!--</el-tab-pane>-->
            <!--</el-tabs>-->
            <ul class="avSpeed-tab">
              <li
                v-for="(item,index) in avSpeedArr"
                :key="item.object"
                :class="item.doTimeTabActive?'timeItemChange':'timeItemNotChange'"
                class="avtabItem"
                @click="avWindSpTab(index)">
                {{ item.avSpeedName }}
              </li>
            </ul>
            <div v-show="avSpeed2min" class="curve-time1">
              <el-time-select
                placeholder="2min起始时间"
                v-model="startTime1"
                :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"/>
              <el-time-select
                placeholder="2min结束时间"
                v-model="endTime1"
                :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
                minTime: startTime1
              }"/>
            </div>
            <div v-show="avSpeed10min" class="curve-time2">
              <el-time-select
                placeholder="10min起始时间"
                v-model="startTime2"
                :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00'
              }"/>
              <el-time-select
                placeholder="10min结束时间"
                v-model="endTime2"
                :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
                minTime: startTime2
              }"/>
            </div>
            <div class="section-info">
              <div v-show="avSpeed2min" id="average" :style="{width: '450px', height: '280px'}" class="curve-box"/>
              <div v-show="avSpeed10min" id="average2" ref="average2" :style="{width: '450px', height: '280px'}" class="curve-box"/>
              <!--<lineGraph :id="average" :data="option" style="height:300px;"></lineGraph>-->
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
  //  name: 'weather',
  data() {
    return {
      weatherProf2: [
        {
          profItem: '品牌',
          profParam: '美的'
        },
        {
          profItem: '型号',
          profParam: 'GY-250'
        },
        {
          profItem: '序列号',
          profParam: 'GY-123456'
        },
        {
          profItem: '安装时间',
          profParam: '2018年10月20日'
        },
        {
          profItem: 'IP地址',
          profParam: '255.255.255.255'
        },
        {
          profItem: '温度',
          profParam: '20',
          unit: '℃'
        },
        {
          profItem: '湿度',
          profParam: '30',
          unit: '%'
        },
        {
          profItem: '气压(QNH)',
          profParam: '3.0',
          unit: 'Bar'
        },
        {
          profItem: '气压(QFE)',
          profParam: '2.0',
          unit: 'Bar'
        },
        {
          profItem: '电流',
          profParam: '0.6',
          unit: 'A'
        }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: new Date(),
      activeName: 'first',
      avSpeedArr: [
        {
          avSpeedName: '2min',
          avSpeedSeries: 'first',
          doTimeTabActive: true
        },
        {
          avSpeedName: '10min',
          avSpeedSeries: 'second',
          doTimeTabActive: false
        }
      ],
      avSpeed2min: true,
      avSpeed10min: false,
      startTime1: '',
      endTime1: '',
      startTime2: '',
      endTime2: ''
    }
  },
  mounted() {
    this.graphInfo()
    this.campusInfo()
    this.averageInfo()
    this.averageInfo2()
    this.selfAdaption()
  },
  methods: {
    graphInfo() {
      const graph = echarts.init(document.getElementById('graph'))
      graph.setOption({
        title: {
          text: '24小时风速曲线',
          subtext: '时段内风速',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#ff0048', '#ffff00'],
        legend: {
          data: [
            { name: '最大值', textStyle: { color: '#ffffff' }},
            { name: '最小值', textStyle: { color: '#ffffff' }}
          ]
        },
        //     toolbox: {
        //       show: true,
        //       feature: {
        //         dataZoom: {
        //           yAxisIndex: 'none'
        //         },
        //         dataView: {readOnly: false},
        //         magicType: {type: ['line', 'bar']},
        //         restore: {},
        //         saveAsImage: {}
        //       }
        //     },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '00:02', '00:04', '00:06', '00:08', '00:10', '00:12', '00:14',
            '00:16', '00:18', '00:20', '00:22', '00:24', '00:26', '00:28', '00:30', '00:32',
            '00:34', '00:36', '00:38', '00:40', '00:42', '00:44', '00:46', '00:48', '00:50', '00:52',
            '00:54', '00:56', '00:58', '1:00'
          ],
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 20,
          interval: 4,
          axisLabel: {
            formatter: '{value} m/s',
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        series: [
          {
            name: '最大值',
            type: 'line',
            smooth: true,
            data: [12, 13, 14, 15, 16, 18, 19, 20, 19, 20,
              12, 13, 14, 15, 16, 18, 19, 20, 19, 20,
              12, 13, 14, 15, 16, 18, 19, 20, 19, 20,
              12, 13, 14, 15, 16, 18, 19, 20, 19, 20,
              12, 13, 14, 15, 16, 18, 19, 20, 19, 20,
              12, 13, 14, 15, 16, 18, 19, 20, 19, 20],
            lineStyle: {
              normal: {
                color: '#ff0048'
              }
            }
            //   markPoint: {
            //     data: [
            //       {type: 'max', name: '最大值'},
            //       {type: 'min', name: '最小值'}
            //     ]
            //   },
            //   markLine: {
            //     data: [
            //       {type: 'average', name: '平均值'}
            //     ]
            //   }
          },
          {
            name: '最小值',
            type: 'line',
            smooth: true,
            data: [8, 6, 7, 8, 9, 10, 8, 6, 5, 4,
              8, 6, 7, 8, 9, 10, 8, 6, 5, 4,
              8, 6, 7, 8, 9, 10, 8, 6, 5, 4,
              8, 6, 7, 8, 9, 10, 8, 6, 5, 4,
              8, 6, 7, 8, 9, 10, 8, 6, 5, 4,
              8, 6, 7, 8, 9, 10, 8, 6, 5, 4
            ],
            lineStyle: {
              normal: {
                color: '#ffff00'
              }
            }
            //   markPoint: {
            //     data: [
            //       {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
            //     ]
            //   },
            //   markLine: {
            //     data: [
            //       {type: 'average', name: '平均值'},
            //       [{
            //         symbol: 'none',
            //         x: '90%',
            //         yAxis: 'max'
            //       }, {
            //         symbol: 'circle',
            //         label: {
            //           normal: {
            //             position: 'start',
            //             formatter: '最大值'
            //           }
            //         },
            //         type: 'max',
            //         name: '最高点'
            //       }]
            //     ]
            //   }
          }
        ]
      })
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
            fontSize: 18,
            color: '#333'
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
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    avWindSpTab(key) {
      this.avSpeedArr.forEach((val) => {
        val.doTimeTabActive = false
      })
      this.avSpeedArr[key].doTimeTabActive = !this.avSpeedArr[key].doTimeTabActive
      if (key === 0) {
        this.avSpeed2min = true
        this.avSpeed10min = false
      } else {
        this.avSpeed2min = false
        this.avSpeed10min = true
      }
    },
    averageInfo() {
      const average = echarts.init(document.getElementById('average'))
      average.setOption({
        title: {
          text: '2min平均风速',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '00:02', '00:04', '00:06', '00:08', '00:10', '00:12', '00:14',
            '00:16', '00:18', '00:20', '00:22', '00:24', '00:26', '00:28', '00:30', '00:32',
            '00:34', '00:36', '00:38', '00:40', '00:42', '00:44', '00:46', '00:48', '00:50',
            '00:52', '00:54', '00:56', '00:58', '1:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} m/s'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 6,
            color: 'green'
          }, {
            gt: 6,
            lte: 8,
            color: 'red'
          }, {
            gt: 8,
            lte: 14,
            color: 'green'
          }, {
            gt: 14,
            lte: 17,
            color: 'red'
          }, {
            gt: 17,
            color: 'green'
          }]
        },
        series: [
          {
            name: '2min平均速度',
            type: 'line',
            smooth: true,
            data: [13, 10, 13, 14, 12, 13, 10, 13, 14, 12,
              13, 10, 13, 14, 12, 13, 10, 13, 14, 12,
              13, 10, 13, 14, 12, 13, 10, 13, 14, 12,
              13, 10, 13, 14, 12, 13, 10, 13, 14, 12,
              13, 10, 13, 14, 12, 13, 10, 13, 14, 12,
              13, 10, 13, 14, 12, 13, 10, 13, 14, 12]
          }
        ]
      })
    },

    averageInfo2() {
      const average2 = this.$echarts.init(this.$refs['average2'])
      var average2_option = {
        title: {
          text: '10min平均风速',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '1:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} m/s'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 6,
            color: 'green'
          }, {
            gt: 6,
            lte: 8,
            color: 'red'
          }, {
            gt: 8,
            lte: 14,
            color: 'green'
          }, {
            gt: 14,
            lte: 17,
            color: 'red'
          }, {
            gt: 17,
            color: 'green'
          }]
        },
        series: [
          {
            name: '10min平均速度',
            type: 'line',
            smooth: true,
            data: [13, 10, 13, 14, 12, 13, 10]
          }
        ]
      }
      average2.setOption(average2_option)
    },

    selfAdaption() {
      const _this = this
      setTimeout(() => {
        window.addEventListener('resize', function() {
          _this.$refs.average2.resize()
        })
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  .section {
    margin: 0 .5% 2%;
    .section-info {
      height: 300px;
      .curve-box {
        margin: 0 auto;
      }
    }
  }
  /*weather*/
  .weather-prof {
    #weather-info {
      ul {
        list-style: none;
        float: left;
        //margin-right: 50px;
        width: 100%;
        margin-top: 50px;
        line-height: 20px;
        li {
          float: left;
          width: 50%;
          span {
            width: 61px;
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
      #weather-ul2 {
        li {
          &:nth-child(6) {
            i {
              color: #5245ff;
            }
          }
          &:nth-child(7) {
            i {
              color: #fff100;
            }
          }
          &:nth-child(-n+10):nth-child(n+8) {
            i {
              color: #00ffff;
            }
          }
        }
      }
    }
  }
  .weather-plate {
    .section-info {
      height: 330px;
    }
  }
  .weather-wrap {
    .weather-hour {
      width: 100%;
      .weather-title {
        display: flex;
        justify-content: space-between;
        .weather-title-right {
          height: 100%;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              height: 100%;
            }
            .el-input__prefix {
              .el-input__icon {
                line-height:inherit;
              }
            }
            .el-input__suffix {
              height: 100%;
              .el-input__suffix-inner {
                .el-input__icon {
                  line-height:inherit;
                }
              }
            }
          }
        }
      }
      .avSpeed-tab {
        border-bottom: 1px solid #434343 !important;
        list-style: none;
        height: 100%;
        display: inline-flex;
        width: 100%;
        justify-content: space-around;
        li {
          height: 100%;
          position: relative;
          padding: 8px 0;
          cursor: pointer;
          &:after {
            content: '';
            display: inline-block;
            width: 100%;
            height: 2px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
        .timeItemChange {
          color: #00ffff;
          &:after {
            background-color: #00ffff;
          }
        }
      }
      .section-info {
        width: 100%;
        box-sizing: border-box;
        height: 330px;
      }
    }
  }
</style>
