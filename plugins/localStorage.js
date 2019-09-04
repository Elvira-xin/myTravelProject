import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'store' // 存储本地的键
    })(store)
  })
}
