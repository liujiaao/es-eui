<template>
  <div class="docs-container">
    <div class="docs-header">
      <h1>Es-EUI 组件组合联动</h1>
      <p>本页展示 es-eui 组件之间的组合使用方式，包括 EsTable、EsForm、useDialog 的多种组合场景。</p>
      <div class="global-actions">
        <el-button size="small" @click="expandAll">
          <i class="el-icon-arrow-down"></i> 全部展开
        </el-button>
        <el-button size="small" @click="collapseAll">
          <i class="el-icon-arrow-up"></i> 全部收起
        </el-button>
      </div>
    </div>

    <!-- ===== 场景1: EsTable + EsForm 查询表单联动 ===== -->
    <h2>场景一：EsTable + EsForm 查询表单联动</h2>
    <p>EsForm 作为查询条件，EsTable 展示查询结果。表单提交后自动触发表格刷新。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <div class="query-form-section">
          <es-form
            ref="queryForm"
            :form-item-list="queryFormItems"
            :model="queryFormData"
            :layout-form-props="{ fromLayProps: { inline: true, size: 'mini' }, rowLayProps: { gutter: 10 } }"
            :configBtn="[{ name: '查询', type: 'primary', onClick: (refs, model) => handleSearch(refs, model) }, { name: '重置', onClick: (refs, model) => handleReset(refs, model) }]"
          />
          <!-- <div class="query-actions">
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          </div> -->
        </div>
        <es-table
          ref="tableWithQuery"
          :columns="tableColumns"
          :options="{ 
            border: true, 
            stripe: true,
            isInitRun: false,  // 不自动请求，等待点击查询
            apiParams: {
              url: '/api/users',
              model: queryFormData  // 绑定查询参数
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

    <!-- ===== 场景2: EsForm + EsTable 表单内嵌表格 ===== -->
    <h2>场景二：EsForm + EsTable 表单内嵌表格</h2>
    <p>在 EsForm 表单中使用自定义渲染，内嵌 EsTable 表格，实现复杂的数据录入场景。</p>

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

    <!-- ===== 场景3: useDialog + 原生表单 ===== -->
    <h2>场景三：useDialog + 原生表单</h2>
    <p>在弹窗中使用原生 Element UI 表单，适合简单表单场景。</p>

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

    <!-- ===== 场景4: useDialog + EsForm ===== -->
    <h2>场景四：useDialog + EsForm（推荐）</h2>
    <p>在弹窗中使用 EsForm 组件，通过 JSX 渲染，支持复杂的表单配置和验证。</p>

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

    <!-- ===== 场景5: useDialog + EsTable ===== -->
    <h2>场景五：useDialog + EsTable</h2>
    <p>在弹窗中使用 EsTable 表格，实现数据选择功能。</p>

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

    <!-- ===== 场景6: useDialog + EsTable + EsForm 三者组合 ===== -->
    <h2>场景六：useDialog + EsTable + EsForm（完整场景）</h2>
    <p>在弹窗中同时使用 EsTable 和 EsForm，实现表格查询+表单编辑的完整功能。</p>

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

    <!-- ===== 场景7: EsTable 行内编辑 + EsForm ===== -->
    <h2>场景七：EsTable 行内编辑 + EsForm</h2>
    <p>在 EsTable 中使用自定义渲染实现行内编辑，结合 EsForm 进行数据验证。</p>

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

    <!-- ===== 场景8: useDialog 嵌套（弹窗中打开弹窗） ===== -->
    <h2>场景八：useDialog 嵌套</h2>
    <p>在一个 useDialog 弹窗中再次打开另一个弹窗，实现复杂的多层交互。</p>

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

    <!-- ===== 场景9: EsTable + EsForm 表格内嵌表单联动查询 ===== -->
    <h2>场景九：EsTable + EsForm 表格内嵌表单联动查询</h2>
    <p>标准查询列表页模式：EsTable 作为主容器，通过 slot 在表格头部嵌入 EsForm 查询表单，实现查询联动。</p>

    <div class="demo-block">
      <div class="demo-block__body">
        <es-table
          ref="tableWithFormQuery"
          :columns="tableWithFormColumns"
          :options="{
            border: true,
            stripe: true,
            isInitRun: false,
            showHeaderBar: true,
            apiParams: {
              url: '/api/data/list',
              model: tableQueryForm
            },
            listenToCallBack: {
              brcb: (params) => this.handleBeforeQuery(params),
              qrcb: (res) => console.log('查询结果:', res)
            }
          }"
        >
          <!-- <div class="query-form-wrapper"> -->
            <es-form
              ref="tableQueryFormRef"
              :form-item-list="tableQueryFormItems"
              :model="tableQueryForm"
              :layout-form-props="{
                fromLayProps: { inline: true, size: 'small', labelWidth: '80px' },
                rowLayProps: { gutter: 15 }
              }"
              :configBtn="[
                { name: '查询', type: 'primary', icon: 'el-icon-search', onClick: () => handleTableQuery() },
                { name: '重置', icon: 'el-icon-refresh', onClick: () => handleTableReset() },
                { name: '新增', type: 'success', icon: 'el-icon-plus', onClick: () => handleTableAdd() }
              ]"
            />
          <!-- </div> -->
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

    <h2>组合使用最佳实践</h2>
    <table class="table-props">
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

    <h2>关键 API 速查</h2>
    <table class="table-props">
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
</template>

