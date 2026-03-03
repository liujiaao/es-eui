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
    :config-btn="configBtn"
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
      // 按钮配置（用于显示折叠/展开按钮）
      configBtn: [
        {
          name: '查询',
          type: 'primary',
          onClick: (model) => {
            console.log('查询参数:', model)
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        }
      ],
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

export const apiRequestExample = `<template>
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
        province: '',
        city: '',
        category: ''
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'province',
          label: '省份',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择省份' },
          // 使用 apiParams 配置接口请求
          apiParams: {
            url: 'https://dummyjson.com/products/categories',
            // 数据转换回调
            listenToCallBack: {
              crtn: (data) => {
                if (Array.isArray(data)) {
                  return data.map(item => ({
                    label: typeof item === 'string' ? item : item.name || item.title,
                    value: typeof item === 'string' ? item : item.slug || item.id
                  }))
                }
                return []
              }
            }
          }
        },
        {
          prop: 'city',
          label: '城市',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择城市' },
          // 静态数据
          dataOptions: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'category',
          label: '商品分类',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择分类' },
          // 简单 API 请求
          apiParams: {
            url: 'https://dummyjson.com/products/categories'
          }
        }
      ]
    }
  }
}
</script>`;

// 单图片上传示例（本地Base64演示）
export const imageUploadExample = `<template>
  <es-form
    ref="uploadForm"
    :key="formKey"
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formKey: 0,
      formData: {
        avatar: [],
        name: ''
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'name',
          label: '名称',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入名称'
          }
        },
        {
          prop: 'avatar',
          label: '头像',
          span: 24,
          formtype: 'Upload',
          props: {
            action: '/api/upload',
            accept: 'image/*',
            listType: 'picture-card',
            limit: 1,
            showFileList: true,
            onExceed: () => {
              this.$message.warning('最多只能上传1张图片')
            }
          },
          // 自定义上传请求 - 必须在 props 外面
          httpRequest: (options) => {
            return new Promise((resolve, reject) => {
              const file = options.file
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => {
                // 模拟上传成功，返回 Base64 数据
                const result = {
                  success: true,
                  link: reader.result,
                  filename: file.name
                }
                resolve({ data: result })
              }
              reader.onerror = () => {
                reject(new Error('文件读取失败'))
              }
            })
          },
          // 自定义上传触发元素
          triggerRender: (h) => {
            return h('div', {
              style: {
                display: 'inline-block',
                width: '148px',
                height: '148px',
                lineHeight: '146px'
              }
            }, [
              h('i', {
                class: 'el-icon-plus',
                style: {
                  fontSize: '28px',
                  color: '#8c939d'
                }
              })
            ])
          },
          on: {
            // 上传成功回调
            success: (response, file, fileList) => {
              console.log('上传成功:', response)
              if (response.success && response.link) {
                this.formData.avatar = [{
                  name: file.name,
                  url: response.link
                }]
                this.$message.success('上传成功！')
              }
            },
            // 删除文件回调
            remove: (file, fileList) => {
              this.formData.avatar = fileList
            },
            // 文件变化回调
            change: (file, fileList) => {
              this.formData.avatar = fileList
            },
            // 预览回调
            preview: (file) => {
              if (file.url) {
                console.log('预览文件:', file.url)
              }
            }
          }
        }
      ]
    }
  }
}
</script>`;

// 多图片上传示例（本地Base64演示）
export const multiImageUploadExample = `<template>
  <es-form
    ref="uploadForm"
    :key="formKey"
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formKey: 0,
      formData: {
        gallery: [],
        description: ''
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'description',
          label: '描述',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入描述信息'
          }
        },
        {
          prop: 'gallery',
          label: '相册',
          span: 24,
          formtype: 'Upload',
          props: {
            action: '/api/upload',
            accept: 'image/*',
            listType: 'picture-card',
            limit: 9,
            showFileList: true,
            onExceed: () => {
              this.$message.warning('最多只能上传9张图片')
            }
          },
          // 自定义上传请求 - 必须在 props 外面
          httpRequest: (options) => {
            return new Promise((resolve, reject) => {
              const file = options.file
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => {
                // 模拟上传成功，返回 Base64 数据
                const result = {
                  success: true,
                  link: reader.result,
                  filename: file.name
                }
                resolve({ data: result })
              }
              reader.onerror = () => {
                reject(new Error('文件读取失败'))
              }
            })
          },
          // 自定义上传触发元素
          triggerRender: (h) => {
            return h('div', {
              style: {
                display: 'inline-block',
                width: '148px',
                height: '148px',
                lineHeight: '146px'
              }
            }, [
              h('i', {
                class: 'el-icon-plus',
                style: {
                  fontSize: '28px',
                  color: '#8c939d'
                }
              })
            ])
          },
          on: {
            // 上传成功回调
            success: (response, file, fileList) => {
              if (response.success && response.link) {
                const newFile = {
                  name: file.name,
                  url: response.link
                }
                const index = fileList.findIndex(f => f.uid === file.uid)
                if (index !== -1) {
                  fileList[index] = newFile
                }
                this.formData.gallery = [...fileList]
                this.$message.success('上传成功！')
              }
            },
            // 删除文件回调
            remove: (file, fileList) => {
              this.formData.gallery = fileList
            },
            // 文件变化回调
            change: (file, fileList) => {
              this.formData.gallery = fileList
            },
            // 预览回调
            preview: (file) => {
              if (file.url) {
                console.log('预览文件:', file.url)
              }
            }
          }
        }
      ]
    }
  }
}
</script>`;

// 省市区三级联动示例
export const regionLinkageExample = `<template>
  <es-form
    ref="regionForm"
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
    :config-btn="configBtn"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        region: [],        // 省市区联动值
        province: '',      // 单独省份
        city: '',          // 单独城市
        district: '',      // 单独区县
        address: ''        // 详细地址
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      // 按钮配置
      configBtn: [
        {
          name: '提交',
          type: 'primary',
          onClick: (model, formRef) => {
            formRef.validate((valid) => {
              if (valid) {
                this.$message.success('提交成功！')
                console.log('表单数据:', model)
              }
            })
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        },
        {
          name: '手动刷新联动',
          onClick: async (model, formRef) => {
            // 使用 formItmeRequestInstance 手动刷新指定字段的选项
            await formRef.formItmeRequestInstance(['province', 'city', 'district'])
            this.$message.success('联动数据已刷新')
          }
        }
      ],
      formItemList: [
        {
          prop: 'region',
          label: '省市区',
          span: 24,
          formtype: 'Cascader',
          // 使用级联选择器实现三级联动
          attrs: {
            placeholder: '请选择省市区',
            props: {
              value: 'code',
              label: 'name',
              children: 'children',
              checkStrictly: false  // 严格模式，选择叶子节点
            },
            clearable: true,
            filterable: true  // 支持搜索
          },
          // 静态模拟数据（实际项目中应使用 apiParams 远程加载）
          dataOptions: [
            {
              code: '110000',
              name: '北京市',
              children: [
                {
                  code: '110100',
                  name: '市辖区',
                  children: [
                    { code: '110101', name: '东城区' },
                    { code: '110102', name: '西城区' },
                    { code: '110105', name: '朝阳区' },
                    { code: '110106', name: '丰台区' },
                    { code: '110107', name: '石景山区' },
                    { code: '110108', name: '海淀区' }
                  ]
                }
              ]
            },
            {
              code: '310000',
              name: '上海市',
              children: [
                {
                  code: '310100',
                  name: '市辖区',
                  children: [
                    { code: '310101', name: '黄浦区' },
                    { code: '310104', name: '徐汇区' },
                    { code: '310105', name: '长宁区' },
                    { code: '310106', name: '静安区' },
                    { code: '310107', name: '普陀区' },
                    { code: '310109', name: '虹口区' }
                  ]
                }
              ]
            },
            {
              code: '440000',
              name: '广东省',
              children: [
                {
                  code: '440100',
                  name: '广州市',
                  children: [
                    { code: '440103', name: '荔湾区' },
                    { code: '440104', name: '越秀区' },
                    { code: '440105', name: '海珠区' },
                    { code: '440106', name: '天河区' },
                    { code: '440111', name: '白云区' }
                  ]
                },
                {
                  code: '440300',
                  name: '深圳市',
                  children: [
                    { code: '440303', name: '罗湖区' },
                    { code: '440304', name: '福田区' },
                    { code: '440305', name: '南山区' },
                    { code: '440306', name: '宝安区' },
                    { code: '440307', name: '龙岗区' }
                  ]
                }
              ]
            }
          ],
          // 监听选择变化
          on: {
            change: (value) => {
              console.log('省市区选择变化:', value)
              // 可以在这里处理级联选择的联动逻辑
              if (value && value.length >= 3) {
                this.formData.province = value[0]
                this.formData.city = value[1]
                this.formData.district = value[2]
              }
            }
          }
        },
        {
          prop: 'address',
          label: '详细地址',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入详细地址，包括街道、楼栋、门牌号等',
            type: 'textarea',
            rows: 2
          }
        }
      ]
    }
  }
}
</script>`;

// 远程加载省市区示例
export const remoteRegionLinkageExample = `<template>
  <es-form
    ref="remoteForm"
    :key="formKey"
    :form-item-list="formItemList"
    :model="formData"
    :layout-form-props="layoutProps"
  />
</template>

<script>
export default {
  data() {
    return {
      formKey: 0,
      formData: {
        province: '',
        city: '',
        district: ''
      },
      layoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      formItemList: [
        {
          prop: 'province',
          label: '省份',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择省份',
            clearable: true,
            filterable: true
          },
          // 远程加载省份数据
          apiParams: {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            options: { method: 'GET' }
          },
          // 自定义 httpRequest 方法，解决跨域问题
          httpRequest: (config) => {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()
              xhr.open('GET', config.url, true)
              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  try {
                    const data = JSON.parse(xhr.responseText)
                    resolve({ data })
                  } catch (e) {
                    resolve({ data: [] })
                  }
                } else {
                  reject(new Error('Request failed'))
                }
              }
              xhr.onerror = () => reject(new Error('Network error'))
              xhr.send()
            })
          },
          // 数据转换回调
          listenToCallBack: {
            crtn: (data) => {
              // 将API数据转换为省份选项格式
              if (Array.isArray(data)) {
                return data.slice(0, 10).map((item, index) => ({
                  label: item.address?.city || \`省份\${index + 1}\`,
                  value: \`province_\${index + 1}\`
                }))
              }
              return []
            }
          },
          on: {
            change: (value) => {
              // 省份变化时，清空城市和区县
              this.formData.city = ''
              this.formData.district = ''
              // 手动触发城市数据的远程加载
              this.loadCityOptions(value)
            }
          }
        },
        {
          prop: 'city',
          label: '城市',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择城市',
            clearable: true,
            filterable: true,
            disabled: () => !this.formData.province
          },
          // 初始为空，动态加载
          dataOptions: []
        },
        {
          prop: 'district',
          label: '区县',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择区县',
            clearable: true,
            filterable: true,
            disabled: () => !this.formData.city
          },
          dataOptions: []
        }
      ]
    }
  },
  methods: {
    // 加载城市数据 - 直接请求API并更新dataOptions
    loadCityOptions(provinceCode) {
      if (!provinceCode) return
      
      // 直接使用XMLHttpRequest请求城市数据
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true)
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText)
          // 转换数据格式
          const cityOptions = data.slice(0, 8).map((item, index) => ({
            label: item.title?.substring(0, 6) || \`城市\${index + 1}\`,
            value: \`city_\${item.id}\`
          }))
          
          // 直接更新城市表单项的 dataOptions
          const cityItem = this.formItemList.find(item => item.prop === 'city')
          if (cityItem) {
            cityItem.dataOptions = cityOptions
            cityItem.attrs.disabled = false
          }
          
          // 强制刷新表单组件
          this.formKey = Date.now()
        }
      }
      xhr.send()
    }
  }
}
</script>`;
