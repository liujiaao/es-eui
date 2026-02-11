// EsForm 表单组件示例代码
// 使用 es-eui 最新 API: form-item-list + model

export const basicExample = `<template>
  <es-form
    :form-item-list="formItemList"
    :model="formData"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        age: '',
        email: ''
      },
      formItemList: [
        {
          prop: 'name',
          label: '姓名',
          formtype: 'Input',
          attrs: { placeholder: '请输入姓名' }
        },
        {
          prop: 'age',
          label: '年龄',
          formtype: 'Input',
          attrs: { placeholder: '请输入年龄' }
        },
        {
          prop: 'email',
          label: '邮箱',
          formtype: 'Input',
          attrs: { placeholder: '请输入邮箱' }
        }
      ]
    }
  }
}
</script>`;

export const controlsExample = `<template>
  <es-form
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        gender: '',
        hobby: [],
        status: true,
        city: '',
        date: '',
        rate: 3
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'name',
          label: '输入框',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入' }
        },
        {
          prop: 'gender',
          label: '单选框',
          span: 8,
          formtype: 'Radio',
          dataOptions: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          prop: 'city',
          label: '下拉选择',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择' },
          dataOptions: [
            { label: '北京', value: 'bj' },
            { label: '上海', value: 'sh' }
          ]
        },
        {
          prop: 'hobby',
          label: '复选框',
          span: 12,
          formtype: 'Checkbox',
          dataOptions: [
            { label: '阅读', value: 'read' },
            { label: '运动', value: 'sport' },
            { label: '音乐', value: 'music' }
          ]
        },
        {
          prop: 'status',
          label: '开关',
          span: 12,
          formtype: 'Switch',
          attrs: { activeText: '启用', inactiveText: '禁用' }
        },
        {
          prop: 'date',
          label: '日期时间',
          span: 12,
          formtype: 'datePicker',
          attrs: {
            type: 'datetime',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            placeholder: '选择日期时间'
          }
        },
        {
          prop: 'rate',
          label: '评分',
          span: 12,
          formtype: 'Rate',
          attrs: { max: 5 }
        }
      ]
    }
  }
}
</script>`;

export const layoutExample = `<template>
  <es-form
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: ''
      },
      layoutProps: {
        // 表单布局配置
        fromLayProps: {
          labelWidth: '120px',
          size: 'small',
          minfoldRows: 2  // 超过2行折叠
        },
        rowLayProps: {
          gutter: 20  // 栅格间距
        }
      },
      formItemList: [
        {
          prop: 'field1',
          label: '字段1',
          span: 8,  // 占据1/3行
          formtype: 'Input',
          attrs: { placeholder: 'span=8 占据1/3行' }
        },
        {
          prop: 'field2',
          label: '字段2',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: 'span=8 占据1/3行' }
        },
        {
          prop: 'field3',
          label: '字段3',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: 'span=8 占据1/3行' }
        },
        {
          prop: 'field4',
          label: '字段4',
          span: 12,  // 占据半行
          formtype: 'Input',
          attrs: { placeholder: 'span=12 占据半行' }
        },
        {
          prop: 'field5',
          label: '字段5',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: 'span=12 占据半行' }
        },
        {
          prop: 'field6',
          label: '字段6（被折叠）',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '超过minfoldRows折叠' }
        }
      ]
    }
  }
}
</script>`;

export const validationExample = `<template>
  <es-form
    ref="myForm"
    :form-item-list="formItemList"
    :model="formData"
    :config-btn="configBtn"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        phone: '',
        password: ''
      },
      formItemList: [
        {
          prop: 'username',
          label: '用户名',
          span: 12,
          formtype: 'Input',
          // 验证规则配置
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
              { pattern: /^1[3-9]\\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
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
      // 按钮配置
      configBtn: [
        {
          name: '提交',
          type: 'primary',
          onClick: (model, formRef) => {
            formRef.validate((valid) => {
              if (valid) {
                this.$message.success('验证通过！')
                console.log('提交数据:', model)
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
      ]
    }
  }
}
</script>`;

export const dynamicFieldExample = `<template>
  <es-form
    :form-item-list="formItemList"
    :model="formData"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userType: 'personal',
        companyName: '',
        businessLicense: '',
        personalName: '',
        idCard: ''
      },
      formItemList: [
        {
          prop: 'userType',
          label: '用户类型',
          span: 24,
          formtype: 'Radio',
          dataOptions: [
            { label: '个人用户', value: 'personal' },
            { label: '企业用户', value: 'company' }
          ],
          on: {
            change: (val) => console.log('类型切换:', val)
          }
        },
        {
          prop: 'companyName',
          label: '公司名称',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入公司名称' },
          // 条件显示：仅企业用户显示
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
          // 条件显示：仅个人用户显示
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
      ]
    }
  }
}
</script>`;

