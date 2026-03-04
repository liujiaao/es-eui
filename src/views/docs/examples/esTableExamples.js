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
        tabHeight: 350,   // 固定高度
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

export const multiSelectExample = `<!-- 跨页选择记忆 - 支持多选并保持跨页选择状态 -->
<template>
  <div>
    <!-- 选择统计和操作按钮 -->
    <div style="margin-bottom: 15px;">
      <el-tag type="success" style="margin-right: 10px;">
        已选择 {{ selectedRows.length }} 项
      </el-tag>
      <el-button size="small" @click="clearSelection">
        清空选择
      </el-button>
      <el-button size="small" type="primary" @click="viewSelected">
        查看选中项
      </el-button>
    </div>
    
    <es-table
      ref="multiTable"
      :data-source.sync="tableData"
      :columns="columns"
      :pagination="pagination"
      :options="tableOptions"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前页选中的行（selection-change事件返回）
      selectedRows: [],
      
      // 表格数据（从API获取）
      tableData: [],
      
      // 列配置
      columns: [
        { type: 'selection', width: 55 },  // 多选列（必须）
        { key: 'id', label: 'ID', width: 80 },
        { key: 'firstName', label: '名', width: 100 },
        { key: 'lastName', label: '姓', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'gender', label: '性别', width: 80 },
        { key: 'email', label: '邮箱' }
      ],
      
      // 分页配置
      pagination: { 
        pageIndex: 1, 
        pageSize: 5,
        total: 0
      },
      
      // 表格选项 - 使用API
      tableOptions: {
        isInitRun: true,
        border: true,
        multiSelect: true,        // 开启多选功能
        cachePageSelection: true, // 开启跨页选择记忆
        rowkey: 'id',             // 必须：指定行唯一标识键
        size: 'small',
        apiParams: {
          url: 'https://dummyjson.com/users',
          method: 'get'
        },
        httpRequest: (params) => {
          // 使用fetch避免CORS问题
          const { url, formParams } = params
          const queryString = new URLSearchParams(formParams).toString()
          const requestUrl = queryString ? \`\${url}?\${queryString}\` : url
          return fetch(requestUrl, { 
            method: 'GET',
            credentials: 'omit'
          }).then(res => res.json())
        },
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'users'
        },
        listenToCallBack: {
          brcb: (params) => ({
            limit: params.pageSize,
            skip: (params.pageIndex - 1) * params.pageSize
          })
        }
      }
    }
  },
  
  methods: {
    // 选择变化事件（仅返回当前页选中的行）
    handleSelectionChange(rows) {
      this.selectedRows = rows
      console.log('当前页选中:', rows)
    },
    
    // 清空所有选择（跨页）
    clearSelection() {
      this.$refs.multiTable.clearAllSelection()
      this.selectedRows = []
    },
    
    // 查看所有选中的数据（跨页）
    viewSelected() {
      // 通过组件内部的 multipleSelection 属性获取跨页所有选中项
      const allSelected = this.$refs.multiTable.multipleSelection || []
      this.$message.success(\`共选择 \${allSelected.length} 项\`)
      console.log('所有选中项:', allSelected)
    }
  }
}
<\/script>`;

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

