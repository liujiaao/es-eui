// ly-form 和 dp-table 组合联动示例

export const formTableLinkageExample = `<template>
  <div class="form-table-container">
    <es-table
      ref="userTable"
      :data-source="tableData"
      :columns="tableColumns"
      :pagination="pagination"
      :options="{
        border: true,
        multiSelect: true,
        cachePageSelection: true,
        rowkey: 'id'
      }"
      @selection-change="handleSelectionChange"
    >
      <template #default>
        <es-form
          ref="searchForm"
          :form-item-list="formItemList"
          :model="searchForm"
          :layout-form-props="layoutFormProps"
          :config-btn="configBtn"
        />
      </template>
      <template #status="{ scope }">
        <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
          {{ scope.row.status === 'active' ? '启用' : '禁用' }}
        </el-tag>
      </template>
      <template #action="{ scope }">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </es-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: '',
        status: '',
        department: ''
      },
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      selectedRows: [],
      layoutFormProps: {
        fromLayProps: {
          labelWidth: '80px',
          size: 'small'
        },
        rowLayProps: {
          gutter: 10
        }
      },
      formItemList: [
        {
          prop: 'name',
          label: '姓名',
          span: 6,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入姓名',
            clearable: true
          }
        },
        {
          prop: 'status',
          label: '状态',
          span: 6,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择状态',
            clearable: true
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' }
          ]
        },
        {
          prop: 'department',
          label: '部门',
          span: 6,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择部门',
            clearable: true
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '技术部', value: 'tech' },
            { label: '产品部', value: 'product' },
            { label: '运营部', value: 'operation' }
          ]
        }
      ],
      configBtn: [
        {
          name: '查询',
          type: 'primary',
          key: 'query',
          triggerEvent: true,
          onClick: () => this.handleSearch()
        },
        {
          name: '重置',
          key: 'reset',
          triggerEvent: true,
          onClick: () => this.handleReset()
        },
        {
          name: '批量删除',
          type: 'danger',
          key: 'batchDelete',
          disabled: true,
          onClick: () => this.handleBatchDelete()
        }
      ],
      tableColumns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'department', label: '部门', width: 120 },
        { prop: 'email', label: '邮箱' },
        { prop: 'status', label: '状态', width: 100, scopedSlots: { customRender: 'status' } },
        { prop: 'action', label: '操作', width: 150, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // 查询数据
    handleSearch() {
      this.pagination.current = 1
      this.loadData()
    },
    // 重置表单
    handleReset() {
      this.$refs.searchForm.resetFields()
      this.searchForm = {
        name: '',
        status: '',
        department: ''
      }
      this.handleSearch()
    },
    // 加载数据
    loadData() {
      // 模拟API请求
      setTimeout(() => {
        const mockData = [
          { id: 1, name: '张三', department: 'tech', email: 'zhangsan@example.com', status: 'active' },
          { id: 2, name: '李四', department: 'product', email: 'lisi@example.com', status: 'inactive' },
          { id: 3, name: '王五', department: 'tech', email: 'wangwu@example.com', status: 'active' },
          { id: 4, name: '赵六', department: 'operation', email: 'zhaoliu@example.com', status: 'active' },
          { id: 5, name: '钱七', department: 'product', email: 'qianqi@example.com', status: 'inactive' }
        ]
        
        // 根据搜索条件过滤
        let filteredData = mockData.filter(item => {
          if (this.searchForm.name && !item.name.includes(this.searchForm.name)) return false
          if (this.searchForm.status && item.status !== this.searchForm.status) return false
          if (this.searchForm.department && item.department !== this.searchForm.department) return false
          return true
        })
        
        this.tableData = filteredData
        this.pagination.total = filteredData.length
      }, 300)
    },
    // 选择变化
    handleSelectionChange(selection) {
      this.selectedRows = selection
      // 更新批量删除按钮状态
      const batchDeleteBtn = this.configBtn.find(btn => btn.key === 'batchDelete')
      if (batchDeleteBtn) {
        batchDeleteBtn.disabled = selection.length === 0
      }
    },
    // 编辑
    handleEdit(row) {
      console.log('编辑', row)
      this.$message.info('编辑功能：' + row.name)
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.tableData.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.tableData.splice(index, 1)
          this.pagination.total--
          this.$message.success('删除成功')
        }
      }).catch(() => {})
    },
    // 批量删除
    handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的数据')
        return
      }
      this.$confirm(\`确定要删除选中的 \${this.selectedRows.length} 条数据吗？\`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const selectedIds = this.selectedRows.map(row => row.id)
        this.tableData = this.tableData.filter(item => !selectedIds.includes(item.id))
        this.pagination.total -= this.selectedRows.length
        this.selectedRows = []
        this.$message.success('批量删除成功')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.form-table-container {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
</style>`;

