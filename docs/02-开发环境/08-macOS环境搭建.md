# macOS 环境搭建

> 在 macOS 系统上配置 Flutter 开发环境的完整指南。

## 📋 系统要求

### 1. 操作系统要求

```
macOS 系统要求：
- macOS 10.15 (Catalina) 或更高版本
- 至少 10GB 可用磁盘空间
- 至少 8GB RAM（推荐 16GB）
- 需要安装 Xcode（用于 iOS 开发）
```

### 2. 必需软件

```
必需软件：
- Xcode（从 App Store 安装）
- Homebrew（包管理器）
- CocoaPods（iOS 依赖管理）
- Git（通常已预装）
```

## 🚀 安装步骤

### 1. 安装 Homebrew

```bash
# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 添加到 PATH（Apple Silicon Mac）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 添加到 PATH（Intel Mac）
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"

# 验证安装
brew --version
```

### 2. 下载 Flutter SDK

```bash
# 方法1：使用 Homebrew
brew install flutter

# 方法2：手动下载
# 访问 https://flutter.dev/docs/get-started/install/macos
# 下载 Flutter SDK zip 文件
# 解压到合适位置

# 方法3：使用 Git
git clone https://github.com/flutter/flutter.git -b stable ~/flutter

# 添加到 PATH
echo 'export PATH="$HOME/flutter/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 或者使用 fish shell
echo 'set -gx PATH $HOME/flutter/bin $PATH' >> ~/.config/fish/config.fish
```

### 3. 安装 Xcode

```bash
# 从 App Store 安装 Xcode
# 安装完成后运行以下命令

# 安装 Xcode 命令行工具
sudo xcode-select --install

# 同意 Xcode 许可证
sudo xcodebuild -license

# 验证 Xcode 安装
xcode-select -p
# 应该输出: /Applications/Xcode.app/Contents/Developer
```

### 4. 安装 CocoaPods

```bash
# 使用 Homebrew 安装 Ruby（推荐）
brew install ruby

# 添加 Ruby 到 PATH
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 安装 CocoaPods
sudo gem install cocoapods

# 验证安装
pod --version
```

### 5. 配置环境变量

```bash
# 设置 Flutter 镜像（中国用户）
echo 'export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"' >> ~/.zshrc
echo 'export PUB_HOSTED_URL="https://pub.flutter-io.cn"' >> ~/.zshrc
source ~/.zshrc

# 设置 Android SDK 路径（如果需要）
echo 'export ANDROID_HOME="$HOME/Library/Android/sdk"' >> ~/.zshrc
echo 'export PATH="$ANDROID_HOME/platform-tools:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 6. 运行 flutter doctor

```bash
# 检查环境配置
flutter doctor

# 接受 Android 许可证（如果安装了 Android Studio）
flutter doctor --android-licenses

# 详细检查
flutter doctor -v
```

### 7. 配置 IDE

```bash
# 安装 Flutter 和 Dart 插件

# VS Code
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code

# Android Studio
# Android Studio → Preferences → Plugins → 搜索 Flutter → 安装

# IntelliJ IDEA
# IntelliJ IDEA → Preferences → Plugins → 搜索 Flutter → 安装
```

## 🔧 iOS 开发配置

### 1. 配置 iOS 模拟器

```bash
# 打开 iOS 模拟器
open -a Simulator

# 列出可用模拟器
xcrun simctl list devices

# 创建新模拟器
xcrun simctl create "iPhone 15" "iPhone 15" "iOS17.0"
```

### 2. 配置真机调试

```bash
# 1. 连接 iPhone 到 Mac
# 2. 在 iPhone 上信任电脑
# 3. 在 Xcode 中配置开发者账号

# 打开 Xcode
open -a Xcode

# Xcode → Preferences → Accounts → 添加 Apple ID
# 选择 Team → 点击 Manage Certificates → 创建开发证书

# 验证设备连接
flutter devices
```

### 3. CocoaPods 初始化

```bash
# 进入 iOS 项目目录
cd ios

# 初始化 CocoaPods
pod init

# 安装依赖
pod install

# 如果遇到问题，尝试
pod repo update
pod install --repo-update
```

## 🔧 常见问题

### 1. macOS 安全限制

```bash
# 如果遇到 "无法验证开发者" 错误
# 方法1：系统偏好设置 → 安全性与隐私 → 仍要打开

# 方法2：使用命令行
sudo spctl --master-disable

# 安装完成后重新启用
sudo spctl --master-enable
```

### 2. Xcode 版本问题

```bash
# 如果有多个 Xcode 版本
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# 验证
xcode-select -p
```

### 3. CocoaPods 问题

```bash
# 如果 pod install 失败
# 清除 CocoaPods 缓存
pod cache clean --all

# 重新安装
pod deintegrate
pod install

# 如果 Ruby 版本问题
brew reinstall ruby
gem install cocoapods
```

### 4. 网络代理

```bash
# 配置 Git 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy http://proxy.example.com:8080

# 配置 Flutter 代理
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"

# 配置 CocoaPods 代理
export http_proxy="http://proxy.example.com:8080"
export https_proxy="http://proxy.example.com:8080"
```

## ✅ 验证安装

```bash
# 检查 Flutter 版本
flutter --version

# 检查 Dart 版本
dart --version

# 创建测试项目
flutter create test_app
cd test_app

# 运行在 iOS 模拟器
flutter run -d iPhone

# 运行在 macOS 桌面
flutter run -d macos

# 运行在 Android 模拟器（如果配置了）
flutter run -d emulator-5554
```

## 📝 环境变量总结

```bash
# ~/.zshrc 或 ~/.bash_profile

# Flutter
export PATH="$HOME/flutter/bin:$PATH"
export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
export PUB_HOSTED_URL="https://pub.flutter-io.cn"

# Android SDK
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$PATH"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# Ruby / CocoaPods
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

---

> 完成以上步骤后，macOS Flutter 开发环境就配置完成了。