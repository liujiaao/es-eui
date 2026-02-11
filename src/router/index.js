import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  
  // 开发指南
  {
    path: '/guide',
    component: () => import('../views/guide/index.vue'),
    children: [
      {
        path: '',
        name: 'GuideIntroduction',
        component: () => import('../views/guide/introduction.vue')
      },
      {
        path: 'installation',
        name: 'GuideInstallation',
        component: () => import('../views/guide/installation.vue')
      },
      {
        path: 'quickstart',
        name: 'GuideQuickstart',
        component: () => import('../views/guide/quickstart.vue')
      },
      {
        path: 'configuration',
        name: 'GuideConfiguration',
        component: () => import('../views/guide/configuration.vue')
      }
    ]
  },
  
  // 组件文档
  {
    path: '/component',
    component: () => import('../views/component/index.vue'),
    children: [
      {
        path: 'installation',
        name: 'ComponentInstallation',
        component: () => import('../views/component/installation.vue')
      },
      {
        path: 'quickstart',
        name: 'ComponentQuickstart',
        component: () => import('../views/guide/quickstart.vue')
      },
      {
        path: 'estable',
        name: 'EsTableDocs',
        component: () => import('../views/docs/EsTableDocs.vue')
      },
      {
        path: 'esform',
        name: 'EsFormDocs',
        component: () => import('../views/docs/EsFormDocs.vue')
      },
      {
        path: 'esdialog',
        name: 'EsDialogDocs',
        component: () => import('../views/docs/EsDialogDocs.vue')
      },
      {
        path: 'combination',
        name: 'CombinationDocs',
        component: () => import('../views/docs/CombinationDocs.vue')
      }
    ]
  },
  
  // 主题
  {
    path: '/theme',
    name: 'Theme',
    component: () => import('../views/theme/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
