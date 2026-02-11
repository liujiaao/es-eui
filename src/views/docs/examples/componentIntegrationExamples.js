// Es-EUI 组件组合联动示例代码

// ===== 场景一：EsTable + EsForm 查询表单联动 =====
export const tableFormQueryExample = `<template>
  <div>
    <!-- 查询表单区域 -->
    <div class="query-section">
      <es-form
        ref="queryForm"
        :form-item-list="queryFormItems"
        :model="queryFormData"
        :layout-form-props="{ fromLayProps: { inline: true, size: 'small' } }"
        :configBtn="[{ name: '查询', type: 'primary', onClick: (refs, model) => handleSearch(refs, model) }, { name: '重置', onClick: (refs, model) => handleReset(refs, model) }]"
      />
   
    </div>

    <!-- 数据表格 -->
    <!-- 
      es-table 自动请求配置说明：
      1. options.apiParams.url: 接口地址
      2. options.apiParams.model: 查询参数对象（自动绑定）
      3. options.isInitRun: 是否初始化时自动请求
      4. 组件会通过 $httpRequest 或 options.httpRequest 发送请求
    -->
    <es-table
      ref="dataTable"
      :columns="tableColumns"
      :options="{ 
        border: true, 
        stripe: true,
        isInitRun: true,
        apiParams: {
          url: '/api/users',
          model: queryFormData  // 查询参数自动绑定
        }
      }"
    />
  </div>
</template>

<script>
export {
  data() {
    return {
      // 查询表单数据（与 apiParams 绑定）
      queryFormData: {
        name: '',
        status: '',
        dateRange: []
      },
      // 查询表单配置
      queryFormItems: [
        { 
          prop: 'name', 
          label: '姓名', 
          span: 6, 
          formtype: 'Input',
          attrs: { placeholder: '请输入姓名' }
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
        },
        { 
          prop: 'dateRange', 
          label: '时间范围', 
          span: 8, 
          formtype: 'DatePicker',
          attrs: { type: 'daterange', valueFormat: 'yyyy-MM-dd' }
        }
      ],
      // 表格列配置
      tableColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'email', label: '邮箱' },
        { 
          key: 'status', 
          label: '状态', 
          width: 100,
          render: (h, { row }) => (
            <el-tag type={row.status === '1' ? 'success' : 'danger'}>
              {row.status === '1' ? '启用' : '禁用'}
            </el-tag>
          )
        },
        { key: 'createTime', label: '创建时间', width: 180 }
      ]
    }
  },
  methods: {
    // 查询方法：手动触发表格刷新
    handleSearch() {
      // 调用 es-table 的 httpRquestInstace 方法手动刷新
      this.$refs.dataTable.httpRquestInstace()
    },
    
    // 重置方法：清空表单并刷新表格
    handleReset() {
      this.queryFormData = {
        name: '',
        status: '',
        dateRange: []
      }
      this.$nextTick(() => {
        this.handleSearch()
      })
    }
  }
}
</script>`;

// ===== 场景二：EsForm + EsTable 表单内嵌表格 =====
export const formWithTableExample = `<template>
  <div>
    <es-form
      ref="orderForm"
      :form-item-list="formItems"
      :model="formData"
    />
    <el-button type="primary" @click="submitOrder">提交订单</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        orderNo: '',
        customer: '',
        items: [
          { id: 1, product: '产品A', quantity: 2, price: 100 },
          { id: 2, product: '产品B', quantity: 1, price: 200 }
        ]
      },
      formItems: [
        { prop: 'orderNo', label: '订单编号', span: 12, formtype: 'Input' },
        { prop: 'customer', label: '客户名称', span: 12, formtype: 'Input' },
        {
          prop: 'items',
          label: '订单明细',
          span: 24,
          // 使用 render 属性自定义渲染（不设置 formtype）
          render: (h, model, row) => (
            <es-table
              data-source={this.formData.items}
              columns={[
                { key: 'product', label: '产品', width: 200 },
                { 
                  key: 'quantity', 
                  label: '数量',
                  render: (h, { row: item }) => (
                    <el-input-number 
                      v-model={item.quantity} 
                      min={1} 
                      size="small"
                    />
                  )
                },
                { 
                  key: 'price', 
                  label: '单价',
                  render: (h, { row: item }) => (
                    <el-input v-model={item.price} size="small">
                      <template slot="prepend">¥</template>
                    </el-input>
                  )
                },
                { 
                  key: 'subtotal', 
                  label: '小计',
                  render: (h, { row: item }) => (
                    <span style="color: #f56c6c;">
                      ¥{item.quantity * item.price}
                    </span>
                  )
                },
                {
                  key: 'action',
                  label: '操作',
                  render: (h, { row: item, $index }) => (
                    <el-button 
                      type="text" 
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
    }
  },
  methods: {
    removeItem(index) {
      this.formData.items.splice(index, 1)
    },
    submitOrder() {
      console.log('订单数据:', this.formData)
      // 提交表单数据，包含表格中的明细
    }
  }
}
</script>`;

