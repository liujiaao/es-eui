<!-- eslint-disable vue/require-prop-types -->
<template>
  <div
    :ref="tableContainer"
    class="table_component"
    :style="{height: tabHeight }"
  >
    <div class="table_containers">
      <div
        v-if="showHeaderBar"
        ref="headBar"
        class="btn-slot"
        :style="(slotSyles.value && slotSyles.type === 'object') && slotSyles.value "
        :class="slotSyles.value && slotSyles.type === 'string' ? slotSyles.value : { slotClass: (slotState && slotSyles.type !== 'object') ? true : false }"
      >
        <div
          v-if="defaultSlots"
          class="headerBar"
        >

          <slot />
        </div>
      </div>
      <div
        ref="tableBody"
        v-loading="loadStatus"
        :element-loading-text="attrs.loadingTxt||'数据正在加载中...'"
        element-loading-spinner="el-icon-loading1"
        class="page-loading-con tableContainer"
        :tableList="{getDataSouce}"
      >
        <!-- 按钮 -->
        <table-btns
          v-if="attrs.configBtn && attrs.configBtn.length || attrs.leftText"
          ref="tbBtn"
          :btn-config="attrs.configBtn"
          :left-text="attrs.leftText"
          :form-instance="getFormInstace()"
        />
        <!-- :max-height="tableHeight" -->
        <el-table
          :id="tableId"
          :key="tableKey"
          :ref="tableId"
          class="el-es_tables"
          :border="attrs.border"
          style="width:100%;"
          :[this.heightType]="tableHeight"
          v-bind="attrs"
          :data="dataSource"
          v-on="$listeners"
          @sort-change="changeTableSort"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column
            v-if="attrs.expand"
            label=""
            type="expand"
            width="60"
            align="center"
          >
            <template v-slot="scope">
              <slot
                :scope="scope"
                name="tableExpand"
              />
            </template>
          </el-table-column> -->
          <column-item
            v-for="(cols,index) in columnsfilter"
            :key="cols.prop || cols.key || index"
            :cols="{...cols, columnIndex: index}"
            :instance="_self"
          >
            <template
              v-if="cols.scopedSlots && cols.scopedSlots.customRender"
              #[cols.scopedSlots.customRender]="{scope}"
            >
              <slot
                v-bind="{...cols, columnIndex: index, row: scope.row, column: scope.column, instance: _self}"
                :name="cols.scopedSlots.customRender"
                :scope="scope"
              />
            </template>
          </column-item>
        </el-table>
        <!-- 分页 -->
        <div
          v-if="ispaginstion"
          ref="pagination"
          class="pagination_page"
        >
          <el-pagination

            :background="onpagination.background"
            :small="onpagination.isSmall"
            :total="onpagination.total"
            :page-size.sync="onpagination.pageSize"
            :page-sizes="onpagination.pageSizes"
            :current-page.sync="onpagination.current"
            :layout="layout"
            style="padding: 0; margin: 10px 0; text-align: center"
            @size-change="handleSizeChange"
            @current-change="handleIndexChange"
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Table } from 'element-ui'
import columnItem from './columnItem'
import tableBtns from './tableBtns'
import resizeObserver from './resizeObserver'

