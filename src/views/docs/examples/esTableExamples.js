// EsTable 示例代码

export const basicExample = `<!-- 基础表格 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="{ border: true }"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱' }
      ]
    }
  }
}
</script>`;

export const autoRequestExample = `<!-- 全自动数据请求表格 -->
<template>
  <es-table
    :data-source.sync="tableData"
    :columns="columns"
    :pagination="pagination"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagination: { pageIndex: 1, pageSize: 10, total: 0 },
      columns: [
        { key: 'title', label: '政策标题' },
        { 
          key: 'status', 
          label: '状态',
          render: (h, { row }) => {
            const statusMap = { 
              '0': { text: '草稿', type: 'info' },
              '1': { text: '已上架', type: 'success' },
              '2': { text: '已下架', type: 'danger' }
            }
            const s = statusMap[row.status]
            return <el-tag type={s.type}>{s.text}</el-tag>
          }
        },
        { key: 'createTime', label: '创建时间' }
      ],
      // 表格选项配置
      tableOptions: {
        isInitRun: true,  // 初始化自动请求
        border: true,
        tabHeight: 400,   // 固定高度
        heightType: 'height',
        size: 'mini',
        // 请求配置
        apiParams: {
          url: '/api/policy/list',
          method: 'post'
        },
        // 字段映射（适配后端返回格式）
        configTableOut: {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex',
          tableData: 'data'
        },
        // 生命周期回调
        listenToCallBack: {
          // 请求前回调 - 格式化参数
          brcb: (params) => {
            const { pageSize, pageIndex, ...rest } = params
            return { 
              pageNum: pageIndex, 
              pageSize, 
              ...rest 
            }
          },
          // 响应回调 - 处理数据
          qrcb: (res) => {
            console.log('查询结果:', res)
          }
        }
      }
    }
  }
}
</script>`;

export const customHttpExample = `// 自定义请求实例 - 统一处理 Token、错误、Loading
export default {
  data() {
    return {
      tableOptions: {
        isInitRun: true,
        apiParams: {
          url: '/api/list',
          method: 'post'
        },
        configTableOut: {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex', 
          tableData: 'data'
        },
        // 自定义请求实例
        httpRequest: (params) => {
          const { url, formParams, headers, ...options } = params
          
          return request({
            baseURL: process.env.VUE_APP_API_URL,
            method: options.method || 'post',
            url: url,
            data: formParams,
            headers: {
              'Authorization': 'Bearer ' + getToken(),
              ...headers
            }
          }).then(res => {
            // 统一错误处理
            if (res.code !== 200) {
              this.$message.error(res.message)
              throw new Error(res.message)
            }
            return res
          })
        }
      }
    }
  }
}`;

export const renderColumnExample = `<!-- Render 列渲染 - 支持 JSX -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="{ border: true }"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', status: '1', score: 85 },
        { id: 2, name: '李四', status: '0', score: 92 }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名' },
        {
          key: 'status',
          label: '状态',
          // Render 函数参数：(h, { row, index, instance })
          render: (h, { row }) => {
            const statusMap = {
              '0': { text: '草稿', type: 'info' },
              '1': { text: '已上架', type: 'success' },
              '2': { text: '已下架', type: 'danger' }
            }
            const s = statusMap[row.status]
            return <el-tag type={s.type} size="small">{s.text}</el-tag>
          }
        },
        {
          key: 'score',
          label: '评分',
          render: (h, { row }) => {
            const color = row.score >= 90 
              ? '#67c23a' 
              : row.score >= 80 
                ? '#e6a23c' 
                : '#f56c6c'
            return (
              <div style="display: flex; align-items: center; gap: 10px;">
                <el-progress 
                  percentage={row.score} 
                  color={color} 
                  style="width: 100px;" 
                />
                <span style={{ color }}>{row.score}分</span>
              </div>
            )
          }
        }
      ]
    }
  }
}
</script>`;

export const linkageExample = `<!-- 表格与表单联动查询 -->
<template>
  <es-table
    :data-source.sync="tableData"
    :columns="columns"
    :pagination="pagination"
    :options="tableOptions"
  >
    <!-- 表单作为查询条件插入表格头部 -->
    <es-form
      :form-item-list="formConfig"
      :model="formData"
      :layout-form-props="layoutProps"
      :config-btn="configBtn"
    />
  </es-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagination: { pageIndex: 1, pageSize: 10, total: 0 },
      columns: [
        { key: 'id', label: '编号', width: 80 },
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' }
      ],
      // 查询表单数据
      formData: {
        keyword: '',
        status: '',
        dateRange: []
      },
      // 查询表单配置
      formConfig: [
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
      // 表单布局
      layoutProps: {
        fromLayProps: { 
          labelWidth: '80px', 
          size: 'small',
          minfoldRows: 1  // 超过1行折叠
        },
        rowLayProps: { gutter: 20 }
      },
      // 查询按钮
      configBtn: [
        { 
          name: '查询', 
          type: 'primary', 
          key: 'query', 
          triggerEvent: true,  // 触发查询
          icon: 'el-icon-search' 
        },
        { 
          name: '重置', 
          key: 'rest', 
          triggerEvent: true,  // 触发重置
          icon: 'el-icon-refresh' 
        }
      ],
      // 表格选项
      tableOptions: {
        isInitRun: true,
        border: true,
        apiParams: { url: '/api/list', method: 'post' },
        configTableOut: {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex',
          tableData: 'data'
        },
        // 请求前处理日期范围
        listenToCallBack: {
          brcb: (params) => {
            const { pageSize, pageIndex, dateRange, ...rest } = params
            const result = { 
              pageNum: pageIndex, 
              pageSize, 
              ...rest 
            }
            // 拆分日期范围
            if (dateRange && dateRange.length === 2) {
              result.startTime = dateRange[0]
              result.endTime = dateRange[1]
            }
            return result
          }
        }
      }
    }
  }
}
</script>`;

