# StickerFit Studio BDD 规格说明

## 元数据

- 产品：StickerFit Studio
- 业务领域：贴纸排版规划与单张贴纸纸张利润估算
- 生产域名：`https://sticker-fit.com`
- 主要用户：小批量贴纸卖家
- 文档风格：行为驱动开发 BDD，兼容 Gherkin 的结构
- 场景 ID 格式：`SSF-<功能编号>-<场景编号>`

## 业务目标

StickerFit Studio 帮助贴纸卖家在正式打印前规划混合尺寸贴纸的纸张排版。网站需要通过有价值的搜索内容吸引访问者，把访问者转化为计算器用户，并提供足够的信任页面和经营化表达，为后续接入 AdSense 收益打基础。

## 参与者

- `贴纸卖家`：准备贴纸纸张用于销售或发货的创作者。
- `搜索访问者`：通过 Google 或其他搜索引擎进入网站的访问者。
- `复访卖家`：回来重复使用或调整生产方案的卖家。
- `爬虫`：读取 metadata、robots 和 sitemap 的搜索引擎机器人。

## 领域词汇

- `纸张预设`：一个命名的纸张和裁切机配置，例如 Cricut Letter 或 Silhouette Letter。
- `工作区域`：纸张预设内真正可打印或可裁切的区域。
- `贴纸项目`：一条贴纸定义，包含名称、宽度、高度、数量和颜色。
- `出血`：为打印和裁切误差预留的贴纸外扩边距。
- `间距`：贴纸之间必须保留的距离。
- `安全边距`：工作区域边界向内收缩的距离。
- `已放置项目`：成功排入某张纸的贴纸实例。
- `未放置项目`：在当前约束下无法排入纸张的贴纸实例。
- `覆盖率`：已放置贴纸占用工作区域的比例。
- `浪费面积`：贴纸放置后剩余未使用的工作区域。
- `单张利润`：销售收入扣除材料、墨水、人工、包装和平台费用后的估算结果。

## 全局不变规则

```gherkin
Feature: 全局生产行为

  Rule: 公开网站必须表现为一个正在经营的产品

    Scenario: SSF-00-01 公开页面不出现内部上线说明
      Given 访问者打开任意公开页面
      When 页面内容完成渲染
      Then 页面不能展示演示版本文案
      And 页面不能展示临时配置说明
      And 页面不能展示个人邮箱
      And 页面不能展示本机路径

    Scenario: SSF-00-02 计算器无需账号即可使用
      Given 贴纸卖家打开首页
      When 他们使用计算器控件
      Then 系统不能要求登录
      And 用户输入的贴纸尺寸应能在浏览器会话中正常使用

    Scenario: SSF-00-03 公开 metadata 使用生产域名
      Given 爬虫请求任意公开页面
      When 它读取 canonical、Open Graph、JSON-LD、robots 和 sitemap
      Then 这些 URL 应使用 "https://sticker-fit.com"
```

## 功能 1：公开导航与信任页面

```gherkin
Feature: 公开导航与信任页面

  Rule: 页脚导航应服务真实用户

    Scenario: SSF-01-01 页脚展示用户关心的信任页面
      Given 访问者打开首页
      When 他们查看页脚
      Then 应看到 About、Contact、Privacy 和 Terms 链接
      And 不应看到可见的 Sitemap 页脚链接

    Scenario: SSF-01-02 Sitemap 仍然对爬虫可用
      Given 爬虫请求 "/sitemap.xml"
      When 路由返回响应
      Then 响应状态应为 HTTP 200
      And sitemap 应包含首页、指南页、About、Contact、Privacy 和 Terms 页面

    Scenario: SSF-01-03 Contact 页面像一个正在使用的支持页面
      Given 访问者打开 "/contact/"
      When 页面内容完成渲染
      Then 页面应展示支持邮箱 "support@sticker-fit.com"
      And 页面应说明提交排版问题时需要包含哪些信息
      And 页面不应提到联系信息稍后添加
```

## 功能 2：纸张预设选择

