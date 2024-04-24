<template>
  <!-- bg-[url背景图片需要自定义 v-if="data"只有当data中有数据了，才会进行渲染-->
  <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden" v-if="data">
    <!-- 左 -->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col" >
    <!-- 横向柱状图   从父组件中将数据传递给子组件  :data="data.regionData   -->
    <HorizontalBar class="h-1/3 box-border pb-4"  :data="data.regionData"  />
    <!-- 雷达图 -->
    <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
    <!-- 关系图 -->
    <Relation class="h-1/3 " :data="data.relationData"/>
    </div>
    <!-- 中 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--数据总览图 -->
    <TotalData class="bg-opacity-50 bg-slate-800 p-3 " :data="data.totalData"/>
    <!-- 地图可视化 -->
    <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"/>
    </div>
    <!-- 右 -->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
       <!-- 竖向柱状图 -->
    <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"/>
    <!-- 环形图 -->
    <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData"/>
    <!-- 文档云图 -->
    <WorldCloud class="h-1/3 " :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<script  setup>
import HorizontalBar from './components/HorizontalBar.vue';
import MapChart from './components/MapChart.vue'
import RadarBar from './components/RadarBar.vue'
import Relation from './components/Relation.vue'
import RingBar from './components/RingBar.vue'
import TotalData from './components/TotalData.vue'
import VerticalBar from './components/VerticalBar.vue'
import WorldCloud from './components/WorldCloud.vue'
// 引入接口
import { getVisualization} from './api/visualization'
// 引入响应式
import{ref} from 'vue'
// 设置初始值为null，所有数据都放到了data变量里
const data = ref(null)
//设置一个方法
const loadData = async () => {
  data.value = await getVisualization()
  console.log(data.value);
}
loadData()

//定时获取更新的数据 setInterval,3秒不断重复执行
setInterval(() => {
  loadData()
}, 3000);

</script>

<style lang="scss" scoped>

</style>