<template>
  <el-dialog
    ref="dialog"
    :id="id"
    v-draggable
    :visible.sync="show"
    :title="title"
    :width="style.width"
    :fullscreen="fullscreen"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="false"         
    :custom-class="
      ['el-dialog--custom', customClass, fullscreen ? 'is-fullscreen': '', getPositionClass ].filter(it =>it).join(' ')
    "
    :before-close="beforeClose ? beforeClose : null"
    :destroy-on-close="destroyOnClose"
    @open="onOpen"
    @opened="afterEnter"
    @close="handleClose"
    @closed="afterLeave"
  >
    <!-- 头部插槽：结构与原来完全一致 -->
    <template #title>
      <div class="el-dialog__header_body">
        <slot name="title">
          <span class="el-dialog__title">{{ title }}</span>
        </slot>
        <div class="el-dialog__tools">
          <button
            v-if="!hiddenFullBtn"
            type="button"
            class="el-dialog__headerbtn"
            aria-label="FullScreen"
            @click="toggleFullscreen"
          >
            <i
              :class="
                fullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen'
              "
            />
          </button>
          <button
            v-if="showClose"
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            @click="handleClose"
          >
            <i class="el-dialog__close el-icon el-icon-close" />
          </button>
        </div>
      </div>
    </template>

    <!-- body 区域 -->
    <div
      v-loading="loading"
      class="el-dialog__body"
      :style="maxHeight ? { height: 'auto' } : {}"
    >
      <template v-if="disableKeepAlive">
        <slot />
      </template>
      <keep-alive v-else>
        <slot />
      </keep-alive>
    </div>

    <!-- footer 区域 -->
    <template #footer>
      <div class="useDialog__footer">
        <slot name="footer">
          <template v-if="configBtn.length">
            <el-button
              v-for="(it, inx) in configBtn"
              :key="it.key || inx"
              v-bind="it"
              :disabled="
                typeof it.disabled === 'function'
                  ? it.disabled() || false
                  : it.disabled || false
              "
              @click="it.onClick"
            >
              {{ it.name }}
            </el-button>
          </template>
          <template v-else-if="showDefaultButtons">
            <el-button size="mini" @click="handleClose">取消</el-button>
            <el-button size="mini" type="primary" @click="confirm">确定</el-button>
          </template>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { PopupManager } from 'element-ui/lib/utils/popup'
import zIndexManager from './utils/zIndexManager'
import draggable from './utils/draggable';

/* 置顶逻辑 */
function bringToFront(vm) {
  vm.$nextTick(() => {
    const dialogZ = zIndexManager.getDialogZIndex()
    const dialogEl = vm.$refs.dialog.$el.querySelector('.el-dialog')
    if (dialogEl) dialogEl.style.zIndex = dialogZ
    const modalEl = document.querySelector('.v-modal')
    if (modalEl) modalEl.style.zIndex = dialogZ - 1
  })
}