export const actionColumnExample = `<!-- 操作列与表格实例 -->
<template>
  <es-table
    ref="myTable"
    :data-source="tableData"
    :columns="columns"
    :options="{ border: true }"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '政策A', status: '1' },
        { id: 2, name: '政策B', status: '0' }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' },
        {
          key: 'action',
          label: '操作',
          width: 250,
          // 操作列渲染 - 通过 instance 调用表格方法
          render: (h, { row, index, instance }) => {
            return (
              <div>
                <el-button 
                  size="mini" 
                  type="text" 
                  on-click={() => this.handleView(row)}
                >
                  查看
                </el-button>
                <el-button 
                  size="mini" 
                  type="text" 
                  on-click={() => this.handleEdit(row)}
                >
                  编辑
                </el-button>
                {/* 条件渲染按钮 */}
                {row.status === '0' && (
                  <el-button 
                    size="mini" 
                    type="text"
                    on-click={() => this.handlePublish(row, instance)}
                  >
                    上架
                  </el-button>
                )}
                {row.status === '1' && (
                  <el-button 
                    size="mini" 
                    type="text"
                    on-click={() => this.handleUnpublish(row, instance)}
                  >
                    下架
                  </el-button>
                )}
                <el-button 
                  size="mini" 
                  type="text" 
                  style="color: #f56c6c;"
                  on-click={() => this.handleDelete(row, instance)}
                >
                  删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    handleView(row) {
      console.log('查看:', row)
    },
    handleEdit(row) {
      console.log('编辑:', row)
    },
    // 上架操作
    handlePublish(row, instance) {
      this.$httpRequest({
        url: '/api/publish',
        method: 'post',
        formParams: { id: row.id }
      }).then(() => {
        this.$message.success('上架成功')
        // 通过 instance 刷新表格
        instance.httpRquestInstace()
      })
    },
    // 下架操作
    handleUnpublish(row, instance) {
      this.$httpRequest({
        url: '/api/unpublish',
        method: 'post',
        formParams: { id: row.id }
      }).then(() => {
        this.$message.success('下架成功')
        instance.httpRquestInstace()
      })
    },
    // 删除操作
    handleDelete(row, instance) {
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$httpRequest({
          url: '/api/delete',
          method: 'post',
          formParams: { id: row.id }
        }).then(() => {
          this.$message.success('删除成功')
          instance.httpRquestInstace()
        })
      })
    }
  }
}
</script>`;

