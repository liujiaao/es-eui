<template>
  <div class="docs-container">
    <div class="docs-header">
      <h1>EsForm 表单组件</h1>
      <p class="component-desc">企业级表单解决方案，通过 JSON 配置即可生成复杂表单，支持 20+ 种表单控件、条件渲染、动态规则、自定义渲染等特性，让表单开发从小时级降至分钟级</p>
      <div class="global-actions">
        <el-button size="small" @click="expandAll">
          <i class="el-icon-arrow-down"></i> 全部展开
        </el-button>
        <el-button size="small" @click="collapseAll">
          <i class="el-icon-arrow-up"></i> 全部收起
        </el-button>
      </div>
    </div>

    <h2>快速开始</h2>
    <p>最简单的表单，只需配置字段列表和数据模型：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">基础表单</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :form-item-list="basicFormConfig"
          :model="basicFormData"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene1 }">
        <div class="code-header" @click="toggleCode('scene1')">
          <i :class="codeExpanded.scene1 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene1 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene1"><code>{{ basicExample }}</code></pre>
      </div>
    </div>

    <h2>核心特性详解</h2>

    <h3>1. 表单控件类型</h3>
    <p>EsForm 内置 20+ 种控件类型，通过 <code>formtype</code> 配置即可切换：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">常用控件展示</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :form-item-list="controlsFormConfig"
          :model="controlsFormData"
          :layout-form-props="controlsLayoutProps"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
        <div class="code-header" @click="toggleCode('scene2')">
          <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene2"><code>{{ controlsExample }}</code></pre>
      </div>
    </div>

    <h3>2. 表单布局系统</h3>
    <p>通过 <code>layoutFormProps</code> 实现灵活的响应式布局：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">栅格布局与折叠</span>
        <span class="demo-block__badge">实战技巧</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :form-item-list="layoutFormConfig"
          :model="layoutFormData"
          :layout-form-props="layoutProps"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
        <div class="code-header" @click="toggleCode('scene3')">
          <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene3"><code>{{ layoutExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--success">
      <h4>💡 布局最佳实践</h4>
      <ul>
        <li><code>span</code>：每个表单项占据的栅格数（1-24），建议 8（1/3行）、6（1/4行）、12（半行）</li>
        <li><code>minfoldRows</code>：超过指定行数自动折叠，配合 gutter 控制间距</li>
        <li><code>labelWidth</code>：统一定义标签宽度，或在 <code>formItemOptions</code> 中单独设置</li>
        <li><code>isBtnHiden</code>：隐藏默认的查询/重置按钮，适用于弹窗内表单</li>
      </ul>
    </div>

    <h3>3. 验证规则与表单校验</h3>
    <p>支持 Element UI 的所有验证规则，支持动态规则：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">表单验证</span>
      </div>
      <div class="demo-block__body">
        <es-form
          ref="validateForm"
          :form-item-list="validateFormConfig"
          :model="validateFormData"
          :config-btn="validateConfigBtn"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
        <div class="code-header" @click="toggleCode('scene4')">
          <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene4"><code>{{ validationExample }}</code></pre>
      </div>
    </div>

    <h3>4. 条件渲染与联动</h3>
    <p>通过 <code>isHiden</code> 函数实现字段的条件显示：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">动态字段显示</span>
        <span class="demo-block__badge">高频使用</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :form-item-list="dynamicFormConfig"
          :model="dynamicFormData"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
        <div class="code-header" @click="toggleCode('scene5')">
          <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene5"><code>{{ dynamicFieldExample }}</code></pre>
      </div>
    </div>

    <h3>5. 自定义 Render 渲染</h3>
    <p>当内置控件无法满足需求时，使用 <code>render</code> 函数自定义：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">自定义渲染</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :form-item-list="customRenderConfig"
          :model="customRenderData"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
        <div class="code-header" @click="toggleCode('scene6')">
          <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene6"><code>{{ customRenderExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--warning">
      <h4>⚠️ Render 函数参数说明</h4>
      <p>参数顺序为：<code>(h, model, row) => VNode</code></p>
      <ul>
        <li><code>h</code> - createElement 函数</li>
        <li><code>model</code> - 表单数据对象</li>
        <li><code>row</code> - 当前表单项配置</li>
      </ul>
    </div>

    <h3>6. 动态规则控制</h3>
    <p>根据其他字段值动态控制验证规则：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">动态验证规则</span>
        <span class="demo-block__badge">进阶技巧</span>
      </div>
      <div class="demo-block__body">
        <es-form
          :key="dynamicRuleKey"
          :form-item-list="dynamicRuleConfig"
          :model="dynamicRuleData"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
        <div class="code-header" @click="toggleCode('scene7')">
          <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene7"><code>{{ dynamicRuleExample }}</code></pre>
      </div>
    </div>

    <h2>实战场景示例</h2>

    <h3>场景一：复杂政策表单（生产级实战）</h3>
    <div class="demo-block demo-block--full">
      <div class="demo-block__header">
        <span class="demo-block__title">政策编辑表单</span>
        <span class="demo-block__badge">企业级</span>
      </div>
      <div class="demo-block__body">
        <es-form
          ref="policyForm"
          :form-item-list="policyFormConfig"
          :model="policyFormData"
          :layout-form-props="policyLayoutProps"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene8 }">
        <div class="code-header" @click="toggleCode('scene8')">
          <i :class="codeExpanded.scene8 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene8 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene8"><code>{{ realWorldFormExample }}</code></pre>
      </div>
    </div>

    <h2>API 文档</h2>

    <h3>Props</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>formItemList</td>
          <td>表单项配置数组</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>model</td>
          <td>表单数据对象</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>layoutFormProps</td>
          <td>布局配置</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>configBtn</td>
          <td>按钮配置数组</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
      </tbody>
    </table>

    <h3>FormItem 配置</h3>
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
          <td>prop</td>
          <td>字段名（支持函数动态返回）</td>
          <td>String/Function</td>
        </tr>
        <tr>
          <td>label</td>
          <td>标签文本</td>
          <td>String</td>
        </tr>
        <tr>
          <td>formtype</td>
          <td>控件类型：Input/Select/Radio/Checkbox/Switch/DatePicker/TimePicker/Cascader/Rate/Upload</td>
          <td>String</td>
        </tr>
        <tr>
          <td>span</td>
          <td>栅格占据列数（1-24）</td>
          <td>Number</td>
        </tr>
        <tr>
          <td>attrs</td>
          <td>控件属性（支持 disabled 为函数）</td>
          <td>Object</td>
        </tr>
        <tr>
          <td>formItemOptions</td>
          <td>表单项选项：labelWidth、rules、style 等</td>
          <td>Object</td>
        </tr>
        <tr>
          <td>dataOptions</td>
          <td>选项数据（Select/Radio/Checkbox）</td>
          <td>Array</td>
        </tr>
        <tr>
          <td>isHiden</td>
          <td>条件显示函数 (model) => Boolean</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>render</td>
          <td>自定义渲染函数 (h, model, row) => VNode</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>on</td>
          <td>事件监听：change、input、enter 等</td>
          <td>Object</td>
        </tr>
      </tbody>
    </table>

    <h3>LayoutFormProps 配置</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>fromLayProps.labelWidth</td>
          <td>标签宽度</td>
          <td>String</td>
          <td>'100px'</td>
        </tr>
        <tr>
          <td>fromLayProps.size</td>
          <td>控件尺寸：large/medium/small/mini</td>
          <td>String</td>
          <td>'mini'</td>
        </tr>
        <tr>
          <td>fromLayProps.minfoldRows</td>
          <td>超过多少行折叠</td>
          <td>Number</td>
          <td>0（不折叠）</td>
        </tr>
        <tr>
          <td>fromLayProps.isBtnHiden</td>
          <td>是否隐藏按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>fromLayProps.rules</td>
          <td>表单验证规则</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>rowLayProps.gutter</td>
          <td>栅格间距</td>
          <td>Number</td>
          <td>10</td>
        </tr>
      </tbody>
    </table>

    <h3>Methods</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>方法名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>validate</td>
          <td>表单验证</td>
          <td>(callback) => void</td>
        </tr>
        <tr>
          <td>resetFields</td>
          <td>重置表单</td>
          <td>-</td>
        </tr>
        <tr>
          <td>clearValidate</td>
          <td>清除验证状态</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>

    <h2>开发规范与技巧</h2>

    <div class="tips-box tips-box--info">
      <h4>📋 表单开发规范</h4>
      <ol>
        <li><strong>字段命名</strong>：使用驼峰命名，如 <code>policyTitle</code>、<code>effectiveTimeRange</code></li>
        <li><strong>日期范围</strong>：统一使用数组格式，如 <code>effectiveTimeRange: ['', '']</code></li>
        <li><strong>动态禁用</strong>：使用函数形式 <code>disabled: () => this.isDisabled</code></li>
        <li><strong>动态规则</strong>：通过 key 强制刷新表单 <code>:key="ruleKey"</code></li>
        <li><strong>验证规则</strong>：在 <code>formItemOptions.rules</code> 中定义，支持 required/pattern/validator</li>
        <li><strong>性能优化</strong>：复杂表单使用 <code>isHiden</code> 替代 v-if，避免频繁重建组件</li>
      </ol>
    </div>

    <div class="tips-box tips-box--success">
      <h4>🚀 开发效率技巧</h4>
      <ul>
        <li><strong>快速创建表单</strong>：复制已有配置，修改字段名即可</li>
        <li><strong>统一配置</strong>：将常用 attrs（如 clearable、size）提取为常量</li>
        <li><strong>IDE 代码片段</strong>：配置表单字段代码片段，一键生成配置模板</li>
        <li><strong>类型提示</strong>：使用 JSDoc 注释标记字段类型，获得 IDE 提示</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  basicExample,
  controlsExample,
  layoutExample,
  validationExample,
  dynamicFieldExample,
  customRenderExample,
  dynamicRuleExample,
  realWorldFormExample
} from './examples/esFormExamples'

