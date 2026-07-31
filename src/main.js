import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import http from '@/utils/server/request.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'mini' })
// es-eui 使用 Vue 2.6.x，原生不支持 Composition API —— 需要手动注册 polyfill。
// @es-plus/vue2 1.1.0+ 的 install() 内置了 alreadyInstalled 检测，不会重复注册。
// Vue.use(VueCompositionAPI)
import EsPlus from '@es-plus/vue2'
import '@es-plus/vue2/dist/style.css'

Vue.use(EsPlus, {
    EsTable: {
        methods: {
            $httpRequest({ url, headers, formParams, ...options }) {

                const opt = {
                    baseURL: '',
                    url,
                    contentType: 'application/json',
                    method: options?.method || 'POST',
                    headers: {
                        ...(headers || {}),
                        // 'Access-Control-Allow-Origin': '*',

                    },
                    //   data: formParams
                    // ...options,
                }
                if (opt.method.toUpperCase() === 'GET') {
                    opt.params = formParams
                } else {
                    opt.data = formParams
                }

                return http(opt)
            },
            paginationLayout: () => ({
                layout: 'total, sizes, prev, pager, next, jumper',
                pageSizes: [10, 20, 50, 100],
                isSmall: true,
                background: false
            }),
            // 配置自动查询字段输出
            configQueryfieldOutput() {
                return {
                    total: 'total',
                    pageSize: 'pageSize',
                    current: 'pageIndex',
                    tableData: 'data'
                }
            }
        }
    },
    EsForm: {
        methods: {
            $httpRequest({ url, headers, formParams, ...options }) {
                const opt = {
                    baseURL: '',
                    url,
                    contentType: 'application/json',
                    method: options.method || 'POST',
                    // data: formParams
                    // ...options,

                }
                if (opt.method.toUpperCase() === 'GET') {
                    opt.params = formParams
                } else {
                    opt.data = formParams
                }
                return http(opt)
            },
            // 配置自动查询字段输出
            fieldFieldOutput() {
                return {
                    total: 'total',
                    pageSize: 'pageSize',
                    current: 'pageIndex',
                    listData: 'data'
                }
            }
        }
    }
})
Vue.config.productionTip = false

// 全局错误处理
Vue.config.errorHandler = function (err, vm, info) {
    console.error('Vue Error:', err, info)
}

// 全局 Promise 错误处理
window.addEventListener('unhandledrejection', event => {
    console.warn('Unhandled promise rejection:', event.reason)
    event.preventDefault()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
