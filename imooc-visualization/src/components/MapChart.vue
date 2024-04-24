
<template>
  <div>

     <div ref="target" class="w-full h-full" ></div>
  </div>
</template>

<script  setup>
import { ref, onMounted, } from 'vue'
import mapJson from '../assets/MapData/china.json'
import * as echarts from 'echarts';


const props = defineProps({
  data: {
    type: Object,
    required:true
  }
})


let mChart = null
const target = ref(null)
onMounted(() => {
  // echarts 渲染
  echarts.registerMap('china',mapJson)
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    // 时间线，时间线每更换一次年份，柱形图跟着刷新数据变化
    timeline: {
      // 数据
      data: props.data.voltageLevel,
      // 类目轴
      axisType: 'category',
      // 自动切换
      autoPlay: true,
      // 间隔时间
      playInterval: 3000,
      // 位置
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      // 轴的文本标签
      label: {
        // 默认状态
      mormal: {
        textStyle: {
          color:'#ddd'
        }
        },
      // 高亮状态
      emphasis: {
        textStyle: {
          color:'#fff'
        }
      }
      },
      // 文字大小
      symbolSize: 10,
      // 线的样式
      lineStyle: {
        color:'#555'
      },
      // 选中点的图形样式
      checkpointStyle: {
        borderColor: '#888',
        borderWidth:2
      },
      // 『控制按钮』的样式。『控制按钮』包括：『播放按钮』、『前进按钮』、『后退按钮』
      controlStyle: {
        // 上一步按钮
        showNextBtn: true,
        // 下一步按钮
        showPrevBtn: true,
        // 默认样式
        mormal: {
          color: '#666',
          // 图形的描边颜色
          borderColor:'#666'
        },
        // 高亮
        emphasis: {
          color: '#aaa',
          borderColor:'#aaa'
        }
      }
    },
    //柱形图右侧展示
    baseOption: {
      grid: {
        right: '2%',
        top: '15%',
        bottom: '10%',
        width:'20%'
      },
      //  地图的配置
      geo: {
        // 展示
        show: true,
        // 中国地图
        map: 'china',
        // 开启缩放
        roam: true,
        // 初始缩放
        zoom: 0.8,
        // 中心点
        center: [113.83531246, 34.0267395887],
        //  默认状态下省份样式
        itemStyle: {
          normal: {
            // 边框色值
            borderColor: 'rgba(147,235,248,1)',
            // 边框宽度
            borderWidth: 1,
            // 区域颜色
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                // 0%处的颜色
                {
                  offset: 0,
                  color:'rgba(147,235,248,0)'
                },
                // 100%处的颜色
                {
                  offset: 1,
                  color:'rgba(147,235,248,.2)'
                }
              ],
              //  缺省为false
              globalCoord:false
           }
          },
          // 鼠标移入的色值
          emphasis: {
          areaColor: '#389BB7',
         borderWidth:0
       }
        }
    }
    },
    // 绑定时间轴的多个图表
    options:[]
  }
// 为每一年度的图表添加数据
  props.data.voltageLevel.forEach((item,index) => {
    options.options.push({
      backgroundColor: '#142037',
      title: [
        // 主标题，对应地图
        {
          text: '2019-2023 年度数据统计',
          left: '0%',
          top: '0%',
          textStyle: {
            color: '#ccc',
             fontSize:30
          }
        },
        // 副标题，对应柱形图
        {
          id: 'statistic',
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#ccc',
            fontSize:20
          }
        }
      ],
      xAxis: {
        // 数据轴
        type: 'value',
        // 是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度
        scale: true,
        //x轴的位置
        position: 'top',
        // 不显示分割线
        splitLine: {
          show:false
        },
        // 不显示轴线
        axisLine: {
          show:false
        },
        // 不显示刻度尺
        axisTick: {
          show:false
        },
        // 类别文字
        axisLabel: {
          margin: 2,
          textStyle: {
            color:'#aaa'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color:'#ddd'
          }
        },
        // 轴刻度
        axisTick: {
          show: false,
          lineStyle: {
            color:'#ddd'
          }
        },
        // 轴标签
        axisLabel: {
          interval: 0,
          textStyle: {
          color:'#ddd'
          }
        },
         //根据年份，获取对应数据
        data:props.data.categoryData[item].map((item)=>item.name)

      },
      // 核心配置
      series: [
        // 柱形图
        {
          type: 'bar',
          // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，
          zlevel: 1.5,
          // 每个柱子的色值
          itemStyle: {
            normal: {
            color:props.data.colors[index]
            }
          },
           //根据年份，获取对应数据
          data:props.data.categoryData[item].map((item)=>item.value)
        },
        // 散点图
        {
          type: 'effectScatter',
          // 使用地理坐标系
          coordinateSystem: 'geo',
          // 数据
          data: props.data.topData[item],
          // 标记大小
          symbolSize: function (val) {
             return val[2] / 4
          },
          // 绘制完成后显示特效
          showEffectOn: 'render',
          // 展示涟漪特效
          rippleEffect: {
            brushType:'stroke'
          },
          // 文字
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show:true
            }
          },
          // 每一项的配置
          itemStyle: {
            normal: {
              color: props.data.colors[index],
              // 阴影配置
              shadowBlur: 5,
              shadowColor:props.data.colors[index]
            }
          },

        }

      ]
    })
  })



  mChart.setOption(options)
}




</script>

<style lang="scss" scoped>

</style>