export default {
  name: 'EsFormDocs',
  data() {
    return {
      // 基础示例
      basicFormData: { name: '', age: '', email: '' },
      basicFormConfig: [
        { prop: 'name', label: '姓名', formtype: 'Input', attrs: { placeholder: '请输入姓名' } },
        { prop: 'age', label: '年龄', formtype: 'Input', attrs: { placeholder: '请输入年龄' } },
        { prop: 'email', label: '邮箱', formtype: 'Input', attrs: { placeholder: '请输入邮箱' } }
      ],

      // 控件示例
      controlsFormData: {
        name: '',
        gender: '',
        hobby: [],
        status: true,
        city: '',
        date: '',
        rate: 3,
        content: ''
      },
      controlsFormConfig: [
        { prop: 'name', label: '输入框', span: 8, formtype: 'Input', attrs: { placeholder: '请输入' } },
        { prop: 'gender', label: '单选框', span: 8, formtype: 'Radio', dataOptions: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }] },
        { prop: 'city', label: '下拉选择', span: 8, formtype: 'Select', attrs: { placeholder: '请选择' }, dataOptions: [{ label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }] },
        { prop: 'hobby', label: '复选框', span: 12, formtype: 'Checkbox', dataOptions: [{ label: '阅读', value: 'read' }, { label: '运动', value: 'sport' }, { label: '音乐', value: 'music' }] },
        { prop: 'status', label: '开关', span: 12, formtype: 'Switch', attrs: { activeText: '启用', inactiveText: '禁用' } },
        { prop: 'date', label: '日期时间', span: 12, formtype: 'datePicker', attrs: { type: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm:ss', placeholder: '选择日期时间' } },
        { prop: 'rate', label: '评分', span: 12, formtype: 'Rate', attrs: { max: 5 } }
      ],
      controlsLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 布局示例
      layoutFormData: { field1: '', field2: '', field3: '', field4: '', field5: '', field6: '' },
      layoutFormConfig: [
        { prop: 'field1', label: '字段1', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field2', label: '字段2', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field3', label: '字段3', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field4', label: '字段4', span: 12, formtype: 'Input', attrs: { placeholder: 'span=12 占据半行' } },
        { prop: 'field5', label: '字段5', span: 12, formtype: 'Input', attrs: { placeholder: 'span=12 占据半行' } },
        { prop: 'field6', label: '字段6（被折叠）', span: 8, formtype: 'Input', attrs: { placeholder: '超过minfoldRows折叠' } }
      ],
      layoutProps: {
        fromLayProps: { labelWidth: '120px', size: 'small', minfoldRows: 2 },
        rowLayProps: { gutter: 20 }
      },

      // 验证示例
      validateFormData: { username: '', email: '', phone: '', password: '', confirmPassword: '' },
      validateFormConfig: [
        {
          prop: 'username',
          label: '用户名',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: '3-20个字符' }
        },
        {
          prop: 'email',
          label: '邮箱',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: 'example@email.com' }
        },
        {
          prop: 'phone',
          label: '手机号',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: '11位手机号' }
        },
        {
          prop: 'password',
          label: '密码',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, message: '密码至少6位', trigger: 'blur' }
            ]
          },
          attrs: { type: 'password', placeholder: '至少6位' }
        }
      ],
      validateConfigBtn: [
        {
          name: '提交',
          type: 'primary',
          onClick: (model, formRef) => {
            formRef.validate((valid) => {
              if (valid) {
                this.$message.success('验证通过！')
              } else {
                this.$message.error('请检查表单填写')
              }
            })
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        }
      ],

      // 动态字段示例
      dynamicFormData: { userType: 'personal', companyName: '', businessLicense: '', personalName: '', idCard: '' },
      dynamicFormConfig: [
        {
          prop: 'userType',
          label: '用户类型',
          span: 24,
          formtype: 'Radio',
          dataOptions: [{ label: '个人用户', value: 'personal' }, { label: '企业用户', value: 'company' }],
          on: { change: (val) => console.log('类型切换:', val) }
        },
        {
          prop: 'companyName',
          label: '公司名称',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入公司名称' },
          isHiden: (model) => model.userType !== 'company'
        },
        {
          prop: 'businessLicense',
          label: '营业执照',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入营业执照号' },
          isHiden: (model) => model.userType !== 'company'
        },
        {
          prop: 'personalName',
          label: '个人姓名',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入个人姓名' },
          isHiden: (model) => model.userType !== 'personal'
        },
        {
          prop: 'idCard',
          label: '身份证号',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入身份证号' },
          isHiden: (model) => model.userType !== 'personal'
        }
      ],

      // 自定义渲染示例
      customRenderData: { title: '', content: '', themeColor: '#409eff', showTags: false, tags: [] },
      customRenderConfig: [
        { prop: 'title', label: '标题', span: 24, formtype: 'Input', attrs: { placeholder: '请输入标题' } },
        {
          prop: 'content',
          label: '富文本内容',
          span: 24,
          render: (h, model, row) => {
            return h('div', {
              style: { border: '1px solid #dcdfe6', borderRadius: '4px', padding: '10px', minHeight: '100px' }
            }, [
              h('div', { style: { borderBottom: '1px solid #ebeef5', paddingBottom: '5px', marginBottom: '10px' } }, [
                h('el-button', { props: { size: 'mini' } }, 'B'),
                h('el-button', { props: { size: 'mini' } }, 'I'),
                h('el-button', { props: { size: 'mini' } }, 'U')
              ]),
              h('div', {
                attrs: { contenteditable: true },
                style: { minHeight: '60px', outline: 'none' },
                on: { input: (e) => { model[row.prop] = e.target.innerText } }
              }, model[row.prop] || '')
            ])
          }
        },
        {
          prop: 'themeColor',
          label: '主题色',
          span: 12,
          render: (h, model, row) => {
            const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
            return h('div', { style: { display: 'flex', gap: '10px' } },
              colors.map(color => h('div', {
                style: {
                  width: '30px', height: '30px', borderRadius: '4px',
                  backgroundColor: color, cursor: 'pointer',
                  border: model[row.prop] === color ? '2px solid #000' : '1px solid #dcdfe6'
                },
                on: { click: () => { model[row.prop] = color } }
              }))
            )
          }
        },
        {
          prop: 'showTags',
          label: '显示标签',
          span: 12,
          formtype: 'Switch',
          on: { change: () => { this.dynamicRuleKey = Date.now() } }
        }
      ],

      // 动态规则示例
      dynamicRuleKey: 0,
      dynamicRuleData: { name: '', email: '', requireEmail: false },
      dynamicRuleConfig: [],

      // 政策表单示例
      policyFormData: {
        policyName: '',
        policyAbstract: '',
        effectiveTimeRange: '',
        invalidTimeRange: '',
        policyTag: '',
        ispolicyTag: 'always',
        policyStatus: '0',
        policyReleaseType: '1',
        policyReleaseDate: '',
        coverImage: '',
        policyLinkContent: '',
        policyEitorContent: '',
        policyContentType: '1'
      },
      policyFormConfig: [],
      policyLayoutProps: {
        fromLayProps: { isBtnHiden: true, labelWidth: '120px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 代码示例
      basicExample,
      controlsExample,
      layoutExample,
      validationExample,
      dynamicFieldExample,
      customRenderExample,
      dynamicRuleExample,
      realWorldFormExample,

      // 代码折叠状态
      codeExpanded: {
        scene1: false,
        scene2: false,
        scene3: false,
        scene4: false,
        scene5: false,
        scene6: false,
        scene7: false,
        scene8: false
      }
    }
  },
  created() {
    // 动态规则配置
    this.dynamicRuleConfig = [
      { prop: 'name', label: '姓名', span: 12, formtype: 'Input', formItemOptions: { rules: [{ required: true, message: '请输入姓名' }] } },
      { prop: 'requireEmail', label: '需要邮箱', span: 12, formtype: 'Switch' },
      {
        prop: 'email',
        label: '邮箱',
        span: 12,
        formtype: 'Input',
        formItemOptions: {
          rules: this.dynamicRuleData.requireEmail
            ? [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式错误' }]
            : []
        },
        isHiden: () => !this.dynamicRuleData.requireEmail
      }
    ]

    // 政策表单配置
    this.policyFormConfig = [
      {
        prop: 'policyName',
        label: '政策名称',
        span: 24,
        formtype: 'Input',
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '政策名称不能为空', trigger: 'blur' }]
        },
        attrs: { placeholder: '请输入政策名称', clearable: true }
      },
      {
        prop: 'policyAbstract',
        label: '摘要',
        span: 24,
        formtype: 'Input',
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '摘要不能为空', trigger: 'blur' }]
        },
        attrs: { placeholder: '请输入政策摘要', type: 'textarea', rows: 3 }
      },
      {
        label: '政策生效时间',
        span: 24,
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '政策生效时间不能为空', trigger: 'change' }]
        },
        prop: 'effectiveTimeRange',
        formtype: 'datePicker',
        attrs: {
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          type: 'datetime',
          placeholder: '选择日期时间',
          style: 'width: 100%'
        }
      },
      {
        prop: 'policyTag',
        label: '政策标签',
        span: 24,
        formItemOptions: { labelWidth: '150px' },
        render: (h, model, row) => {
          return (
            <el-row gutter={20}>
              <el-col span={8} style="padding-left: 0;">
                <el-input v-model={model.policyTag} placeholder="请输入政策标签" />
              </el-col>
              <el-col span={10}>
                <el-radio-group v-model={model.ispolicyTag}>
                  <el-radio label="always">显示</el-radio>
                  <el-radio label="hide">隐藏</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          )
        }
      },
      {
        prop: 'policyStatus',
        label: '文章状态',
        span: 24,
        formItemOptions: {
          labelWidth: '150px',
          rules: [{ required: true, message: '文章状态不能为空', trigger: 'change' }]
        },
        formtype: 'Radio',
        attrs: { disabled: () => false },
        dataOptions: [{ label: '草稿', value: '0' }, { label: '上架', value: '1' }, { label: '下架', value: '2' }]
      },
      {
        prop: 'policyReleaseType',
        label: '发布方式',
        span: 24,
        formItemOptions: { labelWidth: '150px' },
        render: (h, model, row) => {
          return (
            <el-row gutter={20}>
              {model.policyReleaseType === '1' && (
                <el-col span={8} style="padding-left: 0;">
                  <el-date-picker
                    v-model={model.policyReleaseDate}
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择发布日期"
                    style="width: 100%;"
                  />
                </el-col>
              )}
              <el-col span={10}>
                <el-radio-group v-model={model.policyReleaseType}>
                  <el-radio label="0">立即发布</el-radio>
                  <el-radio label="1">定时发布</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          )
        }
      }
    ]
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
    }
  }
}
</script>

