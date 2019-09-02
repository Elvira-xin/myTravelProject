<template>
  <div class="container">
    <el-row type="flex" class="main" justify-content="space-between">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
      </div>
      <el-row type="flex" class="nav">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>
      <div class="login">
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px #eee;
}
.main {
  margin: 0 auto;
  // padding: 0 260px;
  width: 1000px;
}
.nav {
  flex: 1;
  margin-left: 15px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      border-bottom: 5px solid #409eff
    }
  }
  .nuxt-link-exact-active {
      color: #fff;
      background: #409eff;
    }
}
.logo {
  padding-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
.login{
  font-size: 14px;
  &:hover{
    color: #409eff
  }
}
</style>
