# Flutter 简介

> Flutter 是 Google 推出的 UI 工具包，用于从单一代码库构建美观、原生编译的移动、Web 和桌面应用。

## 🎯 什么是 Flutter？

Flutter 是一个开源框架，用于使用 Dart 语言构建高性能、高保真的移动应用。它允许开发者使用单一代码库为 iOS 和 Android 创建应用。

## ✨ 核心特性

### 1. 快速开发
- **热重载**: 快速查看变更效果
- **丰富的 Widget**: 构建精美 UI
- **声明式 UI**: 现代化的开发范式

### 2. 原生性能
- **直接编译**: 编译为原生代码
- **无桥接开销**: 高性能渲染
- **流畅动画**: 60fps/120fps 体验

### 3. 跨平台
- **单一代码库**: iOS、Android、Web、桌面
- **一致体验**: 跨平台 UI 一致
- **高效开发**: 减少开发时间

## 🏗️ 架构概览

```
┌─────────────────────────────────────┐
│           Framework (Dart)          │
│  Widget、Material、Cupertino、动画   │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│            Engine (C++)             │
│    Skia、Dart Runtime、文本布局      │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│         Embedder (Platform)         │
│  Android、iOS、Web、Desktop、Linux   │
└─────────────────────────────────────┘
```

### 架构详解
- [[core/architecture]] - Flutter 三层架构详解
- [[core/widgets]] - Widget 系统核心
- [[core/dart]] - Dart 语言基础

## 🚀 快速开始

### 安装 Flutter
```bash
# 下载 Flutter SDK
git clone https://github.com/flutter/flutter.git
export PATH="$PATH:`pwd`/flutter/bin"

# 检查环境
flutter doctor
```

### 创建第一个应用
```bash
# 创建新项目
flutter create my_app

# 运行应用
cd my_app
flutter run
```

### 详细步骤
- [[guide/setup]] - 环境搭建详细指南
- [[guide/first-app]] - 创建第一个应用
- [[guide/widgets]] - Widget 系统学习

## 🎨 核心概念

### Widget 系统
- [[guide/widgets]] - Widget 系统详解
- [[core/widgets]] - 一切皆 Widget
- [[guide/ui-design]] - UI 设计与动画

### 状态管理
- [[guide/state-management]] - 状态管理方案
- [[guide/navigation]] - 导航与路由
- [[guide/networking]] - 网络与数据

### 开发工具
- [[guide/testing]] - 测试与调试
- [[guide/performance]] - 性能优化

## 📚 学习路径

### 初学者路径
1. [[guide/introduction]] - Flutter 简介
2. [[guide/setup]] - 环境搭建
3. [[guide/first-app]] - 第一个应用
4. [[guide/widgets]] - Widget 系统

### 进阶路径
1. [[guide/state-management]] - 状态管理
2. [[guide/navigation]] - 导航与路由
3. [[guide/networking]] - 网络与数据
4. [[guide/ui-design]] - UI 设计与动画

### 高级路径
1. [[core/architecture]] - 架构概览
2. [[guide/performance]] - 性能优化
3. [[guide/testing]] - 测试与调试
4. [[projects/ecommerce]] - 实战项目

## 🔧 开发环境

### IDE 配置
- **Android Studio**: 功能最全的 Flutter IDE
- **VS Code**: 轻量级，插件丰富
- **IntelliJ IDEA**: 强大的代码分析

### 工具链
- [[guide/setup]] - 环境搭建
- [[guide/testing]] - 测试工具
- [[guide/performance]] - 性能分析工具

## 🌐 学习资源

### 官方资源
- [[resources/official]] - Flutter 官方文档
- [[resources/community]] - 社区资源
- [[resources/books]] - 书籍推荐

### 在线资源
- [Flutter 官方文档](https://flutter.dev/docs)
- [Dart 官方文档](https://dart.dev/guides)
- [Flutter 中文社区](https://flutterchina.club)

## 🎯 下一步

现在你已经了解了 Flutter 的基本概念，可以开始：

1. **搭建开发环境**: [[guide/setup]]
2. **创建第一个应用**: [[guide/first-app]]
3. **学习 Widget 系统**: [[guide/widgets]]
4. **探索核心概念**: [[core/architecture]]

## 💡 学习建议

1. **动手实践**: 理论学习与实践相结合
2. **循序渐进**: 从基础开始，逐步深入
3. **参考官方**: 以官方文档为准
4. **社区交流**: 参与社区讨论

## 🔗 相关链接

### 入门指南
- [[guide/setup]] - 环境搭建
- [[guide/first-app]] - 第一个应用
- [[guide/widgets]] - Widget 系统

### 核心概念
- [[core/architecture]] - Flutter 架构
- [[core/widgets]] - 一切皆 Widget
- [[core/dart]] - Dart 语言

### 学习资源
- [[resources/official]] - 官方资源
- [[resources/community]] - 社区资源
- [[resources/books]] - 书籍推荐

---
*最后更新: 2026年5月23日*