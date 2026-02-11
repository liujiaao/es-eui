<template>
  <el-form
    :ref="refs"
    v-bind="fromProps"
    class="es-form"
  >
    <div class="flex-center">
      <el-row
        v-bind="rowLayout"
      >
        <template v-for="(item, index) in formItem">
          <el-col v-show="!item.isfold" :key="item.prop" :span="item.span">
            <el-form-item
              :label="item.label"
              v-bind="item.formItemOptions || {}"
              :prop="item.prop"
            >
              <template v-if="item.formtype">
                <RenderDom
                  :row="item"
                  :render="formInputComponents(item)"
                  :index="index"
                  :model="model"
                />
                <!-- <el-input clearable style="width:100%"  maxLength={15} v-model="model[item.prop]" placeholder="请输入" /> -->
              </template>
              <template v-else>
                <RenderDom
                  :row="item"
                  :render="item.render"
                  :index="index"
                  :model="model"
                />
              </template>

            </el-form-item>
          </el-col>
        </template>
        <template v-if="!isBtnHiden">
          <template v-if="isRenderBtn">
            <RenderBtn
              :row="{isfold, folded, getBtnColSpan, getRowColsAlgorithm, changefolded, refsForm: this.formInstance}"
              :form-model="model"
              :form-item-list="formItem"
              :render="renderBtn"
            />
          </template>
          <el-col v-else :span="btnColSpanRow ? 24 :getBtnColSpan">
            <div v-if="btnColSpanRow && configBtn.length" class="buttonOperate leftRightBtn">
              <div class="btn-left">
                <el-form-item label-width="0px">
                  <el-button
                    v-for="(it,inx) in colRightLeftList.colLeftBtn"
                    :key="it.key || inx"
                    v-bind="it"
                    :disabled="typeof it.disabled === 'function' ? (it.disabled() || false) : it.disabled || false"
                    @click="() =>{
                      clickBtn(it)
                    }"
                  >{{ it.name }}</el-button>
                </el-form-item>
              </div>
              <div class="btn-right">
                <el-form-item
                  label-width="0px"
                >
                  <el-button
                    v-for="(it,inx) in colRightLeftList.colRightBtn"
                    :key="it.key || inx"
                    v-bind="it"
                    :disabled="typeof it.disabled === 'function' ? (it.disabled() || false) : it.disabled || false"
                    @click="() => {
                      clickBtn(it)
                    }"
                  >{{ it.name }}</el-button>
                  <el-button
                    v-if="isfold"
                    type="text"
                    :icon="folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                    style="padding-left: 0; border: none; min-width: 50px;"
                    @click="changefolded"
                  >
                    {{ folded ? '展开' : '收起' }}
                  </el-button>
                </el-form-item>
              </div>
            </div>
            <el-form-item
              v-else
              :label="' '"
              :label-width="fromProps.labelBtnWidth ? fromProps.labelBtnWidth : fromProps.labelWidth"
              :class="{formItemCols: (getBtnColSpan === 24)}"
            >
              <div class="buttonOperate" :style="{ 'text-align': getBtnColSpan === 24 ? 'right' : 'left' }">
                <template v-if="configBtn.length">
                  <el-button
                    v-for="(it,inx) in configBtn"
                    :key="it.key || inx"
                    v-bind="it"
                    :disabled="typeof it.disabled === 'function' ? (it.disabled() || false) : it.disabled || false"
                    @click="() => it.onClick ? it.onClick($refs[refs], model) : it.click($refs[refs], model)"
                  >{{ it.name }}</el-button>
                </template>
                <!-- <template v-else>
                  <el-button
                    type="primary"
                    @click="confirm"
                  >
                    查询
                  </el-button>
                  <el-button
                    @click="reset"
                  >
                    重置
                  </el-button>
                </template> -->
                <el-button
                  v-if="isfold"
                  type="text"
                  :icon="folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
                  style="padding-left: 0; border: none; min-width: 50px;"
                  @click="changefolded"
                >
                  {{ folded ? '展开' : '收起' }}
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-form>
</template>
<script>

import { Form } from 'element-ui'

