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

export const autoRequestExample = `<!-- 全自动数据请求表格 - 使用真实免费 API (通过 fetch + credentials: 'omit' 解决跨域) -->
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
      // 表格选项配置
      tableOptions: {
        isInitRun: true,  // 初始化自动请求
        border: true,
        tabHeight: 400,   // 固定高度
        heightType: 'height',
        size: 'mini',
        // 使用真实免费 API: https://dummyjson.com/users
        apiParams: {
          url: 'https://dummyjson.com/users',
          method: 'get'
        },
        // 使用 httpRequest 自定义请求，配置 credentials: 'omit' 解决跨域
        httpRequest: (params) => this.fetchWithCORS(params),
        // 字段映射：适配 DummyJSON API 返回格式
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'users'
        },
        listenToCallBack: {
          brcb: (params) => {
            // DummyJSON 使用 skip 作为偏移量
            const { pageSize, pageIndex } = params
            return { 
              limit: pageSize,
              skip: (pageIndex - 1) * pageSize
            }
          },
          qrcb: (res) => {
            console.log('DummyJSON API 查询结果:', res)
          }
        }
      }
    }
  },
  methods: {
    // 使用 fetch API 发送请求，配置 credentials: 'omit' 解决跨域问题
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
    }
  }
}
</script>`;

export const customHttpExample = `<!-- 自定义请求实例演示 - 统一处理 Token、错误、Loading -->
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
        { key: 'id', label: 'ID', width: 80 },
        { key: 'title', label: '商品名称' },
        { key: 'brand', label: '品牌', width: 120 },
        { key: 'category', label: '分类', width: 120 },
        { 
          key: 'price', 
          label: '价格', 
          width: 100,
          render: (h, { row }) => (
            <span style="color: #f56c6c; font-weight: bold;">¥{row.price}</span>
          )
        },
        { 
          key: 'stock', 
          label: '库存', 
          width: 100,
          render: (h, { row }) => (
            <el-tag type={row.stock > 50 ? 'success' : 'warning'} size="small">
              {row.stock}
            </el-tag>
          )
        }
      ],
      tableOptions: {
        isInitRun: true,
        border: true,
        tabHeight: 350,
        heightType: 'height',
        size: 'mini',
        // 使用真实免费 API
        apiParams: {
          url: 'https://dummyjson.com/products',
          method: 'get'
        },
        // 自定义 httpRequest：统一处理请求头、错误、Loading
        httpRequest: (params) => this.customHttpRequest(params),
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'products'
        },
        listenToCallBack: {
          brcb: (params) => {
            console.log('【请求拦截】参数:', params)
            // 可以在这里添加统一的参数处理
            const { pageSize, pageIndex } = params
            return { 
              limit: pageSize,
              skip: (pageIndex - 1) * pageSize
            }
          },
          qrcb: (res) => {
            console.log('【响应拦截】结果:', res)
            this.$message.success('数据加载成功')
          }
        }
      }
    }
  },
  methods: {
    // 自定义请求方法 - 统一处理 Token、错误、Loading
    customHttpRequest(params) {
      const { url, formParams, headers = {}, method = 'get' } = params
      
      // 构建 URL 和查询参数
      let requestUrl = url
      if (method.toLowerCase() === 'get' && formParams) {
        const queryParams = new URLSearchParams()
        Object.keys(formParams).forEach(key => {
          if (formParams[key] !== undefined && formParams[key] !== null) {
            queryParams.append(key, formParams[key])
          }
        })
        const queryString = queryParams.toString()
        if (queryString) {
          requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
        }
      }
      
      // 添加统一的请求头（如 Token）
      const customHeaders = {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'es-table-demo',
        'Authorization': 'Bearer ' + getToken(), // 统一添加 Token
        ...headers
      }
      
      // 使用 fetch 发送请求
      return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: customHeaders,
        credentials: 'omit' // 不携带 credentials，避免 CORS 问题
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('请求失败: ' + res.statusText)
          }
          return res.json()
        })
        .then(data => {
          // 统一错误处理
          if (data.code !== 200) {
            this.$message.error(data.message || '请求失败')
            throw new Error(data.message)
          }
          return { data }
        })
        .catch(err => {
          this.$message.error(err.message)
          throw err
        })
    }
  }
}
</script>`;

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

export const linkageExample = `<!-- 表格与表单联动查询 - 使用 JSONPlaceholder 免费 API -->
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
        { key: 'title', label: '标题' },
        {
          key: 'userId',
          label: '用户ID',
          width: 100,
          render: (h, { row }) => (
            <el-tag size="mini">用户{row.userId}</el-tag>
          )
        },
        {
          key: 'body',
          label: '内容',
          render: (h, { row }) => row.body.substring(0, 50) + '...'
        }
      ],
      // 查询表单数据
      formData: {
        userId: '',
        title: ''
      },
      // 查询表单配置
      formConfig: [
        {
          prop: 'userId',
          label: '用户ID',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择用户', clearable: true },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '用户1', value: '1' },
            { label: '用户2', value: '2' },
            { label: '用户3', value: '3' }
          ]
        },
        {
          prop: 'title',
          label: '标题搜索',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入标题关键词', clearable: true }
        },
        {
          prop: 'resetPlaceholder',
          label: '内容',
          span: 8,
          formtype: 'Input',
          attrs: { disabled: true }
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
      // 表格选项 - 使用免费 API
      tableOptions: {
        isInitRun: true,
        border: true,
        // 使用免费 API: https://jsonplaceholder.typicode.com/posts
        apiParams: {
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'get'
        },
        configTableOut: {
          total: 'total',
          pageSize: 'pageSize',
          current: 'pageIndex',
          tableData: 'data'
        },
        // JSONPlaceholder 返回数组，需要特殊处理
        listenToCallBack: {
          brcb: (params) => {
            console.log('查询参数:', params)
            return params
          },
          qrcb: (res) => {
            // JSONPlaceholder 返回数组，包装成分页格式
            if (Array.isArray(res)) {
              return {
                data: res.slice(0, 10),
                total: res.length,
                pageSize: 10,
                pageIndex: 1
              }
            }
            return res
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
