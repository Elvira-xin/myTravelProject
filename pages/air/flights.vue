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
        <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
    flightsListHead,
    flightsItem
  },
  data () {
    return {
      flightsData: {},
      dataList: [],
      pageIndex: 1, // 当前页
      pageSize: 5, // 页码数
      total: 0 // 总条数
    }
  },
  mounted () {
    this.$axios({
      url: '/airs',
      params: this.$route.query // 来自url的五个参数
    }).then((res) => {
      console.log(res)
      // this.dataList = res.data.flights
      this.flightsData = res.data
      this.total = this.flightsData.flights.length
      this.dataList = this.flightsData.flights.slice(0, this.pageIndex * this.pageSize)
    })
  },
  methods: {
    // setDataList () {
    //   const start = (this.pageIndex - 1) * this.pageSize
    //   const end = this.pageIndex * this.pageIndex
    //   this.dataList = this.flightsData.flights.slice(start, end)
    // },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // console.log(val)
      this.pageSize = val
      // this.setDataList()
      this.dataList = this.flightsData.flights.slice(0, val)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      console.log(val)
      this.pageIndex = val
      // this.setDataList()
      this.dataList = this.flightsData.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
