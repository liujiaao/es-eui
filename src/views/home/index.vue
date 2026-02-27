<template>
  <div class="home">
    <!-- Hero 区域 -->
    <div class="hero">
      <!-- 动态背景 -->
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="particles">
          <span v-for="i in 20" :key="i" class="particle"></span>
        </div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <!-- Logo 动画 -->
          <div class="hero-logo">
            <div class="logo-icon">
              <span class="logo-text">ES</span>
            </div>
          </div>
          
          <!-- 主标题 -->
          <h1 class="hero-title">
            <span class="gradient-text">ES-EUI</span>
          </h1>
          
          <!-- 副标题 -->
          <p class="hero-desc">
            <span class="typing-text">基于 Vue 2.0 和 Element UI 的企业级组件库</span>
          </p>
          
          <!-- 描述 -->
          <p class="hero-subdesc">
            提供高效、灵活、易用的表单、表格、弹窗等组件，助力中后台系统快速开发
          </p>
          
          <!-- 统计信息 -->
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number" data-count="5">0</span>+
              <span class="stat-label">核心组件</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-count="20">0</span>+
              <span class="stat-label">控件类型</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-count="80">0</span>%
              <span class="stat-label">效率提升</span>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="hero-actions">
            <router-link to="/guide" class="btn btn-primary">
              <span>开始使用</span>
              <i class="el-icon-right"></i>
            </router-link>
            <router-link to="/component/installation" class="btn btn-default">
              <span>查看组件</span>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
          
          <!-- 滚动提示 -->
          <div class="scroll-hint">
            <div class="mouse">
              <div class="wheel"></div>
            </div>
            <span>向下滚动</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性展示 -->
    <div class="features">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">核心特性</span>
          <h2 class="section-title">为什么选择 ES-EUI</h2>
          <p class="section-desc">精心设计的组件，让中后台开发更简单高效</p>
        </div>
        
        <div class="feature-list">
          <div class="feature-item" v-for="(feature, index) in features" :key="index" :class="{ 'fade-in': true }" :style="{ animationDelay: index * 0.1 + 's' }">
            <div class="feature-icon" :class="feature.color">
              <i :class="feature.icon"></i>
            </div>
            <div class="feature-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
            <div class="feature-hover"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码演示 -->
    <div class="code-showcase">
      <div class="container">
        <div class="showcase-grid">
          <div class="showcase-text">
            <span class="section-badge">简洁配置</span>
            <h2 class="section-title">几行代码，搞定复杂表单</h2>
            <p class="section-desc">
              通过 JSON 配置即可生成复杂的表单和表格，告别繁琐的模板代码，
              让开发效率提升 80%
            </p>
            <ul class="feature-list-mini">
              <li><i class="el-icon-check"></i> 配置化开发，减少重复代码</li>
              <li><i class="el-icon-check"></i> 内置验证规则，自动处理表单校验</li>
              <li><i class="el-icon-check"></i> 响应式设计，自适应各种屏幕</li>
            </ul>
          </div>
          <div class="code-block-wrapper">
            <div class="code-window">
              <div class="code-header">
                <div class="window-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="code-title">UserList.vue</span>
              </div>
              <div class="code-body">
                <pre><code class="language-vue">&lt;template&gt;
  &lt;es-table
    :columns="columns"
    :options="tableOptions"
  &gt;
    &lt;es-form
      :form-item-list="searchItems"
      :model="searchForm"
    /&gt;
  &lt;/es-table&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      columns: [
        { key: 'name', label: '用户名' },
        { key: 'status', label: '状态' }
      ],
      tableOptions: {
        apiParams: { 
          url: '/api/users' 
        }
      },
      searchForm: {
        name: '',
        status: ''
      },
      searchItems: [
        {
          prop: 'name',
          label: '用户名',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入用户名' }
        },
        {
          prop: 'status',
          label: '状态',
          span: 8,
          formtype: 'Select',
          dataOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ]
        }
      ]
    }
  }
}
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速开始 -->
    <div class="quick-start">
      <div class="container">
        <div class="section-header light">
          <span class="section-badge">三步上手</span>
          <h2 class="section-title">快速开始</h2>
          <p class="section-desc">简单三步，即可在项目中使用 ES-EUI</p>
        </div>
        
        <div class="install-steps">
          <div class="step" v-for="(step, index) in steps" :key="index" :class="{ 'active': activeStep >= index }" @click="setActiveStep(index)">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <transition name="slide">
                <div v-show="activeStep === index" class="step-detail">
                  <pre><code>{{ step.code }}</code></pre>
                </div>
              </transition>
            </div>
            <div class="step-line" v-if="index < steps.length - 1"></div>
          </div>
        </div>
        
        <div class="quick-actions">
          <router-link to="/guide/quickstart" class="btn btn-primary btn-lg">
            查看详细文档
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- CTA 区域 -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>准备好开始了吗？</h2>
          <p>加入使用 ES-EUI 的开发者行列，让中后台开发更高效</p>
          <div class="cta-actions">
            <router-link to="/guide" class="btn btn-primary btn-lg">
              <i class="el-icon-rocket"></i>
              立即开始
            </router-link>
            <a href="https://github.com/liujiaao/es-eui" target="_blank" class="btn btn-outline btn-lg">
              <i class="el-icon-link"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeStep: 0,
      features: [
        {
          icon: 'el-icon-s-grid',
          title: 'EsTable 表格',
          desc: '支持分页、排序、筛选、行内编辑、批量操作等丰富功能，数据展示更灵活',
          color: 'blue'
        },
        {
          icon: 'el-icon-s-order',
          title: 'EsForm 表单',
          desc: '配置化表单生成，支持20+种控件类型，自动验证，大幅提升表单开发效率',
          color: 'purple'
        },
        {
          icon: 'el-icon-s-promotion',
          title: 'useDialog 弹窗',
          desc: '函数式调用弹窗，支持JSX渲染，轻松实现复杂交互场景',
          color: 'green'
        },
        {
          icon: 'el-icon-link',
          title: '组件联动',
          desc: '表格与表单无缝联动，查询、编辑、弹窗一体化解决方案',
          color: 'orange'
        }
      ],
      steps: [
        {
          title: '安装组件库',
          code: 'npm install es-eui element-ui'
        },
        {
          title: '引入并注册',
          code: `import Vue from 'vue'
import esEui from 'es-eui'

Vue.use(esEui, {
  EsTable: {
    methods: {
      $httpRequest({ url, formParams }) {
        return axios.post(url, formParams)
      }
    }
  }
})`
        },
        {
          title: '开始使用',
          code: `<es-table
  :columns="columns"
  :options="{ 
    apiParams: { url: '/api/list' }
  }"
/>`
        }
      ]
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    setActiveStep(index) {
      this.activeStep = index
    },
    initAnimations() {
      // 数字滚动动画
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateNumbers()
            observer.disconnect()
          }
        })
      })
      
      const stats = document.querySelector('.hero-stats')
      if (stats) observer.observe(stats)
    },
    animateNumbers() {
      const numbers = document.querySelectorAll('.stat-number')
      numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'))
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0
        
        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            num.textContent = target
            clearInterval(timer)
          } else {
            num.textContent = Math.floor(current)
          }
        }, 16)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 变量定义
