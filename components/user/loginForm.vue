<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="form.username" placeholder="用户名/手机" />
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input v-model="form.password" placeholder="密码" />
    </el-form-item>
    <span class="form-text" style="margin-left:300px"><nuxt-link to="#">忘记密码</nuxt-link></span>
    <el-form-item>
      <el-button class="submit" type="primary" plain @click="handleLoginSubmit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '13800138000',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLoginSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/accounts/login',
            method: 'post',
            data: this.form
          }).then((res) => {
            // console.log(res)
            this.$message.success('登录成功')
            this.$router.push({ name: 'index' })
          })
            .catch(() => {
              this.$message.error('登录失败')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
