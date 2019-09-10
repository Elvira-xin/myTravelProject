/* eslint-disable standard/no-callback-literal */
/* eslint-disable standard/no-callback-literal */
<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        :class="{active: index === currentTab}"
        @click="handleSearchTab(item,index)"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>

    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          :placeholder="nowDate"
          style="width: 100%;"
          @change="handleDate"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      nowDate: '',
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      form: {
        departDate: '',
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: ''
      }
    }
  },
  mounted () {
    const value = new Date()
    this.nowDate = moment(value).format('YYYY-MM-DD')
  },
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) {
      // console.log(item, index)
      if (index === 1) {
        this.$alert('目前暂不支持往返，请使用单程选票！', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
      // cb([
      //   { value: 1 },
      //   { value: 2 },
      //   { value: 3 }
      // ])
      if (!value) {
        return cb([])
      }
      this.$axios({
        url: '/airs/city',
        params: { name: value }
      }).then((res) => {
        // console.log(res.data)
        const { data } = res.data
        // console.log(data)
        const newData = []
        data.forEach((v) => {
          v.value = v.name.replace('市', '')
          newData.push(v)
          this.form.departCity = newData[0].value
          this.form.departCode = newData[0].sort
        })
        cb(newData)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch (value, cb) {
    //   cb([
    //     { value: 1 },
    //     { value: 2 },
    //     { value: 3 }
    //   ])
      if (!value) {
        cb([])
        return
      }
      this.$axios({
        url: '/airs/city',
        params: { name: value }
      }).then((res) => {
        // console.log(res.data)
        const { data } = res.data
        // console.log(data)
        const newData = []
        data.forEach((v) => {
          v.value = v.name.replace('市', '')
          newData.push(v)
          // console.log(newData)
          this.form.destCity = newData[0].value
          this.form.destCode = newData[0].sort
        })
        cb(newData)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      // console.log(item)
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate (value) {
      this.form.departDate = moment(value).format('YYYY-MM-DD')
    },
    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
      console.log(this.form)
      // 表单验证
      const { departCity, destCity, departDate } = this.form
      if (!departCity) {
        this.$alert('请选择出发城市', '提示', { confirmButtonText: '确定' })
        return
      }
      if (!destCity) {
        this.$alert('请选择到达城市', '提示', { confirmButtonText: '确定' })
        return
      }
      if (!departDate) {
        this.$alert('请选择出发时间', '提示', { confirmButtonText: '确定' })
      }
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
      //添加数据到本地
      const arr=JSON.parse(localStorage.getItem('airs'))||[];
      arr.push(this.form)
      localStorage.setItem('airs',JSON.stringify(arr))
    }
  }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
