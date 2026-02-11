// directives/draggable.js
const draggable = {
    inserted(el) {
        const header = el.querySelector('.el-dialog__header');
        if (!header) return;

        let isDragging = false;
        let startX = 0, startY = 0;
        let startLeft = 0, startTop = 0;
        let rafId = null;

        // 获取对话框元素
        const dialogEl = el.querySelector('.el-dialog');
        if (!dialogEl) return;

        // 工具函数：获取实时位置
        const getDialogPosition = () => {
            const rect = dialogEl.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(dialogEl);
            const left = parseFloat(computedStyle.left) || rect.left;
            const top = parseFloat(computedStyle.top) || rect.top;
            return {
                left: left,
                top: top,
                width: rect.width,
                height: rect.height
            };
        };

        // 工具函数：限制边界
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        // 更新位置（使用 RAF）
        const updatePosition = (x, y) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const { width, height } = getDialogPosition();
                const maxX = window.innerWidth - width;
                const maxY = window.innerHeight - height;

                const clampedX = clamp(x, 0, maxX);
                const clampedY = clamp(y, 0, maxY);

                // 确保弹窗是绝对定位，兼容 flex 居中布局
                if (window.getComputedStyle(dialogEl).position === 'relative' || 
                    window.getComputedStyle(dialogEl).position === 'static') {
                    dialogEl.style.position = 'absolute';
                }
                
                dialogEl.style.left = `${clampedX}px`;
                dialogEl.style.top = `${clampedY}px`;
                dialogEl.style.margin = '0'; // 清除默认居中 margin
                dialogEl.style.transform = 'none'; // 移除 flex 居中的 transform
            });
        };

        // 鼠标/触摸事件处理
        const handleStart = (e) => {
            const event = e.touches ? e.touches[0] : e;
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;

            const { left, top } = getDialogPosition();
            startLeft = left;
            startTop = top;

            // 如果弹窗是相对定位或静态定位（flex 居中情况），转换为绝对定位
            const computedStyle = window.getComputedStyle(dialogEl);
            if (computedStyle.position === 'relative' || computedStyle.position === 'static') {
                dialogEl.style.position = 'absolute';
                dialogEl.style.left = `${left}px`;
                dialogEl.style.top = `${top}px`;
                dialogEl.style.transform = 'none';
                dialogEl.style.margin = '0';
            }

            // 禁用文本选择
            document.body.style.userSelect = 'none';
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            const event = e.touches ? e.touches[0] : e;
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;
            updatePosition(startLeft + deltaX, startTop + deltaY);
        };

        const handleEnd = () => {
            isDragging = false;
            document.body.style.userSelect = '';
        };

        // 绑定事件
        header.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        // 移动端支持
        header.addEventListener('touchstart', handleStart, { passive: true });
        document.addEventListener('touchmove', handleMove, { passive: true });
        document.addEventListener('touchend', handleEnd);

        // 清理函数
        el._draggableCleanup = () => {
            header.removeEventListener('mousedown', handleStart);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            header.removeEventListener('touchstart', handleStart);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
            cancelAnimationFrame(rafId);
        };
    },
    unbind(el) {
        if (el._draggableCleanup) {
            el._draggableCleanup();
        }
    }
};

export default draggable;