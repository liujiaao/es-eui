['Upload', (createElement, model, row) => {
    const prop = row.prop
    // ① 一定要有 action，否则组件会抛错
    const attrs = { ...(row.attrs || {}) }
    // 处理 disabled 作为函数的情况
    if (typeof attrs.disabled === 'function') {
        attrs.disabled = attrs.disabled()
    }

    // 处理 httpRequest 自定义上传请求
    const uploadProps = {
        action: attrs?.action || row.props?.action || '#', // 没有就填占位符
        ...row.props,
        ...attrs,
        // 如果有 httpRequest，需要禁用默认的 auto-upload
        autoUpload: false,
        httpRequest: row.httpRequest || undefined
    }

    const triggerVnode = row.triggerRender
        ? row.triggerRender(h)
        : h('el-button', { props: { size: 'small', type: 'primary' } }, '选择文件')

    // 处理成功回调
    const handleSuccess = (response, file, fileList) => {
        // 调用用户自定义的 success 回调
        if (row.on && row.on.success) {
            row.on.success(response, file, fileList)
        }
        // 同时更新 model
        model[prop] = fileList
    }

    // 处理移除回调
    const handleRemove = (file, fileList) => {
        if (row.on && row.on.remove) {
            row.on.remove(file, fileList)
        }
        model[prop] = fileList
    }

    // 处理变化回调
    const handleChange = (file, fileList) => {
        // 如果有自定义 httpRequest，手动触发上传
        if (row.httpRequest && file.status !== 'success') {
            row.httpRequest({
                file: file,
                filename: file.name
            }).then((res) => {
                // 模拟响应结构
                const response = res.data || res
                file.status = 'success'
                file.response = response
                handleSuccess(response, file, fileList)
            }).catch((err) => {
                file.status = 'fail'
                file.error = err
                if (row.on && row.on.error) {
                    row.on.error(err, file, fileList)
                }
            })
        } else if (row.on && row.on.change) {
            row.on.change(file, fileList)
        }
        // 更新 model
        model[prop] = fileList
    }

    return h('el-upload', {
        attrs: {
            ...attrs
        },
        props: uploadProps,
        on: {
            ...(row.on || {}),
            success: handleSuccess,
            remove: handleRemove,
            change: handleChange,
            preview: (file) => {
                if (row.on && row.on.preview) {
                    row.on.preview(file)
                }
            }
        }
    }, [
        triggerVnode
    ])


}]