// ===== 场景三：useDialog + 原生表单 =====
export const dialogNativeFormExample = `<template>
  <div>
    <el-button type="primary" @click="openDialog">打开表单弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

const dialog = useDialog()

export default {
  methods: {
    openDialog() {
      const formData = { name: '', email: '' }
      
      dialog({
        title: '原生表单弹窗',
        width: '500px',
        // 使用 JSX 渲染原生表单
        render: (h) => (
          <el-form 
            ref="nativeForm" 
            model={formData} 
            label-width="80px"
            rules={{
              name: [{ required: true, message: '请输入姓名' }],
              email: [
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '邮箱格式错误' }
              ]
            }}
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model={formData.name} />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
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
            // 使用 getRefs 获取表单引用
            onClick: ({ close, getRefs }) => {
              const form = getRefs('nativeForm')
              form.validate((valid) => {
                if (valid) {
                  console.log('表单数据:', formData)
                  close()
                }
              })
            }
          }
        ]
      })
    }
  }
}
</script>`;

// ===== 场景四：useDialog + EsForm（推荐） =====
export const dialogEsFormExample = `<template>
  <div>
    <el-button type="primary" @click="openDialog">打开 EsForm 弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

const dialog = useDialog()

export default {
  methods: {
    openDialog() {
      const formData = { 
        name: '', 
        status: '', 
        remark: '' 
      }
      
      dialog({
        title: 'EsForm 弹窗',
        width: '600px',
        // JSX 渲染 EsForm
        render: (h, ctx) => (
          <es-form
            ref="esFormInDialog"
            form-item-list={[
              { 
                prop: 'name', 
                label: '名称', 
                span: 12, 
                formtype: 'Input',
                formItemOptions: {
                  rules: [{ required: true, message: '请输入名称' }]
                }
              },
              { 
                prop: 'status', 
                label: '状态', 
                span: 12, 
                formtype: 'Select',
                dataOptions: [
                  { label: '启用', value: '1' },
                  { label: '禁用', value: '0' }
                ]
              },
              { 
                prop: 'remark', 
                label: '备注', 
                span: 24, 
                formtype: 'Input',
                attrs: { type: 'textarea', rows: 3 }
              }
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
              // 获取 EsForm 组件引用
              const formRef = getRefs('esFormInDialog')
              // 调用 EsForm 的 validate 方法
              formRef.validate((valid) => {
                if (valid) {
                  console.log('表单数据:', formData)
                  this.$message.success('保存成功')
                  close()
                }
              })
            }
          }
        ]
      })
    }
  }
}
</script>`;

// ===== 场景五：useDialog + EsTable =====
export const dialogEsTableExample = `<template>
  <div>
    <el-button type="primary" @click="openDialog">打开表格选择弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

const dialog = useDialog()

export default {
  data() {
    return {
      selectedUser: null
    }
  },
  methods: {
    openDialog() {
      const tableData = [
        { id: 1, name: '张三', department: '技术部', position: '工程师' },
        { id: 2, name: '李四', department: '产品部', position: '产品经理' },
        { id: 3, name: '王五', department: '运营部', position: '运营专员' }
      ]
      let selectedRow = null

      dialog({
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
            options={{ 
              border: true, 
              highlightCurrentRow: true  // 高亮当前行
            }}
            on-current-change={(row) => { 
              selectedRow = row 
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
            name: '确定',
            type: 'primary',
            key: 'confirm',
            onClick: ({ close }) => {
              if (selectedRow) {
                this.selectedUser = selectedRow
                this.$message.success(\`已选择: \${selectedRow.name}\`)
                close()
              } else {
                this.$message.warning('请先选择用户')
              }
            }
          }
        ]
      })
    }
  }
}
</script>`;

