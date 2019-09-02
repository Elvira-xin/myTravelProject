<template>
  <div>
    <div class="container">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div
            class="banner-img"
            :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat; background-size:contain contain;`
            "
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: []
    }
  },
  mounted () {
    this.$axios({
      url: '/scenics/banners'
    }).then((res) => {
      console.log(res)
      this.banners = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-img{
        width:100%;
        height:100%;
    }
}
</style>
