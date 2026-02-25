import EsDialog from './esDialog'
import useDialogInstantce from './esDialog/src/utils/useDialog'
import EsForm from './esForm'
import EsTable from './esTable'
import svgIcons from './svgIcon'

export const componentsList = [EsDialog, EsForm, EsTable, svgIcons]

export { EsDialog, EsForm, EsTable, svgIcons }

export const importFnComponents = function (Vue, options = {}, components) {
    const componentsInstall = components && Array.isArray(components) ? [...componentsList, ...components] : [...componentsList]
    componentsInstall.forEach((el) => {
        if (el.isPlugin) {
            const optionsSetting = (PluginName) => {
                const opt = options
                if (opt[PluginName]) {
                    return opt[PluginName]
                }
                return {}
            }
            Vue.use(el.Plugin, optionsSetting(el.name))
        } else {
            if (el.install && typeof el.install === 'function') {
                el.install(Vue)
            }
        }
    })
}

export const useDialog = (params, options) => {
    return useDialogInstantce(params, options)
}

/**
 * 创建响应式 el-input 组件包装器
 * 解决在 JSX 弹窗中 el-input 无法正确响应数据变化的问题
 * 
 * @param {Object} options - 配置选项
 * @param {string} options.value - 当前值
 * @param {Function} options.onInput - 输入回调函数 (val) => void
 * @param {string} options.placeholder - 占位符文本
 * @param {string} options.size - 尺寸 (small/medium/large)
 * @param {Function} options.onKeyup - 键盘事件回调 (e) => void
 * @returns {Object} Vue 组件配置对象
 * 
 * 使用示例：
 * const TagInput = createInput({
 *   value: this.newTag,
 *   onInput: val => { this.newTag = val },
 *   placeholder: '输入标签',
 *   size: 'small',
 *   onKeyup: e => { if (e.keyCode === 13) { ... } }
 * })
 * 
 * 在 JSX 中使用：
 * {this.$createElement(TagInput)}
 */
// export const createInput = createInputUtil

/**
 * 创建通用响应式组件包装器
 * 可以将任意需要响应式的 JSX 组件包装起来
 * 
 * @param {Function} factory - 工厂函数，接收 (h, $this) 参数，返回 vnode
 * @param {Object} $this - 父组件实例（this）
 * @returns {Object} Vue 组件配置对象
 * 
 * 使用示例：
 * const ReactiveWrapper = withReactive((h, $this) => (
 *   <el-input value={$this.value} on-input={val => $this.value = val} />
 * ), this)
 * 
 * 在 JSX 中使用：
 * {this.$createElement(ReactiveWrapper)}
 */
// export const withReactive = withReactiveUtil

const install = importFnComponents

export default {
    install
    // ...componentsList
}