export const groupColumnExample = `<!-- 多级表头（复杂嵌套） - 通过 groups 属性实现多级表头 -->
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
        { 
          id: 1, 
          name: '张三', 
          age: 25, 
          phone: '13800138000', 
          email: 'zhangsan@example.com',
          qq: '123456789',
          wechat: 'zhangsan_wx',
          address: '北京市朝阳区',
          score: { chinese: 85, math: 90, english: 88 }
        },
        { 
          id: 2, 
          name: '李四', 
          age: 30, 
          phone: '13900139000', 
          email: 'lisi@example.com',
          qq: '987654321',
          wechat: 'lisi_wx',
          address: '上海市浦东新区',
          score: { chinese: 78, math: 95, english: 82 }
        },
        { 
          id: 3, 
          name: '王五', 
          age: 28, 
          phone: '13700137000', 
          email: 'wangwu@example.com',
          qq: '111222333',
          wechat: 'wangwu_wx',
          address: '广州市天河区',
          score: { chinese: 92, math: 88, english: 90 }
        }
      ],
      // 列配置 - 使用 groups 属性实现多级表头
      columns: [
        // 第一级：基本信息
        {
          label: '基本信息',     // 一级表头名称
          prop: 'baseInfo',      // 虚拟属性名（不实际对应数据）
          groups: [              // 二级列定义
            { key: 'id', label: 'ID', width: 60 },
            { key: 'name', label: '姓名', width: 100 },
            { key: 'age', label: '年龄', width: 80 }
          ]
        },
        // 第一级：联系方式（包含二级嵌套）
        {
          label: '联系方式',
          prop: 'contact',
          groups: [
            {
              label: '电话',
              prop: 'phone',
              // 二级嵌套 - 三级表头
              groups: [
                { key: 'phone', label: '手机号', width: 130 },
                { key: 'phone2', label: '备用电话', width: 130 }
              ]
            },
            {
              label: '网络联系方式',
              prop: 'online',
              groups: [
                { key: 'email', label: '邮箱', width: 180 },
                { 
                  key: 'qq', 
                  label: 'QQ号', 
                  width: 120,
                  // 支持 render 函数
                  render: (h, { row }) => <el-tag size="mini">{row.qq}</el-tag>
                },
                { key: 'wechat', label: '微信', width: 120 }
              ]
            }
          ]
        },
        // 第一级：其他信息
        {
          label: '其他信息',
          groups: [
            { key: 'address', label: '地址' },
            {
              label: '成绩',
              prop: 'score',
              groups: [
                { key: 'score.chinese', label: '语文', width: 80 },
                { key: 'score.math', label: '数学', width: 80 },
                { key: 'score.english', label: '英语', width: 80 }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>`;

export const expandRowExample = `<!-- 展开行 - 支持展开指定行 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          age: 25,
          phone: '13800138000',
          email: 'zhangsan@example.com',
          address: '北京市朝阳区建国路88号'
        },
        {
          id: 2,
          name: '李四',
          age: 30,
          phone: '13900139000',
          email: 'lisi@example.com',
          address: '上海市浦东新区世纪大道1000号'
        },
        {
          id: 3,
          name: '王五',
          age: 28,
          phone: '13700137000',
          email: 'wangwu@example.com',
          address: '广州市天河区天河路385号'
        }
      ],
      columns: [
        // 展开列：设置 type: 'expand' 和 render 函数
        {
          key: 'id',
          label: 'ID',
          width: 60,
          type: 'expand',  // 关键：展开列类型
          render: (h, { row }) => {
            return (
              <div style="padding: 20px;">
                <el-descriptions column={2} border>
                  <el-descriptions-item label="姓名">{row.name}</el-descriptions-item>
                  <el-descriptions-item label="年龄">{row.age}</el-descriptions-item>
                  <el-descriptions-item label="手机号">{row.phone}</el-descriptions-item>
                  <el-descriptions-item label="邮箱">{row.email}</el-descriptions-item>
                  <el-descriptions-item label="地址" span={2}>{row.address}</el-descriptions-item>
                  <el-descriptions-item label="备注" span={2}>
                    <el-tag size="small">用户ID: {row.id}</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            )
          }
        },
        { key: 'name', label: '姓名', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'phone', label: '手机', width: 130 },
        { key: 'email', label: '邮箱' }
      ],
      tableOptions: {
        border: true,
        rowKey: 'id',  // 必须：用于展开行的唯一标识
        // 控制默认展开的行（只展开 id 为 1 的行）
        expandRowKeys: ['1']
      }
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

export const treeTableExample = `<!-- 树形表格 - 支持懒加载 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      // 树形表格数据
      tableData: [
        {
          id: 1,
          name: '北京市分公司',
          leader: '张三',
          memberCount: 50,
          children: [
            {
              id: 11,
              name: '朝阳区营业部',
              leader: '李四',
              memberCount: 20,
              children: [
                { id: 111, name: '朝阳一部', leader: '王五', memberCount: 8 },
                { id: 112, name: '朝阳二部', leader: '赵六', memberCount: 12 }
              ]
            },
            { id: 12, name: '海淀区营业部', leader: '钱七', memberCount: 30 }
          ]
        },
        {
          id: 2,
          name: '上海市分公司',
          leader: '孙八',
          memberCount: 40,
          children: [
            { id: 21, name: '浦东新区营业部', leader: '周九', memberCount: 25 },
            { id: 22, name: '徐汇区营业部', leader: '吴十', memberCount: 15 }
          ]
        },
        {
          id: 3,
          name: '广州市分公司',
          leader: '郑十一',
          memberCount: 35,
          children: []
        }
      ],
      columns: [
        // 树形表格列：设置 key 和 label
        { key: 'name', label: '组织名称', width: 200 },
        { key: 'leader', label: '负责人', width: 120 },
        {
          key: 'memberCount',
          label: '成员数量',
          width: 100,
          render: (h, { row }) => {
            return (
              <el-tag size="mini" type={row.memberCount > 20 ? 'success' : 'info'}>
                {row.memberCount}人
              </el-tag>
            )
          }
        },
        {
          key: 'hasChildren',
          label: '状态',
          width: 100,
          render: (h, { row }) => {
            const hasChildren = row.children && row.children.length > 0
            return hasChildren
              ? <el-tag size="mini" type="warning">有下属</el-tag>
              : <el-tag size="mini" type="info">无下属</el-tag>
          }
        }
      ],
      tableOptions: {
        border: true,
        rowKey: 'id',  // 必须：树形表格必须指定 row-key
        // 树形表格配置
        defaultExpandAll: true,  // 默认展开所有行
        treeProps: {            // 树形属性配置
          children: 'children', // 指定子数据字段
          hasChildren: 'hasChildren'  // 指定是否有子节点字段
        }
        // 注意：懒加载时不需要 defaultExpandAll，而是通过 lazy 和 lazyLoad 配置
        // lazy: true,
        // lazyLoad: (row, treeNode, resolve) => {
        //   // 模拟异步加载子节点
        //   setTimeout(() => {
        //     const children = [
        //       { id: row.id + '1', name: '子部门1', leader: '负责人1', memberCount: 10 },
        //       { id: row.id + '2', name: '子部门2', leader: '负责人2', memberCount: 15 }
        //     ]
        //     resolve(children)
        //   }, 500)
        // }
      }
    }
  }
}
</script>`;

export const lazyLoadTreeExample = `<!-- 懒加载树形表格 - 点击展开时加载子节点 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
    @expand-change="handleExpandChange"
  />