export default {
  name: 'EsForm',
  components: {
    RenderBtn: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        formItemList: Array,
        formModel: Object,
        render: Function,
        ellipsis: Boolean
      },

      /**
         * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
         * @param {Object} ctx - 渲染的节点的this对象
         * @argument 传递参数 row index
         */
      render(createElement, ctx) {
        const { formItemList, formModel, row } = ctx.props
        const renderContent = ctx.props.render(row, formModel, formItemList) || ''
        return typeof renderContent === 'string' ? createElement('span', renderContent) : renderContent
      }
    },
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        datakey: String,
        render: Function,
        model: Object,
        ellipsis: Boolean
      },
      /**
         * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
         * @param {Object} ctx - 渲染的节点的this对象
         * @argument 传递参数 row index
         */
      render(createElement, ctx) {
        const { row, index, model } = ctx.props
        const renderContent = ctx.props.render(createElement, (model || row), { ...row, index }) || ''
        return typeof renderContent === 'string' ? createElement('span', renderContent) : renderContent
      }
    }
  },
  inject: {
    bodyFormInstantce: {
      type: Function,
      default: () => {}
    },
    getTableInstantce: {
      type: [Object, Function],
      default: function() {
        return {}
      }
    }
  },
  props: {
    ...Form.props,
    layoutFormProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    formItemList: {
      type: Array,
      default: function() {
        return []
      }
    },
    model: {
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
    },
    renderBtn: {
      type: [Function, Boolean],
      default: false
    },
    btnColSpanRow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      refs: 'form_' + parseInt(Math.random() * 1e10),
      folded: false,
      formInstance: {},
      formItemRowsList: this.formItemList
    }
  },
  computed: {
    getTableInstant() {
      if (this.getTableInstantce && typeof this.getTableInstantce === 'function') {
        return this.getTableInstantce()
      }
      return this.getTableInstantce
    },
    getSetOptionsStatus() {
      if (this.layoutFormProps?.setOptions && this.isParentTable) {
        return true
      }
      return false
    },
    isParentTable() {
      if (this.$parent.$el.className.includes('table_component')) {
        return true
      }
      return false
    },
    colRightLeftList() {
      return {
        colRightBtn: this.configBtn?.filter(it => it.direction === 'right' || !it.direction) || [],
        colLeftBtn: this.configBtn?.filter(it => it.direction === 'left') || []
      }
    },
    formItemComponents() {
      const components = {}
      this.formItemList.forEach((el) => {
        if (el.components && Object.keys(el.components).length) {
          for (const [key, value] of Object.entries(el.components)) {
            components[key] = value
          }
        }
      })
      return components
    },
    formItemListfilter() { // 表单控件参数过滤
      return this.formItemList.map((it) => {
        const item = { ...it }
        if (!item.span) {
          item.span = 6
        }
        // 处理 prop 为函数的情况，每次计算时都执行
        if (item.prop && typeof item.prop === 'function') {
          item.prop = item.prop()
        }
        return item
      }).filter((it) => {
        if (it.isHiden && typeof it.isHiden === 'function') {
          const status = it.isHiden(this.model, it, this.fromProps)
          if (status) {
            return false
          }
          return true
        }
        return true
      })
    },
    isBtnHiden() {
      return this.layoutFormProps?.fromLayProps?.isBtnHiden || false
    },
    rowLayout() { // row 栅格布局参数
      const rowLayoutProps = this.layoutFormProps?.rowLayProps || {}
         if(!rowLayoutProps.gutter){
             rowLayoutProps.gutter = 10
         }
      return rowLayoutProps
    },
    formLayout() { // form 布局参数
      return this.layoutFormProps?.fromLayProps || {}
    },
    fromProps() { // from表单属性
      const formLayout = this.formLayout
            if(!formLayout.labelWidth) {
              formLayout.labelWidth = 'auto'
            }
            if(!formLayout.size) {
               formLayout.size = 'mini'
            }
      return { ...formLayout, model: this.model }
    },
    getBtnColSpan() { // 按钮折行计算方式
      const { rowNum, columnRow } = this.getRowColsAlgorithm
      const lastColumn = columnRow.length ? (columnRow[rowNum - 1] ? columnRow[rowNum - 1] : columnRow[columnRow.length - 1]) : []
      let totalSpan = 0
      const BtnColSpan = this.layoutFormProps?.fromLayProps?.btnColSpan || 0
      lastColumn.forEach((element) => {
        totalSpan += this.formItemListfilter[element]?.span
      })
      const hasSpan = 24 - totalSpan
      if (!this.folded && BtnColSpan && (BtnColSpan <= hasSpan)) {
        return hasSpan
      }
      return 24
    },
    getRowColsAlgorithm() { // 折行计算方式
      let pre = 0
      const groupArrayList = []
      const columnRows = []
      let rowColIndex = -1

      for (let i = 0; i < this.formItemListfilter.length; i++) {
        const item = this.formItemListfilter[i]
        pre += item.span
        if (pre > 24) {
          if (i === (this.formItemListfilter.length - 1)) {
            const statIndex = columnRows.length ? columnRows[columnRows.length - 1].endIndex : 0
            columnRows.push({ statIndex, endIndex: i })
            if (item.span <= 24) {
              columnRows.push({ statIndex: i, endIndex: i + 1 })
            }
          } else {
            const statIndex = columnRows.length ? columnRows[columnRows.length - 1].endIndex : 0
            const endIndex = (i)
            columnRows.push({ statIndex, endIndex })
          }
          pre = item.span
        } else {
          if (i === (this.formItemListfilter.length - 1)) {
            const statIndex = columnRows.length ? columnRows[columnRows.length - 1].endIndex : 0
            columnRows.push({ statIndex, endIndex: pre < 24 ? i + 1 : i + 1 })
          } else {
            if (pre === 24) {
              const statIndex = columnRows.length ? columnRows[columnRows.length - 1].endIndex : 0
              const endIndex = (i + 1)
              // debugger
              columnRows.push({ statIndex, endIndex })
              pre = 0
            }
          }
        }
      }

      columnRows.forEach(it => {
        groupArrayList.push(this.formItemListfilter.slice(it.statIndex, it.endIndex))
      })

      const columRowIndexs = groupArrayList.map(it => {
        return it.map(its => rowColIndex += 1)
      })

      //  const opt = {
      //     columnRow,
      //     rowNum: columnRow.length,
      //     columnNodeIndex: columnRow.map(it => it[it.length - 1])
      //   }
      const opts = {
        columnRow: columRowIndexs,
        rowNum: columRowIndexs.length,
        columnNodeIndex: columRowIndexs.map(it => it[it.length - 1])
      }
      return opts
    },
    formItem() { // 表单控件折行处理逻辑
      const minFoldRow = this.layoutFormProps?.fromLayProps?.minfoldRows || 0
      // const isMinFoldRow = this.isfold
      const {
        // columnRow,
        columnNodeIndex } = this.getRowColsAlgorithm
      if (this.folded) {
        const lastFoldIndex = columnNodeIndex.length
          ? (
            columnNodeIndex[(minFoldRow - 1) > 0 ? (minFoldRow - 1) : 0]
              ? columnNodeIndex[(minFoldRow - 1) > 0 ? (minFoldRow - 1) : 0]
              : columnNodeIndex[columnNodeIndex.length - 1]
          )
          : 9999

        return this.formItemListfilter.map((it, index) => {
          const item = { ...it }
          if (index > lastFoldIndex) {
            item.isfold = true
          } else {
            item.isfold = false
          }
          return item
        })
      }
      return this.formItemListfilter.map((it) => {
        return { ...it, isfold: false }
      })
    },
    isRenderBtn() { // 自定义按钮渲染
      if (typeof this.renderBtn === 'function') {
        return true
      }
      return false
    },
    isfold() { // 折行状态
      const minFoldRow = this.layoutFormProps?.fromLayProps?.minfoldRows || 0
      const {
        //  columnRow,
        rowNum
        // columnNodeIndex
      } = this.getRowColsAlgorithm

      if (minFoldRow && minFoldRow < rowNum) {
        return true
      }
      return false
    }
  },
  watch: {
    isfold: {
      handler(val) {
        this.folded = val
      },
      immediate: true
    },
    formItemList: {
      async handler(val) {
        const rows = await this.getEveryFormQueryFiled(val)
        this.formItemRowsList = val.map((it) => {
          const reslutApiOption = rows.find((item) => item.prop === it.prop)
          if (reslutApiOption) {
            it.dataOptions = reslutApiOption.listData
          }
          return it
        })
      },
      immediate: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.formInstance = this.refsForm()
    })
  },
  mounted() {
   
  },
  methods: {
    checkQueryFields(obj) {
      const checkListkey = ['total', 'pageSize', 'current', 'listData']
      if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
        return Object.keys(obj).every((it) => {
          return checkListkey.find((its) => its === it) && obj[it] && typeof obj[it] === 'string'
        })
      }
      return false
    },
    // 表单值列表查询输出字段配置
    configFormfield(options = {}) {
      if (
        options.configFormOut &&
        Object.prototype.toString.call(options.configFormOut).slice(8, -1) === 'Object' &&
        Object.keys(options.configFormOut).length &&
        this.checkQueryFields(options.configFormOut)
      ) {
        return options.configFormOut
      } else {
        if (this.fieldFieldOutput && typeof this.fieldFieldOutput === 'function') {
          const configFields = this.fieldFieldOutput({
            total: 'records',
            pageSize: 'pageSize',
            current: 'pageNo',
            listData: 'rows'
          })
          const isPass = this.checkQueryFields(configFields)
          if (isPass) {
            return configFields
          } else {
            return {
              total: 'records',
              pageSize: 'pageSize',
              current: 'pageNo',
              listData: 'rows'
            }
          }
        } else {
          return {
            total: 'records',
            pageSize: 'pageSize',
            current: 'pageNo',
            listData: 'rows'
          }
        }
      }
    },
  /*  findValueByKey(obj, key) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object' && obj.hasOwnProperty(key)) {
        return obj[key]
      }
      for (const prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop) && Object.prototype.toString.call(obj[prop]).slice(8, -1) === 'Object') {
          const value = this.findValueByKey(obj[prop], key)
          if (value !== undefined) {
            return value
          }
        }
      }
      return undefined
    }, */

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
    // 配置值列表属性
    formatConfigout(row = {}, keyList = [], options = {}) {
      const configfieldOut = this.configFormfield(options)
      const configDataOption = {}
      if (configfieldOut && Object.prototype.toString.call(configfieldOut).slice(8, -1) === 'Object' && Object.keys(configfieldOut).length) {
        for (const [key, value] of Object.entries(configfieldOut)) {
          const iskeyUse = keyList.findIndex((it) => it === key)

          if (row[value]) {
            if (iskeyUse !== -1) {
              if (key !== 'listData') {
                configDataOption[key] = typeof row[value] === 'number' ? row[value] : parseInt(row[value]) || 0
              } else {
                if (key === 'listData') {
                  configDataOption[key] = Array.isArray(row[value]) ? row[value] : []
                }
              }
            }
          } else {
            if (iskeyUse !== -1) {
              const resultData = this.findValueByKey(row, value)
              if (key === 'listData') {
                configDataOption[key] = Array.isArray(resultData) ? resultData : []
              } else {
                if (resultData) {
                  configDataOption[key] = typeof resultData === 'number' ? resultData : parseInt(resultData) || 0
                } else {
                  configDataOption[key] = 0
                }
              }
            }
          }
        }
      }
      return configDataOption
    },
    // 表单接口实例
    httpRquestFormInstace(model, options, rows) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.queryTableListMethod(
            { pageIndex: 1, pageSize: 1000, ...(model || {}) },
            {
              ...(options || {}),
              success: (res) => {
                const configRows = this.formatConfigout(res, ['total', 'listData'], rows)
                resolve({ data: res, configRows })
              },
              fail: (err) => {
                reject(err)
              }
            },
            rows
          )
        })
      })
    },
    isListenToCallBack(options) {
      if (options.listenToCallBack && Object.prototype.toString.call(options.listenToCallBack).slice(8, -1) === 'Object' && Object.keys(options.listenToCallBack).length) {
        return options.listenToCallBack
      }
      return false
    },
    getListenToCallBack(eventName, params, option) {
      const eventNameList = [
        { eventName: 'brcb', isReturn: true }, // 查询前参数过滤或处理
        { eventName: 'qrcb', isReturn: false }, // 查询respons回调
        { eventName: 'crtn', isReturn: true }
      ]
      const hasEventNameIndex = eventNameList.findIndex((it) => it.eventName === eventName)
      const isListenToCallBack = this.isListenToCallBack(option)
      if (isListenToCallBack && isListenToCallBack[eventName] && hasEventNameIndex !== -1 && typeof isListenToCallBack[eventName] === 'function') {
        const callObj = eventNameList[hasEventNameIndex]
        if (callObj.isReturn) {
          return isListenToCallBack[eventName](params)
        } else {
          isListenToCallBack[eventName](params)
        }
      }
    },
    queryTableListMethod(params, options, option) {
      // 查询列表实例方法
      const { success, fail, ..._params } = options || {}
      if (options.apiParams && Object.prototype.toString.call(options.apiParams).slice(8, -1) === 'Object' && Object.keys(options.apiParams).length && options.apiParams.url) {
        const formItemParams = this.getListenToCallBack('brcb', { ...params, ...(options?.apiParams?.model || {}) }, option)
        const initFormParams =
          formItemParams && Object.prototype.toString.call(formItemParams).slice(8, -1) === 'Object' ? formItemParams : { ...params, ...(options?.apiParams?.model || {}) }
        if (options.httpRequest && typeof options.httpRequest === 'function') {
          // 自定义接口实例
          options
            .httpRequest({
              url: options?.apiParams?.url,
              headers: { ...(options?.apiParams?.headers || {}) },
              formParams: initFormParams,
              ...(options?.apiParams?.options || {})
            })
            .then((res) => {
              if (typeof success === 'function' && Object.prototype.toString.call(res).slice(8, -1) === 'Object' && Object.keys(res).length) {
                success(res)
              }
            })
            .catch((e) => {
              if (typeof fail === 'function') {
                fail(e)
              }
            })
        } else {
          if (this.$httpRequest) {
            // 插件配置接口实例
            this.$httpRequest({
              url: options?.apiParams?.url,
              headers: { ...(options?.apiParams?.headers || {}) },
              formParams: initFormParams,
              ...(options?.apiParams?.options || {})
            })
              .then((res) => {
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

    /**
     * 自定义包装器：将 Promise 包装为始终返回 { status: 'fulfilled' 或 'rejected', value 或 error } 的对象
     * @param {Promise} promise 需要包装的原始 Promise
     * @returns {Promise} 包装后的 Promise，永远不会 reject
     */
    wrapPromise(promise) {
      return promise
        .then((value) => ({
          status: 'fulfilled', // 标记成功状态
          value: value // 成功时的值
        }))
        .catch((error) => ({
          status: 'rejected', // 标记失败状态
          reason: error // 失败时的原因（错误对象或自定义信息）
        }))
    },
    hasReturnStatement(func) {
      const funcString = func.toString()
      return /return\s+[^;]+;/.test(funcString) || /return;/.test(funcString)
    },
    getfilterRequestLIst(propListKey) {
      if (!propListKey || !propListKey.length) return []
      const requestList = this.formItemList.filter((it) => {
        return propListKey.find((its) => its === it.prop)
      })
      return requestList
    },
    async formItmeRequestInstance(propListKey, options) {
      const newformItemRequestList = this.getfilterRequestLIst(propListKey)
      const rows = await this.getEveryFormQueryFiled(newformItemRequestList)
      this.formItemRowsList = this.formItemRowsList.map((it) => {
        const reslutApiOption = rows.find((item) => item.prop === it.prop)
        if (reslutApiOption) {
          it.dataOptions = reslutApiOption.listData
        }
        return it
      })
    },
    // 初始化值列表请求
    getEveryFormQueryFiled(rowsList) {
      return new Promise(async(resolve, reject) => {
        try {
          const apiUrlList = rowsList.filter((it) => it.apiParams && Object.prototype.toString.call(it.apiParams).slice(8, -1) === 'Object' && it.apiParams.url)
          const apiReulst = []
          // 使用自定义包装器处理所有 Promise
          const wrappedPromises = apiUrlList.map((option) => {
            const { url, headers, model, options } = option.apiParams
            const { httpRequest } = option
            return this.wrapPromise(this.httpRquestFormInstace({ ...(model || {}) }, { httpRequest, apiParams: option.apiParams, ...(options || {}) }, option))
          })
          // 执行所有 Promise 并处理结果
          const results = await Promise.all(wrappedPromises)

          results.forEach((item, index) => {
            if (item.status === 'fulfilled') {
              const { configRows } = item.value
              // getListenToCallBack
              const newListOptions =
                apiUrlList[index]?.listenToCallBack && typeof apiUrlList[index].listenToCallBack?.crtn === 'function' && this.hasReturnStatement(apiUrlList[index].listenToCallBack?.crtn)
                  ? this.getListenToCallBack('crtn', (configRows?.listData || apiUrlList[index]?.dataOptions || []), apiUrlList[index]) // apiUrlList[index].callOptionListFormat(configRows?.listData || apiUrlList[index]?.dataOptions || [])
                  : (configRows?.listData || apiUrlList[index]?.dataOptions || [])// apiUrlList[index].callOptionListFormat

              apiReulst.push({ prop: apiUrlList[index].prop, listData: Array.isArray(newListOptions) ? newListOptions : configRows?.listData || apiUrlList[index]?.dataOptions || [] })
            } else {
              // console.error(`[失败] URL ${urls[index]}: ${result.reason}`);
            }
          })
          resolve(apiReulst)
        } catch (e) {
          resolve([])
        }
      })
    },

    clickBtn(it) {
      if (it.triggerEvent && ['query', 'rest'].indexOf(it.key) !== -1) {
        this.queryTableRequest(this.model, this.$refs[this.refs], it.key)
      } else {
        if (it.onClick) {
          it.onClick(this.model, this.$refs[this.refs], this.$parent.httpRquestInstace)
        } else if (it.click) {
          it.click(this.model, this.$refs[this.refs], this.$parent.httpRquestInstace)
        }
      }
    },
    // 自动触发逻辑接口
    queryTableRequest(model, $ref, key) {
      if (key === 'query') { // 如果是查询，就调用查询接口
        if (this.isParentTable) {
          this.$parent.httpRquestInstace(model)
        }
      } else if (key === 'rest') { // 否则就是重置接口
        $ref.resetFields()
      }
    },
    formInputComponents(item) {
      const h = this.$createElement
      const formPutList = new Map([
        ['Input', (createElement, model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-input', {
            attrs: attrs,
            props: { value: model[prop] },
            on: {...(row.on || {}), input: (val) => model[prop] = val }
          })
        }],
        ['Select', (createElement,model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-select', {
            attrs: attrs,
            props: { value: model[prop] },
            on: {...(row.on || {}), input: (val) => model[prop] = val }
          }, Array.isArray(dataOptions) ? dataOptions.map((item, index) => {
            return h('el-option', {
              key: index,
              props: { value: item.value, label: item.label }
            })
          }) : [])
        }],
        ['DatePicker', (createElement,model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-date-picker', {
            attrs: attrs,
            props: { value: model[prop] },
            on: {...(row.on || {}),  input: (val) => model[prop] = val }
          })
        }],
        ['TimePicker', (createElement,model, row) => {
          const prop = row.prop
            const attrs = { ...(row.attrs || {}) }
                // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-time-picker', {
            attrs: attrs,
            props: { value: model[prop] },
            on: {...(row.on || {}), input: (val) => model[prop] = val }
          })
        }],
        ['Cascader', (createElement,model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-cascader', {
            key: JSON.stringify(dataOptions),
            attrs:attrs,
            props: {
              value: model[prop], // ✅ Vue2 用的是 value
              options: dataOptions,
              ...(row.props || {})
            },
            on: {
              ...(row.on || {}),
              input: (val) => {
                model[prop] = val // ✅ Vue2 用的是 input 事件
              },
            
            }
          })
        }],
        ['Radio', (createElement, model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-radio-group', {
            attrs: attrs,
            props: { value: model[prop] },
            on: { ...(row.on || {}), input: (val) => model[prop] = val }
          }, Array.isArray(dataOptions) ? dataOptions.map((item) => {
           
            return h('el-radio', {
              props: { label: item.value, disabled: attrs.disabled }
            }, item.label)
          }) : [])
        }],
        ['Checkbox', (createElement,model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-checkbox-group', {
            attrs: attrs,
            props: { value: model[prop] },
            on: { ...(row.on || {}), input: (val) => model[prop] = val }
          }, Array.isArray(dataOptions) ? dataOptions.map((item) => {
            return h('el-checkbox', {
              props: { label: item.value, disabled: attrs.disabled }
            }, item.label)
          }) : [])
        }],
        ['Switch', (createElement,model, row) => {
          const prop = row.prop
           const attrs = { ...(row.attrs || {}) }
            // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }

          return h('el-switch', {
            attrs: attrs,
            props: { value: model[prop] },
            on: { ...(row.on || {}), input: (val) => model[prop] = val }
          })
        }],
        ['Rate', (createElement,model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          return h('el-rate', {
            attrs: attrs,
            props: { value: model[prop] },
            on: { ...(row.on || {}), input: (val) => model[prop] = val }
          })
        }],
        ['Upload', (createElement,model, row) => {
          const prop = row.prop
          // ① 一定要有 action，否则组件会抛错
          const attrs = { ...(row.attrs || {}) }
          // 处理 disabled 作为函数的情况
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const uploadProps = {
            action: attrs?.action || row.props?.action || '#', // 没有就填占位符
            ...row.props,
            ...attrs
          }
          const triggerVnode = row.triggerRender
            ? row.triggerRender(h)
            : h('el-button', { props: { size: 'small', type: 'primary' }}, '选择文件')
          return h('el-upload', {
            attrs: {
              ...attrs
            },
            props: uploadProps,
            on: {
              ...(row.on || {}),
              success: (response, file, fileList) => {
                if (response.code === 0) {
                  model[prop] = fileList
                }
              },
              preview: (file) => {

              },
              remove: (file, fileList) => {
                model[prop] = fileList
              }
            }
          }, [
            // ✅ 触发元素
            // h('el-button', { props: { size: 'small', type: 'primary' } }, '选择文件'),
            // h('div', { class: 'el-upload__tip', style: 'color: #999; font-size: 12px;' }, '只能上传 xls / xlsx 文件，且不超过 2MB')
            triggerVnode
          ])

          /*   return <el-upload

            {...{ attrs: row.attrs }}

            {
              ...{
                props: {
                  'on-success': (response, file, fileList) => {
                    if (response.code === 0) {
                    }
                  },
                  'on-preview': (file) => {

                  },
                  'on-remove': (file, fileList) => {

                  }

                }
              }
            }
            beforeUpload={(file) => {
            }}
            onChange={(val) => {
            }}
          >

          </el-upload>  */
        }]
      ])
      if (formPutList.get(this.capitalize(item.formtype)) && typeof formPutList.get(this.capitalize(item.formtype)) === 'function') {
        return formPutList.get(this.capitalize(item.formtype))
      }
      return (model, row) => {}
    },