<style lang="scss">
.docs-container {
  padding: 20px;
  max-width: 1400px;
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

  .component-desc {
    color: #606266;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
    padding: 15px 20px;
    background: #f5f7fa;
    border-left: 4px solid #409eff;
    border-radius: 4px;
  }

  h2 {
    font-size: 24px;
    margin: 40px 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409eff;
    color: #303133;
  }

  h3 {
    font-size: 18px;
    color: #303133;
    margin: 30px 0 15px;
    padding-left: 12px;
    border-left: 4px solid #67c23a;
  }

  h4 {
    font-size: 15px;
    color: #303133;
    margin: 20px 0 10px;
  }

  p {
    color: #606266;
    line-height: 1.8;
    margin-bottom: 15px;

    code {
      background: #f4f4f5;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Consolas', monospace;
      color: #e96900;
      font-size: 13px;
    }
  }

  .demo-block {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    margin-bottom: 30px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    &--full {
      .demo-block__body {
        min-height: 400px;
      }
    }

    &__header {
      padding: 15px 20px;
      background: #fafafa;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }

    &__badge {
      font-size: 12px;
      padding: 2px 10px;
      border-radius: 12px;
      background: #409eff;
      color: #fff;
    }

    &__body {
      padding: 20px;
      background: #fff;
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
        font-family: 'Consolas', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: #606266;
      }

      code {
        white-space: pre-wrap;
        word-wrap: break-word;
        background: transparent;
        color: #606266;
        padding: 0;
      }
    }
  }

  .tips-box {
    padding: 16px 20px;
    border-radius: 8px;
    margin: 20px 0;

    &--success {
      background: #f0f9eb;
      border: 1px solid #e1f3d8;
      h4 { color: #67c23a; }
    }

    &--warning {
      background: #fdf6ec;
      border: 1px solid #faecd8;
      h4 { color: #e6a23c; }
    }

    &--info {
      background: #f4f4f5;
      border: 1px solid #e9e9eb;
      h4 { color: #909399; }
    }

    h4 {
      margin: 0 0 10px 0;
      font-size: 15px;
    }

    ul, ol {
      margin: 0;
      padding-left: 20px;

      li {
        margin: 8px 0;
        color: #606266;
        line-height: 1.6;
      }
    }

    p {
      margin: 0;
      color: #606266;
    }
  }

  .table-props {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;

    th, td {
      padding: 12px 16px;
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
      font-family: 'Consolas', monospace;
      color: #e96900;
      font-size: 12px;
    }

    tr:hover {
      background: #f5f7fa;
    }
  }
}
</style>
