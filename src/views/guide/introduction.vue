<template>
  <div class="intro-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-badge">
        <i class="el-icon-s-promotion" />
        <span>Vue 2.0 + Element UI</span>
      </div>
      <h1 class="hero-title">
        <span class="gradient-text">ES-EUI</span>
        <span class="title-sub">企业级组件库</span>
      </h1>
      <p class="hero-desc">
        一套基于 Vue 2.0 和 Element UI 的企业级组件库，帮助开发者快速构建中后台管理系统。
        提供丰富的表单、表格、弹窗等常用组件，以及组件之间的联动解决方案。
      </p>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-num">5+</div>
          <div class="stat-label">核心组件</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">20+</div>
          <div class="stat-label">控件类型</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">0</div>
          <div class="stat-label">依赖负担</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section">
      <h2 class="section-title">
        <span class="title-icon"><i class="el-icon-star-on" /></span>
        核心特性
      </h2>
      <div class="features-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon" :class="feature.color">
            <i :class="feature.icon" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Components Section -->
    <section class="section">
      <h2 class="section-title">
        <span class="title-icon"><i class="el-icon-s-grid" /></span>
        组件概览
      </h2>
      <div class="components-list">
        <div class="component-card" v-for="(comp, index) in components" :key="index">
          <div class="comp-header">
            <div class="comp-icon" :class="comp.color">
              <i :class="comp.icon" />
            </div>
            <div class="comp-info">
              <h3 class="comp-name">{{ comp.name }}</h3>
              <p class="comp-tag">{{ comp.tag }}</p>
            </div>
          </div>
          <p class="comp-desc">{{ comp.desc }}</p>
          <ul class="comp-features">
            <li v-for="(item, i) in comp.features" :key="i">
              <i class="el-icon-check" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Compatibility Section -->
    <section class="section">
      <h2 class="section-title">
        <span class="title-icon"><i class="el-icon-info-filled" /></span>
        兼容性
      </h2>
      <div class="compat-cards">
        <div class="compat-item">
          <div class="compat-icon vue">
            <i class="el-icon-s-flag" />
          </div>
          <div class="compat-info">
            <div class="compat-name">Vue</div>
            <div class="compat-version">2.6+</div>
          </div>
        </div>
        <div class="compat-item">
          <div class="compat-icon element">
            <i class="el-icon-s-management" />
          </div>
          <div class="compat-info">
            <div class="compat-name">Element UI</div>
            <div class="compat-version">2.15+</div>
          </div>
        </div>
        <div class="compat-item">
          <div class="compat-icon browser">
            <i class="el-icon-monitor" />
          </div>
          <div class="compat-info">
            <div class="compat-name">浏览器</div>
            <div class="compat-version">现代浏览器</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Version History -->
    <section class="section">
      <h2 class="section-title">
        <span class="title-icon"><i class="el-icon-time" /></span>
        版本记录
      </h2>
      <div class="version-timeline">
        <div class="timeline-item" v-for="(ver, index) in versions" :key="index">
          <div class="timeline-dot" />
          <div class="timeline-content">
            <div class="version-header">
              <span class="version-tag">{{ ver.version }}</span>
              <span class="version-date">{{ ver.date }}</span>
            </div>
            <p class="version-desc">{{ ver.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start CTA -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>开始使用 ES-EUI</h2>
        <p>只需几分钟即可集成到您的项目中</p>
        <router-link to="/guide/quickstart" class="cta-btn">
          <i class="el-icon-right" />
          快速上手
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GuideIntroduction',
  data() {
    return {
      features: [
        {
          icon: 'el-icon-document-checked',
          color: 'blue',
          title: '配置化开发',
          desc: '通过 JSON 配置快速生成表单和表格，大幅减少重复代码，提升开发效率'
        },
        {
          icon: 'el-icon-box',
          color: 'purple',
          title: '组件丰富',
          desc: '提供 EsTable、EsForm、useDialog 等核心组件，覆盖中后台常见场景'
        },
        {
          icon: 'el-icon-link',
          color: 'green',
          title: '联动支持',
          desc: '表格与表单无缝联动，查询、编辑一体化，数据流清晰可控'
        },
        {
          icon: 'el-icon-magic-stick',
          color: 'orange',
          title: '灵活扩展',
          desc: '支持自定义渲染、插槽扩展，满足各种个性化业务需求'
        },
        {
          icon: 'el-icon-collection-tag',
          color: 'cyan',
          title: 'TypeScript',
          desc: '完整的类型定义支持，提供更好的开发体验和代码提示'
        },
        {
          icon: 'el-icon-reading',
          color: 'pink',
          title: '文档完善',
          desc: '详尽的文档和示例，丰富的最佳实践指导，上手即会'
        }
      ],
      components: [
        {
          name: 'EsTable',
          tag: '表格组件',
          icon: 'el-icon-s-data',
          color: 'blue',
          desc: '基于 Element UI Table 封装的企业级表格组件，内置分页、排序、筛选等功能。',
          features: [
            '自动数据请求和分页处理',
            '列配置化定义，支持自定义渲染',
            '行内编辑和批量操作',
            '表格头部插槽，可嵌入查询表单',
            '跨页选择记忆'
          ]
        },
        {
          name: 'EsForm',
          tag: '表单组件',
          icon: 'el-icon-s-order',
          color: 'purple',
          desc: '配置化表单生成器，通过 JSON 配置即可生成复杂的表单界面。',
          features: [
            '支持 20+ 种控件类型',
            '级联选择、树形选择、上传组件',
            '动态表单和条件渲染',
            '自动验证和错误提示',
            '表单与表格联动'
          ]
        },
        {
          name: 'useDialog',
          tag: '弹窗组件',
          icon: 'el-icon-s-claim',
          color: 'green',
          desc: '函数式弹窗调用方式，支持 JSX 渲染，让弹窗使用更加灵活。',
          features: [
            '支持在弹窗中渲染任意组件',
            '获取弹窗内组件引用',
            '支持嵌套弹窗',
            '灵活的按钮配置',
            '命令式调用方式'
          ]
        }
      ],
      versions: [
        {
          version: 'v1.0.0',
          date: '2024-01',
          content: '初始版本，包含 EsTable、EsForm、useDialog 核心组件，提供完整的配置化开发能力'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// Variables
$primary-color: #409eff;
$text-primary: #1a1a1a;
$text-secondary: #4a5568;
$text-tertiary: #718096;
$border-color: #e2e8f0;
$bg-light: #f7fafc;

// Gradient colors
$gradient-blue: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$gradient-purple: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$gradient-green: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$gradient-orange: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
$gradient-cyan: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
$gradient-pink: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

.intro-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  color: $text-primary;
  line-height: 1.6;
}

// Hero Section
.hero-section {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(255,255,255,0.8);
    border-radius: 50px;
    font-size: 14px;
    color: $text-secondary;
    margin-bottom: 24px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);

    i {
      color: $primary-color;
    }
  }

  .hero-title {
    margin: 0 0 20px;
    font-size: 48px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -2px;
    }

    .title-sub {
      font-size: 24px;
      font-weight: 400;
      color: $text-secondary;
    }
  }

  .hero-desc {
    max-width: 550px;
    margin: 0 auto;
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.7;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;

    .stat-item {
      text-align: center;

      .stat-num {
        font-size: 36px;
        font-weight: 700;
        background: $gradient-blue;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .stat-label {
        font-size: 14px;
        color: $text-tertiary;
        margin-top: 4px;
      }
    }
  }
}

// Section Common Styles
.section {
  margin-bottom: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 32px;
  color: $text-primary;

  .title-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
    font-size: 18px;
  }
}

// Features Grid
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  .feature-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid $border-color;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.08);
    }

    .feature-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      margin-bottom: 20px;

      &.blue { background: $gradient-blue; }
      &.purple { background: $gradient-purple; }
      &.green { background: $gradient-green; }
      &.orange { background: $gradient-orange; }
      &.cyan { background: $gradient-cyan; }
      &.pink { background: $gradient-pink; }
    }

    .feature-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 12px;
      color: $text-primary;
    }

    .feature-desc {
      font-size: 14px;
      color: $text-secondary;
      margin: 0;
      line-height: 1.7;
    }
  }
}