export const realWorldExample = `<!-- 生产级实战：政策管理表格 -->
<template>
  <div class="policy-manage">
    <es-table
      :data-source.sync="dataSource"
      :columns="columns"
      :pagination="pagination"
      :options="tableOptions"
    >
      <es-form
        :form-item-list="formConfig"
        :model="formData"
        :layout-form-props="layoutProps"
        :config-btn="configBtn"
      />
    </es-table>
  </div>
</template>

<script>
import { useDialog } from '@/components/es-eui'
import PolicyForm from './PolicyForm.vue'

const policyDialog = useDialog()

export default {
  data() {
    return {
      dataSource: [],
      pagination: { pageIndex: 1, pageSize: 10, total: 0 },
      // 表格列配置
      columns: [
        { key: 'id', label: '政策编号', fixed: 'left', width: 100 },
        { key: 'title', label: '政策标题', width: 150 },
        { key: 'tags', label: '政策标签', width: 100 },
        {
          key: 'status',
          label: '状态',
          width: 100,
          render: (h, { row }) => {
            const map = { '0': '草稿', '1': '上架中', '2': '已下架' }
            const type = row.status === '1' ? 'success' : 'info'
            return <el-tag type={type} size="small">{map[row.status]}</el-tag>
          }
        },
        { key: 'publishingMethodName', label: '发布方式', width: 100 },
        { key: 'scheduledReleaseTime', label: '发布时间', width: 140 },
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
                <el-button size="mini" type="text" 
                  on-click={() => this.handleView(row)}>查看</el-button>
                <el-button size="mini" type="text"
                  on-click={() => this.handleEdit(row)}>编辑</el-button>
                {(row.status === '0' || row.status === '2') && (
                  <el-button size="mini" type="text"
                    on-click={() => this.handlePublish(row, instance)}>上架</el-button>
                )}
                {row.status === '1' && (
                  <el-button size="mini" type="text"
                    on-click={() => this.handleUnpublish(row, instance)}>下架</el-button>
                )}
                {index !== 0 && (
                  <el-button size="mini" type="text"
                    on-click={() => this.handleMoveUp(row, instance, index)}>上移</el-button>
                )}
                {index !== this.dataSource.length - 1 && (
                  <el-button size="mini" type="text"
                    on-click={() => this.handleMoveDown(row, instance, index)}>下移</el-button>
                )}
                <el-button size="mini" type="text" style="color: #f56c6c;"
                  on-click={() => this.handleDelete(row, instance)}>删除</el-button>
              </div>
            )
          }
        }
      ],
      // 表格选项
      tableOptions: {
        isInitRun: true,
        border: true,
        tabHeight: 500,
        heightType: 'height',
        size: 'mini',
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
        // 请求参数处理
        listenToCallBack: {
          brcb: (params) => {
            const { pageSize, pageIndex, effectiveTimeRange, publishTimeRange, ...rest } = params
            const result = { pageNum: pageIndex, pageSize }
            
            // 处理日期范围字段
            if (effectiveTimeRange?.length === 2) {
              result.validDateStart = effectiveTimeRange[0]
              result.validDateEnd = effectiveTimeRange[1]
            }
            if (publishTimeRange?.length === 2) {
              result.scheduledReleaseTimeStart = publishTimeRange[0]
              result.scheduledReleaseTimeEnd = publishTimeRange[1]
            }
            
            return { ...result, ...rest }
          }
        }
      },
      // 查询表单数据
      formData: {
        policyCode: '',
        policyTitle: '',
        policyStatus: '',
        policyTag: '',
        publishType: '',
        effectiveTimeRange: [],
        publishTimeRange: []
      },
      // 查询表单配置
      formConfig: [
        {
          prop: 'policyCode',
          label: '政策编号',
          span: 8,
          formtype: 'Input',
          formItemOptions: { labelWidth: '100px' },
          attrs: { placeholder: '请输入', clearable: true }
        },
        {
          prop: 'policyTitle',
          label: '政策名称',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入', clearable: true }
        },
        {
          prop: 'policyStatus',
          label: '文章状态',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择', clearable: true },
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
            endPlaceholder: '结束日期'
          }
        }
      ],
      // 表单布局
      layoutProps: {
        fromLayProps: {
          minfoldRows: 1,  // 超过1行折叠
          labelWidth: '100px',
          size: 'small'
        },
        rowLayProps: { gutter: 20 }
      },
      // 按钮配置
      configBtn: [
        {
          direction: 'left',
          name: '新增',
          icon: 'el-icon-plus',
          size: 'mini',
          type: 'primary',
          onClick: () => this.handleAdd()
        },
        {
          type: 'primary',
          size: 'mini',
          name: '查询',
          icon: 'el-icon-search',
          key: 'query',
          triggerEvent: true
        },
        {
          type: 'warning',
          key: 'rest',
          size: 'mini',
          name: '重置',
          icon: 'el-icon-refresh',
          triggerEvent: true
        }
      ]
    }
  },
  methods: {
    // 打开新增弹窗
    handleAdd() {
      policyDialog({
        title: '新增政策',
        width: '75%',
        isDraggable: true,
        closeOnClickModal: false,
        configBtn: [
          {
            key: 'save',
            type: 'primary',
            size: 'mini',
            name: '提交',
            click: (instance, { close, getRefs }) => {
              getRefs.policyform.validate((valid) => {
                if (valid) {
                  // 提交表单
                  const { formData } = instance
                  this.$httpRequest({
                    url: '/api/policy/add',
                    method: 'post',
                    formParams: formData
                  }).then(() => {
                    this.$message.success('新增成功')
                    close()
                    this.$refs.policyTable?.httpRquestInstace()
                  })
                }
              })
            }
          },
          {
            key: 'cancel',
            size: 'mini',
            name: '取消',
            click: (instance, { close }) => close()
          }
        ],
        render: (h) => <PolicyForm />
      })
    },
    // 上架
    handlePublish(row, instance) {
      this.$httpRequest({
        url: '/api/policy/shelfUp',
        method: 'post',
        formParams: { id: row.id }
      }).then(() => {
        this.$message.success('上架成功')
        instance.httpRquestInstace()  // 刷新表格
      })
    },
    // 下架
    handleUnpublish(row, instance) {
      this.$httpRequest({
        url: '/api/policy/shelfDown',
        method: 'post',
        formParams: { id: row.id }
      }).then(() => {
        this.$message.success('下架成功')
        instance.httpRquestInstace()
      })
    },
    // 上移
    handleMoveUp(row, instance, index) {
      this.$httpRequest({
        url: '/api/policy/swapSort',
        method: 'post',
        formParams: {
          id: row.id,
          anotherId: this.dataSource[index - 1].id
        }
      }).then(() => {
        instance.httpRquestInstace()
      })
    }
  }
}
</script>`;