</template>

<script>
export default {
  data() {
    return {
      // 初始只显示根节点
      tableData: [
        { id: 1, name: '北京市分公司', leader: '张三', memberCount: 50, hasChildren: true },
        { id: 2, name: '上海市分公司', leader: '孙八', memberCount: 40, hasChildren: true },
        { id: 3, name: '广州市分公司', leader: '郑十一', memberCount: 35, hasChildren: true }
      ],
      columns: [
        { key: 'name', label: '组织名称', width: 220 },
        { key: 'leader', label: '负责人', width: 120 },
        {
          key: 'memberCount',
          label: '成员数量',
          width: 100,
          render: (h, { row }) => <el-tag size="mini">{row.memberCount}人</el-tag>
        },
        {
          key: 'status',
          label: '状态',
          render: (h, { row }) => (
            row.hasChildren
              ? <el-tag size="mini" type="warning">有下属</el-tag>
              : <el-tag size="mini" type="info">无下属</el-tag>
          )
        }
      ],
      tableOptions: {
        border: true,
        rowKey: 'id',     // 必须：用于标识每一行
        // 懒加载配置
        lazy: true,       // 开启懒加载
        treeProps: {      // 树形属性配置
          children: 'children',
          hasChildren: 'hasChildren'
        },
        // 懒加载回调：点击展开时触发
        lazyLoad: (row, treeNode, resolve) => {
          // 模拟异步请求子节点数据
          // 实际项目中在这里调用 API 获取子部门
          console.log('懒加载子节点:', row, treeNode)
          
          setTimeout(() => {
            // 根据不同父节点返回不同的子节点数据
            const childrenData = this.getChildrenByParent(row.id)
            resolve(childrenData)
          }, 500)  // 模拟 500ms 延迟
        }
      }
    }
  },
  
  methods: {
    // 模拟根据父ID获取子节点数据
    getChildrenByParent(parentId) {
      const mockData = {
        1: [
          { id: 11, name: '朝阳区营业部', leader: '李四', memberCount: 20, hasChildren: true },
          { id: 12, name: '海淀区营业部', leader: '钱七', memberCount: 30, hasChildren: false }
        ],
        11: [
          { id: 111, name: '朝阳一部', leader: '王五', memberCount: 8, hasChildren: false },
          { id: 112, name: '朝阳二部', leader: '赵六', memberCount: 12, hasChildren: false }
        ],
        2: [
          { id: 21, name: '浦东新区营业部', leader: '周九', memberCount: 25, hasChildren: false },
          { id: 22, name: '徐汇区营业部', leader: '吴十', memberCount: 15, hasChildren: false }
        ],
        3: [
          { id: 31, name: '天河区营业部', leader: '陈十二', memberCount: 18, hasChildren: false },
          { id: 32, name: '越秀区营业部', leader: '林十三', memberCount: 17, hasChildren: false }
        ]
      }
      return mockData[parentId] || []
    },
    
    // 展开行变化事件
    handleExpandChange(row, expanded) {
      console.log('展开状态变化:', row.name, expanded ? '展开' : '收起')
    }
  }
}
</script>`;

export const mergeCellsExample = `<!-- 合并行或列 - 使用 span-method 实现单元格合并 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, category: '电子产品', product: 'iPhone 15', sales: 1200, revenue: 1200000 },
        { id: 2, category: '电子产品', product: 'MacBook Pro', sales: 800, revenue: 1600000 },
        { id: 3, category: '电子产品', product: 'iPad Pro', sales: 600, revenue: 600000 },
        { id: 4, category: '服装', product: '运动T恤', sales: 2000, revenue: 400000 },
        { id: 5, category: '服装', product: '牛仔裤', sales: 1500, revenue: 450000 },
        { id: 6, category: '食品', product: '有机牛奶', sales: 5000, revenue: 250000 }
      ],
      columns: [
        { key: 'category', label: '分类', width: 150 },
        { key: 'product', label: '产品名称', width: 150 },
        { key: 'sales', label: '销量', width: 100 },
        { key: 'revenue', label: '销售额', width: 120 }
      ],
      tableOptions: {
        border: true,
        // 合并单元格方法
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
          // 合并分类列：相同分类的行合并
          if (columnIndex === 0) {
            const categoryRowSpan = this.getCategoryRowSpan(row.category, rowIndex)
            if (categoryRowSpan > 0) {
              return { rowspan: categoryRowSpan, colspan: 1 }
            } else {
              return { rowspan: 0, colspan: 0 }
            }
          }
        }
      }
    }
  },
  
  methods: {
    getCategoryRowSpan(category, currentIndex) {
      let rowSpan = 0
      for (let i = currentIndex; i >= 0; i--) {
        if (this.tableData[i].category === category) {
          rowSpan++
        } else {
          break
        }
      }
      let hasMore = false
      for (let i = currentIndex + rowSpan; i < this.tableData.length; i++) {
        if (this.tableData[i].category === category) {
          hasMore = true
          break
        } else {
          break
        }
      }
      if (hasMore) {
        return 0
      }
      return rowSpan
    }
  }
}
</script>`;

export const complexMergeExample = `<!-- 复杂合并示例 - 横向和纵向同时合并 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, region: '华东区', quarter: 'Q1', month: '1月', sales: 120000, target: 100000, achievement: '120%' },
        { id: 2, region: '华东区', quarter: 'Q1', month: '2月', sales: 150000, target: 100000, achievement: '150%' },
        { id: 3, region: '华东区', quarter: 'Q1', month: '3月', sales: 90000, target: 100000, achievement: '90%' },
        { id: 4, region: '华东区', quarter: 'Q2', month: '4月', sales: 110000, target: 110000, achievement: '100%' },
        { id: 5, region: '华南区', quarter: 'Q1', month: '1月', sales: 80000, target: 80000, achievement: '100%' },
        { id: 6, region: '华南区', quarter: 'Q1', month: '2月', sales: 95000, target: 80000, achievement: '119%' },
        { id: 7, region: '华南区', quarter: 'Q2', month: '4月', sales: 105000, target: 90000, achievement: '117%' }
      ],
      columns: [
        { key: 'region', label: '区域', width: 100 },
        { key: 'quarter', label: '季度', width: 80 },
        { key: 'month', label: '月份', width: 80 },
        { key: 'sales', label: '销售额', width: 100 },
        { key: 'target', label: '目标', width: 100 },
        { key: 'achievement', label: '完成率', width: 100 }
      ],
      tableOptions: {
        border: true,
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
          const data = this.tableData
          
          // 合并区域列
          if (columnIndex === 0) {
            const rowSpan = this.getMergeSpan(data, rowIndex, 'region')
            if (rowSpan > 0) {
              return { rowspan: rowSpan, colspan: 1 }
            }
            return { rowspan: 0, colspan: 0 }
          }
          
          // 合并季度列
          if (columnIndex === 1) {
            if (rowIndex > 0 && data[rowIndex - 1].region === row.region) {
              return { rowspan: 0, colspan: 0 }
            }
            let rowspan = 0
            for (let i = rowIndex; i < data.length; i++) {
              if (data[i].region === row.region && data[i].quarter === row.quarter) {
                rowspan++
              } else {
                break
              }
            }
            return { rowspan, colspan: 1 }
          }
          
          // 合并月份列
          if (columnIndex === 2) {
            if (rowIndex > 0 && data[rowIndex - 1].quarter === row.quarter && data[rowIndex - 1].region === row.region) {
              return { rowspan: 0, colspan: 0 }
            }
            let rowspan = 0
            for (let i = rowIndex; i < data.length; i++) {
              if (data[i].region === row.region && data[i].quarter === row.quarter) {
                rowspan++
              } else {
                break
              }
            }
            return { rowspan, colspan: 1 }
          }
        }
      }
    }
  },
  
  methods: {
    getMergeSpan(data, rowIndex, key) {
      const currentValue = data[rowIndex][key]
      if (rowIndex > 0 && data[rowIndex - 1][key] === currentValue) {
        return 0
      }
      let span = 0
      for (let i = rowIndex; i < data.length; i++) {
        if (data[i][key] === currentValue) {
          span++
        } else {
          break
        }
      }
      return span
    }
  }
}
</script>`;

export const configBtnExample = `<!-- 表格按钮配置 - 通过 configBtn 配置表格顶部操作按钮 -->
<template>
  <es-table
    :data-source="tableData"
    :columns="columns"
    :options="tableOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱' }
      ],
      tableOptions: {
        border: true,
        // 表格顶部按钮配置
        configBtn: [
          // 左侧按钮 (code: 1)
          {
            code: 1,
            name: '新增',
            icon: 'el-icon-plus',
            type: 'primary',
            click: () => {
              this.$message.success('点击了新增按钮')
            }
          },
          {
            code: 1,
            name: '导入',
            icon: 'el-icon-upload2',
            click: () => {
              this.$message.info('点击了导入按钮')
            }
          },
          // 右侧按钮 (code: 2)
          {
            code: 2,
            name: '导出',
            icon: 'el-icon-download',
            type: 'warning',
            click: () => {
              this.$message.info('点击了导出按钮')
            }
          },
          {
            code: 2,
            name: '高级搜索',
            icon: 'el-icon-search',
            isHide: false,
            click: () => {
              this.$message.info('点击了高级搜索按钮')
            }
          }
        ],
        // 左侧静态文字
        leftText: '已选择 0 项'
      }
    }
  }
}
</script>`;

export const fullHeightExample = `<!-- 继承父容器高度 - 使用 tabHeight: '100%' -->
<template>
  <!-- 父容器需要设置具体高度 -->
  <div style="height: 400px;">
    <es-table
      :data-source="tableData"
      :columns="columns"
      :options="tableOptions"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', address: '北京市朝阳区' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', address: '上海市浦东新区' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', address: '广州市天河区' },
        { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', address: '深圳市南山区' },
        { id: 5, name: '钱七', age: 27, email: 'qianqi@example.com', address: '杭州市西湖区' },
        { id: 6, name: '孙八', age: 32, email: 'sunba@example.com', address: '成都市高新区' },
        { id: 7, name: '周九', age: 29, email: 'zhoujiu@example.com', address: '武汉市洪山区' },
        { id: 8, name: '吴十', age: 31, email: 'wushi@example.com', address: '南京市鼓楼区' }
      ],
      columns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱', width: 200 },
        { key: 'address', label: '地址' }
      ],
      tableOptions: {
        border: true,
        // 关键：设置 tabHeight 为 '100%' 继承父容器高度
        tabHeight: '100%',
        heightType: 'height'
      }
    }
  }
}
</script>`;
