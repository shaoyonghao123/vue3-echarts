<template>
  <div>
    <div>【服务资源占用比】</div>
   <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted ,watch} from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
console.log(props.data)
// 初始化
let mChart = null
const target = ref(null)
// 拿到dom元素
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

// 设置一个方法放置配置实例
const renderChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: props.data.servers.map(item => item.name),
      // 坐标轴刻度标签的相关设置
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      max: function (value) {
        return parseInt(value.max * 1.2)
     }
    },
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLaber:true
    },
    series: [
      {

        type: 'bar',
        data: props.data.servers.map((item) => ({
          name: item.name,
          value:item.value
        })),
        // 柱子图形样式
        itemStyle: {
          // 柱条颜色
          color: '#479AD3',
          // 统一设置四个角的圆角大小
          barBorderRadius: 5,
          // 阴影颜色
          shadowColor: 'rgba(0,0,0,0.3)',
          // 阴影的模糊大小
          shadowBlur:5
        },
        // 柱条的宽度，不设时自适应
        barWidth:12,
        // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
        label: {
          // 是否显示标签
          show: true,
          // 标签的位置
          position: 'top',
          // 文本样式
          color: '#fff',
        //  标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
          // 字符串模板 模板变量有：
          // {a}：系列名。
          // {b}：数据名。
          // {c}：数据值。
        formatter:'{c}%'
        }
      }
    ]
  }
  // 将实例方法给实例对象
  mChart.setOption(option)
}

// 监听数据的变化
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped></style>
