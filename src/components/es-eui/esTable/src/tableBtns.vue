<template>
  <div v-if="leftText || btnLeft.length || btnRight.length" class="flex-float btns">
    <div style="color: rgb(125, 125, 125); font-size: 14px;">
      {{ leftText }}
    </div>
    <div class="btn-container_block">
      <div class="btn-left">
        <template v-for="(item, index) in btnLeft">
          <div
            v-if="!item.isHide"
            :key="item.name"
            :style="{display: 'inline-block', 'margin-left': index !== 0 ? '8px' : '0px'}"
          >
            <RenderDom
              v-if="!item.isHide && typeof item.render === 'function'"
              :render="item.render"
            />
            <el-button
              v-else-if="!item.isHide"
              :type="item.type"
              :size="item.size || 'small'"
              :icon="item.icon || ''"
              v-bind="item"
              :loading="item.loading || false"
              :disabled="typeof item.disabled === 'function' ? (item.disabled() || false) : item.disabled || false"
              @click="() => {
                item.click && item.click(formInstance, $parent)
              }"
            >{{ item.name }}</el-button>
          </div>
        </template>
      </div>

      <div class="btn-right">

        <template v-for="(item, index) in btnRight">
          <div
            v-if="!item.isHide"
            :key="item.name"
            :style="{display: 'inline-block', 'margin-left': index !== 0 ? '8px' : '0px'}"
          >
            <RenderDom
              v-if="!item.isHide && typeof item.render === 'function'"
              :render="item.render"
            />
            <el-button
              v-else-if="!item.isHide"
              :type="item.type"
              :size="item.size || 'small'"
              :icon="item.icon || ''"
              v-bind="item"
              :loading="item.loading || false"
              :disabled="typeof item.disabled === 'function' ? (item.disabled() || false) : item.disabled || false"
              @click="() => {
                item.click && item.click(formInstance, $parent)
              }"
            >{{ item.name }}</el-button>
          </div>
        </template>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: 'TableBtns',
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        render: Function
      },
      /**
         * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
         * @param {Object} ctx - 渲染的节点的this对象
         * @argument 传递参数 row index
         */
      render(createElement, ctx) {
        return ctx.props.render()
      }
    }
  },
  props: {
    leftText: String,
    btnConfig: Array,
    formInstance: Object // 是否是form实例
    // {
    //     code:2,//1左侧，2右侧
    //     name:"查询", 按钮名字
    //     type:'primary', 类型
    //     handleClick:(e)=>{ click事件
    //       console.log("#####",e)
    //     }
    // },
  },
  data() {
    return {
    }
  },
  computed: {
    btnLeft() {
      const btnList = this.$store?.state?.permission?.btnList || []
      return this.btnConfig && this.btnConfig.length > 0
        ? this.btnConfig.filter(el => el.code == 1).map((its) => {
          // 优先判断是否有权限，无权限，则不展示
          if (!this.hasPermission(btnList, its.permissionValue)) {
            its.isHide = false
          } else {
            its.isHide = (typeof its.isHide === 'function') ? its.isHide() : its.isHide
          }
          return its
        })
        : []
    },
    btnRight() {
      const btnList = this.$store?.state?.permission?.btnList || []
      return this.btnConfig && this.btnConfig.length > 0
        ? this.btnConfig.filter(el => el.code == 2).map((its) => {
          const item = { ...its }
          // 优先判断是否有权限，无权限，则不展示
          if (!this.hasPermission(btnList, item.permissionValue)) {
            item.isHide = false
          } else {
            item.isHide = (typeof item.isHide === 'function') ? item.isHide() : item.isHide
          }
          return item
        }).filter(item => !item.isHide)
        : []
    }
  },
  watch: {
    leftText() {
      console.log(this.leftText)
    }
  },
  mounted() {
  },
  methods: {
    hasPermission(btnList, pvalue) {
      // 当前没菜单数据，认为无权限
      if (!btnList || !btnList.length) {
        return false
      }
      // 操作按钮未配置权限，则认为有权限
      if (!pvalue) {
        return true
      }
      let has = false
      for (let i = 0; i < btnList.length; i += 1) {
        if (pvalue === btnList[i].permissionValue) {
          has = true
          break
        }
      }
      return has
    }
  }
}
</script>
<style lang="scss" scoped>
  .btns{
    padding:0px 0;
    padding-bottom: 8px;
  }
  .flex-float{
    /* text-align: right; */
  }
  .btn-container_block{
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    .btn-left{
      //  text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .btn-right{
      //  text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
