<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div />

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <flightsItem
          v-for="(item,index) in flightsData.flights"
          :key="index"
          :data="item"
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// 引入头部组件
import flightsListHead from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'
export default {
  components: {
    flightsListHead, flightsItem
  },
  data () {
    return {
      flightsData: {},
      dataList: []
    }
  },
  mounted () {
    this.$axios({
      url: '/airs',
      params: this.$route.query // 来自url的五个参数
    }).then((res) => {
      console.log(res)
      this.dataList = res.data.flights
      this.flightsData = res.data
    })
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
