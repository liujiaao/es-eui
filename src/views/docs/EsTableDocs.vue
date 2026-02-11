<template>
  <div class="docs-container">
    <div class="docs-header">
      <h1>EsTable 表格组件</h1>
      <p class="component-desc">企业级高性能表格组件，支持自动数据请求、分页管理、列渲染、条件查询联动等特性，让数据展示开发效率提升 80%</p>
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
    <p>最简单的表格用法，只需配置数据源和列定义：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">基础表格</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="basicData"
          :columns="basicColumns"
          :options="{ border: true }"
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

    <h3>1. 自动数据请求（推荐）</h3>
    <p>通过 <code>apiParams</code> 配置，表格自动处理数据请求、分页、加载状态，无需手动维护：</p>
    
    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">全自动数据表格</span>
        <span class="demo-block__badge">企业级实战</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="autoData"
          :columns="autoColumns"
          :pagination="autoPagination"
          :options="autoOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
        <div class="code-header" @click="toggleCode('scene2')">
          <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene2"><code>{{ autoRequestExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--success">
      <h4>💡 最佳实践</h4>
      <ul>
        <li>使用 <code>.sync</code> 修饰符保持数据双向同步</li>
        <li>通过 <code>configTableOut</code> 映射后端返回字段，无需修改接口</li>
        <li><code>brcb</code> 回调可在请求前格式化参数</li>
        <li><code>qrcb</code> 回调可处理响应数据</li>
      </ul>
    </div>

    <h3>2. 自定义请求实例</h3>
    <p>当需要统一处理请求头、错误处理、Loading 时，配置 <code>httpRequest</code>：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">自定义请求实例</span>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
        <div class="code-header" @click="toggleCode('scene3')">
          <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene3"><code>{{ customHttpExample }}</code></pre>
      </div>
    </div>

    <h3>3. 列渲染 - Render 函数</h3>
    <p>支持 JSX 和 createElement 两种写法，灵活渲染自定义内容：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">Render 列渲染</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="renderData"
          :columns="renderColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
        <div class="code-header" @click="toggleCode('scene4')">
          <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene4"><code>{{ renderColumnExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--warning">
      <h4>⚠️ 重要提示</h4>
      <p>Render 函数参数顺序为：<code>(h, { row, index, instance })</code></p>
      <ul>
        <li><code>h</code> - createElement 函数</li>
        <li><code>row</code> - 当前行数据</li>
        <li><code>index</code> - 行索引</li>
        <li><code>instance</code> - 表格组件实例，可调用表格方法</li>
      </ul>
    </div>

    <h3>4. 表格与表单联动查询</h3>
    <p>EsTable 与 EsForm 完美配合，实现条件查询：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">表格表单联动</span>
        <span class="demo-block__badge">高频使用</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="linkageData"
          :columns="linkageColumns"
          :pagination="linkagePagination"
          :options="linkageOptions"
        >
          <es-form
            :form-item-list="linkageFormConfig"
            :model="linkageFormData"
            :layout-form-props="linkageLayoutProps"
            :config-btn="linkageConfigBtn"
          />
        </es-table>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
        <div class="code-header" @click="toggleCode('scene5')">
          <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene5"><code>{{ linkageExample }}</code></pre>
      </div>
    </div>

    <h3>5. 操作列与表格实例</h3>
    <p>通过 instance 获取表格实例，调用方法（刷新、获取选中项等）：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">操作列示例</span>
      </div>
      <div class="demo-block__body">
        <es-table
          ref="actionTable"
          :data-source="actionData"
          :columns="actionColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
        <div class="code-header" @click="toggleCode('scene6')">
          <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene6"><code>{{ actionColumnExample }}</code></pre>
      </div>
    </div>

    <h2>实战场景示例</h2>

    <h3>场景一：完整的管理表格（增删改查 + 条件查询）</h3>
    <div class="demo-block demo-block--full">
      <div class="demo-block__header">
        <span class="demo-block__title">政策管理表格（实战案例）</span>
        <span class="demo-block__badge">生产级</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="policyData"
          :columns="policyColumns"
          :pagination="policyPagination"
          :options="policyOptions"
        >
          <es-form
            :form-item-list="policyFormConfig"
            :model="policyFormData"
            :layout-form-props="policyLayoutProps"
            :config-btn="policyConfigBtn"
          />
        </es-table>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
        <div class="code-header" @click="toggleCode('scene7')">
          <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene7"><code>{{ realWorldExample }}</code></pre>
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
          <td>dataSource</td>
          <td>表格数据源，推荐配合 .sync 使用</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>列配置数组</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>pagination</td>
          <td>分页配置 { pageIndex, pageSize, total }</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>options</td>
          <td>表格选项配置（详见下方 Options 配置）</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
      </tbody>
    </table>

    <h3>Options 配置</h3>
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
          <td>apiParams</td>
          <td>自动请求配置 { url, method, model, headers, options }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>configTableOut</td>
          <td>响应字段映射 { total, pageSize, current, tableData }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>httpRequest</td>
          <td>自定义请求函数 (params) => Promise</td>
          <td>Function</td>
          <td>-</td>
        </tr>
        <tr>
          <td>listenToCallBack</td>
          <td>请求生命周期 { brcb: (params)=>{}, qrcb: (res)=>{} }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>isInitRun</td>
          <td>初始化时是否自动请求</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>border</td>
          <td>是否显示边框</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>表格尺寸</td>
          <td>String</td>
          <td>'small'</td>
        </tr>
        <tr>
          <td>tabHeight</td>
          <td>表格高度(px)，配合 heightType 使用</td>
          <td>Number</td>
          <td>-</td>
        </tr>
        <tr>
          <td>heightType</td>
          <td>高度类型：'height' | 'max-height'</td>
          <td>String</td>
          <td>'max-height'</td>
        </tr>
        <tr>
          <td>multiSelect</td>
          <td>是否支持多选</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>cachePageSelection</td>
          <td>跨页记忆选中项</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
      </tbody>
    </table>

    <h3>Column 配置</h3>
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
          <td>key / prop</td>
          <td>字段名</td>
          <td>String</td>
        </tr>
        <tr>
          <td>label</td>
          <td>列标题</td>
          <td>String</td>
        </tr>
        <tr>
          <td>width</td>
          <td>列宽度</td>
          <td>String/Number</td>
        </tr>
        <tr>
          <td>fixed</td>
          <td>固定列：'left' | 'right'</td>
          <td>String</td>
        </tr>
        <tr>
          <td>render</td>
          <td>自定义渲染函数 (h, { row, index, instance }) => VNode</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>hidCol</td>
          <td>是否隐藏列</td>
          <td>Boolean</td>
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
          <td>httpRquestInstace</td>
          <td>手动触发数据请求（用于刷新）</td>
          <td>-</td>
        </tr>
        <tr>
          <td>clearAllSelection</td>
          <td>清空所有选中项</td>
          <td>-</td>
        </tr>
        <tr>
          <td>toggleSelection</td>
          <td>切换行选中状态</td>
          <td>rows</td>
        </tr>
      </tbody>
    </table>

    <h2>开发规范与建议</h2>
    
    <div class="tips-box tips-box--info">
      <h4>📋 开发规范</h4>
      <ol>
        <li><strong>字段命名</strong>：后端返回字段与前端不一致时，使用 configTableOut 映射，不修改后端接口</li>
        <li><strong>请求封装</strong>：统一配置 httpRequest，集中处理 Token、错误提示、Loading</li>
        <li><strong>按钮操作</strong>：操作列通过 instance.httpRquestInstace() 刷新表格，不直接修改数据源</li>
        <li><strong>日期范围</strong>：使用 brcb 回调将日期范围拆分为 start/end 两个字段传给后端</li>
        <li><strong>性能优化</strong>：大数据量时设置 tabHeight 固定表格高度，启用虚拟滚动</li>
      </ol>
    </div>
  </div>
</template>

<script>
import {
  basicExample,
  autoRequestExample,
  customHttpExample,
  renderColumnExample,
  linkageExample,
  actionColumnExample,
  realWorldExample
} from './examples/esTableExamples'

export default {
  name: 'EsTableDocs',
  data() {
    return {
      // 基础示例数据
      basicData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      basicColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱' }
      ],

      // 自动请求示例
      autoData: [],
      autoColumns: [
        { key: 'title', label: '政策标题' },
        { key: 'status', label: '状态', render: (h, { row }) => {
          const statusMap = { '0': '草稿', '1': '已上架', '2': '已下架' }
          return <el-tag type={row.status === '1' ? 'success' : 'info'}>{statusMap[row.status]}</el-tag>
        }},
        { key: 'createTime', label: '创建时间' }
      ],
      autoPagination: { pageIndex: 1, pageSize: 10, total: 0 },
      autoOptions: {
        isInitRun: true,
        border: true,
        apiParams: {
          url: '/api/policy/list',
          method: 'post'
        },
        configTableOut: {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex',
          tableData: 'data'
        },
        listenToCallBack: {
          brcb: (params) => {
            // 请求前格式化参数
            const { pageSize, pageIndex, ...rest } = params
            return { pageNum: pageIndex, pageSize, ...rest }
          },
          qrcb: (res) => {
            console.log('查询结果:', res)
          }
        }
      },

      // Render 示例
      renderData: [
        { id: 1, name: '张三', status: '1', score: 85 },
        { id: 2, name: '李四', status: '0', score: 92 },
        { id: 3, name: '王五', status: '2', score: 78 }
      ],
      renderColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名' },
        {
          key: 'status',
          label: '状态',
          render: (h, { row }) => {
            const statusMap = {
              '0': { text: '草稿', type: 'info' },
              '1': { text: '已上架', type: 'success' },
              '2': { text: '已下架', type: 'danger' }
            }
            const status = statusMap[row.status]
            return <el-tag type={status.type}>{status.text}</el-tag>
          }
        },
        {
          key: 'score',
          label: '评分',
          render: (h, { row }) => {
            const color = row.score >= 90 ? '#67c23a' : row.score >= 80 ? '#e6a23c' : '#f56c6c'
            return (
              <div style="display: flex; align-items: center; gap: 10px;">
                <el-progress percentage={row.score} color={color} style="width: 100px;" />
                <span style={{ color }}>{row.score}分</span>
              </div>
            )
          }
        }
      ],

      // 联动查询示例
      linkageData: [],
      linkageColumns: [
        { key: 'id', label: '编号', width: 80 },
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' },
        { key: 'createTime', label: '创建时间' }
      ],
      linkagePagination: { pageIndex: 1, pageSize: 10, total: 0 },
      linkageOptions: {
        isInitRun: true,
        border: true,
        apiParams: { url: '/api/list', method: 'post' },
        configTableOut: { total: 'total', pageSize: 'pageSize', current: 'pageIndex', tableData: 'data' }
      },
      linkageFormData: {
        keyword: '',
        status: '',
        dateRange: []
      },
      linkageFormConfig: [
        {
          prop: 'keyword',
          label: '关键词',
          span: 6,
          formtype: 'Input',
          attrs: { placeholder: '请输入', clearable: true }
        },
        {
          prop: 'status',
          label: '状态',
          span: 6,
          formtype: 'Select',
          attrs: { placeholder: '请选择', clearable: true },
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
          formtype: 'datePicker',
          attrs: {
            type: 'datetimerange',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
          }
        }
      ],
      linkageLayoutProps: {
        fromLayProps: { labelWidth: '80px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      linkageConfigBtn: [
        { name: '查询', type: 'primary', key: 'query', triggerEvent: true, icon: 'el-icon-search' },
        { name: '重置', key: 'rest', triggerEvent: true, icon: 'el-icon-refresh' }
      ],

      // 操作列示例
      actionData: [
        { id: 1, name: '政策A', status: '1' },
        { id: 2, name: '政策B', status: '0' }
      ],
      actionColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' },
        {
          key: 'action',
          label: '操作',
          width: 200,
          render: (h, { row, index, instance }) => {
            return (
              <div>
                <el-button size="mini" type="text" on-click={() => this.handleView(row)}>查看</el-button>
                <el-button size="mini" type="text" on-click={() => this.handleEdit(row)}>编辑</el-button>
                {row.status === '0' && (
                  <el-button size="mini" type="text" on-click={() => this.handlePublish(row, instance)}>上架</el-button>
                )}
                <el-button size="mini" type="text" style="color: #f56c6c;" on-click={() => this.handleDelete(row, instance)}>删除</el-button>
              </div>
            )
          }
        }
      ],

      // 政策管理实战示例
      policyData: [
        { id: 'P001', title: '夏季促销政策', status: '1', tags: '促销', publishingMethodName: '立即发布', scheduledReleaseTime: '2024-06-01', validDateStart: '2024-06-01', validDateEnd: '2024-08-31', createTime: '2024-05-25', createBy: '张三' },
        { id: 'P002', title: '新用户优惠', status: '0', tags: '优惠', publishingMethodName: '定时发布', scheduledReleaseTime: '2024-07-15', validDateStart: '2024-07-15', validDateEnd: '2024-12-31', createTime: '2024-06-10', createBy: '李四' }
      ],
      policyColumns: [
        { key: 'id', label: '政策编号', fixed: 'left', width: 100 },
        { key: 'title', label: '政策标题', width: 150 },
        { key: 'tags', label: '政策标签', width: 100 },
        {
          key: 'status',
          label: '状态',
          width: 100,
          render: (h, { row }) => {
            const statusMap = { '0': '草稿', '1': '上架中', '2': '已下架' }
            return <el-tag type={row.status === '1' ? 'success' : 'info'} size="small">{statusMap[row.status]}</el-tag>
          }
        },
        { key: 'publishingMethodName', label: '发布方式', width: 100 },
        { key: 'scheduledReleaseTime', label: '发布时间', width: 140 },
        { key: 'validDateStart', label: '生效时间', width: 140 },
        { key: 'validDateEnd', label: '失效时间', width: 140 },
        { key: 'createTime', label: '创建时间', width: 140 },
        { key: 'createBy', label: '创建人', width: 100 },
        {
          key: 'action',
          label: '操作',
          width: 220,
          fixed: 'right',
          render: (h, { row, index, instance }) => {
            return (
              <div>
                <el-button size="mini" type="text" on-click={() => this.$message.info('查看: ' + row.title)}>查看</el-button>
                <el-button size="mini" type="text" on-click={() => this.$message.info('编辑: ' + row.title)}>编辑</el-button>
                {(row.status === '0' || row.status === '2') && (
                  <el-button size="mini" type="text" on-click={() => this.$message.success('上架成功')}>上架</el-button>
                )}
                {row.status === '1' && (
                  <el-button size="mini" type="text" on-click={() => this.$message.warning('已下架')}>下架</el-button>
                )}
                <el-button size="mini" type="text" style="color: #f56c6c;" on-click={() => this.$message.error('删除: ' + row.title)}>删除</el-button>
              </div>
            )
          }
        }
      ],
      policyPagination: { pageIndex: 1, pageSize: 10, total: 2 },
      policyOptions: {
        border: true,
        tabHeight: 300,
        heightType: 'height',
        size: 'mini'
      },
      policyFormData: {
        policyCode: '',
        policyTitle: '',
        policyStatus: '',
        policyTag: '',
        publishType: '',
        effectiveTimeRange: [],
        publishTimeRange: []
      },
      policyFormConfig: [
        {
          prop: 'policyCode',
          label: '政策编号',
          span: 8,
          formtype: 'Input',
          formItemOptions: { labelWidth: '100px' },
          attrs: { placeholder: '请输入政策编号', clearable: true }
        },
        {
          prop: 'policyTitle',
          label: '政策名称',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入政策标题', clearable: true }
        },
        {
          prop: 'policyStatus',
          label: '文章状态',
          span: 8,
          formtype: 'Select',
          formItemOptions: { labelWidth: '100px' },
          attrs: { placeholder: '请选择文章状态', clearable: true },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '草稿', value: '0' },
            { label: '上架中', value: '1' },
            { label: '已下架', value: '2' }
          ]
        },
        {
          label: '政策生效时间范围',
          span: 8,
          formItemOptions: { labelWidth: '140px' },
          prop: 'effectiveTimeRange',
          formtype: 'datePicker',
          attrs: {
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            type: 'datetimerange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            style: 'width: 100%'
          }
        }
      ],
      policyLayoutProps: {
        fromLayProps: { minfoldRows: 1, labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      policyConfigBtn: [
        { direction: 'left', name: '新增', icon: 'el-icon-plus', size: 'mini', type: 'primary', onClick: () => this.$message.success('打开新增弹窗') },
        { type: 'primary', size: 'mini', name: '查询', icon: 'el-icon-search', key: 'query', triggerEvent: true },
        { type: 'warning', key: 'rest', size: 'mini', name: '重置', icon: 'el-icon-refresh', triggerEvent: true }
      ],

      // 代码示例
      basicExample,
      autoRequestExample,
      customHttpExample,
      renderColumnExample,
      linkageExample,
      actionColumnExample,
      realWorldExample,

      // 代码折叠状态
      codeExpanded: {
        scene1: false,
        scene2: false,
        scene3: false,
        scene4: false,
        scene5: false,
        scene6: false,
        scene7: false
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

    handleView(row) {
      this.$message.info(`查看: ${row.name}`)
    },
    handleEdit(row) {
      this.$message.info(`编辑: ${row.name}`)
    },
    handlePublish(row, instance) {
      this.$message.success(`${row.name} 上架成功`)
      // 刷新表格
      instance?.httpRquestInstace()
    },
    handleDelete(row, instance) {
      this.$confirm(`确定删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        instance?.httpRquestInstace()
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