// ===== 场景六：useDialog + EsTable + EsForm =====
export const dialogFullFeatureExample = `<template>
  <div>
    <el-button type="primary" @click="openDialog">打开完整功能弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

const dialog = useDialog()

export default {
  methods: {
    openDialog() {
      // 查询条件数据
      const queryData = { keyword: '' }
      // 表格数据
      const tableData = [
        { id: 1, name: '产品A', price: 100, stock: 50 },
        { id: 2, name: '产品B', price: 200, stock: 30 },
        { id: 3, name: '产品C', price: 150, stock: 100 }
      ]
      // 表单数据
      const formData = { quantity: 1, remark: '' }
      let selectedRow = null

      dialog({
        title: '选择产品并填写订单',
        width: '800px',
        height: '600px',
        render: (h, ctx) => (
          <div>
            {/* 搜索区域 */}
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

            {/* 产品列表表格 */}
            <es-table
              ref="productTable"
              data-source={tableData.filter(item => 
                !queryData.keyword || item.name.includes(queryData.keyword)
              )}
              columns={[
                { key: 'id', label: 'ID', width: 80 },
                { key: 'name', label: '产品名称', width: 150 },
                { 
                  key: 'price', 
                  label: '价格', 
                  width: 100,
                  render: (h, { row }) => \`¥\${row.price}\`
                },
                { key: 'stock', label: '库存', width: 100 }
              ]}
              options={{ border: true, highlightCurrentRow: true }}
              on-current-change={(row) => { selectedRow = row }}
              style="margin-bottom: 20px;"
            />

            <el-divider content-position="left">订单信息</el-divider>

            {/* 订单表单 */}
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
                  formItemOptions: {
                    rules: [{ required: true, message: '请输入数量' }]
                  }
                },
                { 
                  prop: 'remark', 
                  label: '备注', 
                  span: 24, 
                  formtype: 'Input',
                  attrs: { type: 'textarea', rows: 2 }
                }
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
              // 先检查是否选择了产品
              if (!selectedRow) {
                this.$message.warning('请先选择产品')
                return
              }
              // 再验证表单
              const formRef = getRefs('orderForm')
              formRef.validate((valid) => {
                if (valid) {
                  console.log('订单数据:', {
                    product: selectedRow,
                    ...formData
                  })
                  this.$message.success('订单提交成功')
                  close()
                }
              })
            }
          }
        ]
      })
    }
  }
}
</script>`;

// ===== 场景七：行内编辑 =====
export const inlineEditExample = `<template>
  <div>
    <es-table
      ref="inlineEditTable"
      :columns="columns"
      :data-source="tableData"
      :options="{ border: true }"
    />
    <el-button type="primary" @click="saveAll">保存所有修改</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', editing: false },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', editing: false }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { 
          key: 'name', 
          label: '姓名',
          render: (h, { row }) => row.editing ? (
            <el-input v-model={row.name} size="small" />
          ) : row.name
        },
        { 
          key: 'age', 
          label: '年龄',
          width: 120,
          render: (h, { row }) => row.editing ? (
            <el-input-number 
              v-model={row.age} 
              size="small" 
              min={1} 
              max={150}
              style="width: 100px;"
            />
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
              <el-button 
                type="text" 
                size="small"
                on-click={() => this.saveRow(row)}
              >
                保存
              </el-button>
              <el-button 
                type="text" 
                size="small"
                on-click={() => this.cancelEdit(row)}
              >
                取消
              </el-button>
            </span>
          ) : (
            <el-button 
              type="text" 
              size="small"
              on-click={() => this.editRow(row)}
            >
              编辑
            </el-button>
          )
        }
      ]
    }
  },
  methods: {
    editRow(row) {
      row.editing = true
      // 保存原始数据，用于取消时恢复
      row._original = { ...row }
    },
    saveRow(row) {
      row.editing = false
      delete row._original
      this.$message.success('保存成功')
    },
    cancelEdit(row) {
      // 恢复原始数据
      Object.assign(row, row._original)
      row.editing = false
      delete row._original
    },
    saveAll() {
      console.log('保存所有数据:', this.tableData)
      this.$message.success('所有修改已保存')
    }
  }
}
</script>`;

// ===== 场景八：嵌套弹窗 =====
export const nestedDialogExample = `<template>
  <div>
    <el-button type="primary" @click="openFirstDialog">打开嵌套弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

const dialog = useDialog()

export default {
  methods: {
    // 第一层弹窗
    openFirstDialog() {
      dialog({
        title: '第一层弹窗',
        width: '500px',
        render: (h) => (
          <div>
            <p>这是第一层弹窗内容</p>
            <el-button type="primary" on-click={() => this.openSecondDialog()}>
              打开第二层弹窗
            </el-button>
          </div>
        ),
        configBtn: [
          { name: '关闭', key: 'close', onClick: ({ close }) => close() }
        ]
      })
    },
    
    // 第二层弹窗（嵌套）
    openSecondDialog() {
      dialog({
        title: '第二层弹窗',
        width: '400px',
        render: (h) => <p>这是第二层弹窗内容</p>,
        configBtn: [
          { name: '关闭', key: 'close', onClick: ({ close }) => close() }
        ]
      })
    }
  }
}
</script>`;