export const dialogFormTableExample = `<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      dialogFormData: {
        name: '',
        email: '',
        phone: '',
        department: ''
      },
      tableData: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '技术部' },
        { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '产品部' },
        { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '技术部' }
      ],
      selectedRows: []
    }
  },
  methods: {
    openDialog() {
      const { close } = useDialog({
        title: '用户管理',
        width: '900px',
        isDraggable: true,
        render: (h) => {
          return h('div', { style: { padding: '20px' } }, [
            // 表单区域
            h('div', { style: { marginBottom: '20px', padding: '15px', background: '#f5f7fa', borderRadius: '4px' } }, [
              h('el-form', {
                props: {
                  model: this.dialogFormData,
                  inline: true,
                  size: 'small'
                },
                ref: 'dialogForm'
              }, [
                h('el-form-item', {
                  props: { label: '姓名' }
                }, [
                  h('el-input', {
                    props: {
                      value: this.dialogFormData.name,
                      placeholder: '请输入姓名',
                      clearable: true
                    },
                    on: { input: (val) => this.dialogFormData.name = val }
                  })
                ]),
                h('el-form-item', {
                  props: { label: '部门' }
                }, [
                  h('el-select', {
                    props: {
                      value: this.dialogFormData.department,
                      placeholder: '请选择部门',
                      clearable: true
                    },
                    on: { input: (val) => this.dialogFormData.department = val }
                  }, [
                    h('el-option', { props: { label: '技术部', value: '技术部' } }),
                    h('el-option', { props: { label: '产品部', value: '产品部' } }),
                    h('el-option', { props: { label: '运营部', value: '运营部' } })
                  ])
                ]),
                h('el-form-item', null, [
                  h('el-button', {
                    props: { type: 'primary', icon: 'el-icon-search' },
                    on: { click: () => this.handleDialogSearch() }
                  }, '查询'),
                  h('el-button', {
                    props: { icon: 'el-icon-refresh' },
                    style: { marginLeft: '10px' },
                    on: { click: () => this.handleDialogReset() }
                  }, '重置')
                ])
              ])
            ]),
            // 表格区域
            h('el-table', {
              props: {
                data: this.tableData,
                border: true,
                'highlight-current-row': true
              },
              on: {
                'selection-change': (selection) => {
                  this.selectedRows = selection
                }
              }
            }, [
              h('el-table-column', {
                props: { type: 'selection', width: 55 }
              }),
              h('el-table-column', {
                props: { prop: 'id', label: 'ID', width: 80 }
              }),
              h('el-table-column', {
                props: { prop: 'name', label: '姓名', width: 120 }
              }),
              h('el-table-column', {
                props: { prop: 'email', label: '邮箱' }
              }),
              h('el-table-column', {
                props: { prop: 'phone', label: '电话', width: 130 }
              }),
              h('el-table-column', {
                props: { prop: 'department', label: '部门', width: 100 }
              }),
              h('el-table-column', {
                props: { label: '操作', width: 150 },
                scopedSlots: {
                  default: (scope) => {
                    return [
                      h('el-button', {
                        props: { size: 'mini', type: 'text' },
                        on: { click: () => this.handleEdit(scope.row) }
                      }, '编辑'),
                      h('el-button', {
                        props: { size: 'mini', type: 'text', style: { color: '#f56c6c' } },
                        on: { click: () => this.handleDelete(scope.row) }
                      }, '删除')
                    ]
                  }
                }
              })
            ]),
            // 统计信息
            h('div', {
              style: { marginTop: '15px', textAlign: 'right', color: '#909399', fontSize: '14px' }
            }, \`共 \${this.tableData.length} 条数据，已选择 \${this.selectedRows.length} 条\`)
          ])
        },
        configBtn: [
          {
            name: '新增用户',
            type: 'primary',
            icon: 'el-icon-plus',
            key: 'add',
            onClick: () => this.handleAddUser()
          },
          {
            name: '批量删除',
            type: 'danger',
            icon: 'el-icon-delete',
            key: 'batchDelete',
            disabled: true,
            onClick: () => this.handleBatchDelete()
          },
          {
            name: '关闭',
            key: 'close',
            onClick: ({ close }) => close()
          }
        ]
      })
    },
    handleDialogSearch() {
      console.log('查询', this.dialogFormData)
      this.$message.success('查询成功')
    },
    handleDialogReset() {
      this.dialogFormData = {
        name: '',
        email: '',
        phone: '',
        department: ''
      }
      this.$message.info('已重置')
    },
    handleAddUser() {
      this.$message.info('新增用户')
    },
    handleEdit(row) {
      this.$message.info('编辑用户：' + row.name)
    },
    handleDelete(row) {
      this.$confirm('确定要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.tableData.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        }
      }).catch(() => {})
    },
    handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的数据')
        return
      }
      this.$confirm(\`确定要删除选中的 \${this.selectedRows.length} 条数据吗？\`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const selectedIds = this.selectedRows.map(row => row.id)
        this.tableData = this.tableData.filter(item => !selectedIds.includes(item.id))
        this.selectedRows = []
        this.$message.success('批量删除成功')
      }).catch(() => {})
    }
  }
}
</script>`;

