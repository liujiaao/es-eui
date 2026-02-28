import Vue from 'vue'
import { PopupManager } from 'element-ui/lib/utils/popup'
import EsDialog from '../esDialog.vue'
import store from '@/store'
import zIndexManager from './zIndexManager'

let seed = 0
const instanceCache = new Map() // ✅ 缓存 map

export default function useDialog() {
    return function createDialog(options = {}) {
        const {
            key = '__default__', // ✅ 支持 key 区分不同弹窗
            title = '',
            width = '50%',
            height = '',
            maxHeight = '',
            center = true,
            customClass = '',
            closeOnClickModal = false,
            closeOnPressEscape = false,
            showClose = true,
            lockScroll = true,
            modal = true,
            modalAppendToBody = true,
            appendToBody = true,
            appendToSelector = '.app-container',
            destroyOnClose = true,
            showDefaultButtons = false,
            loading = false,
            isDraggable = false,
            configBtn = [],
            render,
            onSubmit,
            onClosed,
            onOpen,
            hiddenFullBtn = false,
            fullscreen = false,
            ...extraProps
        } = options

        /* ---------- 置顶 + 专属遮罩（插到 body，不碰 .v-modal） ---------- */
        // ✅ 如果已存在，直接返回（开发者可根据需求自行添加 bringToFront 逻辑）
        if (instanceCache.has(key)) {
            // const cached = instanceCache.get(key)
            // cached.show()
            // bringToFront(cached.instance) // ← 同样置顶
            return {
                close: instanceCache.get(key).close,
                instance: instanceCache.get(key).instance,
            }
        }

        // 内容最大高 = 视口高 - 弹窗非内容区域高度（标题+底部按钮+边距+安全区）
        function getMaxContentHeight() {
            // 尝试多种方式获取最准确的视口高度
            // 1. visualViewport API (最准确，支持缩放的视口)
            // 2. document.documentElement.clientHeight (不包含滚动条)
            // 3. window.innerHeight (包含滚动条)
            const visualViewportH = window.visualViewport ? window.visualViewport.height : 0
            const clientHeight = document.documentElement.clientHeight || 0
            const innerHeight = window.innerHeight || 0

            // 取最大值作为视口高度
            const viewH = Math.max(visualViewportH, clientHeight, innerHeight)

            // 如果获取不到有效值，使用屏幕高度作为备选
            const screenH = window.screen?.height || 1080
            const finalViewH = viewH > 100 ? viewH : screenH * 0.9

            // 计算弹窗非内容区域预留高度：
            // - 弹窗外边距：上下各 8vh ≈ 16vh 总视口高度 (Element UI 默认 .el-dialog__wrapper margin: 8vh 0)
            // - 弹窗头部（标题 + 关闭按钮 + padding）：约 54px
            // - 弹窗内容区 padding：上下各 20px = 40px
            // - 弹窗底部按钮区：约 60px（含 padding）
            // - 安全余量：20px
            const marginVh = 0.16 // 16vh 转换为视口比例
            const marginPx = finalViewH * marginVh
            const headerHeight = 54
            const contentPadding = 40
            const footerHeight = showDefaultButtons || configBtn.length > 0 ? 60 : 20
            const safeMargin = 20

            const reservedHeight = marginPx + headerHeight + contentPadding + footerHeight + safeMargin
            const maxHeight = Math.max(finalViewH - reservedHeight, 200)

            console.log('getMaxContentHeight///', {
                visualViewportH,
                clientHeight,
                innerHeight,
                screenH,
                finalViewH,
                marginPx,
                headerHeight,
                contentPadding,
                footerHeight,
                reservedHeight,
                maxHeight
            })

            return maxHeight
        }

        // ---------- 清理 EsForm 组件中的 undefined 监听器 ----------
        function cleanEsFormListeners(vnode) {
            if (!vnode) return
            // 只处理 EsForm 组件
            const isEsForm = vnode.componentOptions?.Ctor?.options?.name === 'EsForm'
            if (isEsForm && vnode.componentOptions?.listeners) {
                Object.keys(vnode.componentOptions.listeners).forEach(key => {
                    if (typeof vnode.componentOptions.listeners[key] !== 'function') {
                        vnode.componentOptions.listeners[key] = () => { }
                    }
                })
            }
            // 递归处理子节点，但跳过 EsForm 的内部（避免干扰其 v-model）
            if (!isEsForm) {
                if (vnode.children) {
                    vnode.children.forEach(child => cleanEsFormListeners(child))
                }
                if (vnode.componentOptions?.children) {
                    vnode.componentOptions.children.forEach(child => cleanEsFormListeners(child))
                }
            }
        }

        // ---------- 构造 Dialog 实例 ----------
        const DialogCtor = Vue.extend(EsDialog)
        const dialogVm = new DialogCtor({
            propsData: {
                id: `dp-dialog-${++seed}`,
                visible: true,
                title,
                width,
                height,
                maxHeight,
                fullscreen,
                center,
                customClass: isDraggable ? `draggable-dialog ${customClass}` : customClass,
                closeOnClickModal,
                closeOnPressEscape,
                showClose,
                lockScroll,
                modal,
                modalAppendToBody,
                appendToBody,
                appendToSelector,
                destroyOnClose,
                showDefaultButtons,
                loading,
                configBtn: configBtn.map((btn, idx) => ({
                    ...btn,
                    key: btn.key || `btn_${idx}`,
                    size: btn.size || 'mini',
                    onClick: () => (btn.click || btn.onClick)?.(getCurrentComponent(), { close, getRefs: getRefs, dialogVm }),
                })),
                hiddenFullBtn,
                fullscreen,
                ...extraProps,
            },
            methods: {
                dialogConfirm(hide) {
                    onSubmit?.()
                    hide()
                },
            },
        })

        // ---------- 处理 render 函数：转换为响应式动态组件 ----------
        if (render) {
            // 1. 定义一个动态组件，其 render 直接调用传入的 render 函数
            //    该组件的实例会自动追踪 render 内部访问的响应式数据，并响应式更新
            const ContentComponent = Vue.extend({
                store, // 注入 store，保证内部可通过 this.$store 访问
                render(h) {
                    // 每次渲染都重新调用 render 函数，生成最新 vnode
                    const vnode = render(h)
                    cleanEsFormListeners(vnode)
                    // 包裹外层 div，统一样式与滚动
                    return h(
                        'div',
                        {
                            class: 'dialog-content-wrapper',
                            style: {
                                maxHeight: getMaxContentHeight() + 'px',
                                // overflowY: 'auto',
                                // overflowX: 'clip',
                            },
                        },
                        [vnode]
                    )
                },
            })

            // 2. 创建该组件的占位 vnode，作为默认插槽内容
            const contentVnode = dialogVm.$createElement(ContentComponent)
            dialogVm.$slots.default = [contentVnode]
        }

        // ---------- 挂载 ----------
        dialogVm.$mount()
        // 可选：手动调整 zIndex（保留原注释代码供参考）
        // const crrutDialogZindex = getActiveDialogZ()
        // if (crrutDialogZindex.dialogZ && Number(crrutDialogZindex.dialogZ) && crrutDialogZindex.dialogZ !== -Infinity) {
        //   const modalEl = document.querySelector('.v-modal')
        //   if (modalEl) { modalEl.style.zIndex = crrutDialogZindex.modalZ }
        //   dialogVm.$el.style.zIndex = crrutDialogZindex.dialogZ
        // }

        // ---------- 事件监听 ----------
        dialogVm.$on('open', () => onOpen?.())
        dialogVm.$on('close', () => {
            onClosed?.()
            destroy()
        })

        // ---------- 辅助函数：计算当前最高的 zIndex（未使用，保留供参考）----------
        function getActiveDialogZ() {
            let maxZ = Math.max(
                ...Array.from(document.querySelectorAll('.el-dialog__wrapper, .el-dialog')).map(wrap =>
                    +getComputedStyle(wrap).zIndex || 0
                )
            )
            maxZ += 2000
            return { dialogZ: maxZ + 1, modalZ: maxZ - 1 }
        }

        // ---------- 获取内部组件实例（用于 configBtn 中的回调）----------
        function getCurrentComponent() {
            const slot = dialogVm.$slots.default
            if (!slot || !slot[0] || !slot[0].componentInstance) return {}
            // slot[0] 是 ContentComponent 的占位 vnode
            // 其内部第一个子组件（如果有）就是 render 返回的组件实例
            const childVm = slot[0].componentInstance.$children[0]
            return childVm || {}
        }

        // ---------- 获取内部组件实例的所有 refs ----------
        function getRefs(refName) {
            const slot = dialogVm.$slots.default
            // console.log('getRefs', slot)
            if (!slot || !slot[0] || !slot[0].componentInstance) return {}
            // const childVm = slot[0].componentInstance.$children[0]
            const childVm = slot[0].componentInstance
            // console.log('getRefs555', slot[0].componentInstance)
            return (childVm && refName) ? (childVm.$refs[refName] || {}) : {}
        }

        // ---------- 关闭弹窗并销毁实例 ----------
        function close() {
            dialogVm.$emit('update:visible', false)
            dialogVm.$nextTick(() => {
                dialogVm.$destroy()
                dialogVm.$el.parentNode?.removeChild(dialogVm.$el)
                instanceCache.delete(key) // ✅ 清除缓存
            })
        }

        function destroy() {
            dialogVm.$nextTick(() => {
                dialogVm.$destroy()
                dialogVm.$el.parentNode?.removeChild(dialogVm.$el)
                instanceCache.delete(key)
            })
        }

        // ✅ 缓存实例
        instanceCache.set(key, { close, instance: dialogVm })

        return { close, instance: dialogVm }
    }
}