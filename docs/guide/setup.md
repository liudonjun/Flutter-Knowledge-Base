# 环境搭建

> 搭建高效的 Flutter 开发环境是开发的第一步。

## 🛠️ 系统要求

### 操作系统
- **Windows**: Windows 10 或更高版本 (64-bit)
- **macOS**: macOS 10.15 或更高版本
- **Linux**: 64-bit

### 开发工具
- **Flutter SDK**: 最新稳定版
- **IDE**: Android Studio、VS Code 或 IntelliJ
- **Git**: 版本控制工具

## 📦 安装步骤

### 1. 下载 Flutter SDK

#### macOS/Linux
```bash
# 下载 Flutter
git clone https://github.com/flutter/flutter.git -b stable

# 添加到 PATH
export PATH="$PATH:`pwd`/flutter/bin"

# 持久化配置
echo 'export PATH="$PATH:`pwd`/flutter/bin"' >> ~/.bashrc
```

#### Windows
1. 下载 Flutter SDK: https://flutter.dev/docs/get-started/install/windows
2. 解压到合适的位置
3. 添加 `flutter/bin` 到系统 PATH

### 2. 配置 IDE

#### Android Studio
1. 安装 Android Studio
2. 安装 Flutter 和 Dart 插件
3. 配置 Android SDK

#### VS Code
1. 安装 VS Code
2. 安装 Flutter 扩展
3. 安装 Dart 扩展

### 3. 运行环境检查

```bash
# 检查 Flutter 环境
flutter doctor

# 输出示例：
# Doctor summary (to see all details, run flutter doctor -v):
# [✓] Flutter (Channel stable, 3.x.x, on macOS 13.0  darwin-arm64, locale zh-Hans-CN)
# [✓] Android toolchain - develop for Android devices
# [✓] Xcode - develop for iOS and macOS
# [✓] Chrome - develop for the web
# [✓] Android Studio (version 2022.1)
# [✓] VS Code (version 1.75.0)
```

## 🚀 快速验证

### 创建测试项目
```bash
# 创建新项目
flutter create test_app

# 进入项目目录
cd test_app

# 运行应用
flutter run
```

### 运行示例
```bash
# 运行 Flutter 示例
flutter create --sample=material.AppBar.1 mysample
cd mysample
flutter run
```

## 🔧 常见问题

### 网络问题
```bash
# 使用国内镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### 权限问题
```bash
# macOS 权限修复
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

## 🔗 相关链接

### 入门指南
- [Flutter 简介](/guide/introduction) - Flutter 简介
- [第一个应用](/guide/first-app) - 第一个应用
- [Widget 系统](/guide/widgets) - Widget 系统

### 核心概念
- [架构概览](/core/architecture) - Flutter 架构概览
- [Dart 语言](/core/dart) - Dart 语言基础
- [一切皆 Widget](/core/widgets) - 一切皆 Widget

### 学习资源
- [官方资源](/resources/official) - 官方资源
- [社区资源](/resources/community) - 社区资源

## 📚 下一步

- [第一个应用](/guide/first-app) - 创建第一个应用
- [Widget 系统](/guide/widgets) - 学习 Widget 系统
- [状态管理](/guide/state-management) - 状态管理方案

---
*最后更新: 2026年5月23日*