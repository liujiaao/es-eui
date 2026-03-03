<template>
  <div class="docs-container">
    <!-- Hero Section -->
    <section class="modern-hero">
      <div class="hero-badge">
        <i class="el-icon-s-data" />
        <span>核心组件</span>
      </div>
      <h1 class="hero-title">EsTable 表格组件</h1>
      <p class="hero-desc">
        企业级高性能表格组件，支持自动数据请求、分页管理、列渲染、条件查询联动等特性，
        让数据展示开发效率提升 80%
      </p>
    </section>

    <!-- Quick Start Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon blue">
          <i class="el-icon-time" />
        </div>
        <h2 class="section-title">快速开始</h2>
      </div>
      <p class="section-desc">最简单的表格用法，只需配置数据源和列定义：</p>
 
    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">基础表格</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="basicData"
          :columns="basicColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene1 }">
        <div class="code-header" @click="toggleCode('scene1')">
          <i :class="codeExpanded.scene1 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene1 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene1"><code>{{ basicExample }}</code></pre>
      </div>
    </div>
    </section>

    <!-- Core Features Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon purple">
          <i class="el-icon-s-opportunity" />
        </div>
        <h2 class="section-title">核心特性详解</h2>
      </div>

      <h3>1. 自动数据请求（推荐）</h3>
    <p>通过 <code>apiParams</code> 配置，表格自动处理数据请求、分页、加载状态，无需手动维护：</p>
    
    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">全自动数据表格</span>
        <span class="demo-block__badge">企业级实战</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="autoData"
          :columns="autoColumns"
          :pagination="autoPagination"
          :options="autoOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
        <div class="code-header" @click="toggleCode('scene2')">
          <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene2"><code>{{ autoRequestExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--success">
      <h4>💡 最佳实践</h4>
      <ul>
        <li>使用 <code>.sync</code> 修饰符保持数据双向同步</li>
        <li>通过 <code>configTableOut</code> 映射后端返回字段，无需修改接口</li>
        <li><code>brcb</code> 回调可在请求前格式化参数</li>
        <li><code>qrcb</code> 回调可处理响应数据</li>
      </ul>
    </div>

    <h3>2. 自定义请求实例</h3>
    <p>当需要统一处理请求头、错误处理、Loading 时，配置 <code>httpRequest</code>：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">自定义请求实例演示</span>
        <span class="demo-block__badge">实战技巧</span>
      </div>
      <div class="demo-block__body">
        <p style="margin-bottom: 10px; color: #606266; font-size: 14px;">
          <i class="el-icon-info" style="color: #409eff;"></i>
          此示例使用自定义 httpRequest 拦截请求，添加统一的请求头处理
        </p>
        <es-table
          :data-source.sync="customHttpData"
          :columns="customHttpColumns"
          :pagination="customHttpPagination"
          :options="customHttpOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
        <div class="code-header" @click="toggleCode('scene3')">
          <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene3"><code>{{ customHttpExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--success">
      <h4>💡 自定义 httpRequest 使用场景</h4>
      <ul>
        <li><strong>统一鉴权</strong>：在请求头中自动添加 Token</li>
        <li><strong>错误处理</strong>：统一处理 401、403 等状态码</li>
        <li><strong>请求/响应拦截</strong>：对请求参数和响应数据进行统一处理</li>
        <li><strong>解决跨域</strong>：通过配置 credentials、headers 等解决跨域问题</li>
      </ul>
    </div>

    <h3>3. 列渲染 - Render 函数</h3>
    <p>支持 JSX 和 createElement 两种写法，灵活渲染自定义内容：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">Render 列渲染</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="renderData"
          :columns="renderColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
        <div class="code-header" @click="toggleCode('scene4')">
          <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene4"><code>{{ renderColumnExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--warning">
      <h4>⚠️ 重要提示</h4>
      <p>Render 函数参数顺序为：<code>(h, { row, index, instance })</code></p>
      <ul>
        <li><code>h</code> - createElement 函数</li>
        <li><code>row</code> - 当前行数据</li>
        <li><code>index</code> - 行索引</li>
        <li><code>instance</code> - 表格组件实例，可调用表格方法</li>
      </ul>
    </div>

    <h3>4. 表格与表单联动查询</h3>
    <p>EsTable 与 EsForm 完美配合，实现条件查询：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">表格表单联动</span>
        <span class="demo-block__badge">高频使用</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="linkageData"
          :columns="linkageColumns"
          :pagination="linkagePagination"
          :options="linkageOptions"
        >
          <es-form
            :form-item-list="linkageFormConfig"
            :model="linkageFormData"
            :layout-form-props="linkageLayoutProps"
            :config-btn="linkageConfigBtn"
          />
        </es-table>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
        <div class="code-header" @click="toggleCode('scene5')">
          <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene5"><code>{{ linkageExample }}</code></pre>
      </div>
    </div>

    <h3>5. 跨页选择记忆</h3>
    <p>开启 <code>multiSelect</code> 和 <code>cachePageSelection</code>，实现跨页多选记忆功能：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">跨页选择记忆演示</span>
        <span class="demo-block__badge">企业级功能</span>
      </div>
      <div class="demo-block__body">
        <div style="margin-bottom: 15px; padding: 10px; background: #f5f7fa; border-radius: 4px;">
          <el-tag type="success" style="margin-right: 10px;">
            <i class="el-icon-check" /> 已选择 {{ selectedRows.length }} 项
          </el-tag>
          <el-button size="small" type="primary" plain @click="handleClearSelection">
            <i class="el-icon-delete" /> 清空选择
          </el-button>
          <el-button size="small" type="info" plain @click="getSelectedData">
            <i class="el-icon-view" /> 查看选中项
          </el-button>
        </div>
        <es-table
          ref="multiSelectTable"
          :data-source.sync="multiSelectData"
          :columns="multiSelectColumns"
          :pagination="multiSelectPagination"
          :options="multiSelectOptions"
          @selection-change="handleSelectionChange"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneMultiSelect }">
        <div class="code-header" @click="toggleCode('sceneMultiSelect')">
          <i :class="codeExpanded.sceneMultiSelect ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneMultiSelect ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneMultiSelect"><code>{{ multiSelectExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--success">
      <h4>💡 跨页选择记忆使用说明</h4>
      <ul>
        <li><strong>multiSelect</strong>：开启多选功能，表格左侧显示复选框</li>
        <li><strong>cachePageSelection</strong>：开启跨页记忆，切换分页时保留已选项</li>
        <li><strong>rowkey</strong>：必须配置，指定行唯一标识键（如 'id'），用于跨页识别同一行</li>
        <li><strong>multipleSelection</strong>：组件内部属性，获取当前选中的所有行数据（包括其他页）</li>
        <li><strong>clearAllSelection()</strong>：清空所有选择（跨页）</li>
        <li><strong>selection-change</strong>：事件返回当前页选中的行，但组件内部会维护跨页状态</li>
      </ul>
    </div>

    <h3>6. 操作列与表格实例</h3>
    <p>通过 instance 获取表格实例，调用方法（刷新、获取选中项等）：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">操作列示例</span>
      </div>
      <div class="demo-block__body">
        <es-table
          ref="actionTable"
          :data-source="actionData"
          :columns="actionColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
        <div class="code-header" @click="toggleCode('scene6')">
          <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene6"><code>{{ actionColumnExample }}</code></pre>
      </div>
    </div>

    <h3>7. 多级表头（复杂嵌套）</h3>
    <p>通过 <code>groups</code> 属性实现多级表头，支持任意层级的嵌套：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">复杂多级表头演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="groupColumnData"
          :columns="groupColumnColumns"
          :options="{ border: true }"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneGroupColumn }">
        <div class="code-header" @click="toggleCode('sceneGroupColumn')">
          <i :class="codeExpanded.sceneGroupColumn ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneGroupColumn ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneGroupColumn"><code>{{ groupColumnExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 多级表头配置说明</h4>
      <ul>
        <li><strong>groups</strong>：用于定义子列，值为数组类型，每个元素对应一个子列配置</li>
        <li><strong>嵌套层级</strong>：groups 内部可以继续使用 groups，实现任意层级的多级表头</li>
        <li><strong>列配置</strong>：子列支持普通列的所有配置，如 key、label、width、render 等</li>
        <li><strong>数据绑定</strong>：子列的 key 支持点号语法（如 <code>score.chinese</code>）访问嵌套数据</li>
      </ul>
    </div>

    <h3>8. 展开行</h3>
    <p>通过 <code>expand</code> 选项和 <code>expandRender</code> 函数实现展开行功能，展示更多详情信息：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">展开行演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="expandRowData"
          :columns="expandRowColumns"
          :options="expandRowOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneExpandRow }">
        <div class="code-header" @click="toggleCode('sceneExpandRow')">
          <i :class="codeExpanded.sceneExpandRow ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneExpandRow ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneExpandRow"><code>{{ expandRowExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 展开行配置说明</h4>
      <ul>
        <li><strong>展开列</strong>：在列配置中设置 <code>type: 'expand'</code> 和 <code>render</code> 函数</li>
        <li><strong>render</strong>：通过 render 函数自定义展开行内容，参数为 <code>(h, { row, index })</code></li>
        <li><strong>rowKey</strong>：必须设置，用于展开行的唯一标识（如 <code>rowKey: 'id'</code>）</li>
        <li><strong>expandRowKeys</strong>：控制默认展开的行，值为行 key 数组（如 <code>['1', '2']</code> 只展开 id 为 1 和 2 的行）</li>
        <li><strong>展开所有行</strong>：设置 <code>expand: true</code> 可展开所有行（不推荐，数据量大时影响性能）</li>
      </ul>
    </div>

    <h3>9. 树形表格</h3>
    <p>通过配置 <code>treeProps</code> 实现树形表格展示，支持默认展开和懒加载模式：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">树形表格演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="treeTableData"
          :columns="treeTableColumns"
          :options="treeTableOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneTreeTable }">
        <div class="code-header" @click="toggleCode('sceneTreeTable')">
          <i :class="codeExpanded.sceneTreeTable ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneTreeTable ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneTreeTable"><code>{{ treeTableExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 树形表格配置说明</h4>
      <ul>
        <li><strong>rowKey</strong>：必须设置，用于树形表格的唯一标识（如 <code>rowKey: 'id'</code>）</li>
        <li><strong>treeProps</strong>：配置树形属性，默认值 <code>{ children: 'children', hasChildren: 'hasChildren' }</code></li>
        <li><strong>defaultExpandAll</strong>：默认展开所有节点（数据量大时会影响性能）</li>
        <li><strong>懒加载模式</strong>：设置 <code>lazy: true</code> + <code>lazyLoad</code> 回调，实现点击展开时动态加载子节点</li>
        <li><strong>lazyLoad(row, treeNode, resolve)</strong>：懒加载回调，row 为当前行数据，treeNode 为树节点信息，resolve 为数据加载完成的回调</li>
      </ul>
    </div>

    <h3>10. 懒加载树形表格</h3>
    <p>当数据量较大时，可以使用懒加载模式，点击展开节点时才加载子节点数据：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">懒加载树形表格演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <p style="margin-bottom: 10px; color: #606266; font-size: 14px;">
          <i class="el-icon-info" style="color: #409eff;"></i>
          点击组织名称左侧的展开图标，模拟异步加载子节点（延迟 500ms）
        </p>
        <es-table
          :data-source="lazyTreeData"
          :columns="lazyTreeColumns"
          :options="lazyTreeOptions"
          @expand-change="handleTreeExpandChange"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneLazyTree }">
        <div class="code-header" @click="toggleCode('sceneLazyTree')">
          <i :class="codeExpanded.sceneLazyTree ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneLazyTree ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneLazyTree"><code>{{ lazyLoadTreeExample }}</code></pre>
      </div>
    </div>

    <h3>11. 合并行或列</h3>
    <p>通过 <code>span-method</code> 合并方法实现单元格的行/列合并，适用于报表类数据展示：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">合并单元格演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="mergeCellsData"
          :columns="mergeCellsColumns"
          :options="mergeCellsOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneMergeCells }">
        <div class="code-header" @click="toggleCode('sceneMergeCells')">
          <i :class="codeExpanded.sceneMergeCells ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneMergeCells ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneMergeCells"><code>{{ mergeCellsExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 合并单元格配置说明</h4>
      <ul>
        <li><strong>span-method</strong>：合并方法，参数为 <code>({ row, column, rowIndex, columnIndex })</code></li>
        <li><strong>返回值</strong>：返回 <code>{ rowspan, colspan }</code> 对象</li>
        <li><strong>rowspan: 0, colspan: 0</strong>：表示隐藏当前单元格</li>
        <li><strong>rowspan: n, colspan: 1</strong>：纵向合并 n 行</li>
        <li><strong>rowspan: 1, colspan: n</strong>：横向合并 n 列</li>
        <li><strong>动态样式</strong>：还可通过返回值设置 <code>style</code> 属性自定义样式</li>
      </ul>
    </div>

    <h3>12. 复杂合并示例</h3>
    <p>实现多列同时合并，适用于有层级关系的复杂报表：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">复杂多列合并演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="complexMergeData"
          :columns="complexMergeColumns"
          :options="complexMergeOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneComplexMerge }">
        <div class="code-header" @click="toggleCode('sceneComplexMerge')">
          <i :class="codeExpanded.sceneComplexMerge ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneComplexMerge ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneComplexMerge"><code>{{ complexMergeExample }}</code></pre>
      </div>
    </div>

    <h3>13. 表格按钮配置</h3>
    <p>通过 <code>configBtn</code> 配置表格顶部的操作按钮，支持左侧/右侧布局：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">表格按钮配置演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source="configBtnData"
          :columns="configBtnColumns"
          :options="configBtnOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneConfigBtn }">
        <div class="code-header" @click="toggleCode('sceneConfigBtn')">
          <i :class="codeExpanded.sceneConfigBtn ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneConfigBtn ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneConfigBtn"><code>{{ configBtnExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 configBtn 配置说明</h4>
      <ul>
        <li><strong>code</strong>：按钮位置，1 = 左侧，2 = 右侧</li>
        <li><strong>name</strong>：按钮文字</li>
        <li><strong>type</strong>：按钮类型（primary, warning, danger, info, text）</li>
        <li><strong>size</strong>：按钮尺寸（medium, small, mini）</li>
        <li><strong>icon</strong>：按钮图标（el-icon-xxx）</li>
        <li><strong>click</strong>：点击回调函数 (formInstance, $parent) => {}</li>
        <li><strong>disabled</strong>：禁用状态，可为 Boolean 或 Function</li>
        <li><strong>isHide</strong>：隐藏状态，可为 Boolean 或 Function</li>
        <li><strong>loading</strong>：加载状态 Boolean</li>
        <li><strong>leftText</strong>：左侧显示的静态文字</li>
      </ul>
    </div>

    <h3>14. 继承父容器高度</h3>
    <p>当表格需要填满父容器时，设置 <code>tabHeight: '100%', heightType: 'height' | 'max-height'</code> 让表格自动继承父容器高度：</p>

    <div class="demo-block">
      <div class="demo-block__header">
        <span class="demo-block__title">继承父容器高度演示</span>
        <span class="demo-block__badge">高级特性</span>
      </div>
      <div class="demo-block__body" style="height: 400px;">
        <es-table
          :data-source="fullHeightData"
          :columns="fullHeightColumns"
          :options="fullHeightOptions"
        />
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.sceneFullHeight }">
        <div class="code-header" @click="toggleCode('sceneFullHeight')">
          <i :class="codeExpanded.sceneFullHeight ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.sceneFullHeight ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.sceneFullHeight"><code>{{ fullHeightExample }}</code></pre>
      </div>
    </div>

    <div class="tips-box tips-box--info">
      <h4>📋 继承父容器高度配置说明</h4>
      <ul>
        <li><strong>tabHeight: '100%'</strong>：设置高度为 100%，让表格继承父容器高度</li>
        <li><strong>heightType</strong>：高度类型，通常配合 'max-height' 或  'height' 使用</li>
        <li><strong>父容器要求</strong>：父容器必须设置具体高度（如 400px、50vh 等）</li>
        <li><strong>适用场景</strong>：后台管理系统中，表格需要占据剩余空间的场景</li>
      </ul>
    </div>

    </section>

    <!-- Real World Examples Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon green">
          <i class="el-icon-s-check" />
        </div>
        <h2 class="section-title">实战场景示例</h2>
      </div>

      <h3>场景一：完整的管理表格（增删改查 + 条件查询）</h3>
    <div class="demo-block demo-block--full">
      <div class="demo-block__header">
        <span class="demo-block__title">政策管理表格（实战案例）</span>
        <span class="demo-block__badge">生产级</span>
      </div>
      <div class="demo-block__body">
        <es-table
          :data-source.sync="policyData"
          :columns="policyColumns"
          :pagination="policyPagination"
          :options="policyOptions"
        >
          <es-form
            :form-item-list="policyFormConfig"
            :model="policyFormData"
            :layout-form-props="policyLayoutProps"
            :config-btn="policyConfigBtn"
          />
        </es-table>
      </div>
      <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
        <div class="code-header" @click="toggleCode('scene7')">
          <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
        </div>
        <pre v-show="codeExpanded.scene7"><code>{{ realWorldExample }}</code></pre>
      </div>
    </div>

    </section>

    <!-- API Documentation Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon orange">
          <i class="el-icon-document" />
        </div>
        <h2 class="section-title">API 文档</h2>
      </div>

      <h3>Props</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>dataSource</td>
          <td>表格数据源，推荐配合 .sync 使用</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>列配置数组</td>
          <td>Array</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>pagination</td>
          <td>分页配置 { pageIndex, pageSize, total }</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>options</td>
          <td>表格选项配置（详见下方 Options 配置）</td>
          <td>Object</td>
          <td>{}</td>
        </tr>
      </tbody>
    </table>

    <h3>Options 配置</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>apiParams</td>
          <td>自动请求配置 { url, method, model, headers, options }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>configTableOut</td>
          <td>响应字段映射 { total, pageSize, current, tableData }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>httpRequest</td>
          <td>自定义请求函数 (params) => Promise</td>
          <td>Function</td>
          <td>-</td>
        </tr>
        <tr>
          <td>listenToCallBack</td>
          <td>请求生命周期 { brcb: (params)=>{}, qrcb: (res)=>{} }</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>isInitRun</td>
          <td>初始化时是否自动请求</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>border</td>
          <td>是否显示边框</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>表格尺寸</td>
          <td>String</td>
          <td>'small'</td>
        </tr>
        <tr>
          <td>tabHeight</td>
          <td>表格高度(px)，配合 heightType 使用</td>
          <td>Number</td>
          <td>-</td>
        </tr>
        <tr>
          <td>heightType</td>
          <td>高度类型：'height' | 'max-height'</td>
          <td>String</td>
          <td>'max-height'</td>
        </tr>
        <tr>
          <td>multiSelect</td>
          <td>是否支持多选</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>cachePageSelection</td>
          <td>跨页记忆选中项</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
      </tbody>
    </table>

    <h3>Column 配置</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>key / prop</td>
          <td>字段名</td>
          <td>String</td>
        </tr>
        <tr>
          <td>label</td>
          <td>列标题</td>
          <td>String</td>
        </tr>
        <tr>
          <td>width</td>
          <td>列宽度</td>
          <td>String/Number</td>
        </tr>
        <tr>
          <td>fixed</td>
          <td>固定列：'left' | 'right'</td>
          <td>String</td>
        </tr>
        <tr>
          <td>render</td>
          <td>自定义渲染函数 (h, { row, index, instance }) => VNode</td>
          <td>Function</td>
        </tr>
        <tr>
          <td>hidCol</td>
          <td>是否隐藏列</td>
          <td>Boolean</td>
        </tr>
      </tbody>
    </table>

    <h3>Methods</h3>
    <table class="table-props">
      <thead>
        <tr>
          <th>方法名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>httpRquestInstace</td>
          <td>手动触发数据请求（用于刷新）</td>
          <td>-</td>
        </tr>
        <tr>
          <td>clearAllSelection</td>
          <td>清空所有选中项</td>
          <td>-</td>
        </tr>
        <tr>
          <td>toggleSelection</td>
          <td>切换行选中状态</td>
          <td>rows</td>
        </tr>
      </tbody>
    </table>

    </section>

    <!-- Development Guidelines Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon cyan">
          <i class="el-icon-s-management" />
        </div>
        <h2 class="section-title">开发规范与建议</h2>
      </div>

      <div class="tips-box tips-box--info">
      <h4>📋 开发规范</h4>
      <ol>
        <li><strong>字段命名</strong>：后端返回字段与前端不一致时，使用 configTableOut 映射，不修改后端接口</li>
        <li><strong>请求封装</strong>：统一配置 httpRequest，集中处理 Token、错误提示、Loading</li>
        <li><strong>按钮操作</strong>：操作列通过 instance.httpRquestInstace() 刷新表格，不直接修改数据源</li>
        <li><strong>日期范围</strong>：使用 brcb 回调将日期范围拆分为 start/end 两个字段传给后端</li>
        <li><strong>性能优化</strong>：大数据量时设置 tabHeight 固定表格高度，启用虚拟滚动</li>
      </ol>
    </div>
    </section>

    <!-- Next Steps Section -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon green">
          <i class="el-icon-right" />
        </div>
        <h2 class="section-title">下一步</h2>
      </div>
      <p class="section-desc">继续学习其他组件，掌握更多功能：</p>

      <div class="next-links">
        <router-link to="/component/esform" class="next-card">
          <div class="next-icon purple">
            <i class="el-icon-s-order" />
          </div>
          <div class="next-info">
            <h3>EsForm 表单组件</h3>
            <p>学习配置化表单的各种控件类型</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>

        <router-link to="/component/esdialog" class="next-card">
          <div class="next-icon orange">
            <i class="el-icon-s-claim" />
          </div>
          <div class="next-info">
            <h3>useDialog 弹窗</h3>
            <p>掌握函数式弹窗的使用方法</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>

        <router-link to="/component/combination" class="next-card">
          <div class="next-icon cyan">
            <i class="el-icon-link" />
          </div>
          <div class="next-info">
            <h3>组合联动</h3>
            <p>了解组件间的组合使用方式</p>
          </div>
          <i class="el-icon-arrow-right" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import {
  basicExample,
  autoRequestExample,
  customHttpExample,
  renderColumnExample,
  linkageExample,
  multiSelectExample,
  actionColumnExample,
  groupColumnExample,
  expandRowExample,
  treeTableExample,
  lazyLoadTreeExample,
  mergeCellsExample,
  complexMergeExample,
  configBtnExample,
  fullHeightExample,
  realWorldExample
} from './examples/esTableExamples'

export default {
  name: 'EsTableDocs',
  data() {
    return {
      // 基础示例数据
      basicData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      basicColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱' }
      ],

      // 自动请求示例 - 使用真实免费 API (通过 httpRequest 配置解决跨域)
      autoData: [],
      autoColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'firstName', label: '名', width: 120 },
        { key: 'lastName', label: '姓', width: 120 },
        { key: 'email', label: '邮箱' },
        { 
          key: 'image', 
          label: '头像',
          width: 80,
          render: (h, { row }) => (
            <el-avatar size="small" src={row.image} />
          )
        }
      ],
      autoPagination: { pageIndex: 1, pageSize: 10, total: 0 },
      autoOptions: {
        isInitRun: true,
        border: true,
        tabHeight: 350,
        heightType: 'height',
        // 使用真实免费 API: https://dummyjson.com/users
        apiParams: {
          url: 'https://dummyjson.com/users',
          method: 'get'
        },
        // 使用 httpRequest 自定义请求，配置 withCredentials: false 解决跨域
       // httpRequest: (params) => this.fetchWithCORS(params),
        // 字段映射：适配 DummyJSON API 返回格式
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'users'
        },
        listenToCallBack: {
          brcb: (params) => {
            // DummyJSON 使用 skip 作为偏移量
            const { pageSize, pageIndex } = params
            return { 
              limit: pageSize,
              skip: (pageIndex - 1) * pageSize
            }
          },
          qrcb: (res) => {
            console.log('DummyJSON API 查询结果:', res)
          }
        }
      },

      // 自定义请求实例演示
      customHttpData: [],
      customHttpColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'title', label: '商品名称' },
        { key: 'brand', label: '品牌', width: 120 },
        { key: 'category', label: '分类', width: 120 },
        { 
          key: 'price', 
          label: '价格', 
          width: 100,
          render: (h, { row }) => (
            <span style="color: #f56c6c; font-weight: bold;">¥{row.price}</span>
          )
        },
        { 
          key: 'stock', 
          label: '库存', 
          width: 100,
          render: (h, { row }) => (
            <el-tag type={row.stock > 50 ? 'success' : 'warning'} size="small">{row.stock}</el-tag>
          )
        }
      ],
      customHttpPagination: { pageIndex: 1, pageSize: 10, total: 0 },
      customHttpOptions: {
        isInitRun: true,
        border: true,
        tabHeight: 350,
        heightType: 'height',
        size: 'mini',
        // 使用真实免费 API: https://dummyjson.com/products
        apiParams: {
          url: 'https://dummyjson.com/products',
          method: 'get'
        },
        // 自定义 httpRequest：展示如何统一处理请求头、错误等
        httpRequest: (params) => this.customHttpRequest(params),
        // 字段映射：适配 DummyJSON API 返回格式
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'products'
        },
        listenToCallBack: {
          brcb: (params) => {
            console.log('【自定义请求拦截】请求参数:', params)
            // 可以在这里添加统一的参数处理，如添加时间戳、签名等
            const { pageSize, pageIndex } = params
            return { 
              limit: pageSize,
              skip: (pageIndex - 1) * pageSize
            }
          },
          qrcb: (res) => {
            console.log('【自定义响应拦截】响应结果:', res)
            // 可以在这里添加统一的响应处理，如错误提示、数据转换等
            this.$message.success('数据加载成功（通过自定义 httpRequest）')
          }
        }
      },

      // Render 示例
      renderData: [
        { id: 1, name: '张三', status: '1', score: 85 },
        { id: 2, name: '李四', status: '0', score: 92 },
        { id: 3, name: '王五', status: '2', score: 78 }
      ],
      renderColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名' },
        {
          key: 'status',
          label: '状态',
          render: (h, { row }) => {
            const statusMap = {
              '0': { text: '草稿', type: 'info' },
              '1': { text: '已上架', type: 'success' },
              '2': { text: '已下架', type: 'danger' }
            }
            const status = statusMap[row.status]
            return <el-tag type={status.type}>{status.text}</el-tag>
          }
        },
        {
          key: 'score',
          label: '评分',
          render: (h, { row }) => {
            const color = row.score >= 90 ? '#67c23a' : row.score >= 80 ? '#e6a23c' : '#f56c6c'
            return (
              <div style="display: flex; align-items: center; gap: 10px;">
                <el-progress percentage={row.score} color={color} style="width: 100px;" />
                <span style={{ color }}>{row.score}分</span>
              </div>
            )
          }
        }
      ],

      // 联动查询示例 - 使用 JSONPlaceholder 免费 API
      linkageData: [],
      linkageColumns: [
        { key: 'id', label: '编号', width: 80 },
        { key: 'title', label: '标题' },
        { 
          key: 'userId', 
          label: '用户ID',
          width: 100,
          render: (h, { row }) => (
            <el-tag size="mini">用户{row.userId}</el-tag>
          )
        },
        { 
          key: 'body', 
          label: '内容',
          render: (h, { row }) => <span>{row.body.substring(0, 50) + '...'}</span>
        }
      ],
      linkagePagination: { pageIndex: 1, pageSize: 10, total: 0 },
      linkageOptions: {
        isInitRun: true,
        border: true,
        heightType: 'max-height',
        // 使用免费 API: https://jsonplaceholder.typicode.com/posts
        apiParams: { 
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'get',
          model: {}  // 绑定空模型，实际参数在 brcb 中处理
        },
        // JSONPlaceholder 返回数组，需要特殊处理
        configTableOut: { 
          total: 'total', 
          pageSize: 'pageSize', 
          current: 'pageIndex', 
          tableData: 'data' 
        },
        listenToCallBack: {
          brcb: (params) => {
            // 过滤空值参数，避免 API 返回空结果
            const result = {}
            
            // 只添加有值的参数
            if (params.userId && params.userId !== '') {
              result.userId = params.userId
            }
            
            // JSONPlaceholder 的 title 需要完全匹配，这里用 q 进行全文搜索
            if (params.title && params.title.trim()) {
              result.q = params.title.trim()
            }
            
            console.log('联动查询参数:', result)
            return result
          },
          qrcb: (res) => {
            // JSONPlaceholder 返回数组，需要包装成分页格式
            console.log('响应数据结构:', res)
            if (Array.isArray(res.data)) {
              return {
                data: res.data.slice(0, 10),
                total: 100,  // JSONPlaceholder 固定返回100条
                pageSize: 10,
                pageIndex: 1
              }
            }
            return res
          }
        }
      },
      linkageFormData: {
        userId: '',
        title: ''
      },
      linkageFormConfig: [
        {
          prop: 'userId',
          label: '用户ID',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择用户', clearable: true },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '用户1', value: '1' },
            { label: '用户2', value: '2' },
            { label: '用户3', value: '3' }
          ]
        },
        {
          prop: 'title',
          label: '标题搜索',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入标题关键词', clearable: true }
        },
        {
          prop: 'resetPlaceholder',
          label: '内容',
          span: 8,
          formtype: 'Input',
          attrs: { disabled: true }
        }
      ],
      linkageLayoutProps: {
        fromLayProps: { labelWidth: '80px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      linkageConfigBtn: [
        { name: '查询', type: 'primary', key: 'query', triggerEvent: true, icon: 'el-icon-search' },
        { name: '重置', key: 'rest', triggerEvent: true, icon: 'el-icon-refresh' }
      ],

      // 跨页选择记忆示例 - 使用 DummyJSON API
      selectedRows: [],
      multiSelectData: [],
      multiSelectColumns: [
        { type: 'selection', width: 55 },
        { key: 'id', label: 'ID', width: 80 },
        { key: 'firstName', label: '名', width: 100 },
        { key: 'lastName', label: '姓', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'gender', label: '性别', width: 80 },
        { key: 'email', label: '邮箱' }
      ],
      multiSelectPagination: { pageIndex: 1, pageSize: 5, total: 0 },
      multiSelectOptions: {
        isInitRun: true,
        border: true,
        multiSelect: true,           // 开启多选
        cachePageSelection: true,    // 开启跨页记忆
        rowkey: 'id',                // 必须：指定行唯一标识键
        size: 'small',
        apiParams: {
          url: 'https://dummyjson.com/users',
          method: 'get'
        },
        httpRequest: (params) => this.fetchWithCORS(params),
        configTableOut: {
          total: 'total',
          pageSize: 'limit',
          current: 'skip',
          tableData: 'users'
        },
        listenToCallBack: {
          brcb: (params) => ({
            limit: params.pageSize,
            skip: (params.pageIndex - 1) * params.pageSize
          })
        }
      },

      // 操作列示例
      actionData: [
        { id: 1, name: '政策A', status: '1' },
        { id: 2, name: '政策B', status: '0' }
      ],
      actionColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' },
        {
          key: 'action',
          label: '操作',
          width: 200,
          render: (h, { row, index, instance }) => {
            return (
              <div>
                <el-button size="mini" type="text" on-click={() => this.handleView(row)}>查看</el-button>
                <el-button size="mini" type="text" on-click={() => this.handleEdit(row)}>编辑</el-button>
                {row.status === '0' && (
                  <el-button size="mini" type="text" on-click={() => this.handlePublish(row, instance)}>上架</el-button>
                )}
                <el-button size="mini" type="text" style="color: #f56c6c;" on-click={() => this.handleDelete(row, instance)}>删除</el-button>
              </div>
            )
          }
        }
      ],

      // 多级表头示例
      groupColumnData: [
        { 
          id: 1, 
          name: '张三', 
          age: 25, 
          phone: '13800138000', 
          phone2: '',
          email: 'zhangsan@example.com',
          qq: '123456789',
          wechat: 'zhangsan_wx',
          address: '北京市朝阳区',
          score: { chinese: 85, math: 90, english: 88 }
        },
        { 
          id: 2, 
          name: '李四', 
          age: 30, 
          phone: '13900139000', 
          phone2: '',
          email: 'lisi@example.com',
          qq: '987654321',
          wechat: 'lisi_wx',
          address: '上海市浦东新区',
          score: { chinese: 78, math: 95, english: 82 }
        },
        { 
          id: 3, 
          name: '王五', 
          age: 28, 
          phone: '13700137000', 
          phone2: '',
          email: 'wangwu@example.com',
          qq: '111222333',
          wechat: 'wangwu_wx',
          address: '广州市天河区',
          score: { chinese: 92, math: 88, english: 90 }
        }
      ],
      groupColumnColumns: [
        // 第一级：基本信息
        {
          label: '基本信息',
          prop: 'baseInfo',
          groups: [
            { key: 'id', label: 'ID', width: 60 },
            { key: 'name', label: '姓名', width: 100 },
            { key: 'age', label: '年龄', width: 80 }
          ]
        },
        // 第一级：联系方式（包含二级嵌套）
        {
          label: '联系方式',
          prop: 'contact',
          groups: [
            {
              label: '电话',
              prop: 'phone',
              groups: [
                { key: 'phone', label: '手机号', width: 130 },
                { key: 'phone2', label: '备用电话', width: 130 }
              ]
            },
            {
              label: '网络联系方式',
              prop: 'online',
              groups: [
                { key: 'email', label: '邮箱', width: 180 },
                { 
                  key: 'qq', 
                  label: 'QQ号', 
                  width: 120,
                  render: (h, { row }) => <el-tag size="mini">{row.qq}</el-tag>
                },
                { key: 'wechat', label: '微信', width: 120 }
              ]
            }
          ]
        },
        // 第一级：其他信息
        {
          label: '其他信息',
          groups: [
            { key: 'address', label: '地址' },
            {
              label: '成绩',
              prop: 'score',
              groups: [
                { key: 'score.chinese', label: '语文', width: 80 },
                { key: 'score.math', label: '数学', width: 80 },
                { key: 'score.english', label: '英语', width: 80 }
              ]
            }
          ]
        }
      ],

      // 展开行示例
      expandRowData: [
        { 
          id: 1, 
          name: '张三', 
          age: 25, 
          phone: '13800138000', 
          email: 'zhangsan@example.com',
          address: '北京市朝阳区建国路88号'
        },
        { 
          id: 2, 
          name: '李四', 
          age: 30, 
          phone: '13900139000', 
          email: 'lisi@example.com',
          address: '上海市浦东新区世纪大道1000号'
        },
        { 
          id: 3, 
          name: '王五', 
          age: 28, 
          phone: '13700137000', 
          email: 'wangwu@example.com',
          address: '广州市天河区天河路385号'
        }
      ],
      expandRowColumns: [
        { key: 'id', label: 'ID', width: 60,
          type: 'expand',
          render: (h, { row }) => {
          return (
            <div style="padding: 20px;">
              <el-descriptions column={2} border>
                <el-descriptions-item label="姓名">{row.name}</el-descriptions-item>
                <el-descriptions-item label="年龄">{row.age}</el-descriptions-item>
                <el-descriptions-item label="手机号">{row.phone}</el-descriptions-item>
                <el-descriptions-item label="邮箱">{row.email}</el-descriptions-item>
                <el-descriptions-item label="地址" span={2}>{row.address}</el-descriptions-item>
                <el-descriptions-item label="备注" span={2}>
                  <el-tag size="small">用户ID: {row.id}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          )
        }
         },
        { key: 'name', label: '姓名', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'phone', label: '手机', width: 130 },
        { key: 'email', label: '邮箱' }
      ],
      expandRowOptions: {
        border: true,
        rowKey: 'id', // 必须设置 rowKey 用于展开行
        expandRowKeys: ['1'] // 只展开第一行（id 为 1 的行）
      },

      // 树形表格示例
      treeTableData: [
        {
          id: 1,
          name: '北京市分公司',
          leader: '张三',
          memberCount: 50,
          children: [
            {
              id: 11,
              name: '朝阳区营业部',
              leader: '李四',
              memberCount: 20,
              children: [
                { id: 111, name: '朝阳一部', leader: '王五', memberCount: 8 },
                { id: 112, name: '朝阳二部', leader: '赵六', memberCount: 12 }
              ]
            },
            { id: 12, name: '海淀区营业部', leader: '钱七', memberCount: 30 }
          ]
        },
        {
          id: 2,
          name: '上海市分公司',
          leader: '孙八',
          memberCount: 40,
          children: [
            { id: 21, name: '浦东新区营业部', leader: '周九', memberCount: 25 },
            { id: 22, name: '徐汇区营业部', leader: '吴十', memberCount: 15 }
          ]
        },
        {
          id: 3,
          name: '广州市分公司',
          leader: '郑十一',
          memberCount: 35,
          children: []
        }
      ],
      treeTableColumns: [
        { key: 'name', label: '组织名称' },
        { key: 'leader', label: '负责人'},
        {
          key: 'memberCount',
          label: '成员数量',
    
          render: (h, { row }) => {
            return (
              <el-tag size="mini" type={row.memberCount > 20 ? 'success' : 'info'}>
                {row.memberCount}人
              </el-tag>
            )
          }
        }
      ],
      treeTableOptions: {
        border: true,
        rowKey: 'id',
        defaultExpandAll: true,
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
        }
      },

      // 懒加载树形表格示例
      lazyTreeData: [
        { id: 1, name: '北京市分公司', leader: '张三', memberCount: 50, hasChildren: true },
        { id: 2, name: '上海市分公司', leader: '孙八', memberCount: 40, hasChildren: true },
        { id: 3, name: '广州市分公司', leader: '郑十一', memberCount: 35, hasChildren: true }
      ],
      lazyTreeColumns: [
        { key: 'name', label: '组织名称' },
        { key: 'leader', label: '负责人' },
        {
          key: 'memberCount',
          label: '成员数量',
         
          render: (h, { row }) => <el-tag size="mini">{row.memberCount}人</el-tag>
        }
      ],
      lazyTreeOptions: {
        border: true,
        rowKey: 'id',
        lazy: true,
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
        },
        lazyLoad: (row, treeNode, resolve) => {
          setTimeout(() => {
            const childrenData = this.getChildrenByParent(row.id)
            resolve(childrenData)
          }, 500)
        }
      },

      // 合并单元格示例
      mergeCellsData: [
        { id: 1, category: '电子产品', product: 'iPhone 15', sales: 1200, revenue: 1200000 },
        { id: 2, category: '电子产品', product: 'MacBook Pro', sales: 800, revenue: 1600000 },
        { id: 3, category: '电子产品', product: 'iPad Pro', sales: 600, revenue: 600000 },
        { id: 4, category: '服装', product: '运动T恤', sales: 2000, revenue: 400000 },
        { id: 5, category: '服装', product: '牛仔裤', sales: 1500, revenue: 450000 },
        { id: 6, category: '食品', product: '有机牛奶', sales: 5000, revenue: 250000 }
      ],
      mergeCellsColumns: [
        { key: 'category', label: '分类', },
        { key: 'product', label: '产品名称' },
        { key: 'sales', label: '销量'},
        { key: 'revenue', label: '销售额' }
      ],
      mergeCellsOptions: {
        border: true,
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
          if (columnIndex === 0) {
            const categoryRowSpan = this.getCategoryRowSpan(row.category, rowIndex)
            if (categoryRowSpan > 0) {
              return { rowspan: categoryRowSpan, colspan: 1 }
            } else {
              return { rowspan: 0, colspan: 0 }
            }
          }
        }
      },

      // 复杂合并示例
      complexMergeData: [
        { id: 1, region: '华东区', quarter: 'Q1', month: '1月', sales: 120000, target: 100000, achievement: '120%' },
        { id: 2, region: '华东区', quarter: 'Q1', month: '2月', sales: 150000, target: 100000, achievement: '150%' },
        { id: 3, region: '华东区', quarter: 'Q1', month: '3月', sales: 90000, target: 100000, achievement: '90%' },
        { id: 4, region: '华东区', quarter: 'Q2', month: '4月', sales: 110000, target: 110000, achievement: '100%' },
        { id: 5, region: '华南区', quarter: 'Q1', month: '1月', sales: 80000, target: 80000, achievement: '100%' },
        { id: 6, region: '华南区', quarter: 'Q1', month: '2月', sales: 95000, target: 80000, achievement: '119%' },
        { id: 7, region: '华南区', quarter: 'Q2', month: '4月', sales: 105000, target: 90000, achievement: '117%' }
      ],
      complexMergeColumns: [
        { key: 'region', label: '区域',   },
        { key: 'quarter', label: '季度', width: 80 },
        { key: 'month', label: '月份', width: 80 },
        { key: 'sales', label: '销售额' },
        { key: 'target', label: '目标', width: 100 },
        { key: 'achievement', label: '完成率' }
      ],
      complexMergeOptions: {
        border: true,
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
          const data = this.complexMergeData
          // 区域列 - 按 region 合并
          if (columnIndex === 0) {
            const rowSpan = this.getMergeSpan(data, rowIndex, 'region')
            if (rowSpan > 0) {
              return { rowspan: rowSpan, colspan: 1 }
            }
            return { rowspan: 0, colspan: 0 }
          }
          // 季度列 - 按 region + quarter 合并
          if (columnIndex === 1) {
            // 隐藏：当前 quarter 与上一行的 quarter 相同
            if (rowIndex > 0 && data[rowIndex - 1].quarter === row.quarter) {
              return { rowspan: 0, colspan: 0 }
            }
            // 计算连续的相同 quarter 行数
            let rowspan = 0
            for (let i = rowIndex; i < data.length; i++) {
              if (data[i].quarter === row.quarter) {
                rowspan++
              } else {
                break
              }
            }
            return { rowspan, colspan: 1 }
          }
          // 月份列 - 按 region + quarter + month 合并
          if (columnIndex === 2) {
            // 隐藏：当前 month 与上一行的 month 相同
            if (rowIndex > 0 && data[rowIndex - 1].month === row.month) {
              return { rowspan: 0, colspan: 0 }
            }
            // 计算连续的相同 month 行数
            let rowspan = 0
            for (let i = rowIndex; i < data.length; i++) {
              if (data[i].month === row.month) {
                rowspan++
              } else {
                break
              }
            }
            return { rowspan, colspan: 1 }
          }
        }
      },

      // 表格按钮配置示例
      configBtnData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ],
      configBtnColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 120 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱' }
      ],
      configBtnOptions: {
        border: true,
        configBtn: [
          {
            code: 1,
            name: '新增',
            icon: 'el-icon-plus',
            type: 'primary',
            click: () => {
              this.$message.success('点击了新增按钮')
            }
          },
          {
            code: 1,
            name: '导入',
            icon: 'el-icon-upload2',
            click: () => {
              this.$message.info('点击了导入按钮')
            }
          },
          {
            code: 2,
            name: '导出',
            icon: 'el-icon-download',
            type: 'warning',
            click: () => {
              this.$message.info('点击了导出按钮')
            }
          },
          {
            code: 2,
            name: '高级搜索',
            icon: 'el-icon-search',
            isHide: false,
            click: () => {
              this.$message.info('点击了高级搜索按钮')
            }
          }
        ],
        leftText: '已选择 0 项'
      },

      // 继承父容器高度示例
      fullHeightData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', address: '北京市朝阳区建国路88号' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', address: '上海市浦东新区世纪大道1000号' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', address: '广州市天河区天河路385号' },
        { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', address: '深圳市南山区科技园路1号' },
        { id: 5, name: '钱七', age: 27, email: 'qianqi@example.com', address: '杭州市西湖区文一路100号' },
        { id: 6, name: '孙八', age: 32, email: 'sunba@example.com', address: '成都市高新区天府大道200号' },
        { id: 7, name: '周九', age: 29, email: 'zhoujiu@example.com', address: '武汉市洪山区珞喻路300号' },
        { id: 8, name: '吴十', age: 31, email: 'wushi@example.com', address: '南京市鼓楼区中山路150号' }
      ],
      fullHeightColumns: [
        { key: 'id', label: 'ID', width: 80 },
        { key: 'name', label: '姓名', width: 100 },
        { key: 'age', label: '年龄', width: 80 },
        { key: 'email', label: '邮箱', width: 200 },
        { key: 'address', label: '地址' }
      ],
      fullHeightOptions: {
        border: true,
        // 关键：设置 tabHeight 为 '100%' 继承父容器高度
        tabHeight: '100%',
        heightType: 'height'
      },

      // 政策管理实战示例
      policyData: [
        { id: 'P001', title: '夏季促销政策', status: '1', tags: '促销', publishingMethodName: '立即发布', scheduledReleaseTime: '2024-06-01', validDateStart: '2024-06-01', validDateEnd: '2024-08-31', createTime: '2024-05-25', createBy: '张三' },
        { id: 'P002', title: '新用户优惠', status: '0', tags: '优惠', publishingMethodName: '定时发布', scheduledReleaseTime: '2024-07-15', validDateStart: '2024-07-15', validDateEnd: '2024-12-31', createTime: '2024-06-10', createBy: '李四' }
      ],
      policyColumns: [
        { key: 'id', label: '政策编号', fixed: 'left', width: 100 },
        { key: 'title', label: '政策标题', width: 150 },
        { key: 'tags', label: '政策标签', width: 100 },
        {
          key: 'status',
          label: '状态',
          width: 100,
          render: (h, { row }) => {
            const statusMap = { '0': '草稿', '1': '上架中', '2': '已下架' }
            return <el-tag type={row.status === '1' ? 'success' : 'info'} size="small">{statusMap[row.status]}</el-tag>
          }
        },
        { key: 'publishingMethodName', label: '发布方式', width: 100 },
        { key: 'scheduledReleaseTime', label: '发布时间', width: 140 },
        { key: 'validDateStart', label: '生效时间', width: 140 },
        { key: 'validDateEnd', label: '失效时间', width: 140 },
        { key: 'createTime', label: '创建时间', width: 140 },
        { key: 'createBy', label: '创建人', width: 100 },
        {
          key: 'action',
          label: '操作',
          width: 220,
          fixed: 'right',
          render: (h, { row, index, instance }) => {
            return (
              <div>
                <el-button size="mini" type="text" on-click={() => this.$message.info('查看: ' + row.title)}>查看</el-button>
                <el-button size="mini" type="text" on-click={() => this.$message.info('编辑: ' + row.title)}>编辑</el-button>
                {(row.status === '0' || row.status === '2') && (
                  <el-button size="mini" type="text" on-click={() => this.$message.success('上架成功')}>上架</el-button>
                )}
                {row.status === '1' && (
                  <el-button size="mini" type="text" on-click={() => this.$message.warning('已下架')}>下架</el-button>
                )}
                <el-button size="mini" type="text" style="color: #f56c6c;" on-click={() => this.$message.error('删除: ' + row.title)}>删除</el-button>
              </div>
            )
          }
        }
      ],
      policyPagination: { pageIndex: 1, pageSize: 10, total: 2 },
      policyOptions: {
        border: true,
        tabHeight: 300,
        heightType: 'height',
        size: 'mini'
      },
      policyFormData: {
        policyCode: '',
        policyTitle: '',
        policyStatus: '',
        policyTag: '',
        publishType: '',
        effectiveTimeRange: [],
        publishTimeRange: []
      },
      policyFormConfig: [
        {
          prop: 'policyCode',
          label: '政策编号',
          span: 8,
          formtype: 'Input',
          formItemOptions: { labelWidth: '100px' },
          attrs: { placeholder: '请输入政策编号', clearable: true }
        },
        {
          prop: 'policyTitle',
          label: '政策名称',
          span: 8,
          formtype: 'Input',
          attrs: { placeholder: '请输入政策标题', clearable: true }
        },
        {
          prop: 'policyStatus',
          label: '文章状态',
          span: 8,
          formtype: 'Select',
          formItemOptions: { labelWidth: '100px' },
          attrs: { placeholder: '请选择文章状态', clearable: true },
          dataOptions: [
            { label: '全部', value: '' },
            { label: '草稿', value: '0' },
            { label: '上架中', value: '1' },
            { label: '已下架', value: '2' }
          ]
        },
        {
          label: '政策生效时间范围',
          span: 8,
          formItemOptions: { labelWidth: '140px' },
          prop: 'effectiveTimeRange',
          formtype: 'datePicker',
          attrs: {
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            type: 'datetimerange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            style: 'width: 100%'
          }
        }
      ],
      policyLayoutProps: {
        fromLayProps: { minfoldRows: 1, labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      policyConfigBtn: [
        { direction: 'left', name: '新增', icon: 'el-icon-plus', size: 'mini', type: 'primary', onClick: () => this.$message.success('打开新增弹窗') },
        { type: 'primary', size: 'mini', name: '查询', icon: 'el-icon-search', key: 'query', triggerEvent: true },
        { type: 'warning', key: 'rest', size: 'mini', name: '重置', icon: 'el-icon-refresh', triggerEvent: true }
      ],

      // 代码示例
      basicExample,
      autoRequestExample,
      customHttpExample,
      renderColumnExample,
      linkageExample,
      multiSelectExample,
      actionColumnExample,
      groupColumnExample,
      expandRowExample,
      treeTableExample,
      lazyLoadTreeExample,
      mergeCellsExample,
      complexMergeExample,
      configBtnExample,
      fullHeightExample,
      realWorldExample,

      // 代码折叠状态
      codeExpanded: {
        scene1: false,
        scene2: false,
        scene3: false,
        scene4: false,
        scene5: false,
        sceneMultiSelect: false,
        scene6: false,
        scene7: false,
        sceneGroupColumn: false,
        sceneExpandRow: false,
        sceneTreeTable: false,
        sceneLazyTree: false,
        sceneMergeCells: false,
        sceneComplexMerge: false,
        sceneConfigBtn: false,
        sceneFullHeight: false
      }
    }
  },
  methods: {
    // ===== 自定义请求实例方法 - 展示统一处理请求头、错误、Loading =====
    customHttpRequest(params) {
      const { url, formParams, headers = {}, method = 'get' } = params
      
      // 构建 URL 和查询参数
      let requestUrl = url
      if (method.toLowerCase() === 'get' && formParams) {
        const queryParams = new URLSearchParams()
        Object.keys(formParams).forEach(key => {
          if (formParams[key] !== undefined && formParams[key] !== null && formParams[key] !== '') {
            queryParams.append(key, formParams[key])
          }
        })
        const queryString = queryParams.toString()
        if (queryString) {
          requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
        }
      }
      
      // 模拟添加统一的请求头（如 Token）
      const customHeaders = {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'es-table-demo',
        'X-Request-Time': new Date().toISOString(),
        ...headers
      }
      
      console.log('【自定义 httpRequest】请求配置:', {
        url: requestUrl,
        method,
        headers: customHeaders,
        formParams
      })
      
      // 使用 fetch API 发送请求
      return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: customHeaders,
        credentials: 'omit' // 不携带 credentials，避免 CORS 问题
      })
        .then(res => {
          if (!res.ok) {
            // 统一错误处理
            throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          }
          return res.json()
        })
        .then(data => {
          // 可以在这里添加统一的响应数据处理
          console.log('【自定义 httpRequest】响应数据:', data)
          return { data }
        })
        .catch(err => {
          // 统一错误提示
          console.error('【自定义 httpRequest】请求失败:', err)
          this.$message.error('请求失败: ' + err.message)
          throw err
        })
    },

    // ===== 使用 fetch API 发送请求，配置 credentials: 'omit' 解决跨域问题 =====
    fetchWithCORS(params) {
      const { url, formParams, headers = {}, method = 'get' } = params
      
      // 构建 URL 和查询参数
      let requestUrl = url
      if (method.toLowerCase() === 'get' && formParams) {
        const queryParams = new URLSearchParams()
        Object.keys(formParams).forEach(key => {
          if (formParams[key] !== undefined && formParams[key] !== null && formParams[key] !== '') {
            queryParams.append(key, formParams[key])
          }
        })
        const queryString = queryParams.toString()
        if (queryString) {
          requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
        }
      }
      
      // 使用 fetch API，设置 credentials: 'omit' 不携带 cookie，解决跨域问题
      return fetch(requestUrl, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        credentials: 'omit' // 关键：不携带 credentials，避免 CORS 问题
      }).then(res => res.json())
    },

    // ===== 代码折叠控制 =====
    toggleCode(scene) {
      this.codeExpanded[scene] = !this.codeExpanded[scene]
    },
    expandAll() {
      Object.keys(this.codeExpanded).forEach(key => {
        this.codeExpanded[key] = true
      })
    },
    collapseAll() {
      Object.keys(this.codeExpanded).forEach(key => {
        this.codeExpanded[key] = false
      })
    },

    handleView(row) {
      this.$message.info(`查看: ${row.name}`)
    },
    handleEdit(row) {
      this.$message.info(`编辑: ${row.name}`)
    },
    handlePublish(row, instance) {
      this.$message.success(`${row.name} 上架成功`)
      // 刷新表格
      instance?.httpRquestInstace()
    },
    handleDelete(row, instance) {
      this.$confirm(`确定删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        instance?.httpRquestInstace()
      })
    },

    // ===== 跨页选择记忆 - 选择变化事件 =====
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    
    // ===== 跨页选择记忆 - 清空选择 =====
    handleClearSelection() {
      this.$refs.multiSelectTable?.clearAllSelection()
      this.selectedRows = []
    },
    
    // ===== 跨页选择记忆 - 获取所有选中项 =====
    getSelectedData() {
      // 通过组件内部的 multipleSelection 属性获取选中的行
      const allSelected = this.$refs.multiSelectTable?.multipleSelection || []
      if (allSelected.length === 0) {
        this.$message.warning('请至少选择一项')
        return
      }
      
      // 显示选中项信息
      const names = allSelected.map(row => row.name).join(', ')
      this.$message.success(`共选择 ${allSelected.length} 项: ${names}`)
      
      // 控制台输出详细信息
      console.log('【跨页选择】所有选中项:', allSelected)
      console.log('【跨页选择】选中项ID:', allSelected.map(row => row.id))
    },

    // ===== 懒加载树形表格 - 获取子节点数据 =====
    getChildrenByParent(parentId) {
      const mockData = {
        1: [
          { id: 11, name: '朝阳区营业部', leader: '李四', memberCount: 20, hasChildren: true },
          { id: 12, name: '海淀区营业部', leader: '钱七', memberCount: 30, hasChildren: false }
        ],
        11: [
          { id: 111, name: '朝阳一部', leader: '王五', memberCount: 8, hasChildren: false },
          { id: 112, name: '朝阳二部', leader: '赵六', memberCount: 12, hasChildren: false }
        ],
        2: [
          { id: 21, name: '浦东新区营业部', leader: '周九', memberCount: 25, hasChildren: false },
          { id: 22, name: '徐汇区营业部', leader: '吴十', memberCount: 15, hasChildren: false }
        ],
        3: [
          { id: 31, name: '天河区营业部', leader: '陈十二', memberCount: 18, hasChildren: false },
          { id: 32, name: '越秀区营业部', leader: '林十三', memberCount: 17, hasChildren: false }
        ]
      }
      return mockData[parentId] || []
    },

    // ===== 懒加载树形表格 - 展开状态变化事件 =====
    handleTreeExpandChange(row, expanded) {
      console.log('懒加载树形节点展开状态变化:', row.name, expanded ? '展开' : '收起')
    },

    // ===== 合并单元格 - 获取分类行跨度数 =====
    getCategoryRowSpan(category, rowIndex) {
      const data = this.mergeCellsData
      if (rowIndex === 0) {
        let rowspan = 1
        for (let i = rowIndex + 1; i < data.length; i++) {
          if (data[i].category === category) {
            rowspan++
          } else {
            break
          }
        }
        return rowspan
      }
      // 检查上一行是否相同类别
      if (rowIndex > 0 && data[rowIndex - 1].category === category) {
        return 0
      }
      // 重新计算当前类别的跨度数
      let rowspan = 1
      for (let i = rowIndex + 1; i < data.length; i++) {
        if (data[i].category === category) {
          rowspan++
        } else {
          break
        }
      }
      return rowspan
    },

    // ===== 合并单元格 - 获取指定字段的行跨度数 =====
    getMergeSpan(data, rowIndex, field) {
      if (rowIndex === 0) {
        let rowspan = 1
        for (let i = rowIndex + 1; i < data.length; i++) {
          if (data[i][field] === data[rowIndex][field]) {
            rowspan++
          } else {
            break
          }
        }
        return rowspan
      }
      // 检查上一行是否相同值
      if (data[rowIndex - 1][field] === data[rowIndex][field]) {
        return 0
      }
      // 重新计算跨度数
      let rowspan = 1
      for (let i = rowIndex + 1; i < data.length; i++) {
        if (data[i][field] === data[rowIndex][field]) {
          rowspan++
        } else {
          break
        }
      }
      return rowspan
    }
  }
}
</script>

<style lang="scss">
.docs-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  .docs-header {
    margin-bottom: 30px;

    .global-actions {
      margin-top: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #e4e7ed;
    }
  }

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    color: #303133;
  }

  .component-desc {
    color: #28292d;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
    padding: 15px 20px;
    background: #f5f7fa;
    border-left: 4px solid #409eff;
    border-radius: 4px;
  }

  h2 {
    font-size: 24px;
    margin: 40px 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409eff;
    color: #303133;
  }

  h3 {
    font-size: 18px;
    color: #303133;
    margin: 30px 0 15px;
    padding-left: 12px;
    border-left: 4px solid #67c23a;
  }

  h4 {
    font-size: 15px;
    color: #303133;
    margin: 20px 0 10px;
  }

  p {
    color: #28292d;
    line-height: 1.8;
    margin-bottom: 15px;

    code {
      background: #f4f4f5;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Consolas', monospace;
      color: #e96900;
      font-size: 13px;
    }
  }

  .demo-block {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    margin-bottom: 30px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    &--full {
      .demo-block__body {
       // min-height: 400px;
      }
    }

    &__header {
      padding: 15px 20px;
      background: #fafafa;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }

    &__badge {
      font-size: 12px;
      padding: 2px 10px;
      border-radius: 12px;
      background: #409eff;
      color: #fff;
    }

    &__body {
      padding: 20px;
      background: #fff;
    }

    &__code {
      background: #f5f7fa;
      overflow-x: auto;

      .code-header {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        background: #e4e7ed;
        cursor: pointer;
        user-select: none;
        transition: background 0.2s;
        border-bottom: 1px solid #dcdfe6;

        &:hover {
          background: #d0d3d9;
        }

        i {
          margin-right: 8px;
          font-size: 14px;
          color: #606266;
        }

        span {
          font-size: 13px;
          color: #606266;
        }
      }

      pre {
        margin: 0;
        padding: 15px 20px;
        font-family: 'Consolas', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: #606266;
      }

      code {
        white-space: pre-wrap;
        word-wrap: break-word;
        background: transparent;
        color: #606266;
        padding: 0;
      }
    }
  }

  .tips-box {
    padding: 16px 20px;
    border-radius: 8px;
    margin: 20px 0;

    &--success {
      background: #f0f9eb;
      border: 1px solid #e1f3d8;
      h4 { color: #67c23a; }
    }

    &--warning {
      background: #fdf6ec;
      border: 1px solid #faecd8;
      h4 { color: #e6a23c; }
    }

    &--info {
      background: #f4f4f5;
      border: 1px solid #e9e9eb;
      h4 { color: #909399; }
    }

    h4 {
      margin: 0 0 10px 0;
      font-size: 15px;
    }

    ul, ol {
      margin: 0;
      padding-left: 20px;

      li {
        margin: 8px 0;
        color: #606266;
        line-height: 1.6;
      }
    }

    p {
      margin: 0;
      color: #606266;
    }
  }

  .table-props {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;

    th, td {
      padding: 12px 16px;
      text-align: left;
      border: 1px solid #ebeef5;
    }

    th {
      background: #f5f7fa;
      font-weight: 600;
      color: #303133;
    }

    td {
      color: #606266;
    }

    code {
      background: #f4f4f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Consolas', monospace;
      color: #e96900;
      font-size: 12px;
    }

    tr:hover {
      background: #f5f7fa;
    }
  }
}
</style>