```gherkin
Feature: 纸张预设选择

  Rule: 纸张预设决定可用生产空间

    Scenario Outline: SSF-02-01 卖家选择裁切机预设
      Given 贴纸卖家位于计算器页面
      When 他们选择 "<preset>" 预设
      Then 计算器应应用对应的纸张尺寸
      And 计算器应应用对应的工作区域
      And 预览应在不刷新页面的情况下更新
      And 排版指标应基于所选预设重新计算

      Examples:
        | preset            |
        | Cricut Letter     |
        | Cricut A4         |
        | Silhouette Letter |
        | Full Letter Proof |

    Scenario: SSF-02-02 卖家调整生产间距
      Given 贴纸卖家已选择纸张预设
      And 至少存在一个贴纸项目
      When 他们修改出血、间距或安全边距
      Then 排版引擎应重新计算可用空间
      And 已放置数量、纸张数量、覆盖率和浪费面积应更新
      And 预览应展示新的排版边界
```

## 功能 3：贴纸组合管理

```gherkin
Feature: 贴纸组合管理

  Rule: 卖家可以模拟真实的混合尺寸贴纸纸张

    Scenario: SSF-03-01 卖家添加多个贴纸项目
      Given 卖家需要打印产品贴纸、标签、样张或赠品
      When 他们为每个项目添加名称、宽度、高度、数量和颜色
      Then 系统应把每一行视为独立贴纸项目
      And 预览应保留项目名称和颜色
      And 导出数据应保留项目尺寸和数量

    Scenario: SSF-03-02 卖家编辑已有贴纸项目
      Given 卖家已经配置贴纸组合
      When 他们修改项目名称、尺寸、数量或颜色
      Then 纸张方案应使用当前项目值重新计算
      And 旧的放置结果不应残留在预览中

    Scenario: SSF-03-03 卖家删除贴纸项目
      Given 卖家拥有多个贴纸项目
      When 他们删除其中一个项目
      Then 被删除的项目不应再出现在指标、预览、SVG 导出或 CSV 导出中
```

## 功能 4：排版、旋转与指标

```gherkin
Feature: 排版、旋转与指标

  Rule: 排版结果应帮助卖家判断纸张是否高效

    Scenario: SSF-04-01 计算器排布混合尺寸贴纸
      Given 贴纸组合包含不同尺寸
      When 系统计算排版
      Then 引擎应把贴纸放置到一张或多张纸上
      And 每个已放置项目应包含纸张编号、x 坐标、y 坐标、宽度、高度和旋转状态
      And 无法放入的项目应计入未放置数量

    Scenario: SSF-04-02 开启旋转后提升利用率
      Given 某个贴纸项目旋转后更容易放入纸张
      When 旋转开关开启
      Then 排版引擎可以旋转符合条件的放置项
      And 预览应体现旋转后的放置状态
      And CSV 导出应标识旋转状态

    Scenario: SSF-04-03 关闭旋转后禁止旋转
      Given 某个贴纸项目只有旋转后才能放入
      When 旋转开关关闭
      Then 排版引擎不能旋转该项目
      And 如果原始方向无法放入，该项目应保持未放置

    Scenario: SSF-04-04 指标总结生产影响
      Given 排版已经完成计算
      When 卖家查看指标面板
      Then 应看到已放置数量、纸张数量、覆盖率和浪费面积
      And 相关输入变化后这些指标应立即更新
```

## 功能 5：单张纸利润估算

```gherkin
Feature: 单张纸利润估算

  Rule: 定价输出是规划估算，不是财务保证

    Scenario: SSF-05-01 卖家输入成本假设
      Given 卖家已经得到一个纸张方案
      When 他们输入材料、墨水、人工、包装、平台费用和销售价格假设
      Then 计算器应估算单张纸成本
      And 计算器应估算平台费用影响
      And 计算器应估算利润或利润率

    Scenario: SSF-05-02 利润随纸张数量更新
      Given 卖家已经输入成本假设
      When 排版输入导致纸张数量变化
      Then 利润估算应基于当前纸张数量更新
      And 卖家应能判断这个产品想法是否仍然可行
```

## 功能 6：生产文件导出

