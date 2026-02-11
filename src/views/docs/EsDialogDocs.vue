<template>
  <div class="docs-container">
    <div class="docs-header">
      <h1>EsDialog 弹窗组件</h1>
      <p>强大的弹窗组件，基于 <code>useDialog</code> hook，支持 JSX 渲染、自定义内容、按钮配置、生命周期回调等功能。</p>
      <div class="global-actions">
        <el-button size="small" @click="expandAll">
          <i class="el-icon-arrow-down"></i> 全部展开
        </el-button>
        <el-button size="small" @click="collapseAll">
          <i class="el-icon-arrow-up"></i> 全部收起
        </el-button>
      </div>
    </div>

    <h2>基础用法</h2>
    <p>最基础的弹窗用法，传入标题和渲染内容即可。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openBasic">打开弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene1 }">
        <div class="code-header" @click="toggleCode('scene1')">
          <i :class="codeExpanded.scene1 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene1 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene1"><code>{{ basicExample }}</code></pre>
      </div>
    </div>

    <h2>确认弹窗</h2>
    <p>通过配置 <code>configBtn</code> 实现确认弹窗功能。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openConfirm">确认弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
        <div class="code-header" @click="toggleCode('scene2')">
          <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene2"><code>{{ confirmExample }}</code></pre>
      </div>
    </div>

    <h2>表单弹窗 (JSX + EsForm)</h2>
    <p>在弹窗中嵌入 <code>EsForm</code> 表单组件，使用 <strong>JSX 语法</strong> 使代码更简洁直观。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openFormDialog">表单弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
        <div class="code-header" @click="toggleCode('scene3')">
          <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene3"><code>{{ formDialogExample }}</code></pre>
      </div>
    </div>

    <h2>可拖拽弹窗</h2>
    <p>配置 <code>isDraggable</code> 属性使弹窗可拖拽。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openDraggable">可拖拽弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
        <div class="code-header" @click="toggleCode('scene4')">
          <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene4"><code>{{ draggableExample }}</code></pre>
      </div>
    </div>

    <h2>全屏弹窗</h2>
    <p>配置 <code>fullscreen</code> 属性使弹窗全屏显示。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openFullscreen">全屏弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
        <div class="code-header" @click="toggleCode('scene5')">
          <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene5"><code>{{ fullscreenExample }}</code></pre>
      </div>
    </div>

    <h2>加载状态</h2>
    <p>配置 <code>loading</code> 属性显示加载状态。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openLoading">加载状态</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
        <div class="code-header" @click="toggleCode('scene6')">
          <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene6"><code>{{ loadingExample }}</code></pre>
      </div>
    </div>

    <h2>生命周期</h2>
    <p>通过 <code>onOpen</code> 和 <code>onClosed</code> 回调监听弹窗生命周期。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openLifecycle">生命周期</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
        <div class="code-header" @click="toggleCode('scene7')">
          <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene7"><code>{{ lifecycleExample }}</code></pre>
      </div>
    </div>

    <h2>自定义样式</h2>
    <p>通过 <code>customClass</code> 属性自定义弹窗样式。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openCustomStyle">自定义样式</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene8 }">
        <div class="code-header" @click="toggleCode('scene8')">
          <i :class="codeExpanded.scene8 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene8 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene8"><code>{{ customStyleExample }}</code></pre>
      </div>
    </div>

    <h2>JSX 渲染 EsForm 表单</h2>
    <p>使用 <strong>JSX</strong> 渲染包含验证规则的 EsForm 表单，通过 <code>getRefs</code> 获取表单引用进行校验。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openComponentDialog">组件渲染弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene9 }">
        <div class="code-header" @click="toggleCode('scene9')">
          <i :class="codeExpanded.scene9 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene9 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene9"><code>{{ renderComponentExample }}</code></pre>
      </div>
    </div>

    <h2>JSX 渲染 EsTable 表格</h2>
    <p>使用 <strong>JSX</strong> 渲染 EsTable 表格组件，实现数据选择功能。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openTableDialog">表格弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene10 }">
        <div class="code-header" @click="toggleCode('scene10')">
          <i :class="codeExpanded.scene10 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene10 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene10"><code>{{ renderTableDialogExample }}</code></pre>
      </div>
    </div>

    <h2>JSX 复杂内容弹窗</h2>
    <p>使用 JSX 语法创建包含标签页、多个 EsForm 表单等复杂内容的弹窗。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button @click="openComplexDialog">复杂内容弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene11 }">
        <div class="code-header" @click="toggleCode('scene11')">
          <i :class="codeExpanded.scene11 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene11 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene11"><code>{{ renderComplexDialogExample }}</code></pre>
      </div>
    </div>

    <h2>实战示例：表单弹窗完整流程</h2>
    <p>参考 <code>salesPolicy/policyManage/index.vue</code> 实战用法，展示完整的表单弹窗流程：</p>
    <ul>
      <li>使用 JSX 直接渲染组件: <code>render: (h, ctx) => &lt;EsForm ... /&gt;</code></li>
      <li>通过 <code>getRefs</code> 获取表单引用进行校验</li>
      <li>提交成功后关闭弹窗并刷新表格</li>
    </ul>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openRealWorldDialog">实战表单弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene12 }">
        <div class="code-header" @click="toggleCode('scene12')">
          <i :class="codeExpanded.scene12 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene12 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene12"><code>{{ realWorldDialogExample }}</code></pre>
      </div>
    </div>

    <h2>JSX vs h() 函数对比</h2>
    <table class="table-props">
      <thead>
        <tr>
          <th style="width: 50%;">传统 h() 函数写法</th>
          <th style="width: 50%;">JSX 写法（推荐）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <pre style="margin: 0; background: #f5f7fa; padding: 10px; border-radius: 4px;"><code>render: (h) => {
  return h('el-form', {
    props: { 'label-width': '80px' }
  }, [
    h('el-form-item', {
      props: { label: '姓名' }
    }, [
      h('el-input', {
        props: { value: this.name },
        on: { input: (e) => this.name = e }
      })
    ])
  ])
}</code></pre>
          </td>
          <td>
            <pre style="margin: 0; background: #f5f7fa; padding: 10px; border-radius: 4px;"><code>render: (h, ctx) => (
  &lt;es-form
    form-item-list={[
      { prop: 'name', label: '姓名', formtype: 'Input' }
    ]}
    model={this.formData}
  /&gt;
)</code></pre>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Parameters</h2>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>key</td>
          <td>弹窗唯一标识，用于缓存</td>
          <td>String</td>
          <td>—</td>
          <td>'__default__'</td>
        </tr>
        <tr>
          <td>title</td>
          <td>弹窗标题</td>
          <td>String</td>
          <td>—</td>
          <td>''</td>
        </tr>
        <tr>
          <td>width</td>
          <td>弹窗宽度</td>
          <td>String</td>
          <td>—</td>
          <td>'50%'</td>
        </tr>
        <tr>
          <td>height</td>
          <td>弹窗高度</td>
          <td>String</td>
          <td>—</td>
          <td>''</td>
        </tr>
        <tr>
          <td>maxHeight</td>
          <td>弹窗最大高度</td>
          <td>String</td>
          <td>—</td>
          <td>''</td>
        </tr>
        <tr>
          <td>center</td>
          <td>是否居中</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>customClass</td>
          <td>自定义样式类</td>
          <td>String</td>
          <td>—</td>
          <td>''</td>
        </tr>
        <tr>
          <td>closeOnClickModal</td>
          <td>是否允许点击遮罩关闭</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>closeOnPressEscape</td>
          <td>是否允许按 ESC 关闭</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>showClose</td>
          <td>是否显示关闭按钮</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>lockScroll</td>
          <td>是否锁定滚动</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>modal</td>
          <td>是否显示遮罩</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>modalAppendToBody</td>
          <td>遮罩是否插入 body</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>appendToBody</td>
          <td>弹窗是否插入 body</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>appendToSelector</td>
          <td>弹窗插入的选择器</td>
          <td>String</td>
          <td>—</td>
          <td>'.app-container'</td>
        </tr>
        <tr>
          <td>destroyOnClose</td>
          <td>关闭时是否销毁</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>showDefaultButtons</td>
          <td>是否显示默认按钮</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否显示加载状态</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>isDraggable</td>
          <td>是否可拖拽</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>configBtn</td>
          <td>按钮配置数组</td>
          <td>Array</td>
          <td>—</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>render</td>
          <td>渲染函数 (支持 JSX)</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>onSubmit</td>
          <td>确认回调</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>onClosed</td>
          <td>关闭回调</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>onOpen</td>
          <td>打开回调</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>hiddenFullBtn</td>
          <td>是否隐藏全屏按钮</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>fullscreen</td>
          <td>是否全屏</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <h2>ConfigBtn 配置</h2>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>name</td>
          <td>按钮文本</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type</td>
          <td>按钮类型</td>
          <td>String</td>
          <td>primary/success/warning/danger/info/text</td>
          <td>—</td>
        </tr>
        <tr>
          <td>key</td>
          <td>按钮标识</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>onClick</td>
          <td>点击事件（回调参数见下表）</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>click</td>
          <td>点击事件（高级用法，instance 作为第一个参数）</td>
          <td>Function</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>图标类名</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>size</td>
          <td>按钮大小</td>
          <td>String</td>
          <td>large/medium/small/mini</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>

    <h2>返回值</h2>
    <p><code>useDialog</code> 返回一个函数，调用该函数传入配置即可打开弹窗，返回值包含以下属性：</p>
    <table class="table-props">
      <thead>
        <tr>
          <th>属性</th>
          <th>说明</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>close</td>
          <td>关闭弹窗的方法</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>instance</td>
          <td>弹窗实例（可访问弹窗内部数据）</td>
          <td>VueComponent</td>
        </tr>
      </tbody>
    </table>

    <h2>按钮回调参数</h2>
    <p>按钮的 <code>onClick</code> 或 <code>click</code> 回调函数接收以下参数：</p>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>close</td>
          <td>关闭弹窗的方法</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>getRefs</td>
          <td>获取弹窗内容中的 ref（支持字符串或对象形式）</td>
          <td>Function/Object</td>
        </tr>
        <tr>
          <td>dialogVm</td>
          <td>弹窗实例</td>
          <td>VueComponent</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  basicExample,
  confirmExample,
  formDialogExample,
  draggableExample,
  fullscreenExample,
  loadingExample,
  lifecycleExample,
  customStyleExample,
  renderComponentExample,
  renderTableDialogExample,
  renderComplexDialogExample,
  realWorldDialogExample
} from './examples/esDialogExamples'
import { useDialog } from '../../components/es-eui'

