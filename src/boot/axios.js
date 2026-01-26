import { boot } from 'quasar/wrappers'
import axios from 'axios'

const BUILD_VERSION = process.env.BUILD_VERSION
const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  app.config.globalProperties.$build_version = BUILD_VERSION
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, BUILD_VERSION }
