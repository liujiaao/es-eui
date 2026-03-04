<template>
  <div class="docs-container">
    <!-- Hero 区域 -->
    <section class="modern-hero">
      <div class="hero-badge">
        <i class="el-icon-s-order" />
        <span>核心组件</span>
      </div>
      <h1 class="hero-title">EsForm 表单组件</h1>
      <p class="hero-desc">
        企业级表单解决方案，通过 JSON 配置即可生成复杂表单，支持 20+ 种表单控件，
        让表单开发从小时级降至分钟级
      </p>
    </section>

    <!-- 快速开始 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <i class="el-icon-time" />
        </div>
        <h2 class="section-title">快速开始</h2>
      </div>
      <p class="section-desc">最简单的表单，只需配置字段列表和数据模型：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">基础表单</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="basicFormConfig"
            :model="basicFormData"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene1 }">
          <div class="code-header" @click="toggleCode('scene1')">
            <i :class="codeExpanded.scene1 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene1 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(basicExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene1"><code>{{ basicExample }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 核心特性详解 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <i class="el-icon-s-opportunity" />
        </div>
        <h2 class="section-title">核心特性详解</h2>
      </div>
      <p class="section-desc">深入了解 EsForm 的强大功能特性</p>

      <h3>1. 表单控件类型</h3>
      <p>EsForm 内置 20+ 种控件类型，通过 <code>formtype</code> 配置即可切换：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">常用控件展示</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="controlsFormConfig"
            :model="controlsFormData"
            :layout-form-props="controlsLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene2 }">
          <div class="code-header" @click="toggleCode('scene2')">
            <i :class="codeExpanded.scene2 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene2 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(controlsExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene2"><code>{{ controlsExample }}</code></pre>
        </div>
      </div>

      <h3>2. 表单布局系统</h3>
      <p>通过 <code>layoutFormProps</code> 实现灵活的响应式布局：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">栅格布局与折叠</span>
          <span class="demo-block__badge">实战技巧</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="layoutFormConfig"
            :model="layoutFormData"
            :layout-form-props="layoutProps"
            :config-btn="layoutConfigBtn"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene3 }">
          <div class="code-header" @click="toggleCode('scene3')">
            <i :class="codeExpanded.scene3 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene3 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(layoutExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene3"><code>{{ layoutExample }}</code></pre>
        </div>
      </div>

      <div class="tips-box tips-box--success">
        <h4>💡 布局最佳实践</h4>
        <ul>
          <li><code>span</code>：每个表单项占据的栅格数（1-24），建议 8（1/3行）、6（1/4行）、12（半行）</li>
          <li><code>minfoldRows</code>：超过指定行数自动折叠，配合 gutter 控制间距</li>
          <li><code>labelWidth</code>：统一定义标签宽度，或在 <code>formItemOptions</code> 中单独设置</li>
          <li><code>isBtnHiden</code>：隐藏默认的查询/重置按钮，适用于弹窗内表单</li>
        </ul>
      </div>

      <h3>3. 验证规则与表单校验</h3>
      <p>支持 Element UI 的所有验证规则，支持动态规则：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">表单验证</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="validateForm"
            :form-item-list="validateFormConfig"
            :model="validateFormData"
            :config-btn="validateConfigBtn"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene4 }">
          <div class="code-header" @click="toggleCode('scene4')">
            <i :class="codeExpanded.scene4 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene4 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(validationExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene4"><code>{{ validationExample }}</code></pre>
        </div>
      </div>

      <h3>4. 条件渲染与联动</h3>
      <p>通过 <code>isHiden</code> 函数实现字段的条件显示：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">动态字段显示</span>
          <span class="demo-block__badge">高频使用</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="dynamicFormConfig"
            :model="dynamicFormData"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene5 }">
          <div class="code-header" @click="toggleCode('scene5')">
            <i :class="codeExpanded.scene5 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene5 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(dynamicFieldExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene5"><code>{{ dynamicFieldExample }}</code></pre>
        </div>
      </div>

      <h3>5. 自定义 Render 渲染</h3>
      <p>当内置控件无法满足需求时，使用 <code>render</code> 函数自定义：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">自定义渲染</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="customRenderConfig"
            :model="customRenderData"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene6 }">
          <div class="code-header" @click="toggleCode('scene6')">
            <i :class="codeExpanded.scene6 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene6 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(customRenderExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene6"><code>{{ customRenderExample }}</code></pre>
        </div>
      </div>

      <div class="tips-box tips-box--warning">
        <h4>⚠️ Render 函数参数说明</h4>
        <p>参数顺序为：<code>(h, model, row) => VNode</code></p>
        <ul>
          <li><code>h</code> - createElement 函数</li>
          <li><code>model</code> - 表单数据对象</li>
          <li><code>row</code> - 当前表单项配置</li>
        </ul>
      </div>

      <h3>6. 动态规则控制</h3>
      <p>根据其他字段值动态控制验证规则：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">动态验证规则</span>
          <span class="demo-block__badge">进阶技巧</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :key="dynamicRuleKey"
            :form-item-list="dynamicRuleConfig"
            :model="dynamicRuleData"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene7 }">
          <div class="code-header" @click="toggleCode('scene7')">
            <i :class="codeExpanded.scene7 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene7 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(dynamicRuleExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene7"><code>{{ dynamicRuleExample }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 接口请求配置 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
          <i class="el-icon-connection" />
        </div>
        <h2 class="section-title">接口请求配置</h2>
      </div>
      <p class="section-desc">通过 <code>apiParams</code> 配置，表单控件可自动请求远程数据加载选项</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">接口请求示例</span>
          <span class="demo-block__badge">自动加载</span>
        </div>
        <div class="demo-block__body">
          <es-form
            :form-item-list="apiRequestConfig"
            :model="apiRequestData"
            :layout-form-props="apiRequestLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene9 }">
          <div class="code-header" @click="toggleCode('scene9')">
            <i :class="codeExpanded.scene9 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene9 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(apiRequestExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene9"><code>{{ apiRequestExample }}</code></pre>
        </div>
      </div>

      <div class="tips-box tips-box--info">
        <h4>📡 apiParams 配置说明</h4>
        <ul>
          <li><code>url</code>：请求地址（必填）</li>
          <li><code>method</code>：请求方法，默认 GET</li>
          <li><code>model</code>：请求参数对象</li>
          <li><code>headers</code>：请求头配置</li>
          <li><code>options</code>：其他 axios 配置</li>
          <li><code>httpRequest</code>：自定义请求方法（函数）</li>
          <li><code>listenToCallBack</code>：回调配置 <code>brcb</code>（请求前）、<code>qrcb</code>（响应后）、<code>crtn</code>（数据转换）</li>
        </ul>
      </div>

      <div class="tips-box tips-box--success">
        <h4>💡 进阶技巧</h4>
        <ul>
          <li><strong>自定义请求</strong>：设置 <code>httpRequest</code> 函数可完全自定义请求逻辑</li>
          <li><strong>请求前处理</strong>：使用 <code>listenToCallBack.brcb</code> 过滤或处理请求参数</li>
          <li><strong>响应后处理</strong>：使用 <code>listenToCallBack.qrcb</code> 处理响应数据</li>
          <li><strong>数据转换</strong>：使用 <code>listenToCallBack.crtn</code> 转换选项数据格式</li>
        </ul>
      </div>
    </section>

    <!-- 省市区三级联动 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <i class="el-icon-location" />
        </div>
        <h2 class="section-title">省市区三级联动</h2>
      </div>
      <p class="section-desc">使用 Cascader 级联选择器实现省市区三级联动，支持静态数据和远程加载</p>

      <h3>1. 级联选择器实现（静态数据）</h3>
      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">省市区三级联动</span>
          <span class="demo-block__badge">常用</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="regionForm"
            :form-item-list="regionFormConfig"
            :model="regionFormData"
            :layout-form-props="regionLayoutProps"
            :config-btn="regionConfigBtn"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene10 }">
          <div class="code-header" @click="toggleCode('scene10')">
            <i :class="codeExpanded.scene10 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene10 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(regionLinkageExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene10"><code>{{ regionLinkageExample }}</code></pre>
        </div>
      </div>

      <h3>2. 远程加载实现（formItmeRequestInstance 方法）</h3>
      <p>使用 <code>formItmeRequestInstance</code> 方法手动触发远程数据加载，实现动态级联：</p>

      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">远程加载省市区</span>
          <span class="demo-block__badge">进阶</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="remoteRegionForm"
            :form-item-list="remoteRegionFormConfig"
            :model="remoteRegionFormData"
            :layout-form-props="remoteRegionLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene11 }">
          <div class="code-header" @click="toggleCode('scene11')">
            <i :class="codeExpanded.scene11 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene11 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(remoteRegionLinkageExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene11"><code>{{ remoteRegionLinkageExample }}</code></pre>
        </div>
      </div>

      <div class="tips-box tips-box--info">
        <h4>📋 Cascader 级联选择器配置说明</h4>
        <ul>
          <li><code>formtype: 'Cascader'</code>：使用级联选择器控件</li>
          <li><code>props</code>：配置级联属性（value/label/children）映射</li>
          <li><code>checkStrictly</code>：是否允许选择任意一级，false 为严格模式（选叶子节点）</li>
          <li><code>filterable</code>：支持搜索过滤</li>
          <li><code>clearable</code>：支持清空</li>
        </ul>
      </div>

      <div class="tips-box tips-box--success">
        <h4>💡 formItmeRequestInstance 方法</h4>
        <ul>
          <li><strong>作用</strong>：手动触发指定字段的远程数据加载</li>
          <li><strong>参数</strong>：<code>(propListKey, options)</code></li>
          <li><strong>使用场景</strong>：动态联动、条件请求、手动刷新等</li>
          <li><strong>示例</strong>：<code>await formRef.formItmeRequestInstance(['province', 'city'])</code></li>
        </ul>
      </div>
    </section>

    <!-- 图片上传 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);">
          <i class="el-icon-upload2" />
        </div>
        <h2 class="section-title">图片上传</h2>
      </div>
      <p class="section-desc">使用 Upload 组件实现图片上传功能，支持自定义上传接口和预览</p>

      <h3>1. 单图片上传（使用免费接口）</h3>
      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">图片上传示例</span>
          <span class="demo-block__badge">常用</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="uploadForm"
            :key="uploadFormKey"
            :form-item-list="uploadFormConfig"
            :model="uploadFormData"
            :layout-form-props="uploadLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene12 }">
          <div class="code-header" @click="toggleCode('scene12')">
            <i :class="codeExpanded.scene12 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene12 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(imageUploadExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene12"><code>{{ imageUploadExample }}</code></pre>
        </div>
      </div>

      <h3>2. 多图片上传（带预览和删除）</h3>
      <div class="demo-block">
        <div class="demo-block__header">
          <span class="demo-block__title">多图片上传</span>
          <span class="demo-block__badge">进阶</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="multiUploadForm"
            :key="multiUploadFormKey"
            :form-item-list="multiUploadFormConfig"
            :model="multiUploadFormData"
            :layout-form-props="uploadLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene13 }">
          <div class="code-header" @click="toggleCode('scene13')">
            <i :class="codeExpanded.scene13 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene13 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(multiImageUploadExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene13"><code>{{ multiImageUploadExample }}</code></pre>
        </div>
      </div>

      <div class="tips-box tips-box--info">
        <h4>📤 Upload 组件配置说明</h4>
        <ul>
          <li><code>formtype: 'Upload'</code>：使用上传控件</li>
          <li><code>props.action</code>：上传地址（必填），使用自定义 httpRequest 时可设为占位符</li>
          <li><code>props.accept</code>：接受的文件类型，如 <code>image/*</code></li>
          <li><code>props.listType</code>：文件列表类型（text/picture/picture-card）</li>
          <li><code>props.limit</code>：最大上传文件数</li>
          <li><code>props.on-exceed</code>：超出限制时的回调</li>
          <li><code>triggerRender</code>：自定义上传触发元素</li>
          <li><code>httpRequest</code>：自定义上传请求方法，返回 Promise</li>
          <li><code>on</code>：事件监听（success/remove/change/preview 等）</li>
        </ul>
      </div>

      <div class="tips-box tips-box--success">
        <h4>🎯 预览功能说明</h4>
        <ul>
          <li>使用 <code>httpRequest</code> 时，需在返回结果中包含 <code>link</code> 或 <code>url</code> 字段作为文件地址</li>
          <li>返回 <code>Blob</code> 流链接（<code>URL.createObjectURL(blob)</code>）性能更优</li>
          <li>预览按钮（放大镜图标）会在上传成功后自动显示</li>
          <li>通过 <code>on.preview</code> 回调处理预览逻辑，如打开大图弹窗</li>
        </ul>
      </div>

      <div class="tips-box tips-box--warning">
        <h4>⚠️ 上传接口注意事项</h4>
        <ul>
          <li>生产环境请使用自己的图片服务器或云存储（OSS/AWS S3/七牛云等）</li>
          <li>本示例使用 <code>httpRequest</code> 自定义上传请求，将图片转为 Blob 流链接本地演示</li>
          <li>实际项目中可替换为真实的上传接口，只需修改 <code>httpRequest</code> 方法即可</li>
          <li>上传成功后组件会自动将文件信息存储到表单模型中</li>
        </ul>
      </div>
    </section>

    <!-- 实战场景示例 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <i class="el-icon-s-data" />
        </div>
        <h2 class="section-title">实战场景示例</h2>
      </div>
      <p class="section-desc">真实业务场景下的表单应用案例</p>

      <h3>场景一：复杂政策表单（生产级实战）</h3>
      <div class="demo-block demo-block--full">
        <div class="demo-block__header">
          <span class="demo-block__title">政策编辑表单</span>
          <span class="demo-block__badge">企业级</span>
        </div>
        <div class="demo-block__body">
          <es-form
            ref="policyForm"
            :form-item-list="policyFormConfig"
            :model="policyFormData"
            :layout-form-props="policyLayoutProps"
          />
        </div>
        <div class="demo-block__code" :class="{ 'is-collapsed': !codeExpanded.scene8 }">
          <div class="code-header" @click="toggleCode('scene8')">
            <i :class="codeExpanded.scene8 ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span>{{ codeExpanded.scene8 ? '收起代码' : '展开代码' }}</span>
            <span class="copy-btn" @click.stop="copyCode(realWorldFormExample)">
              <i class="el-icon-document-copy"></i> 复制
            </span>
          </div>
          <pre v-show="codeExpanded.scene8"><code>{{ realWorldFormExample }}</code></pre>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
          <i class="el-icon-document" />
        </div>
        <h2 class="section-title">API 文档</h2>
      </div>
      <p class="section-desc">完整的接口参考和配置说明</p>

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
            <td>formItemList</td>
            <td>表单项配置数组</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>model</td>
            <td>表单数据对象</td>
            <td>Object</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>layoutFormProps</td>
            <td>布局配置</td>
            <td>Object</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>configBtn</td>
            <td>按钮配置数组</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
        </tbody>
      </table>

      <h3>FormItem 配置</h3>
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
            <td>prop</td>
            <td>字段名（支持函数动态返回）</td>
            <td>String/Function</td>
          </tr>
          <tr>
            <td>label</td>
            <td>标签文本</td>
            <td>String</td>
          </tr>
          <tr>
            <td>formtype</td>
            <td>控件类型：Input/Select/Radio/Checkbox/Switch/DatePicker/TimePicker/Cascader/Rate/Upload</td>
            <td>String</td>
          </tr>
          <tr>
            <td>span</td>
            <td>栅格占据列数（1-24）</td>
            <td>Number</td>
          </tr>
          <tr>
            <td>attrs</td>
            <td>控件属性（支持 disabled 为函数）</td>
            <td>Object</td>
          </tr>
          <tr>
            <td>formItemOptions</td>
            <td>表单项选项：labelWidth、rules、style 等</td>
            <td>Object</td>
          </tr>
          <tr>
            <td>dataOptions</td>
            <td>选项数据（Select/Radio/Checkbox）</td>
            <td>Array</td>
          </tr>
          <tr>
            <td>isHiden</td>
            <td>条件显示函数 (model) => Boolean</td>
            <td>Function</td>
          </tr>
          <tr>
            <td>render</td>
            <td>自定义渲染函数 (h, model, row) => VNode</td>
            <td>Function</td>
          </tr>
          <tr>
            <td>on</td>
            <td>事件监听：change、input、enter 等</td>
            <td>Object</td>
          </tr>
          <tr>
            <td>apiParams</td>
            <td>接口请求配置 { url, method, model, headers, options, httpRequest, listenToCallBack }</td>
            <td>Object</td>
          </tr>
        </tbody>
      </table>

      <h3>LayoutFormProps 配置</h3>
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
            <td>fromLayProps.labelWidth</td>
            <td>标签宽度</td>
            <td>String</td>
            <td>'100px'</td>
          </tr>
          <tr>
            <td>fromLayProps.size</td>
            <td>控件尺寸：large/medium/small/mini</td>
            <td>String</td>
            <td>'mini'</td>
          </tr>
          <tr>
            <td>fromLayProps.minfoldRows</td>
            <td>超过多少行折叠</td>
            <td>Number</td>
            <td>0（不折叠）</td>
          </tr>
          <tr>
            <td>fromLayProps.isBtnHiden</td>
            <td>是否隐藏按钮</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>fromLayProps.rules</td>
            <td>表单验证规则</td>
            <td>Object</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>rowLayProps.gutter</td>
            <td>栅格间距</td>
            <td>Number</td>
            <td>10</td>
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
            <td>validate</td>
            <td>表单验证</td>
            <td>(callback) => void</td>
          </tr>
          <tr>
            <td>resetFields</td>
            <td>重置表单</td>
            <td>-</td>
          </tr>
          <tr>
            <td>clearValidate</td>
            <td>清除验证状态</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 开发规范与技巧 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
          <i class="el-icon-s-check" style="color: #606266;" />
        </div>
        <h2 class="section-title">开发规范与技巧</h2>
      </div>
      <p class="section-desc">提升开发效率和代码质量的最佳实践</p>

      <div class="tips-box tips-box--info">
        <h4>📋 表单开发规范</h4>
        <ol>
          <li><strong>字段命名</strong>：使用驼峰命名，如 <code>policyTitle</code>、<code>effectiveTimeRange</code></li>
          <li><strong>日期范围</strong>：统一使用数组格式，如 <code>effectiveTimeRange: ['', '']</code></li>
          <li><strong>动态禁用</strong>：使用函数形式 <code>disabled: () => this.isDisabled</code></li>
          <li><strong>动态规则</strong>：通过 key 强制刷新表单 <code>:key="ruleKey"</code></li>
          <li><strong>验证规则</strong>：在 <code>formItemOptions.rules</code> 中定义，支持 required/pattern/validator</li>
          <li><strong>性能优化</strong>：复杂表单使用 <code>isHiden</code> 替代 v-if，避免频繁重建组件</li>
        </ol>
      </div>

      <div class="tips-box tips-box--success">
        <h4>🚀 开发效率技巧</h4>
        <ul>
          <li><strong>快速创建表单</strong>：复制已有配置，修改字段名即可</li>
          <li><strong>统一配置</strong>：将常用 attrs（如 clearable、size）提取为常量</li>
          <li><strong>IDE 代码片段</strong>：配置表单字段代码片段，一键生成配置模板</li>
          <li><strong>类型提示</strong>：使用 JSDoc 注释标记字段类型，获得 IDE 提示</li>
        </ul>
      </div>
    </section>

    <!-- 下一步 -->
    <section class="modern-section">
      <div class="section-header">
        <div class="section-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
          <i class="el-icon-right" />
        </div>
        <h2 class="section-title">下一步</h2>
      </div>
      <p class="section-desc">继续探索其他组件，构建完整的业务解决方案</p>

      <div class="next-steps">
        <router-link to="/component/estable" class="next-step-card">
          <div class="next-step-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <i class="el-icon-s-grid" />
          </div>
          <div class="next-step-content">
            <h4>EsTable 表格组件</h4>
            <p>企业级表格组件，支持搜索、分页、批量操作、列配置等高级功能</p>
          </div>
          <i class="el-icon-arrow-right next-step-arrow" />
        </router-link>

        <router-link to="/component/esdialog" class="next-step-card">
          <div class="next-step-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            <i class="el-icon-s-promotion" />
          </div>
          <div class="next-step-content">
            <h4>useDialog 弹窗</h4>
            <p>简洁优雅的弹窗 Hook，支持指令式调用，让弹窗控制更轻松</p>
          </div>
          <i class="el-icon-arrow-right next-step-arrow" />
        </router-link>

        <router-link to="/component/combination" class="next-step-card">
          <div class="next-step-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
            <i class="el-icon-s-operation" />
          </div>
          <div class="next-step-content">
            <h4>组合联动</h4>
            <p>表单与表格的完美配合，实现复杂业务场景的数据管理</p>
          </div>
          <i class="el-icon-arrow-right next-step-arrow" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import {
  basicExample,
  controlsExample,
  layoutExample,
  validationExample,
  dynamicFieldExample,
  customRenderExample,
  dynamicRuleExample,
  realWorldFormExample,
  apiRequestExample,
  regionLinkageExample,
  remoteRegionLinkageExample,
  imageUploadExample,
  multiImageUploadExample
} from './examples/esFormExamples'

import { useDialog } from '@/components/es-eui'
const dialogImageUrl = useDialog()
export default {
  name: 'EsFormDocs',
  data() {
    return {
      // 基础示例
      basicFormData: { name: '', age: '', email: '' },
      basicFormConfig: [
        { prop: 'name', label: '姓名', formtype: 'Input', attrs: { placeholder: '请输入姓名' } },
        { prop: 'age', label: '年龄', formtype: 'Input', attrs: { placeholder: '请输入年龄' } },
        { prop: 'email', label: '邮箱', formtype: 'Input', attrs: { placeholder: '请输入邮箱' } }
      ],

      // 控件示例
      controlsFormData: {
        name: '',
        gender: '',
        hobby: [],
        status: true,
        city: '',
        date: '',
        rate: 3,
        content: ''
      },
      controlsFormConfig: [
        { prop: 'name', label: '输入框', span: 8, formtype: 'Input', attrs: { placeholder: '请输入' } },
        { prop: 'gender', label: '单选框', span: 8, formtype: 'Radio', dataOptions: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }] },
        { prop: 'city', label: '下拉选择', span: 8, formtype: 'Select', attrs: { placeholder: '请选择' }, dataOptions: [{ label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }] },
        { prop: 'hobby', label: '复选框', span: 12, formtype: 'Checkbox', dataOptions: [{ label: '阅读', value: 'read' }, { label: '运动', value: 'sport' }, { label: '音乐', value: 'music' }] },
        { prop: 'status', label: '开关', span: 12, formtype: 'Switch', attrs: { activeText: '启用', inactiveText: '禁用' } },
        { prop: 'date', label: '日期时间', span: 12, formtype: 'datePicker', attrs: { type: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm:ss', placeholder: '选择日期时间' } },
        { prop: 'rate', label: '评分', span: 12, formtype: 'Rate', attrs: { max: 5 } }
      ],
      controlsLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 布局示例
      layoutFormData: { field1: '', field2: '', field3: '', field4: '', field5: '', field6: '' },
      layoutFormConfig: [
        { prop: 'field1', label: '字段1', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field2', label: '字段2', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field3', label: '字段3', span: 8, formtype: 'Input', attrs: { placeholder: 'span=8 占据1/3行' } },
        { prop: 'field4', label: '字段4', span: 12, formtype: 'Input', attrs: { placeholder: 'span=12 占据半行' } },
        { prop: 'field5', label: '字段5', span: 12, formtype: 'Input', attrs: { placeholder: 'span=12 占据半行' } },
        { prop: 'field6', label: '字段6（被折叠）', span: 8, formtype: 'Input', attrs: { placeholder: '超过minfoldRows折叠' } }
      ],
      layoutProps: {
        fromLayProps: { labelWidth: '120px', size: 'small', minfoldRows: 2 },
        rowLayProps: { gutter: 20 }
      },
      // 布局表单按钮配置（用于显示折叠/展开按钮）
      layoutConfigBtn: [
        {
          name: '查询',
          type: 'primary',
          onClick: (model, formRef) => {
            this.$message.success('查询参数: ' + JSON.stringify(model))
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        }
      ],

      // 验证示例
      validateFormData: { username: '', email: '', phone: '', password: '', confirmPassword: '' },
      validateFormConfig: [
        {
          prop: 'username',
          label: '用户名',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: '3-20个字符' }
        },
        {
          prop: 'email',
          label: '邮箱',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: 'example@email.com' }
        },
        {
          prop: 'phone',
          label: '手机号',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
            ]
          },
          attrs: { placeholder: '11位手机号' }
        },
        {
          prop: 'password',
          label: '密码',
          span: 12,
          formtype: 'Input',
          formItemOptions: {
            rules: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, message: '密码至少6位', trigger: 'blur' }
            ]
          },
          attrs: { type: 'password', placeholder: '至少6位' }
        }
      ],
      validateConfigBtn: [
        {
          name: '提交',
          type: 'primary',
          onClick: (model, formRef) => {
            formRef.validate((valid) => {
              if (valid) {
                this.$message.success('验证通过！')
              } else {
                this.$message.error('请检查表单填写')
              }
            })
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        }
      ],

      // 动态字段示例
      dynamicFormData: { userType: 'personal', companyName: '', businessLicense: '', personalName: '', idCard: '' },
      dynamicFormConfig: [
        {
          prop: 'userType',
          label: '用户类型',
          span: 24,
          formtype: 'Radio',
          dataOptions: [{ label: '个人用户', value: 'personal' }, { label: '企业用户', value: 'company' }],
          on: { change: (val) => console.log('类型切换:', val) }
        },
        {
          prop: 'companyName',
          label: '公司名称',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入公司名称' },
          isHiden: (model) => model.userType !== 'company'
        },
        {
          prop: 'businessLicense',
          label: '营业执照',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入营业执照号' },
          isHiden: (model) => model.userType !== 'company'
        },
        {
          prop: 'personalName',
          label: '个人姓名',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入个人姓名' },
          isHiden: (model) => model.userType !== 'personal'
        },
        {
          prop: 'idCard',
          label: '身份证号',
          span: 12,
          formtype: 'Input',
          attrs: { placeholder: '请输入身份证号' },
          isHiden: (model) => model.userType !== 'personal'
        }
      ],

      // 自定义渲染示例
      customRenderData: { title: '', content: '', themeColor: '#409eff', showTags: false, tags: [] },
      customRenderConfig: [
        { prop: 'title', label: '标题', span: 24, formtype: 'Input', attrs: { placeholder: '请输入标题' } },
        {
          prop: 'content',
          label: '富文本内容',
          span: 24,
          render: (h, model, row) => {
            return h('div', {
              style: { border: '1px solid #dcdfe6', borderRadius: '4px', padding: '10px', minHeight: '100px' }
            }, [
              h('div', { style: { borderBottom: '1px solid #ebeef5', paddingBottom: '5px', marginBottom: '10px' } }, [
                h('el-button', { props: { size: 'mini' } }, 'B'),
                h('el-button', { props: { size: 'mini' } }, 'I'),
                h('el-button', { props: { size: 'mini' } }, 'U')
              ]),
              h('div', {
                attrs: { contenteditable: true },
                style: { minHeight: '60px', outline: 'none' },
                on: { input: (e) => { model[row.prop] = e.target.innerText } }
              }, model[row.prop] || '')
            ])
          }
        },
        {
          prop: 'themeColor',
          label: '主题色',
          span: 12,
          render: (h, model, row) => {
            const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
            return h('div', { style: { display: 'flex', gap: '10px' } },
              colors.map(color => h('div', {
                style: {
                  width: '30px', height: '30px', borderRadius: '4px',
                  backgroundColor: color, cursor: 'pointer',
                  border: model[row.prop] === color ? '2px solid #000' : '1px solid #dcdfe6'
                },
                on: { click: () => { model[row.prop] = color } }
              }))
            )
          }
        },
        {
          prop: 'showTags',
          label: '显示标签',
          span: 12,
          formtype: 'Switch',
          on: { change: () => { this.dynamicRuleKey = Date.now() } }
        }
      ],

      // 动态规则示例
      dynamicRuleKey: 0,
      dynamicRuleData: { name: '', email: '', requireEmail: false },
      dynamicRuleConfig: [],

      // 政策表单示例
      policyFormData: {
        policyName: '',
        policyAbstract: '',
        effectiveTimeRange: '',
        invalidTimeRange: '',
        policyTag: '',
        ispolicyTag: 'always',
        policyStatus: '0',
        policyReleaseType: '1',
        policyReleaseDate: '',
        coverImage: '',
        policyLinkContent: '',
        policyEitorContent: '',
        policyContentType: '1'
      },
      policyFormConfig: [],
      policyLayoutProps: {
        fromLayProps: { isBtnHiden: true, labelWidth: '120px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 代码示例
      basicExample,
      controlsExample,
      layoutExample,
      validationExample,
      dynamicFieldExample,
      customRenderExample,
      dynamicRuleExample,
      realWorldFormExample,
      apiRequestExample,
      regionLinkageExample,
      remoteRegionLinkageExample,
      imageUploadExample,
      multiImageUploadExample,

      // 代码折叠状态
      codeExpanded: {
        scene1: false,
        scene2: false,
        scene3: false,
        scene4: false,
        scene5: false,
        scene6: false,
        scene7: false,
        scene8: false,
        scene9: false,
        scene10: false,
        scene11: false,
        scene12: false,
        scene13: false
      },

      // 省市区三级联动示例（静态数据）
      regionFormData: {
        region: [],
        address: ''
      },
      regionFormConfig: [
        {
          prop: 'region',
          label: '省市区',
          span: 24,
          formtype: 'Cascader',
          attrs: {
            placeholder: '请选择省市区',
            props: {
              value: 'code',
              label: 'name',
              children: 'children',
              checkStrictly: false
            },
            clearable: true,
            filterable: true
          },
          dataOptions: [
            {
              code: '110000',
              name: '北京市',
              children: [
                {
                  code: '110100',
                  name: '市辖区',
                  children: [
                    { code: '110101', name: '东城区' },
                    { code: '110102', name: '西城区' },
                    { code: '110105', name: '朝阳区' },
                    { code: '110106', name: '丰台区' },
                    { code: '110107', name: '石景山区' },
                    { code: '110108', name: '海淀区' }
                  ]
                }
              ]
            },
            {
              code: '310000',
              name: '上海市',
              children: [
                {
                  code: '310100',
                  name: '市辖区',
                  children: [
                    { code: '310101', name: '黄浦区' },
                    { code: '310104', name: '徐汇区' },
                    { code: '310105', name: '长宁区' },
                    { code: '310106', name: '静安区' },
                    { code: '310107', name: '普陀区' },
                    { code: '310109', name: '虹口区' }
                  ]
                }
              ]
            },
            {
              code: '440000',
              name: '广东省',
              children: [
                {
                  code: '440100',
                  name: '广州市',
                  children: [
                    { code: '440103', name: '荔湾区' },
                    { code: '440104', name: '越秀区' },
                    { code: '440105', name: '海珠区' },
                    { code: '440106', name: '天河区' },
                    { code: '440111', name: '白云区' }
                  ]
                },
                {
                  code: '440300',
                  name: '深圳市',
                  children: [
                    { code: '440303', name: '罗湖区' },
                    { code: '440304', name: '福田区' },
                    { code: '440305', name: '南山区' },
                    { code: '440306', name: '宝安区' },
                    { code: '440307', name: '龙岗区' }
                  ]
                }
              ]
            }
          ],
          on: {
            change: (value) => {
              console.log('省市区选择变化:', value)
            }
          }
        },
        {
          prop: 'address',
          label: '详细地址',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入详细地址',
            type: 'textarea',
            rows: 2
          }
        }
      ],
      regionLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },
      regionConfigBtn: [
        {
          name: '提交',
          type: 'primary',
          onClick: (model) => {
            this.$message.success('提交成功！')
            console.log('表单数据:', model)
          }
        },
        {
          name: '重置',
          onClick: (model, formRef) => {
            formRef.resetFields()
          }
        }
      ],

      // 远程加载省市区示例（使用可访问的测试API演示联动）
      remoteRegionFormData: {
        province: '',
        city: '',
        district: ''
      },
      remoteRegionFormConfig: [
        {
          prop: 'province',
          label: '省份',
          span: 8,
          formtype: 'Select',
          attrs: {
            placeholder: '请选择省份',
            clearable: true,
            filterable: true
          },
          // 使用 JSONPlaceholder API 模拟省份数据加载
          apiParams: {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            options: {
              method: 'GET'
            }
          },
          // 自定义 httpRequest 方法，直接使用 axios
          httpRequest: (config) => {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()
              xhr.open('GET', config.url, true)
              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  try {
                    const data = JSON.parse(xhr.responseText)
                    resolve({ data })
                  } catch (e) {
                    resolve({ data: [] })
                  }
                } else {
                  reject(new Error('Request failed'))
                }
              }
              xhr.onerror = () => reject(new Error('Network error'))
              xhr.send()
            })
          },
          listenToCallBack: {
            crtn: (data) => {
              console.log('省份crtn回调data///', data)
              // 将API数据转换为省份选项格式
              if (Array.isArray(data)) {
                return data.slice(0, 10).map((item, index) => ({
                  label: item.address?.city || `省份${index + 1}`,
                  value: `province_${index + 1}`
                }))
              }
              return []
            }
          },
          on: {
            change: (value) => {
              // 省份变化时清空城市和区县
              this.remoteRegionFormData.city = ''
              this.remoteRegionFormData.district = ''
              console.log('省份变化///', value)
              // 动态加载城市数据
             // this.loadCityData(value)

              this.$refs.remoteRegionForm.formItmeRequestInstance(['city'])
            }
          }
        },
        {
          prop: 'city',
          label: '城市',
          span: 8,
          formtype: 'Select',
          apiParams: {
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET',
         },
         listenToCallBack: {
          crtn: (data) => {
            // 将API数据转换为城市选项格式
            console.log('城市crtn回调data///', data)
            if (Array.isArray(data)) {
              return data.slice(0, 8).map((item, index) => ({
                label: item.title?.substring(0, 6) || `城市${index + 1}`,
                value: `city_${item.id}`
              }))
            }
            return []
          }
        },
        attrs: {
            placeholder: '请选择城市',
            clearable: true,
            filterable: true,
            disabled: () => !this.remoteRegionFormData.province
          },
          dataOptions: [],
          on: {
               change: (value) => {
                   this.remoteRegionFormData.district = ''
                   this.$refs.remoteRegionForm.formItmeRequestInstance(['district'])
               }
          }
        },
        {
          prop: 'district',
          label: '区县',
          span: 8,
          formtype: 'Select',
          apiParams: {
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET',
         },
         listenToCallBack: {
          crtn: (data) => {
            // 将API数据转换为城市选项格式
            console.log('城市crtn回调data///', data)
            if (Array.isArray(data)) {
              return data.slice(0, 8).map((item, index) => ({
                label: item.title?.substring(0, 6) || `城市${index + 1}`,
                value: `city_${item.id}`
              }))
            }
            return []
          }
        },
          attrs: {
            placeholder: '请选择区县',
            clearable: true,
            filterable: true,
            disabled: () => !this.remoteRegionFormData.city
          },
          dataOptions: []
        }
      ],
      remoteRegionLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 接口请求示例
      apiRequestData: {
        province: '',
        city: '',
        category: ''
      },
      apiRequestConfig: [
        {
          prop: 'province',
          label: '远程选项',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择' },
          // 使用免费 API 获取数据
          apiParams: {
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET'
          },
          // 数据转换：将 API 返回的数据转换为 options 格式
          listenToCallBack: {
            crtn: (data) => {
              // 假设 API 返回数组，转换为 { label, value } 格式
              console.log('API 返回的数据为:', data)
              if (Array.isArray(data)) {
                return data.slice(0, 10).map(item => ({
                  label: item.title?.substring(0, 20) || item.name || '未知',
                  value: item.id
                }))
              }
              return []
            }
          }
        },
        {
          prop: 'city',
          label: '城市',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择城市' },
          // 静态数据示例
          dataOptions: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]
        },
        {
          prop: 'category',
          label: '远程选项2',
          span: 8,
          formtype: 'Select',
          attrs: { placeholder: '请选择' },
          // 使用 JSONPlaceholder API
          apiParams: {
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET'
          },
          // 数据转换
          listenToCallBack: {
            crtn: (data) => {
              if (Array.isArray(data)) {
                return data.slice(0, 10).map(item => ({
                  label: item.name || '未知',
                  value: item.id
                }))
              }
              return []
            }
          }
        }
      ],
      apiRequestLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      },

      // 图片上传示例
      uploadFormKey: 0,
      uploadFormData: {
        avatar: [],
        name: ''
      },
      uploadFormConfig: [
        {
          prop: 'name',
          label: '名称',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入名称'
          }
        },
        {
          prop: 'avatar',
          label: '头像',
          span: 24,
          formtype: 'Upload',
          props: {
            action: '/api/upload',
            accept: 'image/*',
            listType: 'picture-card',
            limit: 1,
            showFileList: true,
            onExceed: () => {
              this.$message.warning('最多只能上传1张图片')
            }
          },
          // 自定义上传请求 - 必须在 props 外面
          httpRequest: (options) => {
            return new Promise((resolve, reject) => {
              const file = options.file
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => {
                // 将 Base64 转换为 Blob 流链接
                const base64Data = reader.result
                const blob = this.dataURItoBlob(base64Data)
                const blobUrl = URL.createObjectURL(blob)
                
                // 模拟上传成功，返回 Blob 流链接
                const result = {
                  success: true,
                  link: blobUrl, // Blob 流链接
                  url: blobUrl,
                  filename: file.name
                }
                resolve({ data: result })
              }
              reader.onerror = () => {
                reject(new Error('文件读取失败'))
              }
            })
          },
          triggerRender: (h) => {
            return h('div', {
              style: {
                display: 'inline-block',
                width: '148px',
                height: '148px',
                lineHeight: '146px'
              }
            }, [
              h('i', {
                class: 'el-icon-plus',
                style: {
                  fontSize: '28px',
                  color: '#8c939d'
                }
              })
            ])
          },
          on: {
            success: (response, file, fileList) => {
              console.log('上传成功:', response, file, fileList)
              // 直接使用 fileList，保持 Element UI 需要的完整数据结构
              // this.uploadFormData.avatar = [...fileList]
              // this.$message.success('上传成功！')
            },
            remove: (file, fileList) => {
              this.uploadFormData.avatar = [...fileList]
            },
            change: (file, fileList) => {
              this.uploadFormData.avatar = [...fileList]
            },
            // 添加预览回调，支持点击文件查看大图
            preview: (file) => {
              if (file.url) {
                // 可以在此处实现自定义预览逻辑
                console.log('预览文件:', file.url)

                dialogImageUrl({
                  title: '图片预览',
                  key: 'dialogImageUrl1',
                  render: () => <img width="100%" src={file.url} alt="" />
                })
              }
            }
          }
        }
      ],

      // 多图片上传示例
      multiUploadFormKey: 0,
      multiUploadFormData: {
        gallery: [],
        description: ''
      },
      multiUploadFormConfig: [
        {
          prop: 'description',
          label: '描述',
          span: 24,
          formtype: 'Input',
          attrs: {
            placeholder: '请输入描述信息'
          }
        },
        {
          prop: 'gallery',
          label: '相册',
          span: 24,
          formtype: 'Upload',
          props: {
            action: '/api/upload',
            accept: 'image/*',
            listType: 'picture-card',
            limit: 9,
            multiple: true,
            showFileList: true,
            onExceed: () => {
              this.$message.warning('最多只能上传9张图片')
            }
          },
          // 自定义上传请求 - 必须在 props 外面
          httpRequest: (options) => {
            return new Promise((resolve, reject) => {
              const file = options.file
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => {
                // 将 Base64 转换为 Blob 流链接
                const base64Data = reader.result
                const blob = this.dataURItoBlob(base64Data)
                const blobUrl = URL.createObjectURL(blob)
                
                // 模拟上传成功，返回 Blob 流链接
                const result = {
                  success: true,
                  link: blobUrl,
                  url: blobUrl,
                  filename: file.name
                }
                resolve({ data: result })
              }
              reader.onerror = () => {
                reject(new Error('文件读取失败'))
              }
            })
          },
          triggerRender: (h) => {
            return h('div', {
              style: {
                display: 'inline-block',
                width: '148px',
                height: '148px',
                lineHeight: '146px'
              }
            }, [
              h('i', {
                class: 'el-icon-plus',
                style: {
                  fontSize: '28px',
                  color: '#8c939d'
                }
              })
            ])
          },
          on: {
            success: (response, file, fileList) => {
              // 直接使用 fileList，保持 Element UI 需要的完整数据结构
              // this.multiUploadFormData.gallery = [...fileList]
              // this.$message.success('上传成功！')
              console.log('this.multiUploadFormData', this.multiUploadFormData)
            },
            remove: (file, fileList) => {
              this.multiUploadFormData.gallery = [...fileList]
            },
            change: (file, fileList) => {
              this.multiUploadFormData.gallery = [...fileList]
            },
            // 添加预览回调，支持点击文件查看大图
            preview: (file) => {
              if (file.url) {
                 // console.log('预览文件:', file.url)

                    dialogImageUrl({
                  title: '图片预览',
                  key: 'dialogImageUrl2',
                  render: () => <img width="100%" src={file.url} alt="" />
                })
              }
            }
          }
        }
      ],
      uploadLayoutProps: {
        fromLayProps: { labelWidth: '100px', size: 'small' },
        rowLayProps: { gutter: 20 }
      }
    }
  },

  created() {
    // 动态规则配置
    this.dynamicRuleConfig = [
      { prop: 'name', label: '姓名', span: 12, formtype: 'Input', formItemOptions: { rules: [{ required: true, message: '请输入姓名' }] } },
      { prop: 'requireEmail', label: '需要邮箱', span: 12, formtype: 'Switch' },
      {
        prop: 'email',
        label: '邮箱',
        span: 12,
        formtype: 'Input',
        formItemOptions: {
          rules: this.dynamicRuleData.requireEmail
            ? [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式错误' }]
            : []
        },
        isHiden: () => !this.dynamicRuleData.requireEmail
      }
    ]

    // 政策表单配置
    this.policyFormConfig = [
      {
        prop: 'policyName',
        label: '政策名称',
        span: 24,
        formtype: 'Input',
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '政策名称不能为空', trigger: 'blur' }]
        },
        attrs: { placeholder: '请输入政策名称', clearable: true }
      },
      {
        prop: 'policyAbstract',
        label: '摘要',
        span: 24,
        formtype: 'Input',
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '摘要不能为空', trigger: 'blur' }]
        },
        attrs: { placeholder: '请输入政策摘要', type: 'textarea', rows: 3 }
      },
      {
        label: '政策生效时间',
        span: 24,
        formItemOptions: {
          labelWidth: '150px',
          style: { width: '65%' },
          rules: [{ required: true, message: '政策生效时间不能为空', trigger: 'change' }]
        },
        prop: 'effectiveTimeRange',
        formtype: 'datePicker',
        attrs: {
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          type: 'datetime',
          placeholder: '选择日期时间',
          style: 'width: 100%'
        }
      },
      {
        prop: 'policyTag',
        label: '政策标签',
        span: 24,
        formItemOptions: { labelWidth: '150px' },
        render: (h, model, row) => {
          return (
            <el-row gutter={20}>
              <el-col span={8} style="padding-left: 0;">
                <el-input v-model={model.policyTag} placeholder="请输入政策标签" />
              </el-col>
              <el-col span={10}>
                <el-radio-group v-model={model.ispolicyTag}>
                  <el-radio label="always">显示</el-radio>
                  <el-radio label="hide">隐藏</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          )
        }
      },
      {
        prop: 'policyStatus',
        label: '文章状态',
        span: 24,
        formItemOptions: {
          labelWidth: '150px',
          rules: [{ required: true, message: '文章状态不能为空', trigger: 'change' }]
        },
        formtype: 'Radio',
        attrs: { disabled: () => false },
        dataOptions: [{ label: '草稿', value: '0' }, { label: '上架', value: '1' }, { label: '下架', value: '2' }]
      },
      {
        prop: 'policyReleaseType',
        label: '发布方式',
        span: 24,
        formItemOptions: { labelWidth: '150px' },
        render: (h, model, row) => {
          return (
            <el-row gutter={20}>
              {model.policyReleaseType === '1' && (
                <el-col span={8} style="padding-left: 0;">
                  <el-date-picker
                    v-model={model.policyReleaseDate}
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择发布日期"
                    style="width: 100%;"
                  />
                </el-col>
              )}
              <el-col span={10}>
                <el-radio-group v-model={model.policyReleaseType}>
                  <el-radio label="0">立即发布</el-radio>
                  <el-radio label="1">定时发布</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          )
        }
      }
    ]
  },

  methods: {
    // ===== 代码复制功能 =====
    copyCode(code) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          this.$message.success('代码已复制到剪贴板')
        }).catch(() => {
          this.$message.error('复制失败，请手动复制')
        })
      } else {
        // 兼容不支持 navigator.clipboard 的浏览器
        const textarea = document.createElement('textarea')
        textarea.value = code
        document.body.appendChild(textarea)
        textarea.select()
        try {
          document.execCommand('copy')
          this.$message.success('代码已复制到剪贴板')
        } catch (err) {
          this.$message.error('复制失败，请手动复制')
        }
        document.body.removeChild(textarea)
      }
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

    // ===== Base64转Blob工具方法 =====
    dataURItoBlob(dataURI) {
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      const byteString = atob(dataURI.split(',')[1])
      const arrayBuffer = new ArrayBuffer(byteString.length)
      const uint8Array = new Uint8Array(arrayBuffer)
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
      }
      return new Blob([arrayBuffer], { type: mimeString })
    },

    createBlobUrl(blob) {
      return URL.createObjectURL(blob)
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
      //  min-height: 400px;
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

        .copy-btn {
          margin-left: auto;
          padding: 4px 12px;
          font-size: 12px;
          color: #409eff;
          background: #fff;
          border: 1px solid #409eff;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;

          &:hover {
            background: #409eff;
            color: #fff;
          }

          i {
            margin-right: 4px;
            color: inherit;
          }
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
