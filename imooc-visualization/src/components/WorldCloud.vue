
<template>
  <div>
     <div>【关键词条】</div>
     <div ref="target" class="w-full h-full" ></div>
  </div>
</template>

<script  setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';
//引入下载的包，然后才能使用文档云图
import 'echarts-wordcloud'

const props = defineProps({
  data: {
    type: Object,
    required:true
  }
})

// 设置随机颜色的一个方法
const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}


let mChart = null
const target = ref(null)
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const option = {
    series: [
      {
        type: 'wordCloud',
        sizeRange: [8, 46],
        rotationRange: [0, 0],
        gridSize: 0,
        layoutAnimation: true,
        textStyle: {
          color:randomRGB
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color:'#000'
          }
        },
        data:props.data.datas
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