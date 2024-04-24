<template>
  <div>
       <div>【大区异常处理】</div>
       <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script  setup>
import { ref, onMounted, watch } from 'vue'
//  表示你导入了echarts库中的所有导出（exports），并将它们作为一个命名空间对象（namespaced object）存储在echarts变量中。这意味着你需要通过命名空间来访问echarts的功能和方法，例如：
// echarts.init();
// echarts.setOption();

import * as echarts from 'echarts';
const props = defineProps({
  data: {
    type: Object,
      required:true
    }
})

//1.创建实例
let mChart = null
const target = ref(null)
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

// 定义一个方法处理series里的数据
const getSeriesData = () => {
  const series = []
  props.data.abnormals.forEach((item, index) => {
    //  上层
    series.push({
      name: item.name,
      type: 'pie',
      clockWise: false,
      hoverAnimation: false,
      //外圆与内圆，73,68，并计算圆与圆之间的距离
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show:false
      },
      data: [
        {
          value: item.value,
          name:item.name
        },
        {
          value: 1000,
          itemStyle: {
            color:'rgba(0,0,0,0)',
            borderWidth:0
          },
          tooltip: {
            show:false
          },
          hoverAnimation:false
        }

      ]
    })
    //底层
    series.push({
      name: item.name,
      type: 'pie',
      silent: true,
      z: 1,
      clockWise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show:false
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: 'rgba(3, 31, 62)',
            borderWidth:0
          },
          tooltip: {
            show: false,
          },
          hoverAnimation:false
        },
        {
          value: 2.5,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth:0
          },
          tooltip: {
            show: false,
          },
          hoverAnimation:false
        }
      ]
   })
  })
  return series
}




// 2.设置方法，创建实例配置
const renderChart = () => {
  const options = {
    //图例配置
    legend: {
      show: true,
      icon: 'circle',
      top: '14%',
      left: '60%',
      data: props.data.abnormals.map((item) => item.name),
      width: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
            fontSize: 12,
            lineHeight: 5,
            color:'rgba(255,255,255,.8)'
       }

    },
    //  提示层
    tooltip: {
      show: true,
      trigger: 'item',
      formatter:'{a}<br>{b}:{c}({d}%)'
    },
    //y轴
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show:false
        }
      }
    ],
    //x轴
    xAxis: [
      {show:false}
    ],
    //核心配置
    series: getSeriesData ()



  }


  mChart.setOption(options)
}


//监听数据的变化
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped>

</style>