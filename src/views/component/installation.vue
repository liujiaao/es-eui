<template>
  <div class="guide-content">
    <h1 class="content-title">安装</h1>
    
    <p>本节将介绍如何在项目中安装和配置 ES-EUI 组件库。</p>

    <h2 class="content-subtitle">环境要求</h2>
    <ul>
      <li>Vue 2.6+</li>
      <li>Element UI 2.15+</li>
      <li>现代浏览器（Chrome、Firefox、Safari、Edge）</li>
    </ul>

    <h2 class="content-subtitle">npm 安装</h2>
    <pre><code>npm install es-eui --save</code></pre>

    <p>或者使用 yarn：</p>
    <pre><code>yarn add es-eui</code></pre>

    <h2 class="content-subtitle">完整引入</h2>
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

// 注册 Element UI
Vue.use(ElementUI)

// 注册 ES-EUI
Vue.use(esEui, {
  EsTable: {
    methods: {
      $httpRequest({ url, formParams }) {
        return axios.post(url, formParams)
      }
    }
  },
  EsForm: {
    methods: {
      $httpRequest({ url, formParams }) {
        return axios.post(url, formParams)
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
    <p>借助 babel-plugin-component，我们可以只引入需要的组件。</p>
    
    <p>首先安装插件：</p>
    <pre><code>npm install babel-plugin-component -D</code></pre>

    <p>配置 .babelrc：</p>
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

    <p>然后在 main.js 中按需引入：</p>
    <pre><code>import Vue from 'vue'
import { EsTable, EsForm, useDialog } from 'es-eui'

Vue.component('EsTable', EsTable)
Vue.component('EsForm', EsForm)
Vue.prototype.$useDialog = useDialog</code></pre>

    <div class="tip">
      <p><strong>下一步</strong>：安装完成后，可以查看 <router-link to="/component/quickstart">快速上手</router-link> 了解基本用法。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentInstallation'
}
</script>
