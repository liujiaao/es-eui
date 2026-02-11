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

const install = importFnComponents

export default {
    install
    // ...componentsList
}