export const customRenderExample = `<template>
  <es-form
    :form-item-list="formItemList"
    :model="formData"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: '',
        content: '',
        themeColor: '#409eff'
      },
      formItemList: [
        {
          prop: 'title',
          label: '标题',
          span: 24,
          formtype: 'Input',
          attrs: { placeholder: '请输入标题', clearable: true }
        },
        {
          prop: 'content',
          label: '富文本内容',
          span: 24,
          // 自定义渲染函数
          render: (h, model, row) => {
            return h('div', {
              style: {
                border: '1px solid #dcdfe6',
                borderRadius: '4px',
                padding: '10px',
                minHeight: '100px'
              }
            }, [
              // 工具栏
              h('div', {
                style: {
                  borderBottom: '1px solid #ebeef5',
                  paddingBottom: '5px',
                  marginBottom: '10px'
                }
              }, [
                h('el-button', { props: { size: 'mini' } }, 'B'),
                h('el-button', { props: { size: 'mini' } }, 'I'),
                h('el-button', { props: { size: 'mini' } }, 'U')
              ]),
              // 可编辑内容区
              h('div', {
                attrs: { contenteditable: true },
                style: { minHeight: '60px', outline: 'none' },
                on: {
                  input: (e) => {
                    model[row.prop] = e.target.innerText
                  }
                }
              }, model[row.prop] || '')
            ])
          }
        },
        {
          prop: 'themeColor',
          label: '主题色',
          span: 12,
          // 颜色选择器自定义渲染
          render: (h, model, row) => {
            const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
            return h('div', {
              style: { display: 'flex', gap: '10px' }
            }, colors.map(color =>
              h('div', {
                style: {
                  width: '30px',
                  height: '30px',
                  borderRadius: '4px',
                  backgroundColor: color,
                  cursor: 'pointer',
                  border: model[row.prop] === color 
                    ? '2px solid #000' 
                    : '1px solid #dcdfe6'
                },
                on: {
                  click: () => {
                    model[row.prop] = color
                  }
                }
              })
            ))
          }
        }
      ]
    }
  }
}
</script>`;

export const dynamicRuleExample = `<template>
  <!-- 使用 key 强制刷新表单 -->
  <es-form
    :key="formKey"
    :form-item-list="formItemList"
    :model="formData"
  />
</template>

<script>
export default {
  data() {
    return {
      formKey: 0,
      formData: {
        name: '',
        email: '',
        requireEmail: false
      },
      formItemList: [
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
          prop: 'requireEmail',
          label: '需要邮箱',
          span: 12,
          formtype: 'Switch',
          on: {
            change: () => {
              // 切换时强制刷新表单，更新验证规则
              this.formKey++
            }
          }
        },
        {
          prop: 'email',
          label: '邮箱',
          span: 12,
          formtype: 'Input',
          // 动态验证规则
          formItemOptions: {
            rules: this.getEmailRules()
          },
          // 条件显示
          isHiden: () => !this.formData.requireEmail
        }
      ]
    }
  },
  methods: {
    getEmailRules() {
      // 根据条件返回不同的验证规则
      if (this.formData.requireEmail) {
        return [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式错误' }
        ]
      }
      return []
    }
  }
}
</script>`;

export const realWorldFormExample = `<template>
  <es-form
    ref="policyForm"
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        policyName: '',
        policyAbstract: '',
        effectiveTimeRange: '',
        policyTag: '',
        ispolicyTag: 'always',
        policyStatus: '0',
        policyReleaseType: '1',
        policyReleaseDate: ''
      },
      layoutProps: {
        fromLayProps: {
          isBtnHiden: true,  // 隐藏按钮（弹窗内使用）
          labelWidth: '120px',
          size: 'small',
          rules: {
            policyTag: [
              { required: true, message: '政策标签不能为空', trigger: 'blur' }
            ]
          }
        },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'policyName',
          label: '政策名称',
          span: 24,
          formtype: 'Input',
          formItemOptions: {
            labelWidth: '150px',
            style: { width: '65%' },
            rules: [
              { required: true, message: '政策名称不能为空', trigger: 'blur' }
            ]
          },
          attrs: {
            placeholder: '请输入政策名称',
            clearable: true
          }
        },
        {
          prop: 'policyAbstract',
          label: '摘要',
          span: 24,
          formtype: 'Input',
          formItemOptions: {
            labelWidth: '150px',
            style: { width: '65%' },
            rules: [
              { required: true, message: '摘要不能为空', trigger: 'blur' }
            ]
          },
          attrs: {
            placeholder: '请输入政策摘要',
            type: 'textarea',
            rows: 3
          }
        },
        {
          label: '政策生效时间',
          span: 24,
          formItemOptions: {
            labelWidth: '150px',
            style: { width: '65%' },
            rules: [
              { required: true, message: '政策生效时间不能为空', trigger: 'change' }
            ]
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
          // 使用 JSX 自定义复杂布局
          render: (h, model, row) => {
            return (
              <el-row gutter={20}>
                <el-col span={8} style="padding-left: 0;">
                  <el-input 
                    v-model={model.policyTag} 
                    placeholder="请输入政策标签" 
                  />
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
            rules: [
              { required: true, message: '文章状态不能为空', trigger: 'change' }
            ]
          },
          formtype: 'Radio',
          dataOptions: [
            { label: '草稿', value: '0' },
            { label: '上架', value: '1' },
            { label: '下架', value: '2' }
          ]
        },
        {
          prop: 'policyReleaseType',
          label: '发布方式',
          span: 24,
          formItemOptions: { labelWidth: '150px' },
          render: (h, model, row) => {
            return (
              <el-row gutter={20}>
                {/* 条件渲染日期选择器 */}
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
    }
  },
  methods: {
    // 表单验证方法
    validateForm() {
      this.$refs.policyForm.validate((valid) => {
        if (valid) {
          console.log('验证通过', this.formData)
        }
      })
    }
  }
}
</script>`;

// 为了保持向后兼容，导出旧的示例名称
export const renderTemplateExample = controlsExample;
export const renderCustomComponentExample = customRenderExample;
export const dynamicFormExample = dynamicFieldExample;
export const apiDataOptionsExample = validationExample;
export const multipleControlsExample = controlsExample;
export const cascaderExample = controlsExample;
export const uploadExample = controlsExample;
export const apiRequestExample = validationExample;
