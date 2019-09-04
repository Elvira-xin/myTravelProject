<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机" />
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字" />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password" />
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button class="submit" type="primary" plain @click="handleRegSubmit">
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    // 验证两次密码是否一致
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      code: '',
      // 表单数据
      form: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        checkPassword: ''
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      if (!this.form.username) {
        this.$message.warning('手机号码不能为空')
      }
      this.$axios({
        url: '/captchas',
        method: 'post',
        data: { tel: this.form.username }
      }).then((res) => {
        console.log(res)
        // const { code } = res.data
        this.code = res.data.code
        this.$alert(`模拟验证码为:${this.code}`)
      })
    },

    // 注册
    handleRegSubmit () {
      console.log(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { checkPassword, ...vals } = this.form
          this.$axios({
            url: '/accounts/register',
            method: 'post',
            data: vals
          })
            .then((res) => {
              // console.log(res)
              this.$store.commit('user/setUserInfo', res.data)
              this.$message.success('注册成功')
              setTimeout(() => {
                this.$router.push({ name: 'index' })
              }, 2000)
            })
            .catch(() => {
              if (this.form.captcha !== this.code) {
                this.$message.error('验证码错误')
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
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
