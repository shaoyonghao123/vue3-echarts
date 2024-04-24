

<template>
  <div>
    <!-- 此图是由关系图和路径图组成 -->
       <div>【数据传递信息】</div>
       <div ref="target" class="w-full  h-full"></div>
  </div>
</template>

<script  setup>
import { ref, onMounted, watch, effect } from 'vue'
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
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const option = {
    xAxis: {
      show: false,
      type:'value'
    },
    yAxis: {
      show: false,
      type:'value'
    },
    series: [
      {
        // 关系图
        type: 'graph',
        // 图的布局： 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
        layout: 'none',
       //使用二维的直角坐标系（也称笛卡尔坐标系），通过 xAxisIndex, yAxisIndex指定相应的坐标轴组件
        coordinateSystem: 'cartesian2d',
      // 节点标记的大小
        symbolSize: 26,
        // 当前视角的缩放比例
        z: 3,
        // 标签
        edgeLabel: {
          normal: {
            show: true,
            color: '#fff',
            textStyle: {
              fontSize:14
            },
            // 用来格式化图例文本，支持字符串模板和回调函数两种形式
            formatter: function (params) {
              return params.data.speed
            }
           }
        },
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color:'#5E5E5E'
          }
        },
        // 箭头
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 8,
        data: props.data.relations.map((item) => {
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
               speed: `${item.speed}kb/s`,
                value:item.value
               }
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    colorStops: [
                      {
                          offset:0, color:'#157eff'
                      },
                      {
                          offset:1,color:'#35c2ff'
                        }
                      ]
                    }
                  }
              },
              label: {
                normal: {
                    fontSize:'14'
                  }
                }
              }
             }
        }),
        links: props.data.relations.map((item, index) => ({
             source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle: {
            normal: {
              color: '#12b5d0',
                curveness:0.2
              }
          },
          label: {
            show: true,
            position: 'middle',
              offset:[10,0]
             }
        }))
      },
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          Symbol: 'arrow',
          color: 'rgba(55,155,255,0.6)',
          symbolSize:12
        },
        lineStyle: {
          normal: {
            curveness:0.2
          }
        },
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
					[{ coord: [0, 100] }, { coord: [50, 200] }],
					[{ coord: [50, 200] }, { coord: [100, 100] }],
					[{ coord: [50, 200] }, { coord: [100, 300] }]
        ]
      }
    ]


  }



  mChart.setOption(option)
}

watch(() => props.data, () => {
  renderChart()
})

</script>

<style lang="scss" scoped>

</style>