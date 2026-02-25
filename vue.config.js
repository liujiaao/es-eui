const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    productionSourceMap: false,
    chainWebpack: config => {
        // 只在非库打包模式下配置 html 插件
        if (config.plugins.has('html')) {
            config.plugin('html').tap(args => {
                args[0].title = 'Vue2 Project Template'
                return args
            })
        }
    }
})