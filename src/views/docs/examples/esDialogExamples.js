// EsDialog 弹窗组件示例代码 - 使用 JSX 语法

export const basicExample = `<template>
  <div>
    <el-button @click="openDialog">打开弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openDialog() {
      const { close } = useDialog()({
        title: '基础弹窗',
        render: () => '这是一个基础弹窗'
      })
    }
  }
}
</script>`;

export const confirmExample = `<template>
  <div>
    <el-button @click="openConfirm">确认弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openConfirm() {
      const { close } = useDialog()({
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
    }
  }
}
</script>`;

export const formDialogExample = `<template>
  <div>
    <el-button @click="openFormDialog">表单弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      formData: {
        name: '',
        age: '',
        email: ''
      }
    }
  },
  methods: {
    openFormDialog() {
      const { close } = useDialog()({
        title: '编辑信息',
        width: '600px',
        // 使用 JSX 直接渲染 EsForm 组件
        render: (h, ctx) => (
          <es-form
            form-item-list={[
              { prop: 'name', label: '姓名', formtype: 'Input', attrs: { placeholder: '请输入姓名' } },
              { prop: 'age', label: '年龄', formtype: 'Input', attrs: { placeholder: '请输入年龄' } },
              { prop: 'email', label: '邮箱', formtype: 'Input', attrs: { placeholder: '请输入邮箱' } }
            ]}
            model={this.formData}
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
    }
  }
}
</script>`;

export const draggableExample = `<template>
  <div>
    <el-button @click="openDraggable">可拖拽弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openDraggable() {
      const { close } = useDialog()({
        title: '可拖拽弹窗',
        isDraggable: true,
        render: () => '这个弹窗可以拖拽移动'
      })
    }
  }
}
</script>`;

export const fullscreenExample = `<template>
  <div>
    <el-button @click="openFullscreen">全屏弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openFullscreen() {
      const { close } = useDialog()({
        title: '全屏弹窗',
        fullscreen: true,
        render: () => '这是一个全屏弹窗'
      })
    }
  }
}
</script>`;

export const loadingExample = `<template>
  <div>
    <el-button @click="openLoading">加载状态</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openLoading() {
      const { instance } = useDialog()({
        title: '加载中',
        loading: true,
        render: () => '数据加载中...'
      })

      setTimeout(() => {
        instance.loading = false
        instance.render = () => '数据加载完成'
      }, 2000)
    }
  }
}
</script>`;

export const lifecycleExample = `<template>
  <div>
    <el-button @click="openLifecycle">生命周期</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openLifecycle() {
      const { close } = useDialog()({
        title: '生命周期示例',
        render: () => '查看控制台输出',
        onOpen: () => {
          console.log('弹窗打开了')
        },
        onClosed: () => {
          console.log('弹窗关闭了')
        }
      })
    }
  }
}
</script>`;

export const customStyleExample = `<template>
  <div>
    <el-button @click="openCustomStyle">自定义样式</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  methods: {
    openCustomStyle() {
      const { close } = useDialog()({
        title: '自定义样式',
        customClass: 'custom-dialog',
        render: () => '这个弹窗有自定义样式'
      })
    }
  }
}
</script>

<style>
.custom-dialog {
  border-radius: 10px;
}
.custom-dialog .el-dialog__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>`;