export default {
  name: 'EsDialog',
  props: {
    /* 与原文件保持一致，不再赘述 */
    verticalPosition: { type: String, default: 'center' },
    title: { type: String, default: '' },
    modal: { type: Boolean, default: true },
    modalAppendToBody: { type: Boolean, default: true },
    appendToBody: { type: Boolean, default: true },
    lockScroll: { type: Boolean, default: true },
    closeOnClickModal: { type: Boolean, default: false },
    closeOnPressEscape: { type: Boolean, default: false },
    showClose: { type: Boolean, default: true },
    width: { type: String, default: '' },
    height: { type: String, default: '' },
    maxHeight: { type: String, default: '' },
    customClass: { type: String, default: '' },
    beforeClose: { type: Function },
    center: { type: Boolean, default: true },
    destroyOnClose: Boolean,
    appendToSelector: { type: String, default: '.app-container' },
    size: { type: String, default: 'large' },
    showDefaultButtons: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    id: { type: String, default: '' },
    visible: { type: Boolean, default: true },
    configBtn: { type: Array, default: () => [] },
    hiddenFullBtn: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false }
  },
  data() {
    return {
      closed: false,
      key: 0,
      disableKeepAlive: false,
      show: this.visible,
      _dragMem: null
    }
  },
  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        if (this.width || this.height || this.maxHeight) {
          style.width = this.width || 'auto'
          if (this.maxHeight) style.maxHeight = this.maxHeight
          else style.height = this.height || 'auto'
        } else {
          const size = this.size
          if (size === 'full') style.width = '100%'
          else if (size === 'large') style.width = '80%'
          else if (size === 'medium') style.width = '60%'
          else if (size === 'small') style.width = '30%'
          else if (size === 'mini') style.width = '20%'
          else if (size === 'singleCol') style.width = '30%'
        }
        // marginTop 通过 CSS 类设置
      }
      return style
    },
    getPositionClass() {
      if (this.fullscreen) return ''
      if (this.verticalPosition === 'top') return 'position-top'
      if (this.center) return 'position-center'
      return 'position-default'
    }
  },
  watch: {
    visible(val) {
      this.show = val
    },
    show(val) {
      this.$emit('update:visible', val)
    },
    fullscreen(val) {
      this.$nextTick(() => {
        const panel = this.$refs.dialog.$el.querySelector('.el-dialog')
        if (!panel) return
        if (val) {
          this._dragMem = { top: panel.style.top, left: panel.style.left }
          panel.style.top = '0px'
          panel.style.left = '0px'
        } else {
          const mem = this._dragMem || { top: '', left: '' }
          panel.style.top = mem.top
          panel.style.left = mem.left
        }
      })
    }
  },
  mounted() {
    // 组件挂载时应用居中样式
    this.$nextTick(() => {
      this.applyCenterStyle()
    })
  },
  directives: {
   draggable
  },
  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    },
    handleClose() {
      
      if (typeof this.beforeClose === 'function') {
        console.log('beforeClose///')
        this.beforeClose(this.hide)
      } else {
         console.log('beforeClose///22')
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:loading', false)
        this.$emit('update:visible', false)
        this.$emit('close')
        this.show = false
        this.closed = true
      }
    },
    confirm() {
      this.$emit('dialogConfirm', this.hide)
    },
    onOpen() {
      // 弹窗打开时应用居中
      this.$nextTick(() => {
        this.applyCenterStyle()
      })
      this.$emit('open')
    },
    afterEnter() {
      // 弹窗动画完成后应用居中样式
      this.$nextTick(() => {
        this.applyCenterStyle()
      })
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    },
    applyCenterStyle() {
      // 优先通过 ref 获取弹窗元素
      let dialogEl = this.$refs.dialog?.$el
      
      // 如果 ref 获取失败，尝试通过 id 查找
      if (!dialogEl && this.id) {
        dialogEl = document.querySelector(`#${this.id}`)
      }
      
      if (!dialogEl) {
        console.warn('[EsDialog] 找不到弹窗元素')
        return
      }
      
      // 获取 wrapper
      const wrapper = dialogEl.closest('.el-dialog__wrapper')
      if (!wrapper) {
        console.warn('[EsDialog] 找不到 wrapper')
        return
      }
      
      // 当 center 为 true 且不是顶部对齐时，直接设置 flex 布局
      if (this.center && this.verticalPosition !== 'top' && !this.fullscreen) {
        wrapper.style.display = 'flex'
        wrapper.style.alignItems = 'center'
        wrapper.style.justifyContent = 'center'
        console.log('[EsDialog] 已应用居中样式')
      }
    }
  }
}
</script>

<!-- <style>
/* 遮罩相对父容器定位（与原文件一致） */
.app-container .v-modal {
  position: absolute;
}
</style> -->

<style lang="scss" scoped>
/* 与原 scss 完全一致，仅把 :deep 换成 ::v-deep */
.el-dialog.is-fullscreen .el-dialog__header {
  cursor: default;
  // padding: 5px 5px 5px;
}
//  ::v-deep .el-dialog__footer {
//     padding: 10px 24px !important;
//     text-align: right;
//     border-top:1px solid #e6e7eb;
//   }
  
.el-dialog__title_custom {
    display: block;
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    text-align: left;
    /* border-bottom: 1px solid #484848; */
    background-color: #ffffff;
    border-radius: 5px 5px 0 0;
    font-size: 16px;
}
 ::v-deep .el-dialog--custom {
  // 位置样式 - 顶部对齐
  &.position-top {
    margin-top: 5vh !important;
  }
  
  // 位置样式 - 默认（15vh 偏移）
  &.position-default {
    margin-top: 15vh !important;
  }
  
  .el-dialog__header{
    padding: 10px 10px 10px;
     border-bottom:1px solid #e6e7eb;
      .el-dialog__header_body{
    // border-bottom: 1px solid #e6e7eb;
     cursor: move;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 5px 5px 5px;
    // padding: 10px 0 10px 10px !important;
    .el-dialog__title {
      font-size: 16px;
      border-bottom: none !important;
    }
    .el-dialog__tools {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
    }
    .el-dialog__headerbtn {
      position: static !important;
      margin-right: 10px;
    }
     }
  }

 .el-dialog__body {
    background: #f8f8f8;
    position: relative;
    flex: auto;
    padding: 10px !important;
    overflow: auto;
  }
 .el-dialog__footer {
  padding: 10px 10px 10px;
    // padding: 10px 24px !important;
    // text-align: right;
    // border-top:1px solid #e6e7eb;
  }
}
</style>

<!-- 全局样式：强制弹窗垂直居中 -->
<style lang="scss">
// 弹窗自身样式 - 移除默认 margin
.el-dialog--custom.position-center {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>