```gherkin
Feature: 生产文件导出

  Rule: 导出结果应匹配当前计算器状态

    Scenario: SSF-06-01 卖家导出 SVG 排版图
      Given 当前排版至少有一个已放置贴纸
      When 卖家点击 Export SVG
      Then 浏览器应下载 SVG 排版文件
      And SVG 应体现当前纸张预设、工作区域和已放置贴纸

    Scenario: SSF-06-02 卖家导出 CSV 裁切清单
      Given 当前排版至少有一个已放置贴纸
      When 卖家点击 Cut List CSV
      Then 浏览器应下载 CSV 文件
      And 每一行应包含纸张编号、项目名称、位置、尺寸和旋转状态

    Scenario: SSF-06-03 导出文件不包含过期项目
      Given 卖家已经编辑或删除某个贴纸项目
      When 他们导出 SVG 或 CSV
      Then 导出文件只能反映最新的计算器状态
```

## 功能 7：SEO 入口

```gherkin
Feature: SEO 入口

  Rule: 搜索访问者应获得有用内容，并能自然进入计算器

    Scenario Outline: SSF-07-01 指南页回答一个搜索意图
      Given 搜索访问者打开 "<guide_path>"
      When 他们阅读页面
      Then 页面应直接回答主要搜索意图
      And 页面应把该主题自然连接回贴纸纸张计算器
      And 页面应具有自引用 canonical URL

      Examples:
        | guide_path                                      |
        | /guides/sticker-sheet-profit-calculator/        |
        | /guides/cricut-print-then-cut-size-chart/       |

    Scenario: SSF-07-02 Robots 和 sitemap 支持收录
      Given 爬虫请求 "/robots.txt"
      When 响应返回
      Then 爬取不应被阻止
      And 响应应指向 "https://sticker-fit.com/sitemap.xml"

    Scenario: SSF-07-03 结构化数据描述正在经营的网站
      Given 爬虫读取首页 JSON-LD
      When 它解析结构化数据
      Then 应找到 Organization 和 WebSite 节点
      And Organization 节点应引用生产环境 logo
      And contactPoint 应使用域名支持邮箱
```

## 功能 8：隐私与数据处理

```gherkin
Feature: 隐私与数据处理

  Rule: 默认计算器流程不依赖服务端存储

    Scenario: SSF-08-01 计算器输入留在浏览器中
      Given 卖家输入贴纸尺寸、数量和成本假设
      When 他们使用计算器
      Then 网站不应要求账号
      And 网站不应把贴纸 artwork 或计算器输入上传到应用服务器

    Scenario: SSF-08-02 Privacy 页面清楚说明分析和广告
      Given 访问者打开 "/privacy/"
      When 他们阅读隐私政策
      Then 页面应说明分析和广告合作方可能使用 cookie 或类似技术
      And 页面应提供用于隐私问题的支持邮箱
```

## 后续优化待办

```gherkin
Feature: 后续优化待办

  Rule: 后续工作在实现前也应可验收

    Scenario: SSF-90-01 配置域名邮件路由
      Given 网站已经公开展示 "support@sticker-fit.com"
      When Cloudflare Email Routing 配置完成
      Then 该地址应转发到已验证的目标邮箱
      And 域名应存在 MX、SPF 和 DKIM 记录

    Scenario: SSF-90-02 添加本地保存预设
      Given 复访卖家会重复使用同一套贴纸组合
      When 他们保存一个预设
      Then 预设应保存在浏览器本地
      And 不应要求登录账号

    Scenario: SSF-90-03 添加公制和英制单位
      Given 卖家使用非美国英寸制工作流
      When 他们切换单位
      Then 尺寸应以所选单位显示
      And 导出文件应清楚标识所使用的单位

    Scenario: SSF-90-04 添加排版对比模式
      Given 卖家正在优化浪费面积和利润
      When 他们比较不同出血、间距、旋转或纸张预设
      Then 工具应并排展示纸张数量、覆盖率、浪费面积和利润差异

    Scenario: SSF-90-05 扩展 SEO 内容库
      Given 围绕贴纸生产和定价存在搜索需求
      When 新指南页发布
      Then 每篇指南应服务一个明确搜索意图
      And 每篇指南应链接到相关计算器工作流

    Scenario: SSF-90-06 添加隐私安全的分析事件
      Given 网站需要产品使用信号
      When 添加分析事件
      Then 事件应追踪纸张预设选择、导出等工作流动作
      And 事件不应收集私人客户数据或贴纸 artwork
```