export const renderComponentExample = `<template>
  <div>
    <el-button @click="openComponentDialog">组件渲染弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
  return {
      formData: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '',
        address: ''
      }
    }
  },
  methods: {
    openComponentDialog() {
      const { close } = useDialog()({
        title: '用户信息',
        width: '600px',
        // 使用 JSX 渲染 EsForm，代码简洁直观
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
            model={this.formData}
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
                  console.log('表单数据：', this.formData)
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

export const renderTableDialogExample = `<template>
  <div>
    <el-button @click="openTableDialog">表格弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      selectedRows: []
    }
  },
  methods: {
    openTableDialog() {
      const { close } = useDialog()({
        title: '选择用户',
        width: '800px',
        // 使用 JSX 渲染 EsTable
        render: (h, ctx) => (
          <es-table
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
              this.$message.success(\`已选择 \${this.selectedRows.length} 个用户\`)
              close()
            }
          }
        ]
      })
    }
  }
}
</script>`;

export const renderComplexDialogExample = `<template>
  <div>
    <el-button @click="openComplexDialog">复杂内容弹窗</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'

export default {
  data() {
    return {
      activeTab: 'basic',
      formData: {
        projectName: '',
        description: '',
        type: '',
        tags: [],
        notify: true,
        autoSave: false
      }
    }
  },
  methods: {
    openComplexDialog() {
      const { close } = useDialog()({
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
                model={this.formData}
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
                      this.formData.tags.push(this.newTag)
                      this.newTag = ''
                    }
                  }}
                />
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                {this.formData.tags.map((tag, index) => (
                  <el-tag 
                    key={index}
                    closable 
                    size="small"
                    on-close={() => this.formData.tags.splice(index, 1)}
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
                model={this.formData}
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
              console.log('配置数据：', this.formData)
              this.$message.success('配置保存成功')
              close()
            }
          }
        ]
      })
    }
  }
}
</script>`;

// ===== 实战示例：参考 salesPolicy/policyManage/index.vue =====

export const realWorldDialogExample = `<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增政策</el-button>
    <el-button @click="handleEdit(row)">编辑政策</el-button>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'
import PolicyForm from './PolicyForm.vue'

// 预先创建 dialog 实例（推荐）
const policyDialog = useDialog()

export default {
  data() {
    return {
      // 表单数据
      formData: {
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
      }
    }
  },
  
  methods: {
    // 新增弹窗
    handleAdd() {
      // 重置表单
      this.resetForm()
      
      policyDialog({
        title: '新增政策',
        width: '75%',
        key: 'policyFormDialog',  // 缓存 key
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
              // 获取表单组件引用
              const formRef = getRefs.policyform
              
              // 表单校验
              formRef.validate((valid) => {
                if (valid) {
                  // 获取表单数据
                  const { formData } = instance
                  
                  // 构造提交参数
                  const params = {
                    title: formData.policyName,
                    status: formData.policyStatus,
                    tags: formData.policyTag,
                    publishingMethod: formData.policyReleaseType,
                    validDateStart: formData.effectiveTimeRange,
                    validDateEnd: formData.invalidTimeRange
                  }
                  
                  // 提交请求
                  formRef.$httpRequest({
                    url: '/api/policy/add',
                    method: 'post',
                    formParams: params
                  }).then(() => {
                    this.$message.success('新增成功')
                    close()
                    // 刷新父级表格
                    this.refreshTable()
                  })
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
        // 使用 JSX 渲染自定义组件
        render: (h, ctx) => (
          <PolicyForm 
            policyRow={{}} 
            policyFormStatus="add"
            ref="policyform"
          />
        )
      })
    },
    
    // 编辑弹窗
    handleEdit(row) {
      policyDialog({
        title: '编辑政策',
        width: '75%',
        key: 'policyFormDialog',
        isDraggable: true,
        closeOnClickModal: false,
        configBtn: [
          {
            icon: 'el-icon-check',
            key: 'save',
            type: 'primary',
            size: 'mini',
            name: '保存',
            click: (instance, { close, getRefs }) => {
              const formRef = getRefs.policyform
              formRef.validate((valid) => {
                if (valid) {
                  const { formData } = instance
                  formRef.$httpRequest({
                    url: '/api/policy/update',
                    method: 'post',
                    formParams: { ...formData, id: row.id }
                  }).then(() => {
                    this.$message.success('保存成功')
                    close()
                    this.refreshTable()
                  })
                }
              })
            }
          },
          {
            icon: 'el-icon-close',
            key: 'cancel',
            size: 'mini',
            name: '关闭',
            click: (instance, { close }) => close()
          }
        ],
        // 传递编辑数据
        render: (h, ctx) => (
          <PolicyForm 
            policyRow={row} 
            policyFormStatus="edit"
            ref="policyform"
          />
        )
      })
    },
    
    resetForm() {
      this.formData = {
        policyName: '',
        policyAbstract: '',
        policyStatus: '0',
        policyReleaseType: '1'
      }
    },
    
    refreshTable() {
      // 刷新表格数据
      this.$refs.table?.httpRquestInstace()
    }
  }
}
</script>`;

// 向后兼容导出
export const jsxFormExample = formDialogExample;
export const jsxComponentExample = renderComponentExample;
export const jsxTableExample = renderTableDialogExample;
export const jsxComplexExample = renderComplexDialogExample;
