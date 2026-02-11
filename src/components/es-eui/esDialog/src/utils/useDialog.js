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
        // ✅ 如果已存在，直接返回
        if (instanceCache.has(key)) {
            console.log('useInstance//', instanceCache)
            // const cached = instanceCache.get(key)
            // cached.show()
            // bringToFront(cached.instance) // ← 同样置顶
            return {
                close: instanceCache.get(key).close,
                instance: instanceCache.get(key).instance
            }
        }

        // 内容最大高 = 视口高 - 预留区（标题+按钮+安全区）
        function getMaxContentHeight() {
            const viewH = window.innerHeight
            // 预留：标题 55 + 按钮 60 + 安全 20 = 135
            return Math.max(viewH - 135, 200) // 最低 200px
        }

        let vnode = null
        if (render) {

            const tempVm = new (Vue.extend({ store }))()
            const rawVnode = render(tempVm.$createElement) // 可能是组件、div、fragment

            /* 1. 统一包外层 div（组件或 DOM 都包） */
            const Wrapper = Vue.extend({
                store,
                render(h) {
                    return h('div', {
                        class: 'dialog-content-wrapper',
                        style: {
                            maxHeight: getMaxContentHeight() + 'px',
                            overflowY: 'auto',
                            overflowX: 'clip'
                        }
                    }, [rawVnode])
                }
            })
            const wrapperVm = new Wrapper()
            vnode = wrapperVm.$options.render.call(wrapperVm, wrapperVm.$createElement)

            /* 2. 如果是组件 vnode，额外打 store 到构造器（可选） */
            if (rawVnode.componentOptions?.Ctor) {
                const Component = rawVnode.componentOptions.Ctor
                if (!Component.prototype.$store) Component.prototype.$store = store
            }
        }

        // 2. 构造 Dialog 实例
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
                    onClick: () => btn.click?.(getcrruntRef(), { close, getRefs: getRefs(), dialogVm })
                })),
                hiddenFullBtn,
                fullscreen,
                ...extraProps
            },
            methods: {
                dialogConfirm(hide) {
                    onSubmit?.()
                    hide()
                }
            }
        })

        // 3. 插槽注入
        if (vnode) dialogVm.$slots.default = [vnode]

        // 4. 挂载

        // const crrutDialogZindex = getActiveDialogZ()
        // console.log('warpper_dialog///', getActiveDialogZ())
        dialogVm.$mount()
        // if (crrutDialogZindex.dialogZ && Number(crrutDialogZindex.dialogZ) && crrutDialogZindex.dialogZ !== -Infinity) {
        //     console.log('有多个弹窗//')
        //     const modalEl = document.querySelector('.v-modal')
        //     if (modalEl) { modalEl.style.zIndex = crrutDialogZindex.modalZ }
        //     dialogVm.$el.style.zIndex = crrutDialogZindex.dialogZ
        // }

        // 5. 事件
        dialogVm.$on('open', () => onOpen?.())
        dialogVm.$on('closed', () => {
            onClosed?.()
            destroy()
        })

        function getActiveDialogZ() {
            let maxZ = Math.max(
                ...Array.from(document.querySelectorAll('.el-dialog__wrapper, .el-dialog'))
                    .map(wrap => +getComputedStyle(wrap).zIndex || 0)
            )
            maxZ += 2000
            return { dialogZ: maxZ + 1, modalZ: maxZ - 1 }
        }

        function close() {
            // 直接调用 hide 方法，让 esDialog 处理关闭逻辑
            dialogVm.hide()
        }

        function destroy() {
            // 使用标志防止重复销毁
            if (dialogVm._isDestroyed) return
            
            dialogVm.$nextTick(() => {
                if (!dialogVm._isDestroyed) {
                    dialogVm.$destroy()
                }
                if (dialogVm.$el && dialogVm.$el.parentNode) {
                    dialogVm.$el.parentNode.removeChild(dialogVm.$el)
                }
                instanceCache.delete(key)
            })
        }

        // 提取所有 ref
        function getRefs() {
            const slot = dialogVm.$slots.default

            if (!slot || !slot[0].children[0] || !slot[0].children[0]?.componentInstance) return {}
            return slot[0].children[0].componentInstance.$refs || {}
        }

        function getcrruntRef() {
            const slot = dialogVm.$slots.default

            if (!slot || !slot[0].children[0] || !slot[0].children[0]?.componentInstance) return {}
            return slot[0].children[0].componentInstance // ✅ 就是 当前组件实例
        }

        // ✅ 缓存实例
        instanceCache.set(key, { close, instance: dialogVm })

        return { close, instance: dialogVm }
    }
}