// Components List
.components-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.component-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid $border-color;

  .comp-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    .comp-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;

      &.blue { background: $gradient-blue; }
      &.purple { background: $gradient-purple; }
      &.green { background: $gradient-green; }
    }

    .comp-info {
      .comp-name {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 4px;
        color: $text-primary;
      }

      .comp-tag {
        font-size: 13px;
        color: $primary-color;
        background: rgba(64, 158, 255, 0.1);
        padding: 2px 10px;
        border-radius: 50px;
        display: inline-block;
        margin: 0;
      }
    }
  }

  .comp-desc {
    font-size: 15px;
    color: $text-secondary;
    margin: 0 0 20px;
    line-height: 1.7;
  }

  .comp-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: $text-secondary;

      i {
        color: #52c41a;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}

// Compatibility Cards
.compat-cards {
  display: flex;
  gap: 24px;

  .compat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid $border-color;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    }

    .compat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;

      &.vue { background: linear-gradient(135deg, #41b883 0%, #34495e 100%); }
      &.element { background: linear-gradient(135deg, #409eff 0%, #67c23a 100%); }
      &.browser { background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); }
    }

    .compat-info {
      .compat-name {
        font-size: 16px;
        font-weight: 600;
        color: $text-primary;
        margin: 0 0 4px;
      }

      .compat-version {
        font-size: 14px;
        color: $text-tertiary;
      }
    }
  }
}

// Version Timeline
.version-timeline {
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
    border-radius: 1px;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 32px;

    &:last-child {
      padding-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: -28px;
      top: 4px;
      width: 16px;
      height: 16px;
      background: white;
      border: 3px solid #667eea;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .timeline-content {
      background: white;
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      border: 1px solid $border-color;

      .version-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;

        .version-tag {
          font-size: 16px;
          font-weight: 600;
          color: $primary-color;
          background: rgba(64, 158, 255, 0.1);
          padding: 4px 12px;
          border-radius: 8px;
        }

        .version-date {
          font-size: 14px;
          color: $text-tertiary;
        }
      }

      .version-desc {
        margin: 0;
        font-size: 14px;
        color: $text-secondary;
        line-height: 1.7;
      }
    }
  }
}

// CTA Section
.cta-section {
  margin-top: 80px;
  padding: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }

  .cta-content {
    position: relative;
    z-index: 1;

    h2 {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 12px;
    }

    p {
      font-size: 16px;
      opacity: 0.9;
      margin: 0 0 28px;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: white;
      color: #667eea;
      font-size: 16px;
      font-weight: 600;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      }

      i {
        font-size: 18px;
      }
    }
  }
}

// Responsive Design
@media (max-width: 992px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-section .hero-stats {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .intro-page {
    padding: 20px 16px;
  }

  .hero-section {
    padding: 40px 20px;

    .hero-title {
      font-size: 36px;

      .title-sub {
        font-size: 18px;
      }
    }

    .hero-stats {
      flex-direction: column;
      gap: 24px;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .component-card .comp-features {
    grid-template-columns: 1fr;
  }

  .compat-cards {
    flex-direction: column;
  }

  .cta-section {
    padding: 40px 24px;
    margin-top: 40px;
  }
}
</style>