$primary: #409eff;
$primary-dark: #324157;
$text-primary: #1a1a1a;
$text-secondary: #4a5568;
$bg-light: #f7fafc;

// Hero 区域
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  color: #fff;
  
  // 动态背景
  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 20s infinite ease-in-out;
  }
  
  .orb-1 {
    width: 500px;
    height: 500px;
    background: #f093fb;
    top: -10%;
    left: -10%;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: #4facfe;
    bottom: -10%;
    right: -10%;
    animation-delay: -5s;
  }
  
  .orb-3 {
    width: 300px;
    height: 300px;
    background: #43e97b;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -10s;
  }
  
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    animation: particle-float 15s infinite;
  }
  
  @for $i from 1 through 20 {
    .particle:nth-child(#{$i}) {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: random(15) * -1s;
      animation-duration: 10s + random(10);
    }
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 40px 20px;
  }
  
  .hero-logo {
    margin-bottom: 30px;
    
    .logo-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,0.3);
      animation: pulse 2s infinite;
      
      .logo-text {
        font-size: 32px;
        font-weight: 700;
        background: linear-gradient(to right, #fff, #e0e7ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  
  .hero-title {
    font-size: 72px;
    font-weight: 700;
    margin-bottom: 20px;
    letter-spacing: -2px;
    
    .gradient-text {
      background: linear-gradient(135deg, #fff 0%, #e0e7ff 50%, #c7d2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s infinite linear;
      background-size: 200% auto;
    }
  }
  
  .hero-desc {
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 10px;
    opacity: 0.95;
    
    .typing-text {
      border-right: 3px solid rgba(255,255,255,0.7);
      animation: blink 0.8s infinite;
    }
  }
  
  .hero-subdesc {
    font-size: 16px;
    opacity: 0.8;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 40px;
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        font-size: 48px;
        font-weight: 700;
        color: #fff;
        line-height: 1;
      }
      
      .stat-label {
        display: block;
        font-size: 14px;
        opacity: 0.8;
        margin-top: 5px;
      }
    }
  }
  
  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &.btn-primary {
        background: #fff;
        color: #667eea;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          
          i {
            transform: translateX(4px);
          }
        }
        
        i {
          transition: transform 0.3s;
        }
      }
      
      &.btn-default {
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.3);
        color: #fff;
        backdrop-filter: blur(10px);
        
        &:hover {
          background: rgba(255,255,255,0.2);
          border-color: #fff;
          transform: translateY(-3px);
        }
      }
    }
  }
  
  .scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0.7;
    animation: bounce 2s infinite;
    
    .mouse {
      width: 26px;
      height: 40px;
      border: 2px solid #fff;
      border-radius: 13px;
      position: relative;
      
      .wheel {
        width: 4px;
        height: 8px;
        background: #fff;
        border-radius: 2px;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        animation: scroll 1.5s infinite;
      }
    }
    
    span {
      font-size: 12px;
    }
  }
}

