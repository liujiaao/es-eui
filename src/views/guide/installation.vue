<template>
  <div class="guide-content">
    <h1 class="content-title">安装</h1>
    
    <h2 class="content-subtitle">npm 安装</h2>
    <p>推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。</p>
    <pre><code>npm install es-eui --save</code></pre>

    <p>或者使用 yarn：</p>
    <pre><code>yarn add es-eui</code></pre>

    <h2 class="content-subtitle">引入 ES-EUI</h2>
    <p>在 main.js 中写入以下内容：</p>
    <pre><code>import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 ES-EUI
import esEui from 'es-eui'
import http from '@/utils/request'

Vue.use(ElementUI)

// 注册 ES-EUI 并配置全局方法
Vue.use(esEui, {
  EsTable: {
    methods: {
      // 配置表格数据请求方法
      $httpRequest({ url, headers, formParams, ...options }) {
        const opt = {
          baseURL: '',
          url,
          contentType: 'application/json',
          method: options?.method || 'POST',
        }
        if (opt.method.toUpperCase() === 'GET') {
          opt.params = formParams
        } else {
          opt.data = formParams
        }
        return http(opt)
      },
      // 配置分页布局
      paginationLayout: () => ({
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 50, 100],
        isSmall: true,
        background: false
      }),
      // 配置响应数据字段映射
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
      // 配置表单数据请求方法
      $httpRequest({ url, headers, formParams, ...options }) {
        const opt = {
          baseURL: '',
          url,
          contentType: 'application/json',
          method: options.method || 'POST',
        }
        if (opt.method.toUpperCase() === 'GET') {
          opt.params = formParams
        } else {
          opt.data = formParams
        }
        return http(opt)
      },
      // 配置响应数据字段映射
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')</code></pre>

    <h2 class="content-subtitle">按需引入（推荐）</h2>
    <p>借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。</p>
    
    <p>首先，安装 babel-plugin-component：</p>
    <pre><code>npm install babel-plugin-component -D</code></pre>

    <p>然后，将 .babelrc 修改为：</p>
    <pre><code>{
  "plugins": [
    [
      "component",
      {
        "libraryName": "es-eui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}</code></pre>

    <h2 class="content-subtitle">完整引入示例</h2>
    <pre><code>import Vue from 'vue'
import { EsTable, EsForm, useDialog } from 'es-eui'

Vue.component('EsTable', EsTable)
Vue.component('EsForm', EsForm)
Vue.prototype.$useDialog = useDialog</code></pre>

    <div class="tip">
      <p><strong>提示</strong>：完整引入和按需引入两种方式可任选其一，但建议在生产环境使用按需引入以减小打包体积。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuideInstallation'
}
</script>
