# Vue2 Project Template

一个完整的 Vue2 工程模板，包含了路由、状态管理等核心功能。

## 项目特性

- ✅ Vue 2.6.14 核心
- ✅ Vue Router 3.5.3 路由管理
- ✅ Vuex 3.6.2 状态管理
- ✅ Axios 0.27.2 HTTP 客户端
- ✅ ESLint 代码规范检查
- ✅ Babel ES6+ 转译
- ✅ 热重载开发服务器
- ✅ 生产环境优化构建

## 项目结构

```
vue2-project-template/
├── public/              # 静态资源
│   └── index.html      # HTML 模板
├── src/                # 源代码
│   ├── assets/         # 资源文件
│   │   └── main.css    # 全局样式
│   ├── components/     # 公共组件
│   │   └── HelloWorld.vue
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── store/          # Vuex 状态管理
│   │   └── index.js
│   ├── views/          # 页面组件
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   └── Counter.vue
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .gitignore          # Git 忽略文件
├── babel.config.js     # Babel 配置
├── package.json        # 项目配置
├── README.md           # 项目说明
└── vue.config.js       # Vue CLI 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run serve
```

开发服务器将在 `http://localhost:8080` 启动。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist/` 目录。

### 代码检查

```bash
npm run lint
```

## 页面说明

### 首页 (Home)
展示项目特性和快速开始指南。

### 关于 (About)
详细介绍项目结构、特性和开发命令。

### 计数器 (Counter)
演示 Vuex 状态管理的使用，包括：
- State 状态存储
- Mutations 同步修改状态
- Actions 异步操作
- Getters 计算属性

## 技术栈

- **Vue 2.6.14**: 渐进式 JavaScript 框架
- **Vue Router 3.5.3**: 官方路由管理器
- **Vuex 3.6.2**: 状态管理模式
- **Axios 0.27.2**: HTTP 客户端
- **Babel**: JavaScript 编译器
- **ESLint**: 代码检查工具

## 开发说明

### 添加新页面

1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在 `src/App.vue` 的导航中添加链接

### 添加新组件

在 `src/components/` 目录下创建可复用的 Vue 组件。

### 状态管理

在 `src/store/index.js` 中添加新的 state、mutations、actions 和 getters。

### API 请求

使用 Axios 进行 HTTP 请求，建议在 `src/api/` 目录下创建 API 模块。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT