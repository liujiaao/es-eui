<template>
  <div class="guide-content">
    <h1 class="content-title">快速上手</h1>
    
    <p>本节将介绍如何在项目中使用 ES-EUI，通过一个简单的示例来展示核心组件的基本用法。</p>

    <h2 class="content-subtitle">创建一个查询列表页</h2>
    
    <p>下面是一个典型的查询列表页面，包含查询表单和数据表格：</p>

    <pre><code>&lt;template&gt;
  &lt;div class="page-container"&gt;
    &lt;!-- 表格组件，内置查询表单 --&gt;
    &lt;es-table
      ref="dataTable"
      :columns="tableColumns"
      :options="{
        border: true,
        stripe: true,
        showHeaderBar: true,
        apiParams: {
          url: '/api/user/list',
          model: queryForm
        }
      }"
    &gt;
      &lt;!-- 查询表单 --&gt;
      &lt;div class="query-form"&gt;
        &lt;es-form
          ref="queryForm"
          :form-item-list="formItems"
          :model="queryForm"
          :configBtn="[
            { name: '查询', type: 'primary', onClick: () => handleSearch() },
            { name: '重置', onClick: () => handleReset() }
          ]"
        /&gt;
      &lt;/div&gt;
    &lt;/es-table&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'UserList',
  data() {
    return {
      // 查询表单数据
      queryForm: {
        name: '',
        status: ''
      },
      // 表单配置
      formItems: [
        {
          prop: 'name',
          label: '用户名',
          span: 6,
          formtype: 'Input',
          attrs: { placeholder: '请输入用户名' }
        },
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
        }
      ],
      // 表格列配置
      tableColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '用户名', width: 150 },
        { key: 'email', label: '邮箱' },
        {
          key: 'status',
          label: '状态',
          width: 100,
          render: (h, { row }) => (
            &lt;el-tag type={row.status === '1' ? 'success' : 'danger'}&gt;
              {row.status === '1' ? '启用' : '禁用'}
            &lt;/el-tag&gt;
          )
        },
        {
          key: 'action',
          label: '操作',
          width: 200,
          render: (h, { row }) => (
            &lt;span&gt;
              &lt;el-button type="text" on-click={() => this.handleEdit(row)}&gt;
                编辑
              &lt;/el-button&gt;
              &lt;el-button type="text" style="color: #f56c6c;" on-click={() => this.handleDelete(row)}&gt;
                删除
              &lt;/el-button&gt;
            &lt;/span&gt;
          )
        }
      ]
    }
  },
  methods: {
    // 查询
    handleSearch() {
      this.$refs.dataTable.httpRquestInstace()
    },
    // 重置
    handleReset() {
      this.queryForm = { name: '', status: '' }
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    // 编辑
    handleEdit(row) {
      // 打开编辑弹窗
      this.$useDialog()({
        title: '编辑用户',
        width: '600px',
        render: (h) => (
          &lt;es-form
            form-item-list={this.formItems}
            model={{ ...row }}
          /&gt;
        )
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.handleSearch()
      })
    }
  }
}
&lt;/script&gt;</code></pre>

    <h2 class="content-subtitle">核心概念说明</h2>

    <h3>1. 配置化表单</h3>
    <p>EsForm 通过 <code>form-item-list</code> 配置生成表单，每个表单项支持：</p>
    <ul>
      <li><code>formtype</code> - 控件类型（Input、Select、DatePicker 等）</li>
      <li><code>dataOptions</code> - 下拉选项数据</li>
      <li><code>attrs</code> - Element UI 组件属性</li>
      <li><code>formItemOptions</code> - 表单验证规则</li>
    </ul>

    <h3>2. 配置化表格</h3>
    <p>EsTable 通过 <code>columns</code> 配置生成表格列，支持：</p>
    <ul>
      <li><code>key</code> - 数据字段名</li>
      <li><code>render</code> - 自定义渲染函数（JSX）</li>
      <li><code>apiParams</code> - 自动数据请求配置</li>
    </ul>

    <h3>3. 联动机制</h3>
    <ul>
      <li>表单数据变化自动同步到表格查询参数</li>
      <li>调用 <code>httpRquestInstace()</code> 手动刷新表格</li>
      <li>使用弹窗编辑数据后自动刷新列表</li>
    </ul>

    <h2 class="content-subtitle">下一步</h2>
    <p>了解基础用法后，可以深入学习各组件的详细文档：</p>
    <ul>
      <li><router-link to="/component/installation">组件文档</router-link> - 查看所有组件的详细用法</li>
      <li><router-link to="/guide/configuration">全局配置</router-link> - 了解如何配置全局参数</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GuideQuickstart'
}
</script>
