<template>
  <div>
    <div class="tabs">
      <span v-for="(val,index) in ['新闻','体育','娱乐']" :key="index" :class="{ active:current===index }" @click="handleClick(index)">{{ val }}</span>
    </div>

    <div v-show="current===0" class="news">
      <ul>
        <li>国庆阅兵</li>
        <li>国庆阅兵</li>
        <li>国庆阅兵</li>
      </ul>
    </div>

    <div v-show="current===1" class="sports">
      <ul>
        <li>中国男篮世界杯</li>
        <li>中国男篮世界杯</li>
        <li>中国男篮世界杯</li>
      </ul>
    </div>

    <div v-show="current===2" class="funny">
      <ul>
        <li>明学</li>
        <li>明学</li>
        <li>明学</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0
    }
  },
  methods: {
    handleClick (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
    .tabs{
        span{
        margin-right: 10px;
        cursor: pointer
        }
        .active{
             color: red
        }
    }
</style>
