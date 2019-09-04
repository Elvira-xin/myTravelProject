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
      <div v-if="!$store.state.user.userInfo.token" class="login">
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </div>
      <!--下拉菜单-->
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
            alt
          >
          {{ $store.state.user.userInfo.user.nickname }}
          <i v-if="$store.state.user.userInfo.token" class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="handleOut">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$store.state.user.userInfo.token)
  },
  methods: {
    handleOut () {
      this.$store.commit('user/clearUserInfo')
      this.$message.success('退出成功')
      this.$router.push({ name: 'index' })
    }
  }
}
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
      border-bottom: 5px solid #409eff;
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
.login {
  font-size: 14px;
  &:hover {
    color: #409eff;
  }
}
.el-dropdown-link {
  cursor: pointer;
  &:hover {
    img {
      border: 2px solid #409eff;
    }
  }
}
.el-dropdown-link img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
  box-sizing: border-box;
}
</style>