// 预先创建 dialog 实例（推荐模式）
const dialogInstance = useDialog()

export default {
  name: 'EsDialogDocs',
  data() {
    return {
      formData: {
        name: '',
        age: '',
        email: ''
      },
      activeTab: 'basic',
      complexFormData: {
        projectName: '',
        description: '',
        type: '',
        tags: [],
        notify: true,
        autoSave: false
      },
      newTag: '',
      userFormData: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '',
        address: ''
      },
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      selectedRows: [],
      realWorldFormData: {
        policyName: '',
        policyAbstract: '',
        effectiveTimeRange: '',
        invalidTimeRange: '',
        policyTag: '',
        policyStatus: '0',
        policyReleaseType: '1',
        policyReleaseDate: '',
        coverImage: '',
        policyLinkContent: '',
        policyEitorContent: '',
        policyContentType: '1'
      },
      // 示例代码
      basicExample,
      confirmExample,
      formDialogExample,
      draggableExample,
      fullscreenExample,
      loadingExample,
      lifecycleExample,
      customStyleExample,
      renderComponentExample,
      renderTableDialogExample,
      renderComplexDialogExample,
      realWorldDialogExample,

      // 代码折叠状态
      codeExpanded: {
        scene1: false,
        scene2: false,
        scene3: false,
        scene4: false,
        scene5: false,
        scene6: false,
        scene7: false,
        scene8: false,
        scene9: false,
        scene10: false,
        scene11: false,
        scene12: false
      }
    }
  },
  methods: {
    // ===== 代码折叠控制 =====
    toggleCode(scene) {
      this.codeExpanded[scene] = !this.codeExpanded[scene]
    },
    expandAll() {
      Object.keys(this.codeExpanded).forEach(key => {
        this.codeExpanded[key] = true
      })
    },
    collapseAll() {
      Object.keys(this.codeExpanded).forEach(key => {
        this.codeExpanded[key] = false
      })
    },

    // ===== 基础示例 =====
    openBasic() {
      dialogInstance({
        title: '基础弹窗',
        render: () => '这是一个基础弹窗'
      })
    },

    openConfirm() {
      dialogInstance({
        title: '确认操作',
        render: () => '确定要执行此操作吗？',
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: ({ close }) => {
              this.$message.success('操作成功')
              close()
            }
          }
        ]
      })
    },

    // ===== JSX 表单弹窗 =====
    openFormDialog() {
      dialogInstance({
        title: '编辑信息',
        width: '600px',
        // 使用 JSX 渲染 EsForm
        render: (h, ctx) => (
          <es-form
            form-item-list={[
              { prop: 'name', label: '姓名', span: 12, formtype: 'Input', attrs: { placeholder: '请输入姓名' } },
              { prop: 'age', label: '年龄', span: 12, formtype: 'Input', attrs: { placeholder: '请输入年龄' } },
              { prop: 'email', label: '邮箱', span: 24, formtype: 'Input', attrs: { placeholder: '请输入邮箱' } }
            ]}
            model={this.formData}
            layout-form-props={{
              fromLayProps: { labelWidth: '80px' },
              rowLayProps: { gutter: 20 }
            }}
          />
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '保存',
            type: 'primary',
            key: 'save',
            onClick: ({ close }) => {
              console.log('表单数据：', this.formData)
              this.$message.success('保存成功')
              close()
            }
          }
        ]
      })
    },

    openDraggable() {
      dialogInstance({
        title: '可拖拽弹窗',
        isDraggable: true,
        render: () => '这个弹窗可以拖拽移动'
      })
    },

    openFullscreen() {
      dialogInstance({
        title: '全屏弹窗',
        fullscreen: true,
        render: () => '这是一个全屏弹窗'
      })
    },

    openLoading() {
      const { instance } = dialogInstance({
        title: '加载中',
        loading: true,
        render: () => '数据加载中...'
      })

      setTimeout(() => {
        instance.loading = false
        instance.render = () => '数据加载完成'
      }, 2000)
    },

    openLifecycle() {
      dialogInstance({
        title: '生命周期示例',
        render: () => '查看控制台输出',
        onOpen: () => {
          console.log('弹窗打开了')
          this.$message.info('弹窗已打开（查看控制台）')
        },
        onClosed: () => {
          console.log('弹窗关闭了')
        }
      })
    },

    openCustomStyle() {
      dialogInstance({
        title: '自定义样式',
        customClass: 'custom-dialog',
        render: () => '这个弹窗有自定义样式'
      })
    },

    // ===== JSX 组件渲染示例 =====
    openComponentDialog() {
      dialogInstance({
        title: '用户信息',
        width: '600px',
        // 使用 JSX 渲染 EsForm
        render: (h, ctx) => (
          <es-form
            ref="userForm"
            form-item-list={[
              {
                prop: 'name',
                label: '姓名',
                span: 12,
                formtype: 'Input',
                formItemOptions: {
                  rules: [{ required: true, message: '请输入姓名' }]
                }
              },
              {
                prop: 'email',
                label: '邮箱',
                span: 12,
                formtype: 'Input',
                formItemOptions: {
                  rules: [
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '邮箱格式错误' }
                  ]
                }
              },
              { prop: 'phone', label: '电话', span: 12, formtype: 'Input' },
              {
                prop: 'address',
                label: '地址',
                span: 24,
                formtype: 'Input',
                attrs: { type: 'textarea', rows: 3 }
              }
            ]}
            model={this.userFormData}
            layout-form-props={{
              fromLayProps: { labelWidth: '80px', size: 'small' },
              rowLayProps: { gutter: 20 }
            }}
          />
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '保存',
            type: 'primary',
            key: 'save',
            // 使用 getRefs 获取表单组件引用
            onClick: ({ close, getRefs }) => {
              const formRef = getRefs('userForm')
              formRef.validate((valid) => {
                if (valid) {
                  console.log('表单数据：', this.userFormData)
                  this.$message.success('保存成功')
                  close()
                }
              })
            }
          }
        ]
      })
    },

    // ===== JSX 表格弹窗 =====
    openTableDialog() {
      this.selectedRows = []
      dialogInstance({
        title: '选择用户',
        width: '800px',
        // 使用 JSX 渲染 EsTable
        render: (h, ctx) => (
          <div>
            <es-table
              ref="userTable"
              data-source={this.tableData}
              columns={[
                { key: 'id', label: 'ID', width: 80 },
                { key: 'name', label: '姓名', width: 120 },
                { key: 'age', label: '年龄', width: 80 },
                { key: 'email', label: '邮箱' }
              ]}
              options={{ border: true, multiSelect: true }}
              on-selection-change={(selection) => {
                this.selectedRows = selection
              }}
            />
            <div style="margin-top: 15px; text-align: right; color: #909399;">
              已选择 {this.selectedRows.length} 个用户
            </div>
          </div>
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: ({ close }) => {
              console.log('选中的行：', this.selectedRows)
              this.$message.success(`已选择 ${this.selectedRows.length} 个用户`)
              close()
            }
          }
        ]
      })
    },

    // ===== JSX 复杂内容弹窗 =====
    openComplexDialog() {
      this.activeTab = 'basic'
      dialogInstance({
        title: '项目配置',
        width: '700px',
        // JSX 支持复杂的条件渲染和循环
        render: (h, ctx) => (
          <el-tabs v-model={this.activeTab}>
            <el-tab-pane label="基本信息" name="basic">
              <es-form
                form-item-list={[
                  {
                    prop: 'projectName',
                    label: '项目名称',
                    span: 24,
                    formtype: 'Input',
                    formItemOptions: {
                      rules: [{ required: true, message: '请输入项目名称' }]
                    }
                  },
                  {
                    prop: 'type',
                    label: '项目类型',
                    span: 12,
                    formtype: 'Select',
                    dataOptions: [
                      { label: 'Web项目', value: 'web' },
                      { label: '移动App', value: 'app' },
                      { label: '小程序', value: 'miniapp' }
                    ]
                  },
                  {
                    prop: 'description',
                    label: '项目描述',
                    span: 24,
                    formtype: 'Input',
                    attrs: { type: 'textarea', rows: 4 }
                  }
                ]}
                model={this.complexFormData}
                layout-form-props={{
                  fromLayProps: { labelWidth: '100px' }
                }}
              />
            </el-tab-pane>

            <el-tab-pane label="标签设置" name="tags">
              <div style="margin-bottom: 10px;">
                <el-input
                  v-model={this.newTag}
                  placeholder="输入标签后按回车添加"
                  size="small"
                  native-on-keyup={(e) => {
                    if (e.keyCode === 13 && this.newTag) {
                      if (!this.complexFormData.tags.includes(this.newTag)) {
                        this.complexFormData.tags.push(this.newTag)
                      }
                      this.newTag = ''
                    }
                  }}
                />
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                {this.complexFormData.tags.map((tag, index) => (
                  <el-tag
                    key={index}
                    closable
                    size="small"
                    on-close={() => this.complexFormData.tags.splice(index, 1)}
                  >
                    {tag}
                  </el-tag>
                ))}
              </div>
            </el-tab-pane>

            <el-tab-pane label="高级设置" name="advanced">
              <es-form
                form-item-list={[
                  {
                    prop: 'notify',
                    label: '开启通知',
                    span: 12,
                    formtype: 'Switch'
                  },
                  {
                    prop: 'autoSave',
                    label: '自动保存',
                    span: 12,
                    formtype: 'Switch'
                  }
                ]}
                model={this.complexFormData}
                layout-form-props={{
                  fromLayProps: { labelWidth: '100px' }
                }}
              />
            </el-tab-pane>
          </el-tabs>
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '保存配置',
            type: 'primary',
            key: 'save',
            onClick: ({ close }) => {
              console.log('配置数据：', this.complexFormData)
              this.$message.success('配置保存成功')
              close()
            }
          }
        ]
      })
    },

    // ===== 实战示例：参考 policyManage =====
    openRealWorldDialog() {
      // 重置表单
      this.realWorldFormData = {
        policyName: '',
        policyAbstract: '',
        effectiveTimeRange: '',
        invalidTimeRange: '',
        policyTag: '',
        policyStatus: '0',
        policyReleaseType: '1',
        policyReleaseDate: '',
        coverImage: '',
        policyLinkContent: '',
        policyEitorContent: '',
        policyContentType: '1'
      }

      dialogInstance({
        title: '新增政策',
        width: '75%',
        key: 'realWorldDialog',  // 缓存 key
        isDraggable: true,
        closeOnClickModal: false,
        hiddenFullBtn: false,
        fullscreen: false,
        configBtn: [
          {
            icon: 'el-icon-check',
            key: 'save',
            type: 'primary',
            size: 'mini',
            name: '提交',
            // 使用 click 回调，获取表单引用
            click: (instance, { close, getRefs }) => {
              // 获取表单组件引用（支持对象形式访问）
              const formRef = getRefs.policyform

              // 表单校验
              formRef.validate((valid) => {
                if (valid) {
                  // 模拟提交
                  this.$message.success('提交成功！')
                  console.log('表单数据：', this.realWorldFormData)
                  close()
                }
              })
            }
          },
          {
            icon: 'el-icon-close',
            key: 'cancel',
            size: 'mini',
            name: '取消',
            click: (instance, { close }) => close()
          }
        ],
        // 使用 JSX 渲染 EsForm 表单
        render: (h, ctx) => (
          <es-form
            ref="policyform"
            form-item-list={[
              {
                prop: 'policyName',
                label: '政策名称',
                span: 12,
                formtype: 'Input',
                formItemOptions: {
                  rules: [{ required: true, message: '请输入政策名称' }]
                }
              },
              {
                prop: 'policyStatus',
                label: '政策状态',
                span: 12,
                formtype: 'Select',
                dataOptions: [
                  { label: '待发布', value: '0' },
                  { label: '已发布', value: '1' },
                  { label: '已下架', value: '2' }
                ]
              },
              {
                prop: 'effectiveTimeRange',
                label: '生效时间',
                span: 12,
                formtype: 'DatePicker',
                attrs: {
                  type: 'date',
                  placeholder: '选择生效时间',
                  valueFormat: 'yyyy-MM-dd'
                }
              },
              {
                prop: 'invalidTimeRange',
                label: '失效时间',
                span: 12,
                formtype: 'DatePicker',
                attrs: {
                  type: 'date',
                  placeholder: '选择失效时间',
                  valueFormat: 'yyyy-MM-dd'
                }
              },
              {
                prop: 'policyTag',
                label: '政策标签',
                span: 24,
                formtype: 'Input',
                attrs: { placeholder: '多个标签用逗号分隔' }
              },
              {
                prop: 'policyAbstract',
                label: '政策摘要',
                span: 24,
                formtype: 'Input',
                attrs: { type: 'textarea', rows: 4 }
              }
            ]}
            model={this.realWorldFormData}
            layout-form-props={{
              fromLayProps: { labelWidth: '100px', size: 'small' },
              rowLayProps: { gutter: 20 }
            }}
          />
        )
      })
    }
  }
}
</script>

