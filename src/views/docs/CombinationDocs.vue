<template>
  <div class="docs-container">
    <!-- Hero Section -->
    <section class="modern-hero">
      <div class="hero-badge">
        <i class="el-icon-link" />
        <span>进阶用法</span>
      </div>
      <h1 class="hero-title">组件组合联动</h1>
      <p class="hero-desc">
        本页展示 es-eui 组件之间的组合使用方式，
        包括 EsTable、EsForm、useDialog 的多种组合场景，帮助你构建复杂的业务界面
      </p>
    </section>

    <!-- Scene 1: Table + Form Query -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon blue">
          <i class="el-icon-s-data" />
        </div>
        <h2 class="section-title">场景一：查询表单联动</h2>
      </div>
      <p class="section-desc">EsForm 作为查询条件，EsTable 展示查询结果。表单提交后自动触发表格刷新：</p>


    <div class="demo-block">
      <div class="demo-block__body">
        <div class="query-form-section">
          <es-form
            ref="queryForm"
            :form-item-list="queryFormItems"
            :model="queryFormData"
            :layout-form-props="{ fromLayProps: { inline: true, size: 'mini' }, rowLayProps: { gutter: 10 } }"
            :configBtn="[{ name: '查询', type: 'primary', onClick: ( model, refs) => handleSearch(refs, model) }, { name: '重置', onClick: (model, refs) => handleReset(refs, model) }]"
          />
          <!-- <div class="query-actions">
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          </div> -->
        </div>
        <es-table
          ref="tableWithQuery"
          :columns="tableColumns"
          :data-source.sync="tableWithQueryData"
            :pagination="tableWithQueryPagination"
          :options="{ 
            border: true, 
            stripe: true,
            tabHeight: 250,
            heightType: 'height',
            isInitRun: true,  // 不自动请求，等待点击查询
            // 使用真实免费 API: https://dummyjson.com/users
            apiParams: {
              url: 'https://dummyjson.com/users',
              method: 'get'
            },
            // 使用 httpRequest 自定义请求，配置 credentials: 'omit' 解决跨域
            httpRequest: (params) => this.fetchWithCORS(params),
            configTableOut: {
              total: 'total',
              pageSize: 'limit',
              current: 'skip',
              tableData: 'users'
            },
            listenToCallBack: {
              brcb: (params) => {
                // DummyJSON 使用 skip/limit 作为分页参数
                const { pageSize, pageIndex } = params
                return { 
                  limit: pageSize,
                  skip: (pageIndex - 1) * pageSize
                }
              }
            }
          }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene1 }">
        <div class="code-header" @click="toggleCode('scene1')">
          <i :class="codeExpanded.scene1 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene1 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene1"><code>{{ tableFormQueryExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 2: Form with Table -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon purple">
          <i class="el-icon-s-order" />
        </div>
        <h2 class="section-title">场景二：表单内嵌表格</h2>
      </div>
      <p class="section-desc">在 EsForm 表单中使用自定义渲染，内嵌 EsTable 表格，实现复杂的数据录入场景：</p>


    <div class="demo-block">
      <div class="demo-block__body">
        <es-form
          ref="formWithTable"
    
          :form-item-list="formWithTableItems"
          :model="formWithTableData"
        />
        <div class="form-actions">
          <el-button type="primary" @click="submitFormWithTable">提交</el-button>
          <el-button @click="resetFormWithTable">重置</el-button>
        </div>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
        <div class="code-header" @click="toggleCode('scene2')">
          <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene2"><code>{{ formWithTableExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 3: Dialog + Native Form -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon green">
          <i class="el-icon-s-claim" />
        </div>
        <h2 class="section-title">场景三：弹窗 + 原生表单</h2>
      </div>
      <p class="section-desc">在弹窗中使用原生 Element UI 表单，适合简单表单场景：</p>


    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openNativeFormDialog">打开表单弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
        <div class="code-header" @click="toggleCode('scene3')">
          <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene3"><code>{{ dialogNativeFormExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 4: Dialog + EsForm -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon orange">
          <i class="el-icon-s-claim" />
        </div>
        <h2 class="section-title">场景四：弹窗 + EsForm（推荐）</h2>
      </div>
      <p class="section-desc">在弹窗中使用 EsForm 组件，通过 JSX 渲染，支持复杂的表单配置和验证：</p>
    

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openEsFormDialog">打开 EsForm 弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
        <div class="code-header" @click="toggleCode('scene4')">
          <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene4"><code>{{ dialogEsFormExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 5: Dialog + EsTable -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon cyan">
          <i class="el-icon-s-claim" />
        </div>
        <h2 class="section-title">场景五：弹窗 + EsTable</h2>
      </div>
      <p class="section-desc">在弹窗中使用 EsTable 表格，实现数据选择功能：</p>
   

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openEsTableDialog">打开表格选择弹窗</el-button>
        <div v-if="selectedUser" class="selected-info">
          已选择用户：<el-tag>{{ selectedUser.name }}</el-tag>
        </div>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
        <div class="code-header" @click="toggleCode('scene5')">
          <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene5"><code>{{ dialogEsTableExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 6: Dialog + Table + Form -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon pink">
          <i class="el-icon-s-claim" />
        </div>
        <h2 class="section-title">场景六：三者组合（完整场景）</h2>
      </div>
      <p class="section-desc">在弹窗中同时使用 EsTable 和 EsForm，实现表格查询+表单编辑的完整功能：</p>
 

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openFullFeatureDialog">打开完整功能弹窗</el-button>
        <div v-if="fullFeatureResult" class="selected-info">
          操作结果：{{ fullFeatureResult }}
        </div>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
        <div class="code-header" @click="toggleCode('scene6')">
          <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene6"><code>{{ dialogFullFeatureExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 7: Inline Edit -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon blue">
          <i class="el-icon-edit" />
        </div>
        <h2 class="section-title">场景七：行内编辑 + EsForm</h2>
      </div>
      <p class="section-desc">在 EsTable 中使用自定义渲染实现行内编辑，结合 EsForm 进行数据验证：</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <es-table
          ref="inlineEditTable"
          :columns="inlineEditColumns"
          :data-source="inlineEditData"
          :options="{ border: true }"
        />
        <div class="form-actions" style="margin-top: 15px;">
          <el-button type="primary" @click="saveInlineEdit">保存所有修改</el-button>
        </div>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
        <div class="code-header" @click="toggleCode('scene7')">
          <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene7"><code>{{ inlineEditExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 8: Nested Dialog -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon purple">
          <i class="el-icon-s-claim" />
        </div>
        <h2 class="section-title">场景八：弹窗嵌套</h2>
      </div>
      <p class="section-desc">在一个 useDialog 弹窗中再次打开另一个弹窗，实现复杂的多层交互：</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <el-button type="primary" @click="openNestedDialog">打开嵌套弹窗</el-button>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene8 }">
        <div class="code-header" @click="toggleCode('scene8')">
          <i :class="codeExpanded.scene8 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene8 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene8"><code>{{ nestedDialogExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Scene 9: Table with Form Query -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon green">
          <i class="el-icon-s-data" />
        </div>
        <h2 class="section-title">场景九：表格内嵌表单联动查询</h2>
      </div>
      <p class="section-desc">标准查询列表页模式：EsTable 作为主容器，通过 slot 在表格头部嵌入 EsForm 查询表单，实现查询联动：</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <es-table
          ref="tableWithFormQuery"
          :columns="tableWithFormColumns"
          :data-source.sync="tableWithFormData"
          :options="{
            border: true,
            stripe: true,
            isInitRun: true,
            tabHeight: 300,
            heightType: 'max-height',
          //  showHeaderBar: true,
            // 使用免费 API: https://jsonplaceholder.typicode.com/posts
            apiParams: {
              url: 'https://jsonplaceholder.typicode.com/posts',
              method: 'get',
              model: {}
            },
            configTableOut: {
              total: 'total',
              pageSize: 'pageSize',
              current: 'pageIndex',
              tableData: 'data'
            },
            listenToCallBack: {
              brcb: (params) => this.handleBeforeQuery(params),
              qrcb: (res) => {
            
                // JSONPlaceholder 返回数组，需要包装成分页格式
                if (Array.isArray(res)) {
                  return {
                    data: res.slice(0, 10),
                    total: 100, // JSONPlaceholder 固定返回100条
                    pageSize: 10,
                    pageIndex: params.pageIndex || 1
                  }
                }
                return res
              }
            }
          }"
        >
    
            <es-form
              ref="tableQueryFormRef"
              :form-item-list="tableQueryFormItems"
              :model="tableQueryForm"
              :layout-form-props="{
                fromLayProps: {size: 'small', labelWidth: '80px' },
                rowLayProps: { gutter: 15 }
              }"
              :configBtn="[
                { name: '查询', type: 'primary', icon: 'el-icon-search', key: 'query', triggerEvent: true },
                { name: '重置', icon: 'el-icon-refresh',  key: 'rest', triggerEvent: true },
                { name: '新增', type: 'success', icon: 'el-icon-plus', onClick: () => handleTableAdd() }
              ]"
            />
   
        </es-table>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene9 }">
        <div class="code-header" @click="toggleCode('scene9')">
          <i :class="codeExpanded.scene9 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene9 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene9"><code>{{ tableWithFormQueryExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- Best Practices Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon cyan">
          <i class="el-icon-s-management" />
        </div>
        <h2 class="section-title">组合使用最佳实践</h2>
      </div>
      <div class="modern-table-wrapper">
        <table class="modern-table">
      <thead>
        <tr>
          <th>场景</th>
          <th>推荐方案</th>
          <th>注意事项</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>查询列表页</td>
          <td>EsForm + EsTable</td>
          <td>使用 options.apiParams 配置接口，手动查询时调用 httpRquestInstace()</td>
        </tr>
        <tr>
          <td>新增/编辑弹窗</td>
          <td>useDialog + EsForm (JSX)</td>
          <td>使用 ref 获取表单引用，validate 验证后提交</td>
        </tr>
        <tr>
          <td>数据选择弹窗</td>
          <td>useDialog + EsTable</td>
          <td>使用 selection-change 获取选中项，getRefs 获取表格引用</td>
        </tr>
        <tr>
          <td>复杂编辑弹窗</td>
          <td>useDialog + EsTable + EsForm</td>
          <td>使用 Tabs 分隔不同区域，分别管理各自的数据状态</td>
        </tr>
        <tr>
          <td>行内编辑</td>
          <td>EsTable 自定义列渲染</td>
          <td>使用 render 函数返回 EsFormItem 或原生输入组件</td>
        </tr>
      </tbody>
    </table>
    </div>
    </section>

    <!-- API Quick Reference Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon orange">
          <i class="el-icon-document" />
        </div>
        <h2 class="section-title">关键 API 速查</h2>
      </div>
      <div class="modern-table-wrapper">
        <table class="modern-table">
      <thead>
        <tr>
          <th>组件</th>
          <th>方法/属性</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>EsTable</td>
          <td>httpRquestInstace()</td>
          <td>手动触发表格数据刷新</td>
        </tr>
        <tr>
          <td>EsTable</td>
          <td>getSelectedRow()</td>
          <td>获取当前选中行</td>
        </tr>
        <tr>
          <td>EsForm</td>
          <td>validate(callback)</td>
          <td>表单验证</td>
        </tr>
        <tr>
          <td>EsForm</td>
          <td>resetFields()</td>
          <td>重置表单</td>
        </tr>
        <tr>
          <td>EsForm</td>
          <td>setFormData(data)</td>
          <td>设置表单数据</td>
        </tr>
        <tr>
          <td>useDialog</td>
          <td>getRefs(refName)</td>
          <td>获取弹窗内组件引用</td>
        </tr>
        <tr>
          <td>useDialog</td>
          <td>close()</td>
          <td>关闭弹窗</td>
        </tr>
        <tr>
          <td>useDialog</td>
          <td>instance</td>
          <td>弹窗实例，可访问内部数据</td>
        </tr>
      </tbody>
    </table>
    </div>
    </section>

    <!-- Next Steps Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon green">
          <i class="el-icon-right" />
        </div>
        <h2 class="section-title">下一步</h2>
      </div>
      <p class="section-desc">已经掌握了组件组合用法？回顾各个组件的详细文档：</p>

      <div class="next-links">
        <router-link to="/component/estable" class="next-card">
          <div class="next-icon blue">
            <i class="el-icon-s-data" />
          </div>
          <div class="next-info">
            <h3>EsTable 表格组件</h3>
            <p>了解表格的详细用法和高级功能</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>

        <router-link to="/component/esform" class="next-card">
          <div class="next-icon purple">
            <i class="el-icon-s-order" />
          </div>
          <div class="next-info">
            <h3>EsForm 表单组件</h3>
            <p>学习更多表单控件类型和验证</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>

        <router-link to="/component/esdialog" class="next-card">
          <div class="next-icon orange">
            <i class="el-icon-s-claim" />
          </div>
          <div class="next-info">
            <h3>useDialog 弹窗</h3>
            <p>掌握弹窗的更多高级用法</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { useDialog } from '@/components/es-eui'
import {
  tableFormQueryExample,
  formWithTableExample,
  dialogNativeFormExample,
  dialogEsFormExample,
  dialogEsTableExample,
  dialogFullFeatureExample,
  inlineEditExample,
  nestedDialogExample,
  tableWithFormQueryExample
} from './examples/componentIntegrationExamples'

// 预先创建 dialog 实例
const dialogInstance = useDialog()

export default {
  name: 'CombinationDocs',
  data() {
    return {
      // ===== 场景1: 查询表单 + 表格 =====
      queryFormData: {
        name: '',
        status: '',
        dateRange: []
      },
      queryFormItems: [
        { prop: 'name', label: '姓名', span: 6, formtype: 'Input', attrs: { placeholder: '请输入姓名' } },
        { 
          prop: 'status', 
          label: '状态', 
          span: 6, 
          formtype: 'Select',
          dataOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ]
        },
        { 
          prop: 'dateRange', 
          label: '时间范围', 
          span: 8, 
          formtype: 'DatePicker',
          attrs: { 
            type: 'daterange', 
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        }
      ],
      // 场景一表格列配置 - 适配 DummyJSON API
      tableWithQueryData: [],
      tableWithQueryPagination: {
        pageIndex: 1, pageSize: 10, total: 0
      },
      tableColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'firstName', label: '名', width: 120 },
        { key: 'lastName', label: '姓', width: 120 },
        { key: 'email', label: '邮箱' },
        {
          key: 'image',
          label: '头像',
          width: 80,
          render: (h, { row }) => (
            <el-avatar size="small" src={row.image} />
          )
        }
      ],

      // ===== 场景2: 表单内嵌表格 =====
      formWithTableData: {
        orderNo: '',
        customer: '',
        items: [
          { id: 1, product: '产品A', quantity: 2, price: 100 },
          { id: 2, product: '产品B', quantity: 1, price: 200 }
        ]
      },
      formWithTableItems: [],


       formData: { name: '', email: '' },

      // ===== 场景5: 选择用户 =====
      selectedUser: null,

      // ===== 场景6: 完整功能 =====
      fullFeatureResult: '',

      queryData: { keyword: '' },
      tableData: [
        { id: 1, name: '产品A', price: 100, stock: 50 },
        { id: 2, name: '产品B', price: 200, stock: 30 },
        { id: 3, name: '产品C', price: 150, stock: 100 }
      ],
      formData: { selectedProduct: null, quantity: 1, remark: 'fdsavfdsa' },

      // ===== 场景7: 行内编辑 =====
      inlineEditData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', editing: false },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', editing: false },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', editing: false }
      ],
      inlineEditColumns: [],

      // 示例代码
      tableFormQueryExample,
      formWithTableExample,
      dialogNativeFormExample,
      dialogEsFormExample,
      dialogEsTableExample,
      dialogFullFeatureExample,
      inlineEditExample,
      nestedDialogExample,
      tableWithFormQueryExample,

      // ===== 场景9: 表格内嵌表单联动查询 =====
      tableQueryForm: {
        keyword: '',
        status: '',
        category: '',
        dateRange: []
      },
      tableQueryFormItems: [
        {
          prop: 'keyword',
          label: '关键词',
          span: 6,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入名称/编号',
            clearable: true,
            style:'width: 100%'
          }
        },
        {
          prop: 'status',
          label: '状态',
          span: 5,
          formtype: 'Select',
          formItemOptions: {
             labelWidth: '50px'
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ],
          attrs: { placeholder: '请选择状态', clearable: true, style:'width: 100%' }
        },
        {
          prop: 'category',
          label: '分类',
          span: 5,
          formtype: 'Select',
          formItemOptions: {
             labelWidth: '50px'
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '电子产品', value: 'electronics' },
            { label: '服装', value: 'clothing' },
            { label: '食品', value: 'food' }
          ],
          attrs: { placeholder: '请选择分类', clearable: true, style:'width: 100%'  }
        },
        {
          prop: 'dateRange',
          label: '时间范围',
          span: 8,
          formtype: 'DatePicker',
      
          attrs: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd',
            clearable: true,
            style:'width: 100%'
          }
        }
      ],
      // 场景九表格列配置 - 适配 JSONPlaceholder API
      tableWithFormData: [],
      tableWithFormColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'title', label: '标题', width: 280 },
        {
          key: 'userId',
          label: '用户ID',
          width: 100,
          render: (h, { row }) => (
            <el-tag size="mini" type="info">用户{row.userId}</el-tag>
          )
        },
        {
          key: 'body',
          label: '内容',
          render: (h, { row }) => <span>{row.body.substring(0, 50) + '...'}</span> 
        },
        {
          key: 'action',
          label: '操作',
          width: 200,
          render: (h, { row }) => (
            <span>
              <el-button type="text" size="small" on-click={() => this.handleTableEdit(row)}>编辑</el-button>
              <el-button type="text" size="small" style="color: #f56c6c;" on-click={() => this.handleTableDelete(row)}>删除</el-button>
            </span>
          )
        }
      ],

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
        scene9: false
      }
    }
  },
  created() {
    // 初始化 HTTP 请求方法（供 es-table 使用）
    this.initHttpRequest()
    // 初始化表单内嵌表格的配置
    this.initFormWithTableItems()
    this.initInlineEditColumns()
  },
  methods: {
    // 初始化表单内嵌表格
    initFormWithTableItems() {
      this.formWithTableItems = [
        { prop: 'orderNo', label: '订单编号', span: 12, formtype: 'Input' },
        { prop: 'customer', label: '客户名称', span: 12, formtype: 'Input' },
        {
          prop: 'items',
          label: '订单明细',
          span: 24,
          // 使用 render 属性自定义渲染，不设置 formtype
          render: (h, model, row) => (
            <es-table
              data-source={this.formWithTableData.items}
              columns={[
                { key: 'product', label: '产品', width: 200 },
                { 
                  key: 'quantity', 
                  label: '数量', 
                  width: 150,
                  render: (h, { row: item }) => (
                    <el-input-number 
                      v-model={item.quantity} 
                      min={1} 
                      size="small" 
                      style="width: 100px;"
                    />
                  )
                },
                { 
                  key: 'price', 
                  label: '单价', 
                  width: 150,
                  render: (h, { row: item }) => (
                    <el-input 
                      v-model={item.price} 
                      size="small"
                      style="width: 100px;"
                    >
                      <template slot="prepend">¥</template>
                    </el-input>
                  )
                },
                { 
                  key: 'subtotal', 
                  label: '小计',
                  render: (h, { row: item }) => (
                    <span style="color: #f56c6c; font-weight: bold;">
                      ¥{item.quantity * item.price}
                    </span>
                  )
                },
                {
                  key: 'action',
                  label: '操作',
                  width: 100,
                  render: (h, { row: item, $index }) => (
                    <el-button 
                      type="text" 
                      size="small"
                      on-click={() => this.removeItem($index)}
                    >
                      删除
                    </el-button>
                  )
                }
              ]}
              options={{ border: true}}
            />
          )
        }
      ]
    },

    // 初始化行内编辑列
    initInlineEditColumns() {
      this.inlineEditColumns = [
        { key: 'id', label: 'ID', width: 80 },
        { 
          key: 'name', 
          label: '姓名', 
          width: 150,
          render: (h, { row }) => row.editing ? (
            <el-input v-model={row.name} size="small" />
          ) : <span>{row.name}</span>
        },
        { 
          key: 'age', 
          label: '年龄', 
       
          render: (h, { row }) => row.editing ? (
            <el-input-number v-model={row.age} size="small" min={1} max={150} />
          ) : <span>{ row.age }</span>
        },
        { 
          key: 'email', 
          label: '邮箱',
          render: (h, { row }) => row.editing ? (
            <el-input v-model={row.email} size="small" />
          ) : <span>{row.email}</span> 
        },
        {
          key: 'action',
          label: '操作',
          width: 150,
          render: (h, { row }) => row.editing ? (
            <span>
              <el-button type="text" size="small" on-click={() => this.saveRow(row)}>保存</el-button>
              <el-button type="text" size="small" on-click={() => this.cancelEdit(row)}>取消</el-button>
            </span>
          ) : (
            <el-button type="text" size="small" on-click={() => this.editRow(row)}>编辑</el-button>
          )
        }
      ]
    },

    // ===== 场景1: 查询表单 + 表格 =====
    // 在 created 中挂载 $httpRequest 方法供 es-table 使用
    initHttpRequest() {
      // 挂载模拟请求方法到组件实例
      this.$httpRequest = (params) => {
        console.log('查询参数:', params.formParams)
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockData = [
              { id: 1, name: '张三', email: 'zhangsan@example.com', status: '1', createTime: '2024-01-15 10:30:00' },
              { id: 2, name: '李四', email: 'lisi@example.com', status: '0', createTime: '2024-01-14 14:20:00' },
              { id: 3, name: '王五', email: 'wangwu@example.com', status: '1', createTime: '2024-01-13 09:15:00' }
            ].filter(item => {
              if (params.formParams.name && !item.name.includes(params.formParams.name)) return false
              if (params.formParams.status && item.status !== params.formParams.status) return false
              return true
            })
            resolve({
              data: {
                code: 200,
                data: {
                  rows: mockData,
                  records: mockData.length
                }
              }
            })
          }, 300)
        })
      }
    },

    // ===== 使用 fetch API 发送请求，配置 credentials: 'omit' 解决跨域问题 =====
    fetchWithCORS(params) {
      const { url, formParams, headers = {}, method = 'get' } = params
      
      // 构建 URL 和查询参数
      let requestUrl = url
      if (method.toLowerCase() === 'get' && formParams) {
        const queryParams = new URLSearchParams()
        Object.keys(formParams).forEach(key => {
          if (formParams[key] !== undefined && formParams[key] !== null && formParams[key] !== '') {
            queryParams.append(key, formParams[key])
          }
        })
        const queryString = queryParams.toString()
        if (queryString) {
          requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
        }
      }
      
      // 使用 fetch API，设置 credentials: 'omit' 不携带 cookie，解决跨域问题
      return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        credentials: 'omit' // 关键：不携带 credentials，避免 CORS 问题
      }).then(res => res.json())
    },

    handleSearch(refs, model) {
      // 手动触发表格刷新
      this.$refs.tableWithQuery.httpRquestInstace()
    },
    handleReset(refs, model) {

     refs.resetFields()
      this.$nextTick(() => {
        this.handleSearch()
      })
    },

    // ===== 场景2: 表单内嵌表格 =====
    removeItem(index) {
      this.formWithTableData.items.splice(index, 1)
    },
    submitFormWithTable() {
      console.log('提交数据:', this.formWithTableData)
      this.$message.success('提交成功')
    },
    resetFormWithTable() {
      this.formWithTableData = {
        orderNo: '',
        customer: '',
        items: []
      }
    },

    // ===== 场景3: useDialog + 原生表单 =====
    openNativeFormDialog() {
      // 创建响应式表单数据
      const formData = Vue.observable({
        name: '',
        email: ''
      })
      
      // 保存表单引用，用于手动触发校验
      let formRef = null
      
      dialogInstance({
        title: '原生表单弹窗',
        key: 'nativeFormDialog',
        width: '500px',
        // 关键：使用 DOM 属性和事件监听，确保响应式正确
        render: (h) => {
          return (
            <el-form 
              ref="nativeForm" 
              props={{ model: formData }}
              label-width="80px" 
              size="small"
            >
              <el-form-item 
                label="姓名" 
                prop="name"
                rules={[{ required: true, message: '请输入姓名', trigger: 'blur' }]}
              >
                <el-input 
                  attrs={{ value: formData.name }}
                  on={{ 
                    input: (val) => { 
                      formData.name = val 
                      // 输入时清除当前字段的错误状态
                      if (formRef) {
                        formRef.clearValidate('name')
                      }
                    },
              
                  }}
                  placeholder="请输入姓名"
                />
              </el-form-item>
              <el-form-item 
                label="邮箱" 
                prop="email"
                rules={[
                  { required: true, message: '请输入邮箱', trigger: 'blur' },
                  { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                ]}
              >
                <el-input 
                  attrs={{ value: formData.email }}
                  on={{ 
                    input: (val) => { 
                      formData.email = val 
                      // 输入时清除当前字段的错误状态
                      if (formRef) {
                        formRef.clearValidate('email')
                      }
                    }
           
                  }}
                  placeholder="请输入邮箱"
                />
              </el-form-item>
            </el-form>
          )
        },
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: (instance, { close }) => close()
          },
          {
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: (instance, { close, getRefs }) => {
              formRef = getRefs('nativeForm')
              formRef.validate((valid) => {
                if (valid) {
                  this.$message.success(`提交成功: ${formData.name} / ${formData.email}`)
                  close()
                }
              })
            }
          }
        ]
      })
    },

    // ===== 场景4: useDialog + EsForm =====
    openEsFormDialog() {
      // 关键修复：使用 Vue.observable 创建响应式对象
      const formData = Vue.observable({ name: '', status: '', remark: '' })
      dialogInstance({
        title: 'EsForm 弹窗',
        width: '600px',
        render: (h, ctx) => (
          <es-form
            ref="esFormInDialog"
            form-item-list={[
              { prop: 'name', label: '名称', span: 12, formtype: 'Input', formItemOptions: { rules: [{ required: true, message: '请输入名称' }] } },
              { prop: 'status', label: '状态', span: 12, formtype: 'Select', attrs: { style: 'width: 100%'}, dataOptions: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }] },
              { prop: "remark", label: '备注', span: 24, formtype: 'Input', attrs: { type: 'textarea', rows: 3 } }
            ]}
            formModel={formData}
          />
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: (instance,{ close }) => close()
          },
          {
            name: '保存',
            type: 'primary',
            key: 'save',
            onClick: (instance, { close, getRefs }) => {
              const formRef = getRefs('esFormInDialog')
              console.log('formRef.validate', formRef)
              formRef.validate((valid) => {
                if (valid) {
                  this.$message.success('保存成功')
                  console.log('表单数据:', formData)
                  close()
                }
              })
            }
          }
        ]
      })
    },

    // ===== 场景5: useDialog + EsTable =====
    openEsTableDialog() {
      const tableData = [
        { id: 1, name: '张三', department: '技术部', position: '工程师' },
        { id: 2, name: '李四', department: '产品部', position: '产品经理' },
        { id: 3, name: '王五', department: '运营部', position: '运营专员' }
      ]
      let selectedRow = null

      dialogInstance({
        title: '选择用户',
        width: '700px',
        render: (h) => (
          <es-table
            ref="selectTable"
            data-source={tableData}
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'name', label: '姓名', width: 120 },
              { key: 'department', label: '部门', width: 150 },
              { key: 'position', label: '职位' }
            ]}
            options={{ border: true, highlightCurrentRow: true }}
            on-current-change={(row) => { selectedRow = row }}
          />
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: (instance,{ close }) => close()
          },
          {
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: (instance, { close }) => {
              if (selectedRow) {
                this.selectedUser = selectedRow
                this.$message.success(`已选择: ${selectedRow.name}`)
                close()
              } else {
                this.$message.warning('请先选择用户')
              }
            }
          }
        ]
      })
    },

    // ===== 场景6: useDialog + EsTable + EsForm =====
    openFullFeatureDialog() {
      const { queryData, tableData } = this
      let selectedRow = null
      
      // 关键修复：重置响应式 formData，确保数据是响应式的
      this.formData.selectedProduct = null
      this.formData.quantity = 1
      this.formData.remark = ''
      
      useDialog()({
        key: 'fullFeatureDialog',
        title: '选择产品并填写订单',
        width: '800px',
        height: '600px',
        render: (h, ctx) => (
            <div>
              <div style="margin-bottom: 15px;">
                <el-input 
                  v-model={queryData.keyword} 
                  placeholder="搜索产品" 
                  size="small"
                  style="width: 200px; margin-right: 10px;"
                >
                  <el-button slot="append" icon="el-icon-search" />
                </el-input>
              </div>
              <es-table
                ref="productTable"
                data-source={tableData.filter(item => !queryData.keyword || item.name.includes(queryData.keyword))}
                columns={[
                  { key: 'id', label: 'ID', width: 80 },
                  { key: 'name', label: '产品名称'},
                  { key: 'price', label: '价格', render: (h, { row }) => `¥${row.price}` },
                  { key: 'stock', label: '库存',  }
                ]}
                options={{ border: true, highlightCurrentRow: true, heightType: 'height', tabHeight: 150 }}
                on-current-change={(row) => { selectedRow = row }}
                style="margin-bottom: 20px;"
              />
              <el-divider content-position="left">订单信息</el-divider>
              <es-form
                ref="orderForm"
                form-item-list={[
                  { 
                    prop: 'selectedProduct', 
                    label: '已选产品', 
                    span: 24, 
                    formtype: 'Input',
                    attrs: { disabled: false },
                    itemValue: selectedRow ? selectedRow.name : '请从上方表格选择产品'
                  },
                  { 
                    prop: 'quantity', 
                    label: '购买数量', 
                    span: 12, 
                    formtype: 'InputNumber',
                    attrs: { min: 1 },
                    formItemOptions: { rules: [{ required: true, message: '请输入数量' }] }
                  },
                  { prop: 'remark', label: '备注', span: 24, formtype: 'Input', attrs: { type: 'textarea', rows: 2 }, formItemOptions: { rules: [{ required: true, message: '请输入备注' }] } }
                ]}
                formModel={this.formData}
              />
            </div>
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: (instance, { close }) => close()
          },
          {
            name: '提交订单',
            type: 'primary',
            key: 'submit',
            onClick: (instantce, { close, getRefs }) => {
              // 关键修复：使用响应式的 this.formData
              console.log('configBtn onClick - this.formData:', this.formData)
              if (!selectedRow) {
                this.$message.warning('请先选择产品')
                return
              }
              const formRef = getRefs('orderForm')
              formRef.validate((valid) => {
                if (valid) {
                  this.fullFeatureResult = `产品: ${selectedRow.name}, 数量: ${this.formData.quantity}`
                  this.$message.success('订单提交成功')
                  close()
                }
              })
            }
          }
        ]
      })
    },

    // ===== 场景7: 行内编辑 =====
    editRow(row) {
      row.editing = true
      row._original = { ...row }
    },
    saveRow(row) {
      row.editing = false
      delete row._original
      this.$message.success('保存成功')
    },
    cancelEdit(row) {
      Object.assign(row, row._original)
      row.editing = false
      delete row._original
    },
    saveInlineEdit() {
      console.log('保存所有数据:', this.inlineEditData)
      this.inlineEditData = this.inlineEditData.map(item => {
            item.editing = false
            return item
      })
      this.$message.success('所有修改已保存')
    },

    // ===== 场景8: 嵌套弹窗 =====
    openNestedDialog() {
      dialogInstance({
        title: '第一层弹窗',
        width: '500px',
        key: 'openNestedDialog',
        render: (h) => (
          <div>
            <p>这是第一层弹窗内容</p>
            <el-button type="primary" on-click={() => this.openSecondDialog()}>打开第二层弹窗</el-button>
          </div>
        ),
        configBtn: [
          { name: '关闭', key: 'close', onClick: (instance,{ close }) => close() }
        ]
      })
    },
    openSecondDialog() {
      useDialog()({
        title: '第二层弹窗',
        width: '400px',
        key: 'openSecondDialog',
        render: (h) => <p>这是第二层弹窗内容</p>,
        configBtn: [
          { name: '关闭', key: 'close', onClick: (instance,{ close }) => close() }
        ]
      })
    },

    // ===== 场景9: 表格内嵌表单联动查询 =====
    // 查询前回调：格式化参数
    handleBeforeQuery(params) {
      const result = {}
      
      // JSONPlaceholder 支持的分页参数：_page 和 _limit
      if (params.pageIndex) {
        result._page = params.pageIndex
      }
      if (params.pageSize) {
        result._limit = params.pageSize
      }
      
      // 只添加有值的过滤参数（空字符串会导致 API 返回空结果）
      if (params.keyword && params.keyword.trim()) {
        // JSONPlaceholder 的 title 查询需要完全匹配，这里用 q 进行全文搜索
        result.q = params.keyword.trim()
      }
      
      // userId 过滤（必须是数字且不为空）
      if (params.status && params.status !== '') {
        // 使用 status 作为 userId 过滤（模拟关联）
        result.userId = params.status
      }
      
      console.log('查询参数:', result)
      return result
    },
    // 查询
    handleTableQuery() {
      this.$refs.tableWithFormQuery.httpRquestInstace()
    },
    // 重置：清空表单并刷新
    handleTableReset() {
      // 重置表单数据
      this.tableQueryForm.keyword = ''
      this.tableQueryForm.status = ''
      this.tableQueryForm.category = ''
      this.tableQueryForm.dateRange = []
      
      this.$nextTick(() => {
        this.handleTableQuery()
      })
    },
    // 新增
    handleTableAdd() {
      this.$message.info('打开新增弹窗')
    },
    // 编辑
    handleTableEdit(row) {

      this.$message.info(`编辑: ${row.title}`)
    },
    // 删除
    handleTableDelete(row) {
      this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.handleTableQuery()
      })
    },

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

<style lang="scss" scoped>
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
    margin: 40px 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409eff;
    color: #303133;
  }

  p {
    color: #28292d;
    line-height: 1.6;
    margin-bottom: 15px;
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

  .query-form-section {
    display: flex;
    align-items: flex-start;

    border-radius: 4px;

    ::v-deep .es-form {
      flex: 1;
    }

    .query-actions {
      margin-left: 10px;
      padding-top: 4px;
    }
  }

  .form-actions {

    text-align: center;
  }

  .selected-info {
    margin-top: 15px;
    padding: 10px;
    background: #f0f9ff;
    border-radius: 4px;
    color: #606266;
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

  // ===== 场景9: 表格内嵌表单样式 =====
  .query-form-wrapper {
    padding: 15px;
    background: #f5f7fa;
    border-radius: 4px;
    margin-bottom: 10px;
  }
}
</style>