// 特性展示
.features {
  padding: 120px 0;
  background: #fff;
  
  .section-header {
    text-align: center;
    margin-bottom: 60px;
    
    .section-badge {
      display: inline-block;
      padding: 6px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .section-title {
      font-size: 40px;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 16px;
    }
    
    .section-desc {
      font-size: 18px;
      color: $text-secondary;
    }
  }
  
  .feature-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
  
  .feature-item {
    position: relative;
    text-align: center;
    padding: 40px 24px;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #e2e8f0;
    transition: all 0.4s ease;
    overflow: hidden;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
      border-color: transparent;
      
      .feature-hover {
        opacity: 1;
      }
      
      .feature-icon {
        transform: scale(1.1);
      }
    }
    
    .feature-hover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    
    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s;
      
      &.blue {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      &.purple {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
      
      &.green {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      
      &.orange {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      }
      
      i {
        font-size: 36px;
        color: #fff;
      }
    }
    
    h3 {
      font-size: 20px;
      color: $text-primary;
      margin-bottom: 12px;
      font-weight: 600;
    }
    
    p {
      font-size: 14px;
      color: $text-secondary;
      line-height: 1.7;
    }
  }
}

// 代码展示
.code-showcase {
  padding: 120px 0;
  background: $bg-light;
  
  .showcase-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  
  .showcase-text {
    .section-badge {
      display: inline-block;
      padding: 6px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .section-title {
      font-size: 36px;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 20px;
      line-height: 1.3;
    }
    
    .section-desc {
      font-size: 16px;
      color: $text-secondary;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    
    .feature-list-mini {
      list-style: none;
      padding: 0;
      
      li {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        color: $text-secondary;
        margin-bottom: 12px;
        
        i {
          color: #52c41a;
          font-size: 16px;
        }
      }
    }
  }
  
  .code-block-wrapper {
    .code-window {
      background: #1e1e1e;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0,0,0,0.2);
      
      .code-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 20px;
        background: #2d2d2d;
        
        .window-dots {
          display: flex;
          gap: 8px;
          
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            
            &.red { background: #ff5f56; }
            &.yellow { background: #ffbd2e; }
            &.green { background: #27c93f; }
          }
        }
        
        .code-title {
          color: #999;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      
      .code-body {
        padding: 20px;
        overflow-x: auto;
        
        pre {
          margin: 0;
          
          code {
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #d4d4d4;
          }
        }
      }
    }
  }
}

// 快速开始
.quick-start {
  padding: 120px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  
  .section-header {
    text-align: center;
    margin-bottom: 60px;
    
    &.light {
      .section-badge {
        background: rgba(255,255,255,0.2);
      }
      
      .section-title {
        color: #fff;
      }
      
      .section-desc {
        color: rgba(255,255,255,0.8);
      }
    }
  }
  
  .install-steps {
    max-width: 800px;
    margin: 0 auto 50px;
    
    .step {
      position: relative;
      padding-left: 60px;
      padding-bottom: 40px;
      cursor: pointer;
      
      &:last-child {
        padding-bottom: 0;
      }
      
      &.active {
        .step-number {
          background: #fff;
          color: #667eea;
          transform: scale(1.1);
        }
        
        .step-content h4 {
          color: #fff;
        }
      }
      
      .step-number {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 40px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s;
      }
      
      .step-line {
        position: absolute;
        left: 20px;
        top: 40px;
        bottom: 0;
        width: 2px;
        background: rgba(255,255,255,0.2);
      }
      
      .step-content {
        h4 {
          font-size: 18px;
          margin-bottom: 12px;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s;
        }
        
        .step-detail {
          pre {
            background: rgba(0,0,0,0.3);
            border-radius: 12px;
            padding: 20px;
            overflow-x: auto;
            
            code {
              color: #fff;
              font-family: 'Fira Code', Consolas, monospace;
              font-size: 14px;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
  
  .quick-actions {
    text-align: center;
  }
}

// CTA 区域
.cta-section {
  padding: 100px 0;
  background: #fff;
  
  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    
    h2 {
      font-size: 36px;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 16px;
    }
    
    p {
      font-size: 18px;
      color: $text-secondary;
      margin-bottom: 40px;
    }
    
    .cta-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }
}

// 按钮样式
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &.btn-lg {
    padding: 16px 32px;
    font-size: 16px;
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.btn-outline {
    background: transparent;
    border: 2px solid #667eea;
    color: #667eea;
    
    &:hover {
      background: #667eea;
      color: #fff;
    }
  }
}

// 容器
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// 动画定义
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, -50px); }
  50% { transform: translate(0, -100px); }
  75% { transform: translate(-50px, -50px); }
}

@keyframes particle-float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { 
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

@keyframes blink {
  0%, 100% { border-color: transparent; }
  50% { border-color: rgba(255,255,255,0.7); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

@keyframes scroll {
  0% { opacity: 1; top: 8px; }
  100% { opacity: 0; top: 20px; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式
@media (max-width: 992px) {
  .hero {
    .hero-title {
      font-size: 52px;
    }
    
    .hero-stats {
      gap: 40px;
    }
  }
  
  .features {
    .feature-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .code-showcase {
    .showcase-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
}

@media (max-width: 768px) {
  .hero {
    .hero-title {
      font-size: 40px;
    }
    
    .hero-desc {
      font-size: 18px;
    }
    
    .hero-stats {
      flex-direction: column;
      gap: 20px;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
  }
  
  .features {
    padding: 80px 0;
    
    .feature-list {
      grid-template-columns: 1fr;
    }
    
    .section-title {
      font-size: 28px;
    }
  }
  
  .cta-section {
    .cta-actions {
      flex-direction: column;
      align-items: center;
    }
  }
}

// 过渡动画
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
