<template>
  <div class="guide-content">
    <h1 class="content-title">全局配置</h1>
    
    <p>在注册 ES-EUI 时，可以通过配置对象对组件进行全局配置。这些配置会影响所有使用该组件的地方。</p>

    <h2 class="content-subtitle">EsTable 配置</h2>
    
    <h3>$httpRequest</h3>
    <p>配置表格数据请求方法，EsTable 会自动调用此方法获取数据。</p>
    <pre><code>Vue.use(esEui, {
  EsTable: {
    methods: {
      $httpRequest({ url, headers, formParams, ...options }) {
        // 返回 Promise
        return axios({
          url,
          method: options.method || 'POST',
          data: formParams,
          headers
        })
      }
    }
  }
})</code></pre>

    <h3>paginationLayout</h3>
    <p>配置分页组件的显示方式和页码选项。</p>
    <pre><code>Vue.use(esEui, {
  EsTable: {
    methods: {
      paginationLayout: () => ({
        layout: 'total, sizes, prev, pager, next, jumper',  // 分页元素
        pageSizes: [10, 20, 50, 100],                       // 每页条数选项
        isSmall: true,                                       // 小型分页
        background: false                                    // 背景色
      })
    }
  }
})</code></pre>

    <h3>configQueryfieldOutput</h3>
    <p>配置响应数据字段映射，用于适配不同后端接口的数据结构。</p>
    <pre><code>Vue.use(esEui, {
  EsTable: {
    methods: {
      configQueryfieldOutput() {
        return {
          total: 'total',           // 总记录数字段
          pageSize: 'pageSize',     // 每页条数字段
          current: 'pageIndex',     // 当前页字段
          tableData: 'data'         // 列表数据字段
        }
      }
    }
  }
})</code></pre>

    <h2 class="content-subtitle">EsForm 配置</h2>
    
    <h3>$httpRequest</h3>
    <p>配置表单数据请求方法，用于表单内 Select 等组件的数据源请求。</p>
    <pre><code>Vue.use(esEui, {
  EsForm: {
    methods: {
      $httpRequest({ url, formParams, ...options }) {
        return axios({
          url,
          method: options.method || 'POST',
          data: formParams
        })
      }
    }
  }
})</code></pre>

    <h3>fieldFieldOutput</h3>
    <p>配置表单关联数据的响应字段映射。</p>
    <pre><code>Vue.use(esEui, {
  EsForm: {
    methods: {
      fieldFieldOutput() {
        return {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex',
          listData: 'data'         // 列表数据字段名
        }
      }
    }
  }
})</code></pre>

    <h2 class="content-subtitle">完整配置示例</h2>
    <pre><code>import Vue from 'vue'
import esEui from 'es-eui'
import axios from 'axios'

Vue.use(esEui, {
  EsTable: {
    methods: {
      $httpRequest({ url, headers, formParams, ...options }) {
        const opt = {
          url,
          method: options?.method || 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        }
        if (opt.method.toUpperCase() === 'GET') {
          opt.params = formParams
        } else {
          opt.data = formParams
        }
        return axios(opt)
      },
      paginationLayout: () => ({
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 50, 100],
        isSmall: true,
        background: false
      }),
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
      $httpRequest({ url, formParams, ...options }) {
        return axios.post(url, formParams)
      },
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
})</code></pre>

    <div class="tip">
      <p><strong>提示</strong>：全局配置中的方法会被组件内部调用，如果返回的 Promise 被 reject，组件会自动处理错误提示。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuideConfiguration'
}
</script>
