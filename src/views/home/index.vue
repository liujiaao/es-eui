<template>
  <div class="home">
    <!-- Hero 区域 -->
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">ES-EUI</h1>
          <p class="hero-desc">基于 Vue 2.0 和 Element UI 的企业级组件库</p>
          <p class="hero-subdesc">提供高效、灵活、易用的表单、表格、弹窗等组件，助力中后台系统快速开发</p>
          <div class="hero-actions">
            <router-link to="/guide" class="btn btn-primary">开始使用</router-link>
            <router-link to="/component/installation" class="btn btn-default">查看组件</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性展示 -->
    <div class="features">
      <div class="container">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">
              <i class="el-icon-s-grid"></i>
            </div>
            <h3>EsTable 表格</h3>
            <p>支持分页、排序、筛选、行内编辑、批量操作等丰富功能，数据展示更灵活</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="el-icon-s-order"></i>
            </div>
            <h3>EsForm 表单</h3>
            <p>配置化表单生成，支持20+种控件类型，自动验证，大幅提升表单开发效率</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="el-icon-s-promotion"></i>
            </div>
            <h3>useDialog 弹窗</h3>
            <p>函数式调用弹窗，支持JSX渲染，轻松实现复杂交互场景</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <i class="el-icon-link"></i>
            </div>
            <h3>组件联动</h3>
            <p>表格与表单无缝联动，查询、编辑、弹窗一体化解决方案</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速开始 -->
    <div class="quick-start">
      <div class="container">
        <h2 class="section-title">快速开始</h2>
        <div class="install-steps">
          <div class="step">
            <h4>1. 安装组件库</h4>
            <pre><code>npm install es-eui</code></pre>
          </div>
          <div class="step">
            <h4>2. 引入并注册</h4>
            <pre><code>import Vue from 'vue'
import ElementUI from 'element-ui'
import esEui from 'es-eui'

Vue.use(ElementUI)
Vue.use(esEui, {
  EsTable: {
    methods: {
      $httpRequest({ url, formParams }) {
        return axios.post(url, formParams)
      }
    }
  }
})</code></pre>
          </div>
          <div class="step">
            <h4>3. 开始使用</h4>
            <pre><code>&lt;template&gt;
  &lt;es-table
    :columns="columns"
    :options="{ 
      apiParams: { url: '/api/list', model: queryForm }
    }"
  /&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 0;
}

/* Hero 区域 */
.hero {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: #fff;
  padding: 100px 0 120px;
  text-align: center;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 56px;
    font-weight: 600;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  .hero-desc {
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 15px;
    opacity: 0.95;
  }

  .hero-subdesc {
    font-size: 16px;
    opacity: 0.85;
    margin-bottom: 40px;
  }

  .hero-actions {
    .btn {
      display: inline-block;
      padding: 12px 35px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 16px;
      margin: 0 10px;
      transition: all 0.3s;

      &.btn-primary {
        background: #fff;
        color: #409eff;

        &:hover {
          background: #f5f7fa;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
      }

      &.btn-default {
        border: 1px solid rgba(255,255,255,0.5);
        color: #fff;

        &:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }
      }
    }
  }
}

/* 特性展示 */
.features {
  padding: 80px 0;
  background: #fff;

  .feature-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .feature-item {
    text-align: center;
    padding: 30px 20px;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
      transform: translateY(-5px);
    }

    .feature-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 20px;
      background: #ecf5ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 32px;
        color: #409eff;
      }
    }

    h3 {
      font-size: 18px;
      color: #303133;
      margin-bottom: 10px;
      font-weight: 500;
    }

    p {
      font-size: 14px;
      color: #909399;
      line-height: 1.6;
    }
  }
}

/* 快速开始 */
.quick-start {
  padding: 80px 0;
  background: #f5f7fa;

  .section-title {
    text-align: center;
    font-size: 32px;
    color: #303133;
    margin-bottom: 50px;
    font-weight: 400;
  }

  .install-steps {
    max-width: 800px;
    margin: 0 auto;

    .step {
      margin-bottom: 30px;

      h4 {
        font-size: 16px;
        color: #303133;
        margin-bottom: 10px;
        font-weight: 500;
      }

      pre {
        background: #fff;
        border: 1px solid #e6e6e6;
        padding: 15px 20px;
        border-radius: 4px;
        overflow-x: auto;

        code {
          color: #606266;
          font-family: 'Courier New', Consolas, monospace;
          font-size: 13px;
        }
      }
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .features .feature-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
