<template>

<el-table-column v-if="cols.groups && Array.isArray(cols.groups)"  v-bind="columnbindAttr(cols)">
    <column-item
      v-for="(item, index) in cols.groups"
      :key="item.prop || item.key || index"
      :cols="{...item, columnIndex: index}"
    >
      <template
        v-if="item.scopedSlots && item.scopedSlots.customRender"
        v-slot:[item.scopedSlots.customRender]="{scope}"
      >
        <slot
          v-bind="{...item, columnIndex: index, row: scope.row, column: scope.column}"
          :name="item.scopedSlots.customRender"
          :scope="scope"
        />
      </template>
    </column-item>
  </el-table-column>
  <el-table-column  
  v-else-if="cols.render && typeof cols.render === 'function'"
    v-bind="columnbindAttr(cols)"
    >
    <template slot-scope="scope">
      <RenderDom
        :row="scope.row"
        :columnIndex="cols.columnIndex"
        :index="scope.$index"
        :render="cols.render"
      />
    </template>
  </el-table-column>
  
  <el-table-column
    v-else-if="cols.scopedSlots && cols.scopedSlots.customRender"
    v-bind="columnbindAttr(cols)"
  >
    <template slot-scope="scope">
      <slot
        v-bind="{...cols, row: scope.row, column: scope.column}"
        :scope="scope"
        :name="cols.scopedSlots.customRender"
      />
    </template>
  </el-table-column>

  <el-table-column
    v-else
    v-bind="columnbindAttr(cols)"
   > 
   
  </el-table-column>

  <!-- <el-table-column
    v-if="cols.groups && Array.isArray(cols.groups)"
    v-bind="columnbindAttr(cols)"
  >
    <column-item
      v-for="(item, index) in cols.groups"
      :key="index"
      :cols="item"
    >
      <template
        v-if="item.scopedSlots && item.scopedSlots.customRender"
        v-slot:[item.scopedSlots.customRender]="{scope}"
      >
        <slot
          :name="item.scopedSlots.customRender"
          :scope="scope"
        />
      </template>
    </column-item>
  </el-table-column>
  <el-table-column
    v-else-if="cols.scopedSlots && cols.scopedSlots.customRender"
    v-bind="columnbindAttr(cols)"
  >
    <template slot-scope="scope">
      <slot
        :scope="scope"
        :name="cols.scopedSlots.customRender"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="cols.render && typeof cols.render === 'function' "
    v-bind="columnbindAttr(cols)"
  >
    <template slot-scope="scope">
      <RenderDom
        :row="scope.row"
        :index="scope.$index"
        :render="cols.render"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else
    v-bind="columnbindAttr(cols)"
   > 
  </el-table-column> -->
</template>
<script>
  export default {
    name: 'ColumnItem',
    components: {
      RenderDom: {
        functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
        props: {
          row: Object,
          index: Number,
          render: Function,
          columnIndex: Number
        },
        /**
         * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
         * @param {Object} ctx - 渲染的节点的this对象
         * @argument 传递参数 row index
         */
        render (createElement, ctx) {
          const { row, index, columnIndex } = ctx.props
       //   console.log('RenderDom///', ctx.parent.instance)
          return ctx.props.render(createElement, {row, index, columnIndex,  instance: ctx.parent?.instance } )
        }
      }
    },
    props: {
      instance: {
        type: Object,
        default: function () {
          return {}
        }
      },
      cols: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      bindAttrs () {
        return this.columnbindAttr(this.cols)
      }
    },
    watch: {},
    mounted () {},
    methods: {
      firstWordUpperCase (str) {
        return str.toLowerCase().replace(/(\s|^)[a-z]/g, function (char) {
          return char.toUpperCase()
        })
      },
      columnbindAttr (cols) {
        let options = {}
        for (let t in cols) {
          if (t === 'groups' || t === 'scopedSlots' || t === 'render') {
            continue
          } else if (t.indexOf('-') >= 0) {
            let newkey = ''
            let key = t.split('-')
            for (let j = 0; j < key.length; j++) {
              if (j !== 0) {
                newkey += this.firstWordUpperCase(key[j])
              } else {
                newkey += key[j]
              }
            }
            options[newkey] = cols[t]
          } else {
            if (t === 'key' ) {
              options.prop = cols[t]
              options[t] = cols[t]
            } else {
              options[t] = cols[t]
            }
          }
        }
        if (!options['align']) {
          options.align = 'center'
        }
        if(!options.formatter&&options.prop){ 
          options.formatter= (row)=>{ 
            return row[options.prop]===""||row[options.prop]===null||row[options.prop]===undefined 
            ?"--":row[options.prop]
          }
        }
        return options
      }
    }
  }
</script>
