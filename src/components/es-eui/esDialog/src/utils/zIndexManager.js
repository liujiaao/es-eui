/**
 * 统一的 zIndex 管理器
 * 为不同类型的组件分配不同的 zIndex 范围，避免层级冲突
 *
 * zIndex 范围分配：
 * - Dialog: 2000-2999
 * - Message/Notification: 3000-3999
 * - Tooltip/Popover: 4000-4999
 * - 其他组件: 5000+
 */

// 引入 Element UI 的 PopupManager
import { PopupManager } from 'element-ui/lib/utils/popup'

// 定义各组件类型的 zIndex 范围
const Z_INDEX_RANGES = {
    DIALOG: { min: 2000, max: 2999 },
    MESSAGE: { min: 3000, max: 3999 },
    TOOLTIP: { min: 4000, max: 4999 },
    OTHER: { min: 5000, max: 9999 }
}

// 当前各类型组件的 zIndex 计数器
const currentIndex = {
    DIALOG: Z_INDEX_RANGES.DIALOG.min,
    MESSAGE: Z_INDEX_RANGES.MESSAGE.min,
    TOOLTIP: Z_INDEX_RANGES.TOOLTIP.min,
    OTHER: Z_INDEX_RANGES.OTHER.min
}

/**
 * 获取指定类型的下一个 zIndex
 * @param {string} type - 组件类型 (MESSAGE, DIALOG, TOOLTIP, OTHER)
 * @returns {number} zIndex 值
 */
export function getNextZIndex(type = 'OTHER') {
    // 如果类型不在预定义范围内，使用 OTHER 类型
    if (!Z_INDEX_RANGES[type]) {
        type = 'OTHER'
    }

    // 增加对应类型的计数器
    currentIndex[type]++

    // 如果超出范围，重置为最小值
    if (currentIndex[type] > Z_INDEX_RANGES[type].max) {
        currentIndex[type] = Z_INDEX_RANGES[type].min
    }

    return currentIndex[type]
}

/**
 * 获取当前最大的 zIndex 值
 * @returns {number} 当前页面中最大的 zIndex 值
 */
export function getMaxZIndex() {
    // 获取页面中所有具有 zIndex 样式的元素
    const elements = document.querySelectorAll('*')
    let maxZ = 0

    elements.forEach(el => {
        const zIndex = parseInt(getComputedStyle(el).zIndex, 10)
        if (!isNaN(zIndex)) {
            maxZ = Math.max(maxZ, zIndex)
        }
    })

    return maxZ
}

/**
 * 确保 zIndex 高于指定值
 * @param {number} targetZ - 目标 zIndex 值
 * @param {string} type - 组件类型
 * @returns {number} 调整后的 zIndex 值
 */
export function ensureZIndexAbove(targetZ, type = 'OTHER') {
    const nextZ = getNextZIndex(type)
    return Math.max(nextZ, targetZ + 1)
}

/**
 * 为 Dialog 组件获取 zIndex
 * @returns {number} Dialog 组件的 zIndex 值
 */
export function getDialogZIndex() {
    return getNextZIndex('DIALOG')
}

/**
 * 为 Message/Notification 组件获取 zIndex
 * @returns {number} Message/Notification 组件的 zIndex 值
 */
export function getMessageZIndex() {
    return getNextZIndex('MESSAGE')
}

/**
 * 为 Tooltip/Popover 组件获取 zIndex
 * @returns {number} Tooltip/Popover 组件的 zIndex 值
 */

/**
 * 获取高于父元素的 zIndex 值
 * @param {HTMLElement} parentElement - 父元素
 * @param {string} type - 组件类型
 * @returns {number} 高于父元素的 zIndex 值
 */
export function getZIndexAboveParent(parentElement, type = 'DIALOG') {
    if (!parentElement) {
        return getNextZIndex(type)
    }

    // 查找最近的弹窗父元素
    let currentParent = parentElement
    let parentZIndex = 0

    // 向上查找，直到找到具有 zIndex 的元素或到达 document
    while (currentParent && currentParent !== document) {
        const zIndex = parseInt(getComputedStyle(currentParent).zIndex, 10)
        if (!isNaN(zIndex) && zIndex > 0) {
            parentZIndex = zIndex
            break
        }
        currentParent = currentParent.parentElement
    }

    // 如果没有找到有效的父级 zIndex，使用默认方式获取 zIndex
    if (parentZIndex === 0) {
        return getNextZIndex(type)
    }

    // 返回高于父元素 zIndex 的值
    return parentZIndex + 1
}

export function getTooltipZIndex() {
    return getNextZIndex('TOOLTIP')
}

/**
 * 置顶指定元素
 * @param {HTMLElement} element - 要置顶的元素
 * @param {string} type - 组件类型
 */
export function bringToFront(element, type = 'OTHER') {
    if (element) {
        element.style.zIndex = getNextZIndex(type)
    }
}

/**
 * 重置 zIndex 计数器
 */
export function resetZIndexCounters() {
    Object.keys(currentIndex).forEach(type => {
        currentIndex[type] = Z_INDEX_RANGES[type].min
    })
}

// 导出默认对象以保持向后兼容
export default {
    getNextZIndex,
    getMaxZIndex,
    ensureZIndexAbove,
    getDialogZIndex,
    getMessageZIndex,
    getTooltipZIndex,
    getZIndexAboveParent,
    bringToFront,
    resetZIndexCounters,
    Z_INDEX_RANGES,
    currentIndex
}