<style lang="scss">
.docs-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .docs-header {
    margin-bottom: 30px;

    .global-actions {
      margin-top: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #e4e7ed;
    }
  }

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    color: #303133;
  }

  h2 {
    font-size: 24px;
    margin: 30px 0 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e7ed;
    color: #303133;
  }

  p {
    color: #606266;
    line-height: 1.6;
    margin-bottom: 15px;

    code {
      background: #f4f4f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #c0392b;
    }
  }

  ul {
    color: #606266;
    line-height: 1.8;
    margin-bottom: 15px;
    padding-left: 20px;

    li {
      margin-bottom: 5px;
    }

    code {
      background: #f4f4f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #c0392b;
    }
  }

  .demo-block {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 30px;
    overflow: hidden;

    &__body {
      padding: 20px;
      border-bottom: 1px solid #ebeef5;
    }

    &__code {
      background: #f5f7fa;
      overflow-x: auto;

      .code-header {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        background: #e4e7ed;
        cursor: pointer;
        user-select: none;
        transition: background 0.2s;
        border-bottom: 1px solid #dcdfe6;

        &:hover {
          background: #d0d3d9;
        }

        i {
          margin-right: 8px;
          font-size: 14px;
          color: #606266;
        }

        span {
          font-size: 13px;
          color: #606266;
        }
      }

      pre {
        margin: 0;
        padding: 15px 20px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.5;
        color: #606266;
      }

      code {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }

  .table-props {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;

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

    code {
      background: #f4f4f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #c0392b;
    }
  }
}

// 自定义弹窗样式
.custom-dialog {
  border-radius: 10px;

  .el-dialog__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 15px 20px;

    .el-dialog__title {
      color: white;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: white;
    }
  }
}
</style>
