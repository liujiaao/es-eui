<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="container">
        <h1 class="logo">
          <router-link to="/">
            <span class="logo-img">ES</span>
            <span class="logo-text">ES-EUI</span>
          </router-link>
        </h1>
        <nav class="nav">
          <router-link to="/" :class="{ 'active': isHome }">首页</router-link>
          <router-link to="/guide" :class="{ 'active': isGuide }">开发指南</router-link>
          <router-link to="/component/installation" :class="{ 'active': isComponent }">组件</router-link>
          <router-link to="/theme" :class="{ 'active': isTheme }">主题</router-link>
          <a href="https://github.com" target="_blank" class="nav-link">
            <i class="el-icon-link"></i> GitHub
          </a>
        </nav>
      </div>
    </header>

    <!-- 主体内容 -->
    <div class="main">
      <router-view />
    </div>

    <!-- 页脚 -->
    <footer class="footer" v-if="isHome">
      <div class="container">
        <p>ES-EUI © 2024 基于 Vue 2.0 和 Element UI 的组件库</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    isGuide() {
      return this.$route.path.startsWith('/guide')
    },
    isComponent() {
      return this.$route.path.startsWith('/component')
    },
    isTheme() {
      return this.$route.path.startsWith('/theme')
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  font-size: 14px;
  color: #303133;
  background-color: #fff;
}

#app {
  min-height: 100vh;
}

/* 顶部导航 */
.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .logo {
    margin: 0;
    
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo-img {
      width: 36px;
      height: 36px;
      background: #409eff;
      color: #fff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      margin-right: 10px;
    }

    .logo-text {
      font-size: 20px;
      color: #303133;
      font-weight: 600;
    }
  }

  .nav {
    margin-left: auto;
    display: flex;
    align-items: center;

    a {
      display: inline-block;
      padding: 0 20px;
      color: #606266;
      text-decoration: none;
      font-size: 15px;
      transition: color 0.3s;
      line-height: 60px;

      &:hover,
      &.active {
        color: #409eff;
      }

      &.router-link-active {
        color: #409eff;
        font-weight: 500;
      }
    }

    .nav-link {
      i {
        margin-right: 4px;
      }
    }
  }
}

/* 主体内容 */
.main {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
}

/* 页脚 */
.footer {
  background: #f5f7fa;
  padding: 40px 0;
  text-align: center;
  color: #909399;
  font-size: 14px;
  border-top: 1px solid #e6e6e6;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 通用文档样式 */
.docs-page {
  display: flex;
  min-height: calc(100vh - 60px);
}

/* 侧边栏 */
.side-nav {
  width: 260px;
  padding: 30px 0;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  position: fixed;
  top: 60px;
  bottom: 0;
  overflow-y: auto;

  .nav-group {
    margin-bottom: 20px;

    .nav-title {
      padding: 10px 20px;
      font-size: 14px;
      color: #909399;
      font-weight: 600;
      text-transform: uppercase;
    }

    .nav-item {
      display: block;
      padding: 10px 20px 10px 30px;
      color: #606266;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s;
      border-right: 3px solid transparent;

      &:hover {
        color: #409eff;
      }

      &.active,
      &.router-link-active {
        color: #409eff;
        border-right-color: #409eff;
        background: #f5f7fa;
      }
    }
  }
}

/* 内容区 */
.content {
  flex: 1;
  margin-left: 260px;
  padding: 30px 40px;
  max-width: calc(100% - 260px);
}

/* 文档标题 */
.content-title {
  font-size: 28px;
  font-weight: 400;
  color: #1f2f3d;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.content-subtitle {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 30px 0 15px;
}

/* 段落 */
.content p {
  line-height: 1.8;
  color: #606266;
  margin-bottom: 15px;
}

/* 代码块 */
pre {
  background: #f5f7fa;
  padding: 15px 20px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 15px 0;

  code {
    font-family: 'Courier New', Consolas, monospace;
    font-size: 13px;
    color: #606266;
    line-height: 1.6;
  }
}

/* 行内代码 */
code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Consolas, monospace;
  color: #c0392b;
  font-size: 13px;
}

/* 表格 */
.table-props {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ebeef5;
  }

  th {
    background: #f5f7fa;
    font-weight: 600;
    color: #303133;
  }

  td {
    color: #606266;
  }
}

/* 提示框 */
.tip {
  padding: 12px 20px;
  background: #ecf5ff;
  border-left: 4px solid #409eff;
  border-radius: 4px;
  margin: 20px 0;

  p {
    margin: 0;
    color: #606266;
  }
}

.warning {
  padding: 12px 20px;
  background: #fdf6ec;
  border-left: 4px solid #e6a23c;
  border-radius: 4px;
  margin: 20px 0;

  p {
    margin: 0;
    color: #606266;
  }
}
</style>
