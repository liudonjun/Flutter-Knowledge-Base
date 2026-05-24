# Linux 环境搭建

> 在 Linux 系统上配置 Flutter 开发环境的完整指南。

## 📋 系统要求

### 1. 操作系统要求

```
Linux 系统要求：
- 64位 Linux 发行版
- Ubuntu 20.04 LTS 或更高版本（推荐）
- 至少 10GB 可用磁盘空间
- 至少 8GB RAM（推荐 16GB）
```

### 2. 支持的发行版

```
官方支持：
- Ubuntu（20.04, 22.04）
- Debian（10, 11）

社区支持：
- Fedora
- Arch Linux
- openSUSE
- 其他主流发行版
```

## 🚀 安装步骤

### 1. 安装依赖

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    wget

# Fedora
sudo dnf install -y \
    curl \
    git \
    unzip \
    xz \
    zip \
    mesa-libGLU \
    wget

# Arch Linux
sudo pacman -Syu --noconfirm \
    curl \
    git \
    unzip \
    xz \
    zip \
    glu \
    wget
```

### 2. 下载 Flutter SDK

```bash
# 方法1：使用 snap（推荐）
sudo snap install flutter --classic

# 方法2：手动下载
cd ~
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.x.x-stable.tar.xz
tar xf flutter_linux_*.tar.xz
rm flutter_linux_*.tar.xz

# 方法3：使用 Git
git clone https://github.com/flutter/flutter.git -b stable ~/flutter

# 添加到 PATH
echo 'export PATH="$HOME/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 或者 fish shell
echo 'set -gx PATH $HOME/flutter/bin $PATH' >> ~/.config/fish/config.fish
```

### 3. 配置环境变量

```bash
# 设置 Flutter 镜像（中国用户）
echo 'export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"' >> ~/.bashrc
echo 'export PUB_HOSTED_URL="https://pub.flutter-io.cn"' >> ~/.bashrc
source ~/.bashrc

# 设置 Chrome 变量（Web 开发）
echo 'export CHROME_EXECUTABLE=/usr/bin/google-chrome' >> ~/.bashrc
source ~/.bashrc
```

### 4. 安装 Android 工具（可选）

```bash
# 下载 Android 命令行工具
cd ~
wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
unzip commandlinetools-linux-*.zip -d ~/android-sdk
rm commandlinetools-linux-*.zip

# 创建目录结构
mkdir -p ~/android-sdk/cmdline-tools
mv ~/android-sdk/cmdline-tools ~/android-sdk/cmdline-tools/latest

# 设置环境变量
echo 'export ANDROID_HOME="$HOME/android-sdk"' >> ~/.bashrc
echo 'export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="$ANDROID_HOME/platform-tools:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 安装 Android SDK
sdkmanager --install \
    "platforms;android-33" \
    "build-tools;33.0.0" \
    "platform-tools"

# 接受许可证
sdkmanager --licenses
```

### 5. 安装 Chrome（Web 开发）

```bash
# Ubuntu / Debian
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install -y google-chrome-stable

# Fedora
sudo dnf install -y fedora-workstation-repositories
sudo dnf config-manager --set-enabled google-chrome
sudo dnf install -y google-chrome-stable

# Arch Linux
yay -S google-chrome
```

### 6. 安装 IDE

```bash
# VS Code
# Ubuntu / Debian
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install -y code

# Android Studio
# 下载 https://developer.android.com/studio
tar -xzf android-studio-*.tar.gz -C ~/
cd ~/android-studio/bin
./studio.sh

# IntelliJ IDEA
# 下载 https://www.jetbrains.com/idea/
tar -xzf idea-*.tar.gz -C ~/
cd ~/idea-*/bin
./idea.sh
```

### 7. 运行 flutter doctor

```bash
# 检查环境配置
flutter doctor

# 接受 Android 许可证（如果安装了 Android SDK）
flutter doctor --android-licenses

# 详细检查
flutter doctor -v
```

### 8. 配置 IDE 插件

```bash
# VS Code
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code

# Android Studio / IntelliJ
# 打开 IDE → Settings → Plugins → 搜索 Flutter → 安装
```

## 🔧 Linux 桌面开发

### 1. 安装桌面开发依赖

```bash
# Ubuntu / Debian
sudo apt install -y \
    clang \
    cmake \
    ninja-build \
    pkg-config \
    libgtk-3-dev \
    liblzma-dev \
    libstdc++-12-dev

# Fedora
sudo dnf install -y \
    clang \
    cmake \
    ninja-build \
    pkgconfig \
    gtk3-devel \
    xz-devel \
    libstdc++-devel

# Arch Linux
sudo pacman -Syu --noconfirm \
    clang \
    cmake \
    ninja \
    pkg-config \
    gtk3 \
    xz
```

### 2. 启用 Linux 桌面支持

```bash
# 启用 Linux 桌面支持
flutter config --enable-linux-desktop

# 创建 Linux 桌面项目
flutter create --platforms linux my_linux_app
cd my_linux_app

# 运行
flutter run -d linux
```

### 3. 构建 Linux 应用

```bash
# 构建发布版本
flutter build linux

# 构建产物位置
ls build/linux/x64/release/bundle/
```

## 🔧 常见问题

### 1. 权限问题

```bash
# 如果遇到权限错误
sudo chmod -R 755 ~/flutter
sudo chown -R $USER:$USER ~/flutter

# 或者将 Flutter 安装到用户目录
```

### 2. 依赖缺失

```bash
# 如果 flutter doctor 报告缺少依赖
sudo apt install -y lib32stdc++6  # 32位库支持

# 或者具体错误信息对应的依赖
```

### 3. 网络代理

```bash
# 配置 Git 代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy http://proxy.example.com:8080

# 配置 Flutter 代理
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"

# 配置 shell 环境
echo 'export HTTP_PROXY="http://proxy.example.com:8080"' >> ~/.bashrc
echo 'export HTTPS_PROXY="http://proxy.example.com:8080"' >> ~/.bashrc
```

### 4. Chrome 问题

```bash
# 如果 Chrome 无法启动
export CHROME_EXECUTABLE=/usr/bin/chromium-browser

# 或者
export CHROME_EXECUTABLE=/usr/bin/chromium

# 添加到 ~/.bashrc
echo 'export CHROME_EXECUTABLE=/usr/bin/chromium-browser' >> ~/.bashrc
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

# 运行在 Linux 桌面
flutter run -d linux

# 运行 Web 版本
flutter run -d chrome

# 运行在 Android（如果配置了）
flutter run -d emulator-5554
```

## 📝 环境变量总结

```bash
# ~/.bashrc 或 ~/.zshrc

# Flutter
export PATH="$HOME/flutter/bin:$PATH"
export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
export PUB_HOSTED_URL="https://pub.flutter-io.cn"

# Android SDK
export ANDROID_HOME="$HOME/android-sdk"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
export PATH="$ANDROID_HOME/platform-tools:$PATH"

# Chrome
export CHROME_EXECUTABLE=/usr/bin/google-chrome
```

---

> 完成以上步骤后，Linux Flutter 开发环境就配置完成了。