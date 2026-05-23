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

## 📚 学习资源

- [Flutter 官方文档](https://flutter.dev/docs)
- [Dart 官方文档](https://dart.dev/guides)
- [Flutter 中文社区](https://flutterchina.club)

## 🔗 相关链接

- [环境搭建](/guide/setup)
- [第一个应用](/guide/first-app)
- [Widget 系统](/guide/widgets)
