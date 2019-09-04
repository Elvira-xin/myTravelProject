// 数据源
export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})
export const mutations = {
  // mutations固定第一个参数是state，第二个参数data不是必须的，是调用方法时候传入的参数
  setUserInfo (state, data) {
    // 后台返回的用户信息
    state.userInfo = data
  },
  clearUserInfo (state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  }
}

// export const actions = {
//   login ({ commit }, data) {
//     return this.$axios({
//       url: '/accounts/login',
//       method: 'post',
//       data
//     }).then((res) => {
//     //   console.log(res)
//       const data = res.data
//       // 保存到state
//       commit('setUserInfo', data)
//     })
//   }
// }