// ===== 场景九：EsTable + EsForm 表格内嵌表单联动查询 =====
export const tableWithFormQueryExample = `<template>
  <div>
    <!-- 
      标准查询列表页模式：
      1. 表格作为主容器
      2. 通过插槽(slot)在表格头部嵌入查询表单
      3. 表单查询后联动刷新表格
    -->
    <es-table
      ref="queryTable"
      :columns="columns"
      :options="{
        border: true,
        stripe: true,
        isInitRun: true,        // 初始化自动查询
        showHeaderBar: true,    // 显示头部栏
        apiParams: {
          url: '/api/data/list',
          model: queryForm       // 查询参数对象
        },
        // 监听查询前回调，可以修改参数
        listenToCallBack: {
          brcb: (params) => {
            // 查询前回调：格式化参数
            if (params.dateRange && params.dateRange.length === 2) {
              params.startDate = params.dateRange[0]
              params.endDate = params.dateRange[1]
              delete params.dateRange
            }
            return params
          },
          qrcb: (res) => {
            // 查询后回调：处理响应数据
            console.log('查询结果:', res)
          }
        }
      }"
    >
      <!-- 
        使用默认插槽在表格头部嵌入查询表单
        es-table 的 showHeaderBar 需要设置为 true
      -->
      <div class="query-form-wrapper">
        <es-form
          ref="queryFormRef"
          :form-item-list="formItems"
          :model="queryForm"
          :layout-form-props="{
            fromLayProps: {
              inline: true,
              size: 'small',
              labelWidth: '80px'
            },
            rowLayProps: { gutter: 15 }
          }"
          :configBtn="[
            { 
              name: '查询', 
              type: 'primary', 
              icon: 'el-icon-search',
              onClick: (refs, model) => handleSearch() 
            },
            { 
              name: '重置', 
              icon: 'el-icon-refresh',
              onClick: (refs, model) => handleReset() 
            },
            { 
              name: '新增', 
              type: 'success', 
              icon: 'el-icon-plus',
              onClick: (refs, model) => handleAdd() 
            }
          ]"
        />
      </div>
    </es-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询表单数据
      queryForm: {
        keyword: '',
        status: '',
        category: '',
        dateRange: []
      },
      // 表单配置项
      formItems: [
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
          attrs: {
            placeholder: '请选择状态',
            clearable: true
          }
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
          attrs: {
            placeholder: '请选择分类',
            clearable: true
          }
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
      // 表格列配置
      columns: [
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
        { key: 'price', label: '价格', width: 120, render: (h, { row }) => \`¥\${row.price}\` },
        { key: 'stock', label: '库存', width: 100 },
        { key: 'createTime', label: '创建时间', width: 180 },
        {
          key: 'action',
          label: '操作',
          width: 200,
          fixed: 'right',
          render: (h, { row }) => (
            <span>
              <el-button type="text" size="small" on-click={() => this.handleEdit(row)}>编辑</el-button>
              <el-button type="text" size="small" style="color: #f56c6c;" on-click={() => this.handleDelete(row)}>删除</el-button>
            </span>
          )
        }
      ]
    }
  },
  methods: {
    // 查询：手动触发表格刷新
    handleSearch() {
      // 会带上当前 queryForm 的数据作为参数
      this.$refs.queryTable.httpRquestInstace()
    },

    // 重置：清空表单并刷新
    handleReset() {
      this.queryForm = {
        keyword: '',
        status: '',
        category: '',
        dateRange: []
      }
      // 重置后自动查询
      this.$nextTick(() => {
        this.handleSearch()
      })
    },

    // 新增
    handleAdd() {
      this.$message.info('打开新增弹窗')
      // 实际项目中这里会打开 useDialog 弹窗
    },

    // 编辑
    handleEdit(row) {
      this.$message.info(\`编辑: \${row.name}\`)
    },

    // 删除
    handleDelete(row) {
      this.$confirm(\`确认删除 \${row.name} 吗？\`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.handleSearch() // 刷新列表
      })
    }
  }
}
</script>

<style scoped>
.query-form-wrapper {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 10px;
}
.query-form-wrapper ::v-deep .es-form {
  flex: 1;
}
.query-actions {
  margin-left: 15px;
  padding-top: 4px;
}
</style>`;

// 文件中的变量已使用 export const 导出，无需重复导出
