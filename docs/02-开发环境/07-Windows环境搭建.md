# Windows 环境搭建

> 在 Windows 系统上配置 Flutter 开发环境的完整指南。

## 📋 系统要求

### 1. 操作系统要求

```
Windows 系统要求：
- Windows 10 或更高版本（64位）
- 至少 10GB 可用磁盘空间
- 至少 8GB RAM（推荐 16GB）
- 需要启用 Windows 开发者模式
```

### 2. 必需软件

```
必需软件：
- Git for Windows
- Windows PowerShell 5.0 或更高版本
- Visual Studio 2019 或更高版本（用于 Windows 桌面开发）
```

## 🚀 安装步骤

### 1. 下载 Flutter SDK

```powershell
# 方法1：从官网下载
# 访问 https://flutter.dev/docs/get-started/install/windows
# 下载 Flutter SDK zip 文件

# 方法2：使用 Git
git clone https://github.com/flutter/flutter.git -b stable

# 方法3：使用 Chocolatey
choco install flutter
```

### 2. 配置环境变量

```powershell
# 打开 PowerShell 作为管理员

# 添加 Flutter 到 PATH
$env:PATH += ";C:\path\to\flutter\bin"

# 永久添加到环境变量
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User) + ";C:\path\to\flutter\bin",
    [EnvironmentVariableTarget]::User
)

# 设置 Flutter 镜像（中国用户）
$env:FLUTTER_STORAGE_BASE_URL = "https://storage.flutter-io.cn"
$env:PUB_HOSTED_URL = "https://pub.flutter-io.cn"

# 永久设置镜像
[Environment]::SetEnvironmentVariable("FLUTTER_STORAGE_BASE_URL", "https://storage.flutter-io.cn", [EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("PUB_HOSTED_URL", "https://pub.flutter-io.cn", [EnvironmentVariableTarget]::User)
```

### 3. 安装 Android Studio

```powershell
# 下载 Android Studio
# 访问 https://developer.android.com/studio

# 安装后配置
# 1. 启动 Android Studio
# 2. 进入 Configure → SDK Manager
# 3. 安装 Android SDK
# 4. 安装 Android SDK Command-line Tools
# 5. 安装 Android SDK Build-Tools

# 设置 ANDROID_HOME
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $env:ANDROID_HOME, [EnvironmentVariableTarget]::User)

# 添加到 PATH
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
$env:PATH += ";$env:ANDROID_HOME\cmdline-tools\latest\bin"
```

### 4. 运行 flutter doctor

```powershell
# 检查环境配置
flutter doctor

# 接受 Android 许可证
flutter doctor --android-licenses

# 详细检查
flutter doctor -v
```

### 5. 配置 IDE

```powershell
# 安装 Flutter 和 Dart 插件

# VS Code
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code

# Android Studio
# File → Settings → Plugins → 搜索 Flutter → 安装

# IntelliJ IDEA
# File → Settings → Plugins → 搜索 Flutter → 安装
```

## 🔧 常见问题

### 1. PowerShell 执行策略

```powershell
# 如果遇到执行策略错误
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 或者使用 cmd 运行 Flutter
cmd /c flutter doctor
```

### 2. 路径包含空格

```powershell
# 如果 Flutter 路径包含空格，使用引号
$env:PATH += ";'C:\Program Files\flutter\bin'"

# 或者将 Flutter 安装到无空格路径
```

### 3. 防火墙和代理

```powershell
# 配置 Git 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy http://proxy.example.com:8080

# 配置 Flutter 代理
$env:HTTP_PROXY = "http://proxy.example.com:8080"
$env:HTTPS_PROXY = "http://proxy.example.com:8080"
```

## ✅ 验证安装

```powershell
# 检查 Flutter 版本
flutter --version

# 检查 Dart 版本
dart --version

# 创建测试项目
flutter create test_app
cd test_app
flutter run

# 运行在 Windows 桌面
flutter run -d windows
```

## 📝 环境变量总结

```
需要设置的环境变量：

PATH:
- C:\path\to\flutter\bin
- %LOCALAPPDATA%\Android\Sdk\platform-tools
- %LOCALAPPDATA%\Android\Sdk\cmdline-tools\latest\bin

FLUTTER_STORAGE_BASE_URL:
- https://storage.flutter-io.cn（中国镜像）

PUB_HOSTED_URL:
- https://pub.flutter-io.cn（中国镜像）

ANDROID_HOME:
- %LOCALAPPDATA%\Android\Sdk
```

---

> 完成以上步骤后，Windows Flutter 开发环境就配置完成了。