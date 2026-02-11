// 实现插件
export default class DomResizeObserver {
  constructor(options = {}) {
    this.options = {
      pollingInterval: 100,
      useMutationObserver: true,
      ...options
    }

    this.observers = new Map()
    this.callbacks = new Map()

    // 使用原生ResizeObserver（如果可用）
    if (typeof ResizeObserver !== 'undefined') {
      this.useNative = true
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const callbacks = this.callbacks.get(entry.target)
          if (callbacks) {
            const { width, height } = entry.contentRect
            callbacks.forEach((cb) => cb({ width, height }))
          }
        }
      })
    }
    // 降级方案
    else {
      this.useNative = false
      this.observeFallback = this.observeFallback.bind(this)
      this.unobserveFallback = this.unobserveFallback.bind(this)
    }
  }

  // 监听元素尺寸变化
  observe(element, callback) {
    if (!element || typeof callback !== 'function') return

    // 初始化元素数据
    if (!this.callbacks.has(element)) {
      this.callbacks.set(element, new Set())

      // 保存初始尺寸
      const rect = element.getBoundingClientRect()
      this.observers.set(element, {
        width: rect.width,
        height: rect.height,
        visible: this.isVisible(element)
      })
    }

    // 添加回调
    this.callbacks.get(element).add(callback)

    // 使用原生ResizeObserver
    if (this.useNative) {
      this.observer.observe(element)
    }
    // 使用降级方案
    else {
      this.observeFallback(element)
    }
  }

  // 取消监听
  unobserve(element, callback) {
    if (!this.callbacks.has(element)) return

    const callbacks = this.callbacks.get(element)

    // 移除特定回调
    if (callback) {
      callbacks.delete(callback)
    }
    // 移除所有回调
    else {
      callbacks.clear()
    }

    // 如果没有回调了，则完全移除
    if (callbacks.size === 0) {
      this.callbacks.delete(element)
      this.observers.delete(element)

      if (this.useNative) {
        this.observer.unobserve(element)
      } else {
        this.unobserveFallback(element)
      }
    }
  }

  // 断开所有监听
  disconnect() {
    if (this.useNative) {
      this.observer.disconnect()
    } else {
      for (const element of this.callbacks.keys()) {
        this.unobserveFallback(element)
      }
    }

    this.callbacks.clear()
    this.observers.clear()
  }

  // 降级方案：监听元素
  observeFallback(element) {
    const data = this.observers.get(element)
    if (data.interval) return // 已经在监听

    // 轮询检查尺寸变化
    data.interval = setInterval(() => {
      const rect = element.getBoundingClientRect()
      const visible = this.isVisible(element)

      // 检查尺寸变化或可见性变化
      if (rect.width !== data.width || rect.height !== data.height || visible !== data.visible) {
        const callbacks = this.callbacks.get(element)
        if (callbacks) {
          callbacks.forEach((cb) =>
            cb({
              width: rect.width,
              height: rect.height
            })
          )
        }

        // 更新存储的尺寸
        data.width = rect.width
        data.height = rect.height
        data.visible = visible
      }
    }, this.options.pollingInterval)

    // 使用MutationObserver监听DOM变化
    if (this.options.useMutationObserver && typeof MutationObserver !== 'undefined') {
      data.mutationObserver = new MutationObserver(() => {
        // DOM变化时强制检查
        const rect = element.getBoundingClientRect()
        if (rect.width !== data.width || rect.height !== data.height) {
          const callbacks = this.callbacks.get(element)
          if (callbacks) {
            callbacks.forEach((cb) =>
              cb({
                width: rect.width,
                height: rect.height
              })
            )
          }
          data.width = rect.width
          data.height = rect.height
        }
      })

      data.mutationObserver.observe(element, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      })
    }
  }

  // 降级方案：取消监听
  unobserveFallback(element) {
    const data = this.observers.get(element)
    if (!data) return

    if (data.interval) {
      clearInterval(data.interval)
      delete data.interval
    }

    if (data.mutationObserver) {
      data.mutationObserver.disconnect()
      delete data.mutationObserver
    }
  }

  // 检查元素是否可见
  isVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0 && window.getComputedStyle(element).display !== 'none'
  }
}

// 初始化插件
// const resizeObserver = new DomResizeObserver()