const defaultOptions = {
  multiSelect: false,
  expand: false,
  snIndex: false,
  loading: false, // 表格动画
  border: false,
  size: 'small',
  headerCellStyle: { background: '#f5f7fa' },
  highlightCurrentRow: true,
  cachePageSelection: true
}
export default {
  name: 'EsTable',
  components: {
    columnItem,
    tableBtns
  },
  inject: {
    getVisibleShow: {
      default: false
    }
  },
  // 属性
  props: {
    ...Table.props,
    headBarClass: {
      type: [String, Object],
      default: ''
    },
    // eslint-disable-next-line vue/require-prop-types
    showHeaderBar: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    dataSource: {
      type: Array,
      default: function(val) {
        return []
      }
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    options: {
      type: Object,
      default: () => {
        return defaultOptions
      }
    },
    pagination: {
      type: Object,
      default: function() {
        return {}
      }
    },
    configBtn: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      _self: null,  // 组件实例引用，在 mounted 中设置
      erdform: null,
      tabElement: null,
      observeresize: null,
      tableKey: 'table_key' + parseInt(Math.random() * 1e10),
      tableId: 'table_' + parseInt(Math.random() * 1e10),
      tableContainer: 'tab_contaniner_' + parseInt(Math.random() * 1e10),
      erd: null,
      tableHeight: 300,
      ispaginstion: false,
      slotState: false,
      timer: null,
      tableData: [],
      multipleSelection: [], // 当前选中的所有数据
      selectionsByPage: {}, // 按分页缓存每一页的选择的数据，注意在翻页时数据变化导致的问题，如原第一页的数据由于总数据变化变为了第二页的数据，如若不特殊处理，则导致选择的数据有重复的问题，需要设置唯一键值rowkey
      isInitChange: false, // 标志是否由数据变化导致的选项清空
      loadingStatus: false, // 加载状态loading
      onpagination: Object.assign({}, {
        pageSize: 10,
        current: 1,
        total: 0,
        pageSizes: [10, 20, 50, 100]
      }, (typeof this.paginationLayout == "function" ? (this.paginationLayout() || {}) : {}), this.pagination)
    }
  },
  computed: {
    ancestorEl() {
      let el = this.$el?.parentElement
      while (el && el !== document.body) {
        const style = getComputedStyle(el)
        if (style.height && style.height !== 'auto') return el
        el = el.parentElement
      }
      return null
    },
    // 判断是否配置化接口实例
    isRequesConf() {
      if ((this.options.apiParams && Object.prototype.toString.call(this.options.apiParams).slice(8, -1) === 'Object' && Object.keys(this.options.apiParams).length) && this.options.apiParams.url) {
        return true
      }
      return false
    },
    // 独立的表格入参
    getListEntry() {
      if (this.options.entryQuery && Object.prototype.toString.call(this.options.entryQuery).slice(8, -1) === 'Object' && Object.keys(this.options.entryQuery).length) {
        return this.options.entryQuery
      } else {
        return {}
      }
    },
    // 表格查询输出字段配置
    configTablefield() {
      if (
        this.options.configTableOut &&
        Object.prototype.toString.call(this.options.configTableOut).slice(8, -1) === 'Object' &&
        Object.keys(this.options.configTableOut).length &&
        this.checkQueryFields(this.options.configTableOut)
      ) {
        return this.options.configTableOut
      } else {
        if (this.configQueryfieldOutput && typeof this.configQueryfieldOutput === 'function') {
          const configFields = this.configQueryfieldOutput({
            total: 'records',
            pageSize: 'pageSize',
            current: 'pageNo',
            tableData: 'rows'
          })
          const isPass = this.checkQueryFields(configFields)
          if (isPass) {
            return configFields
          } else {
            return {
              total: 'records',
              pageSize: 'pageSize',
              current: 'pageNo',
              tableData: 'rows'
            }
          }
        } else {
          return {
            total: 'records',
            pageSize: 'pageSize',
            current: 'pageNo',
            tableData: 'rows'
          }
        }
      }
    },
    getDataSouce() {
      // if(Array.isArray(this.tableData) && this.tableData.length) {
      //   this.$emit('update:dataSource', this.tableData)
      // }
      return this.tableData
    },
    // 外部请求实例传入
    isHttpRequest() {
      if (this.options?.httpRequest && typeof this.options.httpRequest === 'function') {
        return true
      }
      return false
    },
    // 表单实例
    isFormInstace() {
      /* const formInstace = this.$children.find(it => {
        return it.$el.classList.includes('ly-form')
      })

      if (formInstace) {
        return formInstace
      }
      return {} */
      const findForm = (children) => {
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          if (child.$options.name === 'EsForm') return child
          const form = findForm(child.$children)
          if (form) return form
        }
        return null
      }
      return findForm(this.$children) || {}
    },
    // 是否存在默认插槽
    defaultSlots() {
      return !!this.$slots.default?.length
    },
    // 表格高度类型
    heightType() {
      if (this.options.heightType && typeof this.options.heightType === 'string') {
        return this.options.heightType
      }
      return 'max-height'
    },

    showVisible() {
      if (this.getVisibleShow && typeof this.getVisibleShow === 'function') {
        return this.getVisibleShow()
      }
      return this.getVisibleShow
    },
    // 表格高度大小设置
    tabHeight() {
      if (this.attrs.tabHeight && typeof this.attrs.tabHeight === 'number') {
        return this.attrs.tabHeight + 'px'
      }
      return '100%'
    },

    slotSyles() {
      if (this.headBarClass) {
        return {
          type: typeof this.headBarClass === 'string' ? 'String' : 'object',
          value: this.headBarClass
        }
      }
      return {
        type: 'String',
        value: ''
      }
    },
    // 过滤隐藏列
    columnsfilter() {
      setTimeout(() => {
        this.tableKey = 'table_key' + parseInt(Math.random() * 1e10)
      }, 100)
      return this.columns?.filter(item => !item.hidCol)
    },
    // 表格属性对象
    attrs() {
      const heightObject = {}
      const { httpRequest, configTableOut, listenToCallBack, ...options } = this.options
      const { align, ...attr } = this.columnbindAttr(Object.assign({}, defaultOptions, options, heightObject))
      if (!attr.configBtn || !Array.isArray(attr.configBtn) || !attr.configBtn.length) {
        attr.configBtn = this.configBtn || []
      }
      return { ...attr, ...this.$attrs }
    },
    // loading 加载状态
    loadStatus() {
      if (this?.attrs?.loading || this.loadingStatus) {
        if (!this?.attrs?.loading && typeof this.attrs.loading === 'boolean') {
          this.$emit('update:options.loading', true)
        }
        return true
      } else {
        if (this?.attrs?.loading && typeof this.attrs.loading === 'boolean') {
          this.$emit('update:options.loading', false)
        }
        return false
      }
    },
    isListenToCallBack() {
      if (this.options.listenToCallBack && Object.prototype.toString.call(this.options.listenToCallBack).slice(8, -1) === 'Object' && Object.keys(this.options.listenToCallBack).length) {
        return this.options.listenToCallBack
      }
      return false
    },
    // 表格分页布局样式
    layout() {
      // const result = ['prev, pager, next, jumper, sizes, ->, total'] // ['total', 'prev', 'pager', 'next', 'jumper']
      // return result.join(',')
      // const result = ['prev', 'pager', 'next', 'jumper', 'sizes', '->', 'total']
      // return result.join(',')
      return 'total, sizes, prev, pager, next, jumper'
    }
  },
  watch: {
    // 用于dialog 弹出时初始化请求接口
    showVisible: {
      async handler(val, oldval) {
        if (val && val !== oldval) {
          if (this.options.actionUrl) {
            if (this.$httpRequest || this.isHttpRequest) {
              await this.httpRquestInstace().catch(() => {})
            }
          }
          console.log('visble///', val)
          if (this.$refs[this.tableId]?.doLayout) {
            this.$refs[this.tableId].doLayout()
          } else {
            this.$nextTick(() => {
              this.$refs[this.tableId]?.doLayout()
            })
          }
        // this.tableKey = 'table_key' + parseInt(Math.random() * 1e10)
        }
      },
      deep: true,
      immediate: true
    },

    pagination: {
      handler(val, oldval) {
        this.onpagination = Object.assign({}, this.onpagination, val)
        if (val && val.total !== undefined) {
          this.ispaginstion = true
        }
      },
      deep: true,
      immediate: true
    },
    // 监听数据变化，默认触发选中数据
    dataSource(val) {
      this.isInitChange = true
      if (this.options.cachePageSelection) {
        this.$nextTick(() => {
          this.handleSelectData(val)
          this.isInitChange = false
        })
      } else {
        this.clearSelection()
        this.isInitChange = false
      }
    },
    tableData: {
      handler(val, old) {
        if (Array.isArray(val)) {
          this.$emit('update:dataSource', this.tableData)
        }
      },
      deep: true
    }
  },
  mounted() {
    this._self = this
    this.elementResize()
    this.headerBarResize()
    this.$refs[this.tableId]?.doLayout()
    this.addKeydown()
  },
  created() {
    for (const c in Table.methods) { // 拷贝继承table方法到父组件
      this[c] = function(...params) {
        this.$refs[this.tableId][c](...params)
      }.bind(this)
    }
    this.isInitRunQuery()
  },
  beforeUnmount() {
    this.erd.unobserve(this.$refs[this.tableContainer], this.resizeObservers)
    if (this.erdform) {
      this.erdform.unobserve(this.$refs.headBar, this.resizeBar)
    }
    if (this.observeresize) {
      this.observeresize.cancel()
    }
    this.removeKeydown()
  },
  unmounted() {
  },
  updated() {
    this.$refs[this.tableId]?.doLayout()
  },
  activated() {
    this.elementResize()
    this.headerBarResize()
    this.addKeydown()
  },
  deactivated() {
    this.erd.unobserve(this.$refs[this.tableContainer], this.resizeObservers)
    if (this.erdform) {
      this.erdform.unobserve(this.$refs.headBar, this.resizeBar)
    }
    if (this.observeresize) {
      this.observeresize.cancel()
    }
    this.removeKeydown()
  },
  methods: {
    checkQueryFields(obj) {
      const checkListkey = ['total', 'pageSize', 'current', 'tableData']
      if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
        return Object.keys(obj).every((it) => {
          return checkListkey.find((its) => its === it) && obj[it] && typeof obj[it] === 'string'
        })
      }
      return false
    },
    addKeydown() {
      this.$nextTick(() => {
        // const tabDom = document.getElementById(this.tableId).getElementsByClassName('el-table__body-wrapper')[0]
      // console.log('tableID///', tabDom)
        document.addEventListener('keydown', this.tableKeydown)
      })
    },
    removeKeydown() {
      this.$nextTick(() => {
        document.removeEventListener('keydown', this.tableKeydown)
      })
    },
    tableKeydown(event) {
      const curel = document.activeElement // 当前元素
      const curcellIndex = document.activeElement?.parentNode?.parentNode?.cellIndex // 当前元素行单元格索引
      const curRowIndex = document.activeElement?.parentNode?.parentNode?.parentNode?.sectionRowIndex // 当前元素行的索引；
      const curtbody = document.activeElement?.parentNode?.parentNode?.parentNode?.parentNode?.children // 当前tbody内容的整个表单

      if (event && event.keyCode === 9) { // 检查按键是否是Tab
        if (event.target.nodeName === 'TEXTAREA' || event.target.nodeName === 'INPUT') {
          // const activeRow = document.activeElement.parentNode.parentNode.parentNode;
          console.log('Tab///', curRowIndex)
        } else {
          event.preventDefault()
        }
      }
    },

    // 表格回调集合增强处理
    getListenToCallBack(eventName, params) {
      const eventNameList = [
        { eventName: 'brcb', isReturn: true }, // 查询前参数过滤或处理
        { eventName: 'qrcb', isReturn: false } // 查询respons回调
      ]
      const hasEventNameIndex = eventNameList.findIndex((it) => it.eventName === eventName)
      if (this.isListenToCallBack && this.isListenToCallBack[eventName] && hasEventNameIndex !== -1) {
        const callObj = eventNameList[hasEventNameIndex]
        if (callObj.isReturn) {
          return this.isListenToCallBack[eventName](params)
        } else {
          this.isListenToCallBack[eventName](params)
        }
      }
    },
    isInitRunQuery() {
      if (this.options.isInitRun && (this.$httpRequest || this.isHttpRequest)) {
        this.httpRquestInstace({}).catch(() => {
          // 忽略初始查询错误
        })
      }
    },
    findValueByKey(obj, key, depth = 0) {
      // 最多递归三层
      if (depth > 3) {
        return undefined
      }
      
      // 先保存当前层找到的值
      // eslint-disable-next-line no-prototype-builtins
      const currentValue = Object.prototype.toString.call(obj).slice(8, -1) === 'Object' && obj.hasOwnProperty(key) 
        ? obj[key] 
        : undefined
      
      // 遍历子对象，查找更深的 key
      for (const prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop) && Object.prototype.toString.call(obj[prop]).slice(8, -1) === 'Object') {
          const deepValue = this.findValueByKey(obj[prop], key, depth + 1)
          // 如果在子对象中找到，返回更深层的值
          if (deepValue !== undefined) {
            return deepValue
          }
        }
      }
      
      // 子对象中没找到，返回当前层的值
      return currentValue
    },
    // 配置分页和列表属性
    formatConfigout(row = {}, keyList = []) {
      if (this.configTablefield && Object.prototype.toString.call(this.configTablefield).slice(8, -1) === 'Object' && Object.keys(this.configTablefield).length) {
        Object.entries(this.configTablefield).forEach(([key, value]) => {
          const isKeyUsed = keyList.includes(key)

          if (isKeyUsed) {
            const rowData = this.findValueByKey(row, value)
            if (key === 'tableData') {
              console.log('tableData///', this.findValueByKey(row, value))
              this.tableData = Array.isArray(rowData) ? rowData : []
            } else {
              console.log('total///', rowData, key, value)
              this.onpagination[key] = parseInt(rowData) || 0
              // paginationConfig.value[key] = typeof rowData === 'number' ? rowData : parseInt(rowData) || 0
            }
          }
        })

        /* for(const [key, value] of Object.entries(this.configTablefield)) {
               const iskeyUse = keyList.findIndex(it => it === key)
               if(iskeyUse !== -1) {
                if( key !== 'tableData') {
                  this.onpagination[key] = row[value]
                } else {
                   if(key === 'tableData') {
                     this.tableData = Array.isArray(row[value]) ? row[value] : []
                   }
                }
               }
             } */
      } else { // 自行填值匹配输出
        keyList.forEach(it => {
          if (it === 'tableData') {
            this.tableData = row['rows']
          } else {
            const opt = {
              pageSize: (key) => {
                this.onpagination[key] = row[key] || 10
              },
              current: (key) => {
                this.onpagination[key] = row[key] || 1
              },
              total: (key) => {
                this.onpagination[key] = row[key] || 0
              }
            }
            if (opt[it]) {
              opt[it](key)
            }
          }
        })
      }
    },
    queryTableListMethod(params, options) {
      // 查询列表实例方法
      const { success, fail, ..._params } = options || {}
      if (this.options.actionUrl || (this.options.apiParams && Object.prototype.toString.call(this.options.apiParams).slice(8, -1) === 'Object' && Object.keys(this.options.apiParams).length)) {
        const formInstance = this.getFormInstace()
        const formData = Object.keys(formInstance).length ? (formInstance?.model || {}) : this.getListEntry || {}
        const fnParams = this.getListenToCallBack('brcb', { ...formData, ...params, ...(this.options?.apiParams?.model || {}) })
        const _params_ = fnParams && Object.prototype.toString.call(fnParams).slice(8, -1) === 'Object' ? fnParams : { ...formData, ...(this.options?.apiParams?.model || {}), ...params }
       
        if (this.isHttpRequest) {
          // 自定义接口实例
          if (!this.loadingStatus) {
            this.loadingStatus = true
          } else {
            return
          }

          this.options
            .httpRequest({
              url: this.options?.apiParams?.url || this.options?.actionUrl || '',
              formParams: { ..._params_ },
              headers: { ...(this.options?.apiParams?.headers || {}) },
              ...(this.options?.apiParams?.options || {}),
              ..._params
            })
            .then((res) => {
              this.loadingStatus = false
              this.getListenToCallBack('qrcb', res)
              if (typeof success === 'function' && Object.prototype.toString.call(res).slice(8, -1) === 'Object' && Object.keys(res).length) {
                success(res)
              }
            })
            .catch((e) => {
              this.loadingStatus = false
              if (typeof fail === 'function') {
                fail(e)
              }
            })
        } else {
          if (this.$httpRequest) {
            // 插件配置接口实例
            if (!this.loadingStatus) {
              this.loadingStatus = true
            } else {
              return
            }

            this.$httpRequest({
              url: this.options?.apiParams?.url || this.options?.actionUrl || '',
              formParams: { ..._params_ },
              headers: { ...(this.options?.apiParams?.headers || {}) },
              ...(this.options?.apiParams?.options || {}),
              ..._params
            })
              .then((res) => {
                this.loadingStatus = false
                this.getListenToCallBack('qrcb', res)
                if (typeof success === 'function' && Object.prototype.toString.call(res).slice(8, -1) === 'Object' && Object.keys(res).length) {
                  success(res)
                }
              })
              .catch((e) => {
                this.loadingStatus = false
                if (typeof fail === 'function') {
                  fail(e)
                }
              })
          }
        }
      }
    },
    /* queryTableListMethod(params, options) { // 查询列表实例方法
      const _options = options || {}
      const {success, fail, ..._params} = options || {}
      if(this.options.actionUrl) {
           const formData = Object.keys(this.isFormInstace).length ? this.isFormInstace.model : {}
              if(this.isHttpRequest) {
                    if(!this.loadingStatus) {
                      this.loadingStatus = true
                    } else {
                       return
                    }

                    this.options.httpRequest({
                          apiUrl: this.options.actionUrl,
                          contentType: 'application/json',
                          method: 'POST',
                          dataType: '',
                          ..._params,
                          variables: {
                            ...formData,
                            ...params
                          }
                        }).then(res => {
                          this.loadingStatus = false
                          this.getListenToCallBack('qrcb', res)
                          if(typeof success === "function") {
                            success(res)
                          }
                        }).catch(e => {
                          this.loadingStatus = false
                          if(typeof fail === "function") {
                            fail(e)
                          }
                        })
                } else {
                if(this.$httpRequest) {
                  if(!this.loadingStatus) {
                      this.loadingStatus = true
                    } else {
                       return
                    }
                   this.$httpRequest({
                        apiUrl: this.options.actionUrl,
                        contentType: 'application/json',
                        method: 'POST',
                        dataType: '',
                        ..._params,
                        variables: {
                          ...formData,
                          ...params
                        }
                       }).then(res => {
                        this.loadingStatus = false
                        this.getListenToCallBack('qrcb', res)
                        if(typeof success === "function") {
                          success(res)
                        }
                       }).catch(e => {
                        this.loadingStatus = false
                        if(typeof fail === "function") {
                          fail(e)
                        }
                       })
                }
              }
        }
    }, */
    // 表格列表查询实例
    httpRquestInstace(model) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.onpagination.current = 1
          this.queryTableListMethod(({ pageIndex: this.onpagination.current, pageSize: this.onpagination.pageSize, ...(model || {}) }), {
            success: (res) => {
              console.log('res///Data', res)
              this.formatConfigout(res, ['total', 'tableData'])
              this.$emit('update:pagination', this.onpagination)
              resolve(res)
            },
            fail: (err) => {
              reject(err)
            }
          })
        })
      })
    },

    // 分页自动化查询
    changePageIndexRquest(val) {
      this.$nextTick(() => {
        this.queryTableListMethod(({ pageIndex: this.onpagination.current, pageSize: this.onpagination.pageSize }), {
          success: (res) => {
            this.formatConfigout(res, ['total', 'tableData'])
            this.$emit('update:pagination', this.onpagination)
            this.$emit('pagination-current-change', this.onpagination)
          }
        })
      })
    },

    changePageSizeRquest(size) {
      this.$nextTick(() => {
        this.queryTableListMethod(({ pageIndex: this.onpagination.current, pageSize: this.onpagination.pageSize }), {
          success: (res) => {
            this.formatConfigout(res, ['total', 'tableData'])
            this.$emit('update:pagination', this.onpagination)
            this.$emit('size-change', this.onpagination, size)
          }
        })
      })
    },

    resizeObservers(element) {
      if (!this.observeresize) {
        this.observeresize = this.throttle(
          this.resize,
          300,
          {
            leading: false,
            trailing: true
          }
        )
      }
      this.observeresize.call(this, element)
    },
    // 触发选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs[this.tableId]?.toggleRowSelection(row)
        })
      } else {
        this.$refs[this.tableId]?.clearSelection()
      }
    },
    // 清空选项
    clearAllSelection() {
      this.multipleSelection = []
      this.selectionsByPage = {}
      this.$refs[this.tableId]?.clearSelection()
    },
    // 选项发生变化事件
    handleSelectionChange(val) {
      // 配置了缓存每页的选择项，即翻页不清除上一页的选择项
      if (this.options.cachePageSelection) {
        if (this.isInitChange) {
          return
        }
        this.selectionsByPage[this.onpagination.current] = val
        // 缓存当前所有的选择项数据
        let multipleSelection = []
        Object.keys(this.selectionsByPage).map((page) => {
          const pageSelections = this.selectionsByPage[page] || []
          const { rowkey } = this.options
          // 如果设置了rowkey，则判断去重，否则直接暴力合并所有分页的选择项，因为组件无法根据rowkey确认唯一性
          if (rowkey) {
            const onlyKeyMap = {}
            pageSelections.map((item) => {
              if (!onlyKeyMap[item[rowkey]]) {
                multipleSelection.push(item)
                onlyKeyMap[item[rowkey]] = item
              }
              return item
            })
          } else {
            multipleSelection = multipleSelection.concat(pageSelections)
          }
          return page
        })
        this.multipleSelection = multipleSelection
      } else {
        this.multipleSelection = val
      }
    },
    // 处理默认选中项
    handleSelectData(dataList) {
      const { cachePageSelection, rowkey } = this.options
      // 需要缓存分页选择且存在必要参数rowkey和存在已选择项，则进行判断当前数据有无在选择列表中
      if (dataList?.length && cachePageSelection && rowkey && this.multipleSelection.length) {
        const pageSelecteds = []
        dataList.map((row) => {
          this.multipleSelection.map((selectedRow) => {
            if (row[rowkey] === selectedRow[rowkey]) {
              pageSelecteds.push(row)
            }
          })
        })
        this.toggleSelection(pageSelecteds)
      }
    },
    // 表格实例
    refsInstance() {
      return this.$refs[this.tableId]
    },
    throttle: function(fn, interval, options = { leading: true, trailing: false }) {
      // 1.记录上一次的开始时间
      const { leading, trailing, resultCallback } = options
      let lastTime = 0
      let timer = null

      // 2.事件触发时, 真正执行的函数
      const _throttle = function(...args) {
        return new Promise((resolve, reject) => {
          // 2.1.获取当前事件触发时的时间
          const nowTime = new Date().getTime()
          if (!lastTime && !leading) lastTime = nowTime

          // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
          const remainTime = interval - (nowTime - lastTime)
          if (remainTime <= 0) {
            if (timer) {
              clearTimeout(timer)
              timer = null
            }

            // 2.3.真正触发函数
            const result = fn.apply(this, args)
            resolve(result)
            // 2.4.保留上次触发的时间
            lastTime = nowTime
            return
          }

          if (trailing && !timer) {
            timer = setTimeout(() => {
              timer = null
              lastTime = !leading ? 0 : new Date().getTime()
              const result = fn.apply(this, args)
              resolve(result)
            }, remainTime)
          }
        })
      }

      _throttle.cancel = function() {
        if (timer) clearTimeout(timer)
        timer = null
        lastTime = 0
      }

      return _throttle
    },
    resizeBar(e) {
      if (this.tabElement) {
        this.resize(this.tabElement)
      }
    },
    headerBarResize() { // 表单区域尺寸发生改变，重新计算表格高度
      // this.erdform = elementResizeDetectorMaker()
      this.erdform = new resizeObserver()
      this.erdform.observe(this.$refs.headBar, this.resizeBar)
    },
    elementResize() {
      this.$nextTick(() => {
        //  this.erd = elementResizeDetectorMaker()
        this.erd = new resizeObserver()
        this.erd.observe(this.$refs[this.tableContainer], this.resizeObservers)

      //   this.erd.listenTo(
      //  this.$refs[this.tableContainer],
      //   this.resizeObservers
      //  )
      })
    },
    getOccupiedHeight(el) {
      if (!el) return 0
      const rect = el.getBoundingClientRect()
      return rect.height || 0
    },
    /*
    resize(element) {
      if (!element) {
        return
      }
      this.tabElement = element
      const tabContainer = element.height || element.offsetHeight
      const paginationHeight = this.$refs.pagination ? this.$refs.pagination.offsetHeight : 0
      if (this.$refs.headBar) {
        const headBar = ((ele) => {
          const headbarAttr = {
            headBarHeight: 0,
            slotState: false
          }
          if (ele && ele.offsetHeight > 0) {
            headbarAttr.slotState = true
          }
          headbarAttr.headBarHeight = ele.offsetHeight
          return headbarAttr
        })(this.$refs.headBar)
        this.slotState = headBar.slotState
        const tbBtnHeight = this.$refs?.tbBtn?.$el?.offsetHeight || 0

        const parent = this.$refs[this.tableContainer]
        const headBars = this.$refs.headBar

        const parentStyle = window.getComputedStyle(parent)
        const headBarStyle = window.getComputedStyle(headBars)
        const containerPadding = parseFloat(parentStyle.paddingTop) +
                             parseFloat(parentStyle.paddingBottom)
        const btnSlotMargin = parseFloat(headBarStyle.marginBottom) || 0
        const scrollBarWidth = parent.offsetWidth - parent.clientWidth > 0 ? 8 : 0

        this.tableHeight = Math.max(
          Math.floor(tabContainer) - Math.round(paginationHeight + headBar.headBarHeight + tbBtnHeight + containerPadding + btnSlotMargin + scrollBarWidth) - 4,
          180 // 最小保底高
        )
      }
    }, */
    /*
    resize(element) {
      if (!element) {
        return
      }
      this.tabElement = element
      const tabContainer = element.height || element.offsetHeight
      const paginationHeight = this.$refs.pagination ? this.$refs.pagination.offsetHeight : 0
      if (this.$refs.headBar) {
        const headBar = ((ele) => {
          const headbarAttr = {
            headBarHeight: 0,
            slotState: false
          }
          if (ele && ele.offsetHeight > 0) {
            headbarAttr.slotState = true
          }
          headbarAttr.headBarHeight = ele.offsetHeight
          return headbarAttr
        })(this.$refs.headBar)
        this.slotState = headBar.slotState
        const tbBtnHeight = this.$refs?.tbBtn?.$el?.offsetHeight || 0

        const parent = this.$refs.tableBody
        const headBars = this.$refs.headBar

        const parentStyle = window.getComputedStyle(parent)
        const headBarStyle = window.getComputedStyle(headBars)
        const containerPadding = parseFloat(parentStyle.paddingTop) +
                             parseFloat(parentStyle.paddingBottom)
        const btnSlotMargin = parseFloat(headBarStyle.marginBottom) || 0
        const scrollBarWidth = parent.offsetWidth - parent.clientWidth > 0 ? 8 : 0

        const tbMaxHeight = Math.floor(tabContainer) - Math.round(paginationHeight + headBar.headBarHeight + tbBtnHeight + btnSlotMargin + containerPadding)
        this.tableHeight = tbMaxHeight
      }
    },  */
    resize(sizeInfo) {
      // sizeInfo 是 { width, height } 对象，不是 DOM 元素
      this.tabElement = sizeInfo

      // 使用 $refs 获取实际 DOM 元素
      const containerEl = this.$refs[this.tableContainer]
      if (!containerEl) return

      // 获取 table_containers 的实际可用高度（这是整个内容区域的高度）
      const tableContainers = containerEl.querySelector('.table_containers')
      if (!tableContainers) return

      const availableHeight = tableContainers.clientHeight
      if (!availableHeight) return

      // 计算 headBar 占用的总高度（包括 margin）
      let headBarTotalHeight = 0
      if (this.$refs.headBar) {
        const headBarHeight = this.$refs.headBar.offsetHeight
        const headBarStyle = window.getComputedStyle(this.$refs.headBar)
        const headBarMargin = parseFloat(headBarStyle.marginTop) + parseFloat(headBarStyle.marginBottom)
        headBarTotalHeight = headBarHeight + headBarMargin
        this.slotState = headBarHeight > 0
      }

      // tableBody 的可用高度 = table_containers 高度 - headBar 占用
      const tableBodyAvailableHeight = availableHeight - headBarTotalHeight

      // 获取 tableBody 自身的 padding（这部分空间 el-table 不能用）
      let tableBodyPadding = 0
      if (this.$refs.tableBody) {
        const tableBodyStyle = window.getComputedStyle(this.$refs.tableBody)
        tableBodyPadding = parseFloat(tableBodyStyle.paddingTop) + parseFloat(tableBodyStyle.paddingBottom)
      }

      // table-btns 的高度
      const tbBtnHeight = this.$refs?.tbBtn?.$el?.offsetHeight || 0

      // pagination 的高度（包括 margin）
      let paginationTotalHeight = 0
      if (this.$refs.pagination) {
        const paginationHeight = this.$refs.pagination.offsetHeight
        const paginationStyle = window.getComputedStyle(this.$refs.pagination)
        const paginationMargin = parseFloat(paginationStyle.marginTop) + parseFloat(paginationStyle.marginBottom)
        paginationTotalHeight = paginationHeight + paginationMargin
      }

      // el-table 的 border 占用（如果设置了 border 属性）
      const borderWidth = this.attrs.border ? 0 : 0

      // 计算 el-table 应该设置的高度
      const tableHeight = tableBodyAvailableHeight -
                         tableBodyPadding -
                         tbBtnHeight -
                         paginationTotalHeight -
                         borderWidth -
                         0 // 额外安全余量，防止舍入误差

      this.tableHeight = Math.max(Math.floor(tableHeight), 100)
      console.log('tableHeight计算结果: ', tableHeight)
    },
    firstWordUpperCase(str) {
      return str.toLowerCase().replace(/(\s|^)[a-z]/g, function(char) {
        return char.toUpperCase()
      })
    },
    columnbindAttr(cols) {
      const options = {}
      for (const t in cols) {
        if (t === 'groups' || t === 'scopedSlots' || t === 'render') {
          continue
        } else if (t.includes('-')) {
          let newkey = ''
          const key = t.split('-')
          for (let j = 0; j < key.length; j++) {
            if (j !== 0) {
              newkey += this.firstWordUpperCase(key[j])
            } else {
              newkey += key[j]
            }
          }
          options[newkey] = cols[t]
        } else if (t === 'key') {
          options.prop = cols[t]
          options[t] = cols[t]
        } else {
          options[t] = cols[t]
        }
      }
      if (!options.align) {
        options.align = 'center'
      }
      return options
    },
    handleSizeChange(size) {
      this.onpagination.pageSize = size || 10
      this.onpagination.current = 1
      if (Object.keys(this.getFormInstace()).length && this.isRequesConf) {
        this.changePageSizeRquest(size)
      } else {
        this.$emit('update:pagination', this.onpagination)
        this.$emit('size-change', this.onpagination, size)
      }
    },
    getFormInstace() {
      const findForm = (children) => {
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          if (child.$options.name === 'EsForm') return child
          const form = findForm(child.$children)
          if (form) return form
        }
        return null
      }
      return findForm(this.$children) || {}
    },
    handleIndexChange(val) {
      console.log('changeIndex', this.getFormInstace(), this.$slots.default)
      if (Object.keys(this.getFormInstace()).length && this.isRequesConf) {
        this.changePageIndexRquest(val)
      } else {
        this.$emit('update:pagination', this.onpagination)
        this.$emit('pagination-current-change', this.onpagination)
      }
    },
    changeTableSort(column) {
      this.$emit('change-table-sort', column)
    }
  }
}
</script>
<style lang="scss" scoped>

  .el-es_tables{
    height: auto;
    ::v-deep .el-table__body-wrapper{
       height: auto;
    }
  }
  .table_component{
    // height: calc(100% - 1px) !important;
    width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  // overflow: hidden;
  }
  .table_containers{
    flex: 1;
    width:100%;
    min-height: 0; /* 解决flex子元素高度撑开父元素 */
  }
  .pagination_page{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;   // 分页栏不压缩
    ::v-deep .el-input .el-input__inner{
           height: 28px ;
          line-height: 28px ;
    }
    ::v-deep .el-pagination .el-pagination__total  {
          height: 28px;
          line-height: 28px;
      }
  }
  .slotClass {
     /* padding: 10px 0px; */
  }
  .btn-slot{
    width: 100%;
    /* padding-bottom: 10px;
    border: 1px solid transparent; */
    .headerBar {
      box-sizing: border-box;
      background-color: #fff;
      // padding: 0px 0px 8px 0px;
      padding: 0px 0px 0px 0px;
      border-radius: 6px;

      ::v-deep .elparent-form-item--small.elparent-form-item {
       // margin-bottom: 16px;
      }
      ::v-deep .elparent-form-item--small .elparent-form-item__label {
      //   line-height: 1.57;
      // //  padding: 0 0 8px;
      //   min-height: 30px;
        box-sizing: border-box;
      }
    }
  }
  .tableContainer {
    background-color: #fff;
    // padding: 8px;
    // padding: 24px 24px 8px;
   // border-radius: 6px;
    // margin-top: 16px;

    ::v-deep .elparent-table__empty-block {
      width: 100% !important;
      margin: 32px 0;
      font-size: 14px;
      line-height: 1.5715;
      .elparent-table__empty-text{
      width: auto !important;
   }
       .ant-empty-image {
        height: 40px;
        margin-bottom: 8px;
        .ant-empty-img-simple-ellipse {
          fill: #f5f5f5;
        }
        .ant-empty-img-simple-g {
          stroke: #d9d9d9;
        }
        .ant-empty-img-simple-path {
          fill: #fafafa;
        }
      }
      .ant-empty-description {
        line-height: 1.5715;
        color: rgba(0,0,0,.25);
      }
    }
    ::v-deep .elparent-tag {
      height: 20px;
      padding: 0 7px;
      line-height: 20px;
      background: #fafafa;
      border: none;
      border-radius: 4px;
      &.elparent-tag--info {
        color: rgba(0,0,0,.85);
      }
      &.elparent-tag--success {
        color: #52c41a;
        background: #f6ffed;
        border-color: #b7eb8f;
      }
    }
  }
</style>
