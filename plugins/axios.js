import { Message } from 'element-ui'
export default ({ $axios }) => {
  $axios.onError((res) => {
    // console.log(res.response)
    // console.log(123)
    const { message, statusCode } = res.response.data
    if (statusCode === 400) {
      Message.error(message)
    }
  })
}