capitalize(str) {
  if (!str) return str;          // 空串直接返回
  return str[0].toUpperCase() + str.slice(1);
},
    refsForm() {
      for (const c in Form.methods) { // 拷贝继承Form方法到父组件
        const methodItem = function(...params) {
          // console.log('methods', this.$refs[this.refs])
          this.$refs[this.refs][c](...params)
        }
        this[c] = methodItem.bind(this)
        /* this[c] = function (...params) {
              this.$refs[this.refs][c](...params)
             }.bind(this) */
      }
      // console.log('methods', Form, this.$refs[this.refs])
      return this.$refs[this.refs]
    },
    confirm() {
      this.$emit('confirm', this.$refs[this.refs], this.model)
    },
    reset() {
      this.$emit('reset', this.$refs[this.refs], this.model)
    },
    changefolded() {
      this.folded = !this.folded
    }
  }
}
</script>
<style lang="scss" scoped>
.es-form {
  margin-bottom: 0px !important;
      box-shadow: none;
   ::v-deep .el-form-item__content {
    //  line-height: 25px;
     font-weight: 400;
   }
   ::v-deep .el-form-item__label{
    // line-height: 25px;
    font-weight: 400;
    font-size: 14px;
   }
   .leftRightBtn{
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

 ::v-deep .el-button [class*=el-icon-]+span {
     margin-left: 0px !important;
     padding: 0px 0px !important;
}
::v-deep .el-form-item.is-success::before, .el-form-item.is-validating::before {
  background: none !important
}
  //.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {}
}
.formItemCols{
  :deep(.elparent-form-item__content) {
    justify-content: flex-end;
  }
}
.flex-center{
  ::v-deep .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
  line-height: 0px;
}
 ::v-deep .el-form-item {
  margin-bottom: 12px;
 }
 ::v-deep .el-icon-time:before{
     left: 5px;
     top: -2px;
 }

}

</style>
