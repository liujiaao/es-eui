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
      
        <template v-for="(item, index) in formItemRowsList">
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
              v-if="!btnColSpanRow && configBtn.length"
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
      functional: true,
      props: {
        row: Object,
        formItemList: Array,
        formModel: Object,
        render: Function,
        ellipsis: Boolean
      },
      render(createElement, ctx) {
        const { formItemList, formModel, row } = ctx.props
        const renderContent = ctx.props.render(row, formModel, formItemList) || ''
        return typeof renderContent === 'string' ? createElement('span', renderContent) : renderContent
      }
    },
    RenderDom: {
      functional: true,
      props: {
        row: Object,
        index: Number,
        datakey: String,
        render: Function,
        model: Object,
        ellipsis: Boolean
      },
      render(createElement, ctx) {
        const { row, index, model } = ctx.props

        const cleanOn = row?.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
          if (typeof val === 'function') acc[key] = val
          return acc
        }, {}) : {}
        // 使用 Object.assign 替代展开操作符，确保函数属性不被丢失
        const safeRow = row ? Object.assign({}, row, { on: cleanOn }) : { on: {} }
     
        const renderContent = ctx.props.render(createElement, (model || {}), safeRow) || ''
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
    formModel: {
      type: Object,
      default: function() {
        return null
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
    currentModel() {
      return this.formModel !== null ? this.formModel : this.model
    },
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
    formItemListfilter() {
      return this.formItemList.map((it) => {
        const item = { ...it }
        if (!item.span) {
          item.span = 6
        }
        if (item.prop && typeof item.prop === 'function') {
          item.prop = item.prop()
        }
        return item
      }).filter((it) => {
        if (it.isHiden && typeof it.isHiden === 'function') {
          const status = it.isHiden(this.currentModel, it, this.fromProps)
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
    rowLayout() {
      const rowLayoutProps = this.layoutFormProps?.rowLayProps || {}
         if(!rowLayoutProps.gutter){
             rowLayoutProps.gutter = 10
         }
      return rowLayoutProps
    },
    formLayout() {
      return this.layoutFormProps?.fromLayProps || {}
    },
    fromProps() {
      const formLayout = this.formLayout
            if(!formLayout.labelWidth) {
              formLayout.labelWidth = 'auto'
            }
            if(!formLayout.size) {
               formLayout.size = 'mini'
            }
      return { ...formLayout, model: this.currentModel }
    },
    getBtnColSpan() {
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
    getRowColsAlgorithm() {
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

      const opts = {
        columnRow: columRowIndexs,
        rowNum: columRowIndexs.length,
        columnNodeIndex: columRowIndexs.map(it => it[it.length - 1])
      }
      return opts
    },
    formItem() {
      const minFoldRow = this.layoutFormProps?.fromLayProps?.minfoldRows || 0
      const { columnNodeIndex } = this.getRowColsAlgorithm
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
    isRenderBtn() {
      if (typeof this.renderBtn === 'function') {
        return true
      }
      return false
    },
    isfold() {
      const minFoldRow = this.layoutFormProps?.fromLayProps?.minfoldRows || 0
      const { rowNum } = this.getRowColsAlgorithm

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
    formItem: {
      async handler(val) {
         const hasApiUrl = val.findIndex((it) => it.apiParams && Object.prototype.toString.call(it.apiParams).slice(8, -1) === 'Object' && it.apiParams.url)
         const apiUrlList = val.filter((it) => it.apiParams && Object.prototype.toString.call(it.apiParams).slice(8, -1) === 'Object' && it.apiParams.url && (!it.dataOptions || !it.dataOptions?.length)) 
        if(hasApiUrl !== -1 && apiUrlList.length) {
            const rows = await this.getEveryFormQueryFiled(apiUrlList)
            this.formItemRowsList = val.map((it) => {
              const reslutApiOption = rows.find((item) => item.prop === it.prop)
              if (reslutApiOption) {
                it.dataOptions = reslutApiOption.listData
              }
              return it
            })
          
        } else {
            this.formItemRowsList = val
        }

      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.formInstance = this.refsForm()
    })
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
    findValueByKey(obj, key, depth = 0) {
      if (depth > 3) {
        return undefined
      }
      const currentValue = Object.prototype.toString.call(obj).slice(8, -1) === 'Object' && obj.hasOwnProperty(key) 
        ? obj[key] 
        : undefined
      
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop) && Object.prototype.toString.call(obj[prop]).slice(8, -1) === 'Object') {
          const deepValue = this.findValueByKey(obj[prop], key, depth + 1)
          if (deepValue !== undefined) {
            return deepValue
          }
        }
      }
      return currentValue
    },
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
    httpRquestFormInstace(model, options, rows) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.queryTableListMethod(
            { pageIndex: 1, pageSize: 1000, ...(model || {}) },
            {
              ...(options || {}),
              success: (res) => {
                const configRows = this.formatConfigout(res, ['total', 'listData'], rows)
                resolve({ data: res?.data, configRows })
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
        { eventName: 'brcb', isReturn: true },
        { eventName: 'qrcb', isReturn: false },
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
      const { success, fail, ..._params } = options || {}
      if (options.apiParams && Object.prototype.toString.call(options.apiParams).slice(8, -1) === 'Object' && Object.keys(options.apiParams).length && options.apiParams.url) {
        const formItemParams = this.getListenToCallBack('brcb', { ...params, ...(options?.apiParams?.model || {}) }, option)
        const initFormParams =
          formItemParams && Object.prototype.toString.call(formItemParams).slice(8, -1) === 'Object' ? formItemParams : { ...params, ...(options?.apiParams?.model || {}) }
        
        const requestOption = {...(options?.apiParams?.options || {})}
        if(options?.apiParams?.method) {
          requestOption.method = options?.apiParams?.method
        }

        if (options.httpRequest && typeof options.httpRequest === 'function') {
          options
            .httpRequest({
              url: options?.apiParams?.url,
              headers: { ...(options?.apiParams?.headers || {}) },
              formParams: initFormParams,
              ...requestOption
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
            this.$httpRequest({
              url: options?.apiParams?.url,
              headers: { ...(options?.apiParams?.headers || {}) },
              formParams: initFormParams,
              ...requestOption
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
    wrapPromise(promise) {
      return promise
        .then((value) => ({
          status: 'fulfilled',
          value: value
        }))
        .catch((error) => ({
          status: 'rejected',
          reason: error
        }))
    },
    hasReturnStatement(func) {
      const funcString = func.toString()
      return /return\s+[^;]+;/.test(funcString) || /return;/.test(funcString)
    },
    getfilterRequestLIst(propListKey) {
      if (!propListKey || !propListKey.length) return []
      const requestList = this.formItemRowsList.filter((it) => {
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
    getEveryFormQueryFiled(rowsList) {
      return new Promise(async(resolve, reject) => {
        try {
          const apiUrlList = rowsList.filter((it) => it.apiParams && Object.prototype.toString.call(it.apiParams).slice(8, -1) === 'Object' && it.apiParams.url)
          const apiReulst = []
      
          const wrappedPromises = apiUrlList.map((option) => {
            const { url, headers, model, options } = option.apiParams
            const { httpRequest } = option
            return this.wrapPromise(this.httpRquestFormInstace({ ...(model || {}) }, { httpRequest, apiParams: option.apiParams, ...(options || {}) }, option))
          })
          const results = await Promise.all(wrappedPromises)

          results.forEach((item, index) => {
            if (item.status === 'fulfilled') {
              const { configRows, data } = item.value
              const newListOptions =
                apiUrlList[index]?.listenToCallBack && typeof apiUrlList[index].listenToCallBack?.crtn === 'function' && this.hasReturnStatement(apiUrlList[index].listenToCallBack?.crtn)
                  ? this.getListenToCallBack('crtn', (Array.isArray(configRows?.listData) && configRows?.listData.length ? configRows?.listData : (Array.isArray(data) && data.length ? data : apiUrlList[index]?.dataOptions || [])), apiUrlList[index])
                  : (configRows?.listData || data || apiUrlList[index]?.dataOptions || [])

              apiReulst.push({ prop: apiUrlList[index].prop, listData: Array.isArray(newListOptions) ? newListOptions : configRows?.listData || apiUrlList[index]?.dataOptions || [] })
            } else {
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
        this.queryTableRequest(this.currentModel, this.$refs[this.refs], it.key)
      } else {
        if (it.onClick) {
          it.onClick(this.currentModel, this.$refs[this.refs], this.$parent.httpRquestInstace)
        } else if (it.click) {
          it.click(this.model, this.$refs[this.refs], this.$parent.httpRquestInstace)
        }
      }
    },
    queryTableRequest(model, $ref, key) {
      if (key === 'query') {
        if (this.isParentTable) {
          this.$parent.httpRquestInstace(model)
        }
      } else if (key === 'rest') {
        $ref.resetFields()
        if(this.isParentTable) {
          this.$parent.httpRquestInstace(model)
        }
      }
    },
    formInputComponents(item) {
      console.log('[formInputComponents] item.formtype:', item.formtype, 'capitalize:', this.capitalize(item.formtype))
      const h = this.$createElement
      const self = this
      const formPutList = new Map([
        ['Input', (createElement, model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}

          return h('el-input', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { 
               ...otherHandlers,
               input: inputHandler 
              }
          })
        }],
          ['InputNumber', (createElement, model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}

          return h('el-input-number', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { 
               ...otherHandlers,
               input: inputHandler 
              }
          })
        }],
        ['Select', (createElement,model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-select', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
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
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-date-picker', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
          })
        }],
        ['TimePicker', (createElement,model, row) => {
          const prop = row.prop
            const attrs = { ...(row.attrs || {})}
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-time-picker', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
          })
        }],
        ['Cascader', (createElement,model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-cascader', {
            key: JSON.stringify(dataOptions),
            attrs:attrs,
            props: {
              value: self.currentModel[prop],
              options: dataOptions,
              ...(row.props || {})
            },
            on: {
              ...otherHandlers,
              input: inputHandler
            }
          })
        }],
        ['Radio', (createElement, model, row) => {
          const prop = row.prop
          const dataOptions = Array.isArray(row.dataOptions) ? row.dataOptions : (typeof row.dataOptions === 'function' ? row.dataOptions() : [])
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-radio-group', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
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
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-checkbox-group', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
          }, Array.isArray(dataOptions) ? dataOptions.map((item) => {
            return h('el-checkbox', {
              props: { label: item.value, disabled: attrs.disabled }
            }, item.label)
          }) : [])
        }],
        ['Switch', (createElement,model, row) => {
          const prop = row.prop
           const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }

          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-switch', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
          })
        }],
        ['Rate', (createElement,model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          const inputHandler = typeof (row.on?.input) === 'function' ? row.on.input : (val) => self.$set(self.currentModel, prop, val)
          const otherHandlers = row.on ? Object.entries(row.on).reduce((acc, [key, val]) => {
            if (key !== 'input' && typeof val === 'function') acc[key] = val
            return acc
          }, {}) : {}
          return h('el-rate', {
            attrs: attrs,
            props: { value: self.currentModel[prop] },
            on: { ...otherHandlers, input: inputHandler }
          })
        }],
        ['Upload', (createElement,model, row) => {
          const prop = row.prop
          const attrs = { ...(row.attrs || {}) }
          if (typeof attrs.disabled === 'function') {
            attrs.disabled = attrs.disabled()
          }
          
          const currentFileList = model[prop] || []
          const isCustomUpload = typeof row.httpRequest === 'function'
          
          // 定义成功处理函数 - 核心逻辑在这里
          const processUploadSuccess = (response, file, fileList) => {
            // 从响应中提取 URL（支持多种返回格式）
            const url = response?.link || response?.url || response?.data?.link || response?.data?.url
            
            // 确保 file 对象有正确的 url 用于预览
            if (url) {
              file.url = url
            }
            
            // 设置文件状态为成功
            file.status = 'success'
            file.response = response
            
            console.log('[Upload] 处理成功, url:', url, 'file:', file.name)
            
            // 调用用户定义的成功回调
            if (row.on && typeof row.on.success === 'function') {
              row.on.success(response, file, fileList)
            }
     
            // 更新模型
            self.$set(model, prop, [...fileList])
          }
          
          // 定义失败处理函数
          const processUploadError = (err, file, fileList) => {
            file.status = 'fail'
            file.error = err
            
            console.log('[Upload] 处理失败', err)
            
            if (row.on && typeof row.on.error === 'function') {
              row.on.error(err, file, fileList)
            }
            
            self.$set(model, prop, [...fileList])
          }
          
          // 创建自定义 httpRequest 包装
          let httpRequestConfig = {}
          if (isCustomUpload) {
            // 如果有自定义 httpRequest，包装它以正确处理回调
            httpRequestConfig.httpRequest = (options) => {
              const { file, onSuccess, onError } = options
              
              return row.httpRequest({
                file: file,
                filename: file.name
              }).then((res) => {
                // 自定义请求成功
                const response = res.data || res
                
                // 手动设置文件状态
                file.status = 'success'
                file.response = response
                
                const url = response?.link || response?.url || response?.data?.link || response?.data?.url
                if (url) {
                  file.url = url
                }
          
                // 调用 Element UI 的 onSuccess 回调来触发成功事件
                if (onSuccess) {
                  onSuccess(response, file)
                }
                
                return { code: 200, message: '上传成功', data: response }
              }).catch((err) => {
                // 上传失败
                file.status = 'fail'
                file.error = err
                
                if (onError) {
                  onError(err, file)
                }
                
                throw err
              })
            }
          }
          
          const uploadProps = {
            action: attrs?.action || row.props?.action || '#',
            ...row.props,
            ...attrs,
            ...httpRequestConfig,
            fileList: currentFileList,
            onSuccess: processUploadSuccess,
            onError: processUploadError,
          }
          
          const triggerVnode = row.triggerRender
            ? row.triggerRender(h)
            : h('el-button', { props: { size: 'small', type: 'primary' }}, '选择文件')
          
          const handleRemove = (file, fileList) => {
            if (row.on && row.on.remove) {
              row.on.remove(file, fileList)
            }
            self.$set(model, prop, [...fileList])
          }
          
          const handleChange = (file, fileList) => {
            // 如果文件已上传成功，确保 url 正确
            if (file.status === 'success' && file.response) {
              const url = file.response?.link || file.response?.url || file.response?.data?.link || file.response?.data?.url
              if (url && !file.url) {
                file.url = url
              }
            }
            self.$set(model, prop, [...fileList])
            if (row.on && row.on.change) {
              row.on.change(file, fileList)
            }
          }
          
          // 事件监听 - 通过 on 传递
          const uploadListeners = {
            remove: handleRemove,
            change: handleChange,
       
            preview: (file) => {
              if (row.on && row.on.preview) {
                row.on.preview(file)
              }
            },
            download: (file) => {
              if (row.on && row.on.download) {
                row.on.download(file)
              }
            }
          }
          
          return h('el-upload', {
            attrs: { ...attrs },
            props: uploadProps,
            on: uploadListeners
          }, [triggerVnode])
        }]
      ])
      if (formPutList.get(this.capitalize(item.formtype)) && typeof formPutList.get(this.capitalize(item.formtype)) === 'function') {
        return formPutList.get(this.capitalize(item.formtype))
      }
      return () => {}
    },

    capitalize(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },
    refsForm() {
      for (const c in Form.methods) {
        const methodItem = function(...params) {
          this.$refs[this.refs][c](...params)
        }
        this[c] = methodItem.bind(this)
      }
      return this.$refs[this.refs]
    },
    confirm() {
      this.$emit('confirm', this.$refs[this.refs], this.currentModel)
    },
    reset() {
      this.$emit('reset', this.$refs[this.refs], this.currentModel)
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
     .el-checkbox-group{
       height: 32px;
     }
    .el-rate{
      height: inherit;
      line-height:inherit;
          .el-rate__item{
      vertical-align: baseline;
     }
    }
  
     
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
