# IntelliJ IDEA 配置

> 在 IntelliJ IDEA 中配置 Flutter/Dart 开发环境的完整指南。

## 📦 安装 IntelliJ IDEA

### 1. 版本选择

```
版本说明：
- IntelliJ IDEA Ultimate：付费版本，功能完整
- IntelliJ IDEA Community：免费版本，功能足够

推荐：Community 版本即可满足 Flutter 开发需求

下载地址：https://www.jetbrains.com/idea/
```

### 2. 安装步骤

```bash
# Windows
# 运行 .exe 安装程序

# macOS
# 拖拽到 Applications 文件夹

# Linux
tar -xzf idea-*.tar.gz
cd idea-*/bin
./idea.sh
```

## 🔌 Flutter/Dart 插件

### 1. 安装插件

```
安装步骤：
1. File → Settings → Plugins
2. 搜索 "Flutter"
3. 点击 Install
4. 重启 IntelliJ IDEA

注意：安装 Flutter 插件会自动安装 Dart 插件
```

### 2. 配置 SDK

```
配置步骤：
1. File → Settings → Languages & Frameworks → Flutter
2. 设置 Flutter SDK 路径
3. 设置 Dart SDK 路径（自动检测）
4. Apply → OK
```

## ⚙️ 开发配置

### 1. 编辑器配置

```
推荐配置：
1. File → Settings → Editor → General
   - Smooth scrolling：启用
   - Use soft wraps：启用

2. File → Settings → Editor → Font
   - Font：JetBrains Mono
   - Size：14
   - Line spacing：1.5

3. File → Settings → Editor → Code Style → Dart
   - Tab size：2
   - Indent：2
   - Line length：80
```

### 2. 快捷键

```
常用快捷键（与 Android Studio 相同）：
- Ctrl+Shift+A：查找操作
- Ctrl+/：切换注释
- Ctrl+Alt+L：格式化代码
- Shift+F6：重命名
- Ctrl+B：跳转到声明
- Alt+Enter：快速修复
- Ctrl+Alt+V：提取变量
- Ctrl+Alt+M：提取方法
```

## 🐛 调试配置

```
配置步骤：
1. Run → Edit Configurations
2. 点击 + → Flutter
3. 配置：
   - Name：Flutter App
   - Dart entrypoint：lib/main.dart
4. Apply → OK

调试功能：
- 断点：点击行号左侧
- 条件断点：右键断点
- 变量监视：Variables 窗口
- 表达式求值：Evaluate Expression
```

---

> IntelliJ IDEA 的配置与 Android Studio 类似，因为它们基于相同的平台。