export const nestedDialogExample = `<template>
  <div>
    <el-button type="primary" @click="openMainDialog">打开主弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      mainFormData: {
        projectName: '',
        description: '',
        members: []
      },
      memberList: [
        { id: 1, name: '张三', role: '开发', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', role: '测试', email: 'lisi@example.com' },
        { id: 3, name: '王五', role: '设计', email: 'wangwu@example.com' }
      ]
    }
  },
  methods: {
    openMainDialog() {
      const { close } = useDialog({
        title: '项目管理',
        width: '800px',
        isDraggable: true,
        render: (h) => {
          return h('div', { style: { padding: '20px' } }, [
            h('el-form', {
              props: {
                model: this.mainFormData,
                'label-width': '100px',
                size: 'small'
              }
            }, [
              h('el-form-item', {
                props: { label: '项目名称', required: true }
              }, [
                h('el-input', {
                  props: {
                    value: this.mainFormData.projectName,
                    placeholder: '请输入项目名称'
                  },
                  on: { input: (val) => this.mainFormData.projectName = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '项目描述' }
              }, [
                h('el-input', {
                  props: {
                    value: this.mainFormData.description,
                    placeholder: '请输入项目描述',
                    type: 'textarea',
                    rows: 3
                  },
                  on: { input: (val) => this.mainFormData.description = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '项目成员' }
              }, [
                h('div', { style: { marginBottom: '10px' } }, [
                  h('el-button', {
                    props: { type: 'primary', size: 'mini', icon: 'el-icon-plus' },
                    on: { click: () => this.openMemberDialog() }
                  }, '添加成员')
                ]),
                h('el-table', {
                  props: {
                    data: this.memberList,
                    border: true,
                    size: 'small'
                  }
                }, [
                  h('el-table-column', {
                    props: { prop: 'name', label: '姓名', width: 120 }
                  }),
                  h('el-table-column', {
                    props: { prop: 'role', label: '角色', width: 100 }
                  }),
                  h('el-table-column', {
                    props: { prop: 'email', label: '邮箱' }
                  }),
                  h('el-table-column', {
                    props: { label: '操作', width: 100 },
                    scopedSlots: {
                      default: (scope) => {
                        return h('el-button', {
                          props: { size: 'mini', type: 'text', style: { color: '#f56c6c' } },
                          on: { click: () => this.removeMember(scope.row) }
                        }, '移除')
                      }
                    }
                  })
                ])
              ])
            ])
          ])
        },
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
              console.log('保存项目：', this.mainFormData)
              console.log('项目成员：', this.memberList)
              this.$message.success('保存成功')
              close()
            }
          }
        ]
      })
    },
    openMemberDialog() {
      const { close } = useDialog({
        title: '添加成员',
        width: '500px',
        render: (h) => {
          return h('div', { style: { padding: '20px' } }, [
            h('el-form', {
              props: {
                model: this.memberForm,
                'label-width': '80px',
                size: 'small'
              },
              ref: 'memberForm'
            }, [
              h('el-form-item', {
                props: { label: '姓名', required: true }
              }, [
                h('el-input', {
                  props: {
                    value: this.memberForm.name,
                    placeholder: '请输入姓名'
                  },
                  on: { input: (val) => this.memberForm.name = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '角色', required: true }
              }, [
                h('el-select', {
                  props: {
                    value: this.memberForm.role,
                    placeholder: '请选择角色'
                  },
                  on: { input: (val) => this.memberForm.role = val }
                }, [
                  h('el-option', { props: { label: '开发', value: '开发' } }),
                  h('el-option', { props: { label: '测试', value: '测试' } }),
                  h('el-option', { props: { label: '设计', value: '设计' } }),
                  h('el-option', { props: { label: '产品', value: '产品' } })
                ])
              ]),
              h('el-form-item', {
                props: { label: '邮箱', required: true }
              }, [
                h('el-input', {
                  props: {
                    value: this.memberForm.email,
                    placeholder: '请输入邮箱'
                  },
                  on: { input: (val) => this.memberForm.email = val }
                })
              ])
            ])
          ])
        },
        configBtn: [
          {
            name: '取消',
            key: 'cancel',
            onClick: ({ close }) => close()
          },
          {
            name: '添加',
            type: 'primary',
            key: 'add',
            onClick: ({ close }) => {
              if (!this.memberForm.name || !this.memberForm.role || !this.memberForm.email) {
                this.$message.warning('请填写完整信息')
                return
              }
              this.memberList.push({
                id: Date.now(),
                ...this.memberForm
              })
              this.memberForm = { name: '', role: '', email: '' }
              this.$message.success('添加成功')
              close()
            }
          }
        ]
      })
    },
    removeMember(row) {
      const index = this.memberList.findIndex(item => item.id === row.id)
      if (index > -1) {
        this.memberList.splice(index, 1)
        this.$message.success('移除成功')
      }
    }
  },
  created() {
    this.memberForm = {
      name: '',
      role: '',
      email: ''
    }
  }
}
</script>`;

