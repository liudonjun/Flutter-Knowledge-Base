#!/usr/bin/env node
/**
 * 批量生成 13/14 模块 stub 页面（已有文件则跳过）
 * 用法：pnpm generate:stub-pages
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.join(__dirname, '../docs')

function packageStub({ title, pkg, categoryHref, categoryLabel, pubUrl }) {
  return `# ${title}

> ${pkg} 在 Flutter 中的用法与选型要点。（本文档为 stub，待完善。）

## 概述

- **包名**：\`${pkg}\`
- **分类**：[[${categoryLabel}]]
- **pub.dev**：[${pkg}](${pubUrl})

## 安装

\`\`\`yaml
dependencies:
  ${pkg}: ^latest
\`\`\`

## 基本用法

（待补充：最小可运行示例、常见 API、与同类库对比。）

## 最佳实践

（待补充：项目结构、错误处理、测试建议。）

## 相关链接

- [[00-第三方库索引]]
- [[${categoryLabel}]]

---
*stub · 由 \`pnpm generate:stub-pages\` 生成*
`
}

function interviewStub({ title, intro, sections, related }) {
  const body = sections.map((s) => `### ${s}\n\n（待补充）\n`).join('\n')
  return `# ${title}

> ${intro}（本文档为 stub，待完善。）

## 常见考点

${body}

## 回答技巧

（待补充：结构化表达、结合项目经验、追问应对。）

## 相关链接

${related.map((r) => `- [[${r}]]`).join('\n')}
- [[01-面试准备]]
- [[00-面试与进阶索引]]

---
*stub · 由 \`pnpm generate:stub-pages\` 生成*
`
}

const PACKAGE_STUBS = [
  {
    file: '13-第三方库/08-retrofit详解.md',
    content: packageStub({
      title: 'Retrofit 详解',
      pkg: 'retrofit',
      categoryLabel: '03-网络请求库详解',
      categoryHref: '/13-第三方库/03-网络请求库详解',
      pubUrl: 'https://pub.dev/packages/retrofit'
    })
  },
  {
    file: '13-第三方库/09-shared_preferences详解.md',
    content: packageStub({
      title: 'shared_preferences 详解',
      pkg: 'shared_preferences',
      categoryLabel: '04-数据库库详解',
      pubUrl: 'https://pub.dev/packages/shared_preferences'
    })
  },
  {
    file: '13-第三方库/10-get_it详解.md',
    content: packageStub({
      title: 'get_it 详解',
      pkg: 'get_it',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/get_it'
    })
  },
  {
    file: '13-第三方库/11-flutter_hooks详解.md',
    content: packageStub({
      title: 'flutter_hooks 详解',
      pkg: 'flutter_hooks',
      categoryLabel: '02-状态管理库详解',
      pubUrl: 'https://pub.dev/packages/flutter_hooks'
    })
  },
  {
    file: '13-第三方库/12-path_provider详解.md',
    content: packageStub({
      title: 'path_provider 详解',
      pkg: 'path_provider',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/path_provider'
    })
  },
  {
    file: '13-第三方库/13-permission_handler详解.md',
    content: packageStub({
      title: 'permission_handler 详解',
      pkg: 'permission_handler',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/permission_handler'
    })
  },
  {
    file: '13-第三方库/14-url_launcher详解.md',
    content: packageStub({
      title: 'url_launcher 详解',
      pkg: 'url_launcher',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/url_launcher'
    })
  },
  {
    file: '13-第三方库/15-mockito详解.md',
    content: packageStub({
      title: 'mockito 详解',
      pkg: 'mockito',
      categoryLabel: '07-测试库详解',
      pubUrl: 'https://pub.dev/packages/mockito'
    })
  },
  {
    file: '13-第三方库/16-mocktail详解.md',
    content: packageStub({
      title: 'mocktail 详解',
      pkg: 'mocktail',
      categoryLabel: '07-测试库详解',
      pubUrl: 'https://pub.dev/packages/mocktail'
    })
  },
  {
    file: '13-第三方库/17-graphql_flutter详解.md',
    content: packageStub({
      title: 'graphql_flutter 详解',
      pkg: 'graphql_flutter',
      categoryLabel: '03-网络请求库详解',
      pubUrl: 'https://pub.dev/packages/graphql_flutter'
    })
  },
  {
    file: '13-第三方库/18-fl_chart详解.md',
    content: packageStub({
      title: 'fl_chart 详解',
      pkg: 'fl_chart',
      categoryLabel: '05-UI组件库详解',
      pubUrl: 'https://pub.dev/packages/fl_chart'
    })
  },
  {
    file: '13-第三方库/19-lottie详解.md',
    content: packageStub({
      title: 'lottie 详解',
      pkg: 'lottie',
      categoryLabel: '05-UI组件库详解',
      pubUrl: 'https://pub.dev/packages/lottie'
    })
  },
  // —— 第二批 ——
  {
    file: '13-第三方库/20-secure_storage详解.md',
    content: packageStub({
      title: 'secure_storage 详解',
      pkg: 'flutter_secure_storage',
      categoryLabel: '04-数据库库详解',
      pubUrl: 'https://pub.dev/packages/flutter_secure_storage'
    })
  },
  {
    file: '13-第三方库/21-injectable详解.md',
    content: packageStub({
      title: 'injectable 详解',
      pkg: 'injectable',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/injectable'
    })
  },
  {
    file: '13-第三方库/22-image_picker详解.md',
    content: packageStub({
      title: 'image_picker 详解',
      pkg: 'image_picker',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/image_picker'
    })
  },
  {
    file: '13-第三方库/23-file_picker详解.md',
    content: packageStub({
      title: 'file_picker 详解',
      pkg: 'file_picker',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/file_picker'
    })
  },
  {
    file: '13-第三方库/24-firebase_messaging详解.md',
    content: packageStub({
      title: 'firebase_messaging 详解',
      pkg: 'firebase_messaging',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/firebase_messaging'
    })
  },
  {
    file: '13-第三方库/25-flutter_local_notifications详解.md',
    content: packageStub({
      title: 'flutter_local_notifications 详解',
      pkg: 'flutter_local_notifications',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/flutter_local_notifications'
    })
  },
  {
    file: '13-第三方库/26-web_socket_channel详解.md',
    content: packageStub({
      title: 'web_socket_channel 详解',
      pkg: 'web_socket_channel',
      categoryLabel: '03-网络请求库详解',
      pubUrl: 'https://pub.dev/packages/web_socket_channel'
    })
  },
  {
    file: '13-第三方库/27-share_plus详解.md',
    content: packageStub({
      title: 'share_plus 详解',
      pkg: 'share_plus',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/share_plus'
    })
  },
  {
    file: '13-第三方库/28-flutter_animate详解.md',
    content: packageStub({
      title: 'flutter_animate 详解',
      pkg: 'flutter_animate',
      categoryLabel: '05-UI组件库详解',
      pubUrl: 'https://pub.dev/packages/flutter_animate'
    })
  },
  {
    file: '13-第三方库/29-bloc_test详解.md',
    content: packageStub({
      title: 'bloc_test 详解',
      pkg: 'bloc_test',
      categoryLabel: '07-测试库详解',
      pubUrl: 'https://pub.dev/packages/bloc_test'
    })
  },
  {
    file: '13-第三方库/30-get_storage详解.md',
    content: packageStub({
      title: 'get_storage 详解',
      pkg: 'get_storage',
      categoryLabel: '04-数据库库详解',
      pubUrl: 'https://pub.dev/packages/get_storage'
    })
  },
  {
    file: '13-第三方库/31-device_info_plus详解.md',
    content: packageStub({
      title: 'device_info_plus 详解',
      pkg: 'device_info_plus',
      categoryLabel: '06-工具库详解',
      pubUrl: 'https://pub.dev/packages/device_info_plus'
    })
  },
  // —— 第三批（补齐 P1 剩余同义词兜底）——
  ...[
    ['32-stripe详解', 'stripe', '06-工具库详解'],
    ['33-alipay详解', 'alipay', '06-工具库详解'],
    ['34-wechat_pay详解', 'wechat_pay', '06-工具库详解'],
    ['35-paypal详解', 'paypal', '06-工具库详解'],
    ['36-google_sign_in详解', 'google_sign_in', '06-工具库详解'],
    ['37-apple_sign_in详解', 'apple_sign_in', '06-工具库详解'],
    ['38-wechat_login详解', 'wechat_login', '06-工具库详解'],
    ['39-facebook_login详解', 'facebook_login', '06-工具库详解'],
    ['40-mqtt_client详解', 'mqtt_client', '03-网络请求库详解'],
    ['41-socket_io_client详解', 'socket_io_client', '03-网络请求库详解'],
    ['42-dio_logging_interceptor详解', 'dio_logging_interceptor', '03-网络请求库详解'],
    ['43-pretty_dio_logger详解', 'pretty_dio_logger', '03-网络请求库详解'],
    ['44-hive_storage详解', 'hive_storage', '04-数据库库详解'],
    ['45-flutter_bloc_observer详解', 'flutter_bloc_observer', '02-状态管理库详解'],
    ['46-provider_di详解', 'provider_di', '02-状态管理库详解'],
    ['47-golden_toolkit详解', 'golden_toolkit', '07-测试库详解'],
    ['48-rive详解', 'rive', '05-UI组件库详解'],
    ['49-animated_text_kit详解', 'animated_text_kit', '05-UI组件库详解'],
    ['50-charts_flutter详解', 'charts_flutter', '05-UI组件库详解'],
    ['51-syncfusion_flutter_charts详解', 'syncfusion_flutter_charts', '05-UI组件库详解'],
    ['52-bezier_chart详解', 'bezier_chart', '05-UI组件库详解'],
    ['53-Material组件详解', 'Material', '05-UI组件库详解', 'material'],
    ['54-Cupertino组件详解', 'Cupertino', '05-UI组件库详解', 'cupertino_icons'],
    ['55-Flutter_Widgets详解', 'Flutter_Widgets', '05-UI组件库详解', 'flutter'],
    ['56-Adaptive_Widgets详解', 'Adaptive_Widgets', '05-UI组件库详解'],
    ['57-camera详解', 'camera', '06-工具库详解'],
    ['58-geolocator详解', 'geolocator', '06-工具库详解'],
    ['59-bluetooth详解', 'bluetooth', '06-工具库详解'],
    ['60-sensors_plus详解', 'sensors_plus', '06-工具库详解'],
    ['61-clipboard详解', 'clipboard', '06-工具库详解'],
    ['62-kiwi详解', 'kiwi', '06-工具库详解'],
    ['63-onesignal详解', 'onesignal', '06-工具库详解'],
    ['64-push_notification详解', 'push_notification', '06-工具库详解']
  ].map(([file, wikiName, categoryLabel, pubPkg]) => ({
    file: `13-第三方库/${file}.md`,
    content: packageStub({
      title: file.replace(/^\d+-/, '').replace('详解', ' 详解'),
      pkg: pubPkg ?? wikiName,
      categoryLabel,
      pubUrl:
        wikiName === 'Material' || wikiName === 'Cupertino' || wikiName === 'Flutter_Widgets'
          ? 'https://docs.flutter.dev/ui/widgets'
          : `https://pub.dev/packages/${pubPkg ?? wikiName}`
    })
  }))
]

function projectStub({ title, intro, modules, related }) {
  return `# ${title}

> ${intro}（本文档为 stub，待完善。）

## 模块划分

${modules.map((m) => `- ${m}`).join('\n')}

## 技术要点

（待补充：接口设计、状态同步、安全与合规、测试策略。）

## 相关链接

${related.map((r) => `- [[${r}]]`).join('\n')}
- [[00-项目实战索引]]
- [[10-技术选型与架构设计]]

---
*stub · 由 \`pnpm generate:stub-pages\` 生成*
`
}

const PROJECT_STUBS = [
  {
    file: '12-项目实战/11-支付系统设计.md',
    content: projectStub({
      title: '支付系统设计',
      intro: 'Flutter 应用中支付模块的架构与接入要点。',
      modules: ['支付渠道抽象', '订单与回调', '安全与对账', '异常与退款'],
      related: ['02-应用发布详解', '用户系统设计']
    })
  },
  {
    file: '12-项目实战/12-用户系统设计.md',
    content: projectStub({
      title: '用户系统设计',
      intro: '账号、鉴权与用户资料模块的设计参考。',
      modules: ['注册登录', 'Token 与会话', '资料与权限', '第三方登录'],
      related: ['01-项目架构设计', '支付系统设计']
    })
  },
  {
    file: '12-项目实战/13-消息系统设计.md',
    content: projectStub({
      title: '消息系统设计',
      intro: '站内信、推送与实时消息的整体方案。',
      modules: ['推送接入', '消息存储', '未读与同步', 'Deep Link'],
      related: ['24-firebase_messaging详解', '25-flutter_local_notifications详解']
    })
  },
  {
    file: '12-项目实战/14-应用打包与签名.md',
    content: projectStub({
      title: '应用打包与签名',
      intro: 'Android / iOS 打包、签名与上架前检查清单。',
      modules: ['Android APK/AAB', 'iOS Archive', '签名证书管理', '渠道包与版本号'],
      related: ['02-应用发布详解', '01-部署与发布']
    })
  },
  {
    file: '12-项目实战/15-需求分析与原型.md',
    content: projectStub({
      title: '需求分析与原型',
      intro: '从需求到原型的 Flutter 项目启动流程。',
      modules: ['用户故事', '功能边界', '原型工具', '技术预研'],
      related: ['10-技术选型与架构设计', '01-项目架构设计']
    })
  },
  {
    file: '12-项目实战/16-敏捷与迭代开发.md',
    content: projectStub({
      title: '敏捷与迭代开发',
      intro: 'Flutter 团队的 Sprint、评审与持续交付实践。',
      modules: ['Sprint 规划', 'Code Review', 'CI 集成', '灰度发布'],
      related: ['09-代码规范与最佳实践', '02-应用发布详解']
    })
  },
  {
    file: '12-项目实战/17-目录结构设计.md',
    content: projectStub({
      title: '目录结构设计',
      intro: 'Flutter 项目 lib 目录与 feature-first 组织。',
      modules: ['feature 划分', '分层边界', '命名规范', '测试目录'],
      related: ['01-项目架构设计', '09-代码规范与最佳实践']
    })
  },
  {
    file: '12-项目实战/18-地图系统集成.md',
    content: projectStub({
      title: '地图系统集成',
      intro: '地图 SDK、定位与 Marker 集成要点。',
      modules: ['SDK 选型', '权限与 Key', 'Marker 性能', '国内外差异'],
      related: ['58-geolocator详解', '13-permission_handler详解']
    })
  },
  {
    file: '12-项目实战/19-新闻应用实战.md',
    content: projectStub({
      title: '新闻应用实战',
      intro: '资讯 Feed、详情与离线缓存。',
      modules: ['分页列表', '详情 WebView', '搜索防抖', '缓存策略'],
      related: ['07-系统设计面试题', '02-天气应用开发']
    })
  },
  {
    file: '12-项目实战/20-工具应用实战.md',
    content: projectStub({
      title: '工具应用实战',
      intro: '轻量工具类 App 架构与能力选型。',
      modules: ['简化分层', '本地存储', '权限最小化', '包体控制'],
      related: ['03-Todo应用实战', '17-目录结构设计']
    })
  },
  {
    file: '12-项目实战/21-电商应用实战.md',
    content: projectStub({
      title: '电商应用实战',
      intro: '商品、购物车、订单与支付闭环。',
      modules: ['商品模块', '购物车', '支付链路', '性能安全'],
      related: ['11-支付系统设计', '32-stripe详解']
    })
  },
  {
    file: '12-项目实战/22-社交应用实战.md',
    content: projectStub({
      title: '社交应用实战',
      intro: 'Feed、IM 与推送的社交 App 指南。',
      modules: ['Feed', 'WebSocket', 'FCM', '媒体上传'],
      related: ['13-消息系统设计', '24-firebase_messaging详解']
    })
  }
]

const INTERVIEW_STUBS = [
  {
    file: '14-面试与进阶/02-Flutter基础面试题.md',
    content: interviewStub({
      title: 'Flutter 基础面试题',
      intro: 'Flutter 核心概念与渲染原理常见面试题汇总。',
      sections: ['Widget / Element / RenderObject', 'Stateless vs Stateful', 'BuildContext 作用', '渲染流水线三阶段'],
      related: ['Widget面试题', '03-Dart基础面试题']
    })
  },
  {
    file: '14-面试与进阶/03-Dart基础面试题.md',
    content: interviewStub({
      title: 'Dart 基础面试题',
      intro: 'Dart 语言特性与异步编程常见面试题汇总。',
      sections: ['空安全与类型系统', 'Future / Stream / Isolate', 'Mixin 与继承', '泛型与协变'],
      related: ['02-Flutter基础面试题', 'Dart深入']
    })
  },
  {
    file: '14-面试与进阶/04-Widget面试题.md',
    content: interviewStub({
      title: 'Widget 面试题',
      intro: '布局、生命周期与性能相关 Widget 面试题。',
      sections: ['约束与布局原理', 'Key 的使用场景', 'InheritedWidget', '列表与重建优化'],
      related: ['02-Flutter基础面试题', '06-性能优化面试题']
    })
  },
  {
    file: '14-面试与进阶/05-架构设计面试题.md',
    content: interviewStub({
      title: '架构设计面试题',
      intro: 'Flutter 项目分层、状态管理与模块划分面试题。',
      sections: ['分层与职责边界', '状态管理选型', '依赖注入', '可测试架构'],
      related: ['07-系统设计面试题', '架构设计模式']
    })
  },
  {
    file: '14-面试与进阶/06-性能优化面试题.md',
    content: interviewStub({
      title: '性能优化面试题',
      intro: '帧率、内存与启动优化相关面试题。',
      sections: ['jank 排查思路', '重建与重绘优化', '图片与列表优化', 'DevTools 使用'],
      related: ['性能优化深入', '04-Widget面试题']
    })
  },
  {
    file: '14-面试与进阶/07-系统设计面试题.md',
    content: interviewStub({
      title: '系统设计面试题',
      intro: '移动端系统设计、模块拆分与扩展性面试题。',
      sections: ['Feed 流设计', '离线缓存策略', '推送与深链', '多端同步'],
      related: ['05-架构设计面试题', '项目经验面试题']
    })
  },
  {
    file: '14-面试与进阶/08-源码理解面试题.md',
    content: interviewStub({
      title: '源码理解面试题',
      intro: 'Framework / Engine 源码级追问与阅读方法。',
      sections: ['Binding 初始化', 'Element 更新机制', 'Layer 与合成', 'Platform Channel'],
      related: ['Flutter源码', '框架源码', 'Skia深入']
    })
  },
  {
    file: '14-面试与进阶/09-STAR法则详解.md',
    content: interviewStub({
      title: 'STAR 法则详解',
      intro: '行为面试与项目经历描述的结构化方法。',
      sections: ['Situation 情境', 'Task 任务', 'Action 行动', 'Result 结果'],
      related: ['项目展示', '项目经验面试题', '问题回答']
    })
  },
  {
    file: '14-面试与进阶/10-项目经验面试题.md',
    content: interviewStub({
      title: '项目经验面试题',
      intro: '如何用项目经历回答复杂度、协作与结果类问题。',
      sections: ['项目背景与目标', '个人职责边界', '技术难点与取舍', '量化结果'],
      related: ['09-STAR法则详解', '14-项目展示详解']
    })
  },
  {
    file: '14-面试与进阶/11-Flutter算法题.md',
    content: interviewStub({
      title: 'Flutter 算法题',
      intro: '面试中常见的算法与 Dart 编码题。',
      sections: ['数组与字符串', '树与图遍历', '动态规划入门', '手写 Widget / 布局题'],
      related: ['13-数据结构题', '03-Dart基础面试题']
    })
  },
  {
    file: '14-面试与进阶/12-设计模式题.md',
    content: interviewStub({
      title: '设计模式题',
      intro: 'Flutter 项目中常见设计模式的应用场景。',
      sections: ['单例与工厂', '观察者 / 发布订阅', '策略与装饰', 'Repository 模式'],
      related: ['05-架构设计面试题', '架构设计模式']
    })
  },
  {
    file: '14-面试与进阶/13-数据结构题.md',
    content: interviewStub({
      title: '数据结构题',
      intro: '移动端面试常见数据结构考点。',
      sections: ['链表与栈队列', '哈希表', '二叉树', '复杂度分析'],
      related: ['11-Flutter算法题', '03-Dart基础面试题']
    })
  },
  {
    file: '14-面试与进阶/14-项目展示详解.md',
    content: interviewStub({
      title: '项目展示详解',
      intro: '面试中演示 App、架构图与关键链路的表达方法。',
      sections: ['Demo 准备', '架构一页纸', '亮点故事线', '追问预案'],
      related: ['10-项目经验面试题', '09-STAR法则详解']
    })
  },
  {
    file: '14-面试与进阶/15-问题回答策略.md',
    content: interviewStub({
      title: '问题回答策略',
      intro: '结构化回答、边界澄清与不会时的应对。',
      sections: ['先结论后展开', '澄清需求', '诚实与延伸', '反问环节'],
      related: ['09-STAR法则详解', '技术面试技巧']
    })
  },
  {
    file: '14-面试与进阶/16-状态管理面试题.md',
    content: interviewStub({
      title: '状态管理面试题',
      intro: 'Provider、Riverpod、BLoC 等方案的对比与选型。',
      sections: ['状态分类', 'InheritedWidget 原理', '方案对比', '测试与可维护性'],
      related: ['05-架构设计面试题', '02-Flutter基础面试题']
    })
  },
  {
    file: '14-面试与进阶/17-技术面试技巧详解.md',
    content: interviewStub({
      title: '技术面试技巧',
      intro: '笔试、现场编码与远程面试的通用准备方法。',
      sections: ['面试前调研', '白板/共享编码', '沟通节奏', '复盘与总结'],
      related: ['15-问题回答策略', '10-项目经验面试题']
    })
  },
  {
    file: '14-面试与进阶/18-Flutter源码学习.md',
    content: interviewStub({
      title: 'Flutter 源码学习',
      intro: 'Framework 源码阅读路径与常见切入点。',
      sections: ['仓库结构', 'Binding 与 Scheduler', '渲染相关目录', '调试与断点'],
      related: ['08-源码理解面试题', 'Skia深入']
    })
  },
  {
    file: '14-面试与进阶/19-Dart深入.md',
    content: interviewStub({
      title: 'Dart 深入',
      intro: '类型系统、VM 与异步模型进阶主题。',
      sections: ['类型系统与协变', 'Isolate 与并发', 'VM / AOT / JIT', '元编程入门'],
      related: ['03-Dart基础面试题', 'Dart源码']
    })
  },
  {
    file: '14-面试与进阶/20-架构设计模式详解.md',
    content: interviewStub({
      title: '架构设计模式',
      intro: 'Clean Architecture、MVVM 等在 Flutter 中的落地。',
      sections: ['分层边界', 'Repository 模式', 'UseCase', '模块与包拆分'],
      related: ['05-架构设计面试题', '12-设计模式题']
    })
  },
  {
    file: '14-面试与进阶/21-跨平台对比详解.md',
    content: interviewStub({
      title: '跨平台对比',
      intro: 'Flutter vs RN / 原生 / 小程序 的选型讨论框架。',
      sections: ['性能与包体', '团队技能栈', '生态与交付', '混合栈场景'],
      related: ['混合开发', '原生开发']
    })
  },
  {
    file: '14-面试与进阶/22-性能优化深入.md',
    content: interviewStub({
      title: '性能优化深入',
      intro: '渲染、内存、启动与包体积的系统化优化。',
      sections: ['Timeline 分析', 'Impeller/Skia', '内存泄漏排查', '包体积拆分'],
      related: ['06-性能优化面试题', '性能优化索引']
    })
  },
  // —— 第四批 · P2 学习/职业类 ——
  {
    file: '14-面试与进阶/23-代码面试详解.md',
    content: interviewStub({
      title: '代码面试详解',
      intro: '算法题与 Flutter 手写题的准备与答题流程。',
      sections: ['复杂度分析', '常见题型', 'Flutter 手写 Widget', '调试与沟通'],
      related: ['11-Flutter算法题', '13-数据结构题', '17-技术面试技巧详解']
    })
  },
  {
    file: '14-面试与进阶/24-学习资源指南.md',
    content: interviewStub({
      title: '学习资源指南',
      intro: '官方文档、书籍、视频与社区资源索引。',
      sections: ['官方文档', '推荐书籍', '视频与博客', '开源项目学习'],
      related: ['18-Flutter源码学习', '19-Dart深入']
    })
  },
  {
    file: '14-面试与进阶/25-职业发展与领导力.md',
    content: interviewStub({
      title: '职业发展与领导力',
      intro: '架构师、技术管理与团队建设相关话题。',
      sections: ['技术 vs 管理', '架构师能力模型', '团队建设', '技术趋势判断'],
      related: ['20-架构设计模式详解', '21-跨平台对比详解']
    })
  },
  {
    file: '14-面试与进阶/26-持续学习指南.md',
    content: interviewStub({
      title: '持续学习指南',
      intro: '知识管理、学习计划与 Flutter 新特性跟进。',
      sections: ['学习计划', '知识库/Obsidian', '新特性跟进', '学习社区'],
      related: ['24-学习资源指南', '22-性能优化深入']
    })
  },
  {
    file: '14-面试与进阶/27-编译原理与引擎.md',
    content: interviewStub({
      title: '编译原理与引擎',
      intro: 'Dart 编译、类型系统与 Skia/Impeller 入门。',
      sections: ['JIT/AOT', '类型系统', 'Skia vs Impeller', '图形学基础'],
      related: ['19-Dart深入', '18-Flutter源码学习']
    })
  },
  {
    file: '14-面试与进阶/28-混合与原生开发.md',
    content: interviewStub({
      title: '混合与原生开发',
      intro: 'Add-to-App、Platform Channel 与原生协作。',
      sections: ['混合栈场景', 'Platform Channel', '原生开发互补', '新平台适配'],
      related: ['21-跨平台对比详解', '01-平台集成指南']
    })
  }
]

let created = 0
let skipped = 0

for (const { file, content } of [...PACKAGE_STUBS, ...INTERVIEW_STUBS, ...PROJECT_STUBS]) {
  const abs = path.join(docsRoot, file)
  if (fs.existsSync(abs)) {
    skipped++
    continue
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, content, 'utf8')
  created++
  console.log('created', file)
}

console.log(`Done: ${created} created, ${skipped} skipped`)
