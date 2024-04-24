<template>
  <div>
    <div>【云端报警风险】</div>
  <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script  setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

    const props = defineProps({
      data: {
        type: Object,
        required:true
     }
    })
   console.log(props.data);

// 1.创建实例，拿到dom元素
let mChart = null
const target = ref(null)
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
//2.设置方法，存放实例配置
const renderChart = () => {
  const option = {
  // 雷达图坐标系
    radar: {
      // 雷达名字
      name: {
        textStyle: {
          color: '#05D5FF',
          fontSize:14
        }
      },
      // 雷达图形状
      shape: 'polygon',
      // 雷达图位置
      center: ['50%', '50%'],
      radius: '80%',
      // 坐标系起始角度，也就是第一个指示器轴的角度
      startAngle: 120,
      axisLine: {
        lineStyle: {
           color:'rgba(5,213,255,.8)'
         }
      },
      // 坐标轴线的样式
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
           color:'rgba(5,213,255,.8)'
        }
      },
      // indicator雷达图的指示器，用来指定雷达图中的多个变量（维度）
      // max指示器的最大值，可选，建议设置,name指示器名称
      indicator: props.data.risks.map((item) => ({
        name: item.name,
         max:100
      })),
      // 坐标轴在 grid 区域中的分隔区域，默认不显示
      splitArea: {
        show:false
      }
    },
    // 坐标极点
    polar: {
      center: ['50%', '50%'],
      radius:'0%'
    },
    //  坐标角度
    angleAxis: {
      min: 0,
      interval: 5,
      // 刻度增长是否是按顺时针，默认顺时针
      clockwise:false
    },
    // 径向轴
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show:true
      }
    },
  series: [
    {

      type: 'radar',
      Symbol: 'Circle',
      SymbolSize: 10,
      itemStyle: {
        normal: {
          color:'#05D5FF'
        }
      },
      areaStyle: {
        normal: {
          color: '#05D5FF',
          opacity:0.5
        }
      },
      lineStyle: {
        width: 2,
        color:'#05D5FF'
      },
      label: {
        normal: {
          show: true,
            color:'#fff'
          }
      },
      data: [
        {
          value: props.data.risks.map((item)=>item.value)
        }
      ]
    }
  ]
};

  mChart.setOption(option)
}

watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped>

</style>