export const advancedLinkageExample = `<template>
  <div class="advanced-linkage">
    <es-table
      ref="mainTable"
      :data-source="mainTableData"
      :columns="mainTableColumns"
      :pagination="mainPagination"
      :options="{
        border: true,
        multiSelect: true,
        cachePageSelection: true,
        rowkey: 'id'
      }"
      @selection-change="handleMainSelectionChange"
    >
      <template #default>
        <es-form
          ref="mainForm"
          :form-item-list="mainFormItemList"
          :model="mainSearchForm"
          :layout-form-props="mainLayoutProps"
          :config-btn="mainConfigBtn"
        />
      </template>
      <template #status="{ scope }">
        <el-tag :type="getStatusType(scope.row.status)">
          {{ getStatusText(scope.row.status) }}
        </el-tag>
      </template>
      <template #action="{ scope }">
        <el-button size="mini" @click="handleViewDetail(scope.row)">详情</el-button>
        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </es-table>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      mainSearchForm: {
        keyword: '',
        category: '',
        status: ''
      },
      mainTableData: [],
      mainPagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      selectedMainRows: [],
      mainLayoutProps: {
        fromLayProps: {
          labelWidth: '80px',
          size: 'small'
        },
        rowLayProps: {
          gutter: 10
        }
      },
      mainFormItemList: [
        {
          prop: 'keyword',
          label: '关键词',
          span: 8,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入关键词',
            clearable: true
          }
        },
        {
          prop: 'category',
          label: '分类',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择分类',
            clearable: true
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '电子产品', value: 'electronics' },
            { label: '服装', value: 'clothing' },
            { label: '食品', value: 'food' }
          ]
        },
        {
          prop: 'status',
          label: '状态',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择状态',
            clearable: true
          },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '待审核', value: 'pending' },
            { label: '已上架', value: 'published' },
            { label: '已下架', value: 'unpublished' }
          ]
        }
      ],
      mainConfigBtn: [
        {
          name: '查询',
          type: 'primary',
          key: 'search',
          onClick: () => this.handleMainSearch()
        },
        {
          name: '重置',
          key: 'reset',
          onClick: () => this.handleMainReset()
        },
        {
          name: '批量上架',
          type: 'success',
          key: 'batchPublish',
          disabled: true,
          onClick: () => this.handleBatchPublish()
        },
        {
          name: '批量下架',
          type: 'warning',
          key: 'batchUnpublish',
          disabled: true,
          onClick: () => this.handleBatchUnpublish()
        }
      ],
      mainTableColumns: [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '商品名称', width: 200 },
        { prop: 'category', label: '分类', width: 120 },
        { prop: 'price', label: '价格', width: 100 },
        { prop: 'stock', label: '库存', width: 100 },
        { prop: 'status', label: '状态', width: 100, scopedSlots: { customRender: 'status' } },
        { prop: 'action', label: '操作', width: 200, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  mounted() {
    this.loadMainData()
  },
  methods: {
    getStatusType(status) {
      const map = {
        pending: 'warning',
        published: 'success',
        unpublished: 'info'
      }
      return map[status] || 'info'
    },
    getStatusText(status) {
      const map = {
        pending: '待审核',
        published: '已上架',
        unpublished: '已下架'
      }
      return map[status] || status
    },
    loadMainData() {
      // 模拟数据
      const mockData = [
        { id: 1, name: 'iPhone 15', category: 'electronics', price: 5999, stock: 100, status: 'published' },
        { id: 2, name: 'MacBook Pro', category: 'electronics', price: 12999, stock: 50, status: 'published' },
        { id: 3, name: '运动T恤', category: 'clothing', price: 99, stock: 200, status: 'pending' },
        { id: 4, name: '牛仔裤', category: 'clothing', price: 199, stock: 150, status: 'unpublished' },
        { id: 5, name: '有机苹果', category: 'food', price: 29, stock: 300, status: 'published' }
      ]
      
      let filteredData = mockData.filter(item => {
        if (this.mainSearchForm.keyword && !item.name.includes(this.mainSearchForm.keyword)) return false
        if (this.mainSearchForm.category && item.category !== this.mainSearchForm.category) return false
        if (this.mainSearchForm.status && item.status !== this.mainSearchForm.status) return false
        return true
      })
      
      this.mainTableData = filteredData
      this.mainPagination.total = filteredData.length
    },
    handleMainSearch() {
      this.mainPagination.current = 1
      this.loadMainData()
    },
    handleMainReset() {
      this.$refs.mainForm.resetFields()
      this.mainSearchForm = {
        keyword: '',
        category: '',
        status: ''
      }
      this.handleMainSearch()
    },
    handleMainSelectionChange(selection) {
      this.selectedMainRows = selection
      const hasPublished = selection.some(row => row.status === 'published')
      const hasUnpublished = selection.some(row => row.status === 'unpublished')
      
      const publishBtn = this.mainConfigBtn.find(btn => btn.key === 'batchPublish')
      const unpublishBtn = this.mainConfigBtn.find(btn => btn.key === 'batchUnpublish')
      
      if (publishBtn) publishBtn.disabled = selection.length === 0 || hasPublished
      if (unpublishBtn) unpublishBtn.disabled = selection.length === 0 || hasUnpublished
    },
    handleViewDetail(row) {
      const { close } = useDialog({
        title: '商品详情',
        width: '600px',
        render: (h) => {
          return h('div', { style: { padding: '20px' } }, [
            h('el-descriptions', {
              props: { column: 2, border: true }
            }, [
              h('el-descriptions-item', { props: { label: '商品ID' } }, row.id),
              h('el-descriptions-item', { props: { label: '商品名称' } }, row.name),
              h('el-descriptions-item', { props: { label: '分类' } }, row.category),
              h('el-descriptions-item', { props: { label: '价格' } }, '¥' + row.price),
              h('el-descriptions-item', { props: { label: '库存' } }, row.stock),
              h('el-descriptions-item', { props: { label: '状态' } }, this.getStatusText(row.status))
            ])
          ])
        },
        configBtn: [
          {
            name: '关闭',
            key: 'close',
            onClick: ({ close }) => close()
          }
        ]
      })
    },
    handleEdit(row) {
      const { close } = useDialog({
        title: '编辑商品',
        width: '600px',
        render: (h) => {
          return h('div', { style: { padding: '20px' } }, [
            h('el-form', {
              props: {
                model: this.editForm,
                'label-width': '100px',
                size: 'small'
              },
              ref: 'editForm'
            }, [
              h('el-form-item', {
                props: { label: '商品名称', required: true }
              }, [
                h('el-input', {
                  props: { value: this.editForm.name },
                  on: { input: (val) => this.editForm.name = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '价格', required: true }
              }, [
                h('el-input-number', {
                  props: { value: this.editForm.price, min: 0, precision: 2 },
                  on: { input: (val) => this.editForm.price = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '库存', required: true }
              }, [
                h('el-input-number', {
                  props: { value: this.editForm.stock, min: 0 },
                  on: { input: (val) => this.editForm.stock = val }
                })
              ]),
              h('el-form-item', {
                props: { label: '状态' }
              }, [
                h('el-select', {
                  props: { value: this.editForm.status },
                  on: { input: (val) => this.editForm.status = val }
                }, [
                  h('el-option', { props: { label: '待审核', value: 'pending' } }),
                  h('el-option', { props: { label: '已上架', value: 'published' } }),
                  h('el-option', { props: { label: '已下架', value: 'unpublished' } })
                ])
              ])
            ])
          ])
        },
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
              const index = this.mainTableData.findIndex(item => item.id === row.id)
              if (index > -1) {
                this.mainTableData[index] = { ...this.mainTableData[index], ...this.editForm }
                this.$message.success('保存成功')
                close()
              }
            }
          }
        ]
      })
      this.editForm = { ...row }
    },
    handleDelete(row) {
      this.$confirm('确定要删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.mainTableData.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.mainTableData.splice(index, 1)
          this.mainPagination.total--
          this.$message.success('删除成功')
        }
      }).catch(() => {})
    },
    handleBatchPublish() {
      this.$confirm(\`确定要上架选中的 \${this.selectedMainRows.length} 个商品吗？\`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.selectedMainRows.forEach(row => {
          const index = this.mainTableData.findIndex(item => item.id === row.id)
          if (index > -1) {
            this.mainTableData[index].status = 'published'
          }
        })
        this.selectedMainRows = []
        this.$message.success('批量上架成功')
      }).catch(() => {})
    },
    handleBatchUnpublish() {
      this.$confirm(\`确定要下架选中的 \${this.selectedMainRows.length} 个商品吗？\`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedMainRows.forEach(row => {
          const index = this.mainTableData.findIndex(item => item.id === row.id)
          if (index > -1) {
            this.mainTableData[index].status = 'unpublished'
          }
        })
        this.selectedMainRows = []
        this.$message.success('批量下架成功')
      }).catch(() => {})
    }
  },
  created() {
    this.editForm = {
      name: '',
      price: 0,
      stock: 0,
      status: 'pending'
    }
  }
}
</script>

<style scoped>
.advanced-linkage {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
</style>`;