<template>
  <div class="guide-content">
    <h1 class="content-title">介绍</h1>
    
    <p>ES-EUI 是一套基于 Vue 2.0 和 Element UI 的企业级组件库，旨在帮助开发者快速构建中后台管理系统。它提供了丰富的表单、表格、弹窗等常用组件，以及组件之间的联动解决方案。</p>

    <h2 class="content-subtitle">特性</h2>
    <ul>
      <li><strong>配置化开发</strong> - 通过 JSON 配置快速生成表单和表格，减少重复代码</li>
      <li><strong>组件丰富</strong> - 提供 EsTable、EsForm、useDialog 等核心组件</li>
      <li><strong>联动支持</strong> - 表格与表单无缝联动，查询、编辑一体化</li>
      <li><strong>灵活扩展</strong> - 支持自定义渲染、插槽扩展，满足个性化需求</li>
      <li><strong>TypeScript 支持</strong> - 完整的类型定义，提供更好的开发体验</li>
    </ul>

    <h2 class="content-subtitle">组件概览</h2>
    
    <h3>EsTable 表格组件</h3>
    <p>基于 Element UI Table 封装，增加了以下功能：</p>
    <ul>
      <li>自动数据请求和分页处理</li>
      <li>列配置化定义，支持自定义渲染</li>
      <li>行内编辑和批量操作</li>
      <li>表格头部插槽，可嵌入查询表单</li>
      <li>跨页选择记忆</li>
    </ul>

    <h3>EsForm 表单组件</h3>
    <p>配置化表单生成器，支持 20+ 种控件类型：</p>
    <ul>
      <li>Input、Select、DatePicker 等基础控件</li>
      <li>级联选择、树形选择、上传组件</li>
      <li>动态表单和条件渲染</li>
      <li>自动验证和错误提示</li>
      <li>表单与表格联动</li>
    </ul>

    <h3>useDialog 弹窗</h3>
    <p>函数式弹窗调用，支持 JSX 渲染：</p>
    <ul>
      <li>支持在弹窗中渲染任意组件</li>
      <li>获取弹窗内组件引用</li>
      <li>支持嵌套弹窗</li>
      <li>灵活的按钮配置</li>
    </ul>

    <h2 class="content-subtitle">兼容性</h2>
    <ul>
      <li>Vue 2.6+</li>
      <li>Element UI 2.15+</li>
      <li>现代浏览器（Chrome、Firefox、Safari、Edge）</li>
    </ul>

    <h2 class="content-subtitle">版本记录</h2>
    <table class="table-props">
      <thead>
        <tr>
          <th>版本</th>
          <th>发布日期</th>
          <th>更新内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>v1.0.0</td>
          <td>2024-01</td>
          <td>初始版本，包含 EsTable、EsForm、useDialog 核心组件</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GuideIntroduction'
}
</script>
