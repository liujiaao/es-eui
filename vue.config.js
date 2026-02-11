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
        config.plugin('html').tap(args => {
            args[0].title = 'Vue2 Project Template'
            return args
        })
    }
})