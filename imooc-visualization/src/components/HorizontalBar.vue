<template>
  <div>
    <div>【大区数据信息】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script  setup>
import { onMounted, ref,watch } from 'vue'
import * as echarts from 'echarts'
// 在vue3的setup中，我们使用defineProps来定义父组件传递的props,是一个宏函数，使用时可不导入
// 接收到了父组件的data
 const props = defineProps({
  data: {
    // 数据类型是对象
    type: Object,
    // 是必要的
    required:true,
  }
 })
// console.log(props.data);
// 构建echarts图表
// 1.初始化数据
let mChart = null
const target = ref(null)
// 这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在服务端渲染应用中用于确保 DOM 相关代码仅在客户端执行。
// 拿到dom数据
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建optin配置对象
const renderChart = () => {
  const options = {
    // x轴展示数据
    xAxis: {
      // 不展示x轴数据
      show: false,
      type: 'value',
      // 数据在柱子上的最大值，value是柱子上的值，
      max: function (value) {
        return parseInt(value.max * 1.2)
      }
    },
    // y轴展示数据
    yAxis: {
      // 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 yAxis.data 设置类目数据。
      type: 'category',
      data: props.data.regions.map((item) => item.name),
      // 反向坐标轴
      inverse: true,
      axisLine: {
        show:false
      },
      axisTick: {
        show:false
      },
      axisLabel: {
        color:'#9eb1c8'
      }
    },
    // 图表绘制的位置，对应上下左右
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // grid 区域是否包含坐标轴的刻度标签
      containLabel:true
    },
    // 核心配置
    series: [
      {
        // 类型是柱子型
        type: 'bar',
        data: props.data.regions.map((item) => ({
          name: item.name, //柱形名称
          value:item.value  //柱形数据
        })),
        showBackground: true,
        backgroundStyle: {
          color:'rgba(180,180,180,0.2)'
        },
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
          position: 'right',
          // 文本样式
         color:'#fff'

        }
    }
    ]
  }
  // 3.将配置对象给初始化数据
  mChart.setOption(options)
}
// 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
  /* watch(()=> person.name,(newValue,oldValue)=>{
    console.log('person.name变化了',newValue,oldValue)
  }) */
// 3.使用watch来监听数据props.data的变化,数据变化后触发renderChart图形
watch(() => props.data, () => {
  renderChart()
})

</script>

<style lang="scss" scoped>

</style>