<script>
import { useDialog } from '../../components/es-eui'
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
      tableColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'email', label: '邮箱' },
        { key: 'status', label: '状态', width: 100, render: (h, { row }) => (
          <el-tag type={row.status === '1' ? 'success' : 'danger'}>
            {row.status === '1' ? '启用' : '禁用'}
          </el-tag>
        )},
        { key: 'createTime', label: '创建时间', width: 180 }
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

      // ===== 场景5: 选择用户 =====
      selectedUser: null,

      // ===== 场景6: 完整功能 =====
      fullFeatureResult: '',

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
            clearable: true
          }
        },
        {
          prop: 'status',
          label: '状态',
          span: 5,
          formtype: 'Select',
          dataOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ],
          attrs: { placeholder: '请选择状态', clearable: true }
        },
        {
          prop: 'category',
          label: '分类',
          span: 5,
          formtype: 'Select',
          dataOptions: [
            { label: '全部', value: '' },
            { label: '电子产品', value: 'electronics' },
            { label: '服装', value: 'clothing' },
            { label: '食品', value: 'food' }
          ],
          attrs: { placeholder: '请选择分类', clearable: true }
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
            clearable: true
          }
        }
      ],
      tableWithFormColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '名称', width: 180 },
        { key: 'category', label: '分类', width: 120 },
        {
          key: 'status',
          label: '状态',
          width: 100,
          render: (h, { row }) => {
            const statusMap = {
              '1': { type: 'success', text: '启用' },
              '0': { type: 'danger', text: '禁用' }
            }
            const status = statusMap[row.status] || { type: 'info', text: '未知' }
            return <el-tag type={status.type} size="small">{status.text}</el-tag>
          }
        },
        { key: 'price', label: '价格', width: 120, render: (h, { row }) => `¥${row.price}` },
        { key: 'stock', label: '库存', width: 100 },
        { key: 'createTime', label: '创建时间', width: 180 },
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
              options={{ border: true }}
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
          ) : row.name
        },
        { 
          key: 'age', 
          label: '年龄', 
          width: 100,
          render: (h, { row }) => row.editing ? (
            <el-input-number v-model={row.age} size="small" min={1} max={150} />
          ) : row.age
        },
        { 
          key: 'email', 
          label: '邮箱',
          render: (h, { row }) => row.editing ? (
            <el-input v-model={row.email} size="small" />
          ) : row.email
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
    handleSearch() {
      // 手动触发表格刷新
      this.$refs.tableWithQuery.httpRquestInstace()
    },
    handleReset() {
      this.queryFormData = {
        name: '',
        status: '',
        dateRange: []
      }
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
      const formData = { name: '', email: '' }
      dialogInstance({
        title: '原生表单弹窗',
        width: '500px',
        render: (h) => (
          <el-form ref="nativeForm" model={formData} label-width="80px" size="small">
            <el-form-item label="姓名" prop="name" rules={[{ required: true, message: '请输入姓名' }]}>
              <el-input v-model={formData.name} />
            </el-form-item>
            <el-form-item label="邮箱" prop="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式错误' }]}>
              <el-input v-model={formData.email} />
            </el-form-item>
          </el-form>
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
            onClick: ({ close, getRefs }) => {
              const form = getRefs('nativeForm')
              form.validate((valid) => {
                if (valid) {
                  this.$message.success(`提交成功: ${formData.name}`)
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
      const formData = { name: '', status: '', remark: '' }
      dialogInstance({
        title: 'EsForm 弹窗',
        width: '600px',
        render: (h, ctx) => (
          <es-form
            ref="esFormInDialog"
            form-item-list={[
              { prop: 'name', label: '名称', span: 12, formtype: 'Input', formItemOptions: { rules: [{ required: true, message: '请输入名称' }] } },
              { prop: 'status', label: '状态', span: 12, formtype: 'Select', dataOptions: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }] },
              { prop: 'remark', label: '备注', span: 24, formtype: 'Input', attrs: { type: 'textarea', rows: 3 } }
            ]}
            model={formData}
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
            onClick: ({ close, getRefs }) => {
              const formRef = getRefs('esFormInDialog')
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
            onClick: ({ close }) => close()
          },
          {
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: ({ close }) => {
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
      const queryData = { keyword: '' }
      const tableData = [
        { id: 1, name: '产品A', price: 100, stock: 50 },
        { id: 2, name: '产品B', price: 200, stock: 30 },
        { id: 3, name: '产品C', price: 150, stock: 100 }
      ]
      const formData = { selectedProduct: null, quantity: 1, remark: '' }
      let selectedRow = null

      dialogInstance({
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
                { key: 'name', label: '产品名称', width: 150 },
                { key: 'price', label: '价格', width: 100, render: (h, { row }) => `¥${row.price}` },
                { key: 'stock', label: '库存', width: 100 }
              ]}
              options={{ border: true, highlightCurrentRow: true }}
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
                  attrs: { disabled: true },
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
                { prop: 'remark', label: '备注', span: 24, formtype: 'Input', attrs: { type: 'textarea', rows: 2 } }
              ]}
              model={formData}
            />
          </div>
        ),
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '提交订单',
            type: 'primary',
            key: 'submit',
            onClick: ({ close, getRefs }) => {
              if (!selectedRow) {
                this.$message.warning('请先选择产品')
                return
              }
              const formRef = getRefs('orderForm')
              formRef.validate((valid) => {
                if (valid) {
                  this.fullFeatureResult = `产品: ${selectedRow.name}, 数量: ${formData.quantity}`
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
      this.$message.success('所有修改已保存')
    },

    // ===== 场景8: 嵌套弹窗 =====
    openNestedDialog() {
      dialogInstance({
        title: '第一层弹窗',
        width: '500px',
        render: (h) => (
          <div>
            <p>这是第一层弹窗内容</p>
            <el-button type="primary" on-click={() => this.openSecondDialog()}>打开第二层弹窗</el-button>
          </div>
        ),
        configBtn: [
          { name: '关闭', key: 'close', onClick: ({ close }) => close() }
        ]
      })
    },
    openSecondDialog() {
      dialogInstance({
        title: '第二层弹窗',
        width: '400px',
        render: (h) => <p>这是第二层弹窗内容</p>,
        configBtn: [
          { name: '关闭', key: 'close', onClick: ({ close }) => close() }
        ]
      })
    },

    // ===== 场景9: 表格内嵌表单联动查询 =====
    // 查询前回调：格式化参数
    handleBeforeQuery(params) {
      if (params.dateRange && params.dateRange.length === 2) {
        params.startDate = params.dateRange[0]
        params.endDate = params.dateRange[1]
        delete params.dateRange
      }
      return params
    },
    // 查询
    handleTableQuery() {
      this.$refs.tableWithFormQuery.httpRquestInstace()
    },
    // 重置
    handleTableReset() {
      this.tableQueryForm = {
        keyword: '',
        status: '',
        category: '',
        dateRange: []
      }
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
      this.$message.info(`编辑: ${row.name}`)
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
    color: #606266;
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
    margin-bottom: 15px;
    padding: 15px;
    background: #f5f7fa;
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
    margin-top: 20px;
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
