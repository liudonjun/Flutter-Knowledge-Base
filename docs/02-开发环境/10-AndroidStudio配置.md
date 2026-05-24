# Android Studio 配置

> 在 Android Studio 中配置 Flutter/Dart 开发环境的完整指南。

## 📦 安装 Android Studio

### 1. 下载安装

```
下载地址：https://developer.android.com/studio

支持平台：
- Windows
- macOS
- Linux

系统要求：
- 64位操作系统
- 8GB RAM（推荐 16GB）
- 8GB 可用磁盘空间（推荐 SSD）
- 1280 x 800 最小分辨率
```

### 2. 安装步骤

```bash
# Windows
# 运行 .exe 安装程序，按提示安装

# macOS
# 拖拽到 Applications 文件夹

# Linux
tar -xzf android-studio-*.tar.gz
cd android-studio/bin
./studio.sh

# 创建桌面快捷方式（可选）
# Tools → Create Desktop Entry
```

## 🔌 Flutter/Dart 插件

### 1. 安装插件

```
安装步骤：
1. 打开 Android Studio
2. File → Settings（Windows/Linux）
   或者 Android Studio → Preferences（macOS）
3. 选择 Plugins
4. 搜索 "Flutter"
5. 点击 Install
6. 重启 Android Studio

注意：安装 Flutter 插件会自动安装 Dart 插件
```

### 2. 插件配置

```
配置步骤：
1. File → Settings → Languages & Frameworks → Flutter
2. 设置 Flutter SDK 路径
3. 设置 Dart SDK 路径（自动检测）
4. 应用设置
```

## ⚙️ 开发环境配置

### 1. Android SDK 配置

```
配置步骤：
1. File → Settings → Appearance & Behavior → System Settings → Android SDK
2. SDK Platforms 标签：
   - 勾选需要的 Android 版本
   - 建议安装最新版本和目标版本

3. SDK Tools 标签：
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android SDK Platform-Tools
   - Android Emulator
   - Intel x86 Emulator Accelerator (HAXM) 或 Android Emulator Hypervisor Driver
```

### 2. 虚拟设备配置

```
配置步骤：
1. Tools → Device Manager
2. Create Device
3. 选择硬件（如 Pixel 6）
4. 选择系统镜像
5. 配置 AVD 属性
6. Finish

推荐配置：
- 分辨率：1080 x 2400
- 内存：2048 MB
- 存储：6 GB
- 启用硬件加速
```

### 3. 字体和颜色

```
配置步骤：
1. File → Settings → Editor → Font
2. 设置字体：
   - Font：JetBrains Mono 或 Menlo
   - Size：14
   - Line height：1.5

3. File → Settings → Editor → Color Scheme
4. 选择主题：
   - Darcula（暗色）
   - IntelliJ Light（亮色）
```

## 🐛 调试配置

### 1. 运行配置

```
配置步骤：
1. Run → Edit Configurations
2. 点击 + → Flutter
3. 配置：
   - Name：Flutter App
   - Dart entrypoint：lib/main.dart
   - Additional run args：--enable-software-rendering（可选）
4. Apply → OK
```

### 2. 调试技巧

```
调试功能：
- 断点：点击行号左侧
- 条件断点：右键断点 → 输入条件
- 日志断点：右键断点 → Log evaluated expression
- 变量监视：Variables 窗口
- 表达式求值：Evaluate Expression
- 调用栈：Frames 窗口
```

### 3. 性能分析

```
性能工具：
1. View → Tool Windows → Flutter Performance
2. 显示：
   - 帧率
   - 内存使用
   - CPU 使用

3. DevTools：
   - 点击 "Open DevTools" 按钮
   - 或者在浏览器中打开
```

## 📁 项目结构

### 1. 项目视图

```
项目结构：
├── android/        # Android 平台代码
├── ios/            # iOS 平台代码
├── lib/            # Dart 代码
│   ├── main.dart   # 入口文件
│   └── ...
├── test/           # 测试代码
├── web/            # Web 平台代码（可选）
├── pubspec.yaml    # 项目配置
└── README.md       # 项目说明

视图模式：
- Project：显示所有文件
- Android：显示 Android 结构
- Packages：显示包结构
- Dart Packages：显示 Dart 包
```

### 2. 常用操作

```
常用操作：
- 创建新文件：右键目录 → New → Dart File
- 创建新 Widget：右键目录 → New → Flutter Widget
- 重命名：右键文件 → Refactor → Rename
- 移动：拖拽文件到目标目录
- 查找：Ctrl+Shift+F（Windows/Linux）或 Cmd+Shift+F（macOS）
```

## ⌨️ 快捷键

### 1. 常用快捷键

```
通用：
- Ctrl+Shift+A：查找操作
- Ctrl+N：查找类
- Ctrl+Shift+N：查找文件
- Ctrl+E：最近文件
- Ctrl+Tab：切换标签

代码编辑：
- Ctrl+/：切换注释
- Ctrl+D：复制行
- Ctrl+Y：删除行
- Ctrl+Alt+L：格式化代码
- Ctrl+Alt+O：优化导入
- Alt+Enter：快速修复

重构：
- Shift+F6：重命名
- Ctrl+Alt+M：提取方法
- Ctrl+Alt+V：提取变量
- Ctrl+Alt+F：提取字段
- Ctrl+Alt+P：提取参数

导航：
- Ctrl+B：跳转到声明
- Ctrl+Alt+B：跳转到实现
- Ctrl+U：跳转到父类
- Ctrl+Shift+I：查看定义
- Alt+F7：查找用法
```

### 2. Flutter 特定快捷键

```
Flutter 快捷键：
- Alt+Enter：Widget 快速修复
- Ctrl+Alt+V：提取 Widget
- Ctrl+Alt+W：用 Widget 包装
- Ctrl+Alt+M：提取方法
- Ctrl+Shift+R：重构
```

## 🔧 代码模板

### 1. Live Templates

```
常用 Live Templates：
- stful：创建 StatefulWidget
- stless：创建 StatelessWidget
- build：创建 build 方法
- initS：创建 initState
- disp：创建 dispose
- widg：创建 Widget
- column：创建 Column
- row：创建 Row
- container：创建 Container
```

### 2. 自定义模板

```
自定义模板步骤：
1. File → Settings → Editor → Live Templates
2. 点击 + → Template Group
3. 输入组名：Flutter
4. 选择组 → 点击 + → Live Template
5. 配置：
   - Abbreviation：触发缩写
   - Description：描述
   - Template text：模板内容
   - Applicable：Dart
6. Define → 选择上下文
7. Apply → OK
```

## 🎨 主题和外观

### 1. 主题配置

```
主题设置：
1. File → Settings → Appearance & Behavior → Appearance
2. Theme：
   - IntelliJ Light：亮色主题
   - Darcula：暗色主题
   - High contrast：高对比度

3. 自定义主题：
   - 安装 Material Theme UI 插件
   - 更多主题选择
```

### 2. 编辑器配置

```
编辑器设置：
1. File → Settings → Editor → General
   - Smooth scrolling：平滑滚动
   - Use soft wraps：软换行

2. File → Settings → Editor → Code Style → Dart
   - Tab size：2
   - Indent：2
   - Continuation indent：4
   - Line length：80
```

## 🔌 插件推荐

### 1. 必装插件

```
必装插件：
1. Flutter
   - Flutter 支持
   - Widget 编辑器
   - 调试支持

2. Dart
   - Dart 语言支持
   - 代码分析
   - 重构工具

3. Android Support
   - Android 开发支持
   - 布局编辑器
   - 模拟器支持
```

### 2. 推荐插件

```
推荐插件：
1. Key Promoter X
   - 快捷键学习

2. Rainbow Brackets
   - 彩虹括号

3. CodeGlance
   - 代码小地图

4. GitToolBox
   - Git 增强

5. Material Theme UI
   - Material 主题

6. Dart Data Class
   - 数据类生成

7. Flutter Enhancement Suite
   - Flutter 增强
```

## 🚀 运行和构建

### 1. 运行应用

```
运行步骤：
1. 选择设备：
   - 工具栏选择目标设备
   - 或者选择模拟器

2. 运行配置：
   - 选择运行配置
   - 设置启动参数

3. 运行：
   - 点击运行按钮
   - 或者 Shift+F10

4. 调试：
   - 点击调试按钮
   - 或者 Shift+F9
```

### 2. 构建应用

```
构建步骤：
1. Build → Flutter → Build APK
   - 构建 Android APK

2. Build → Flutter → Build App Bundle
   - 构建 Android App Bundle

3. 构建 iOS：
   - 在 macOS 上使用 Xcode
   - 或者命令行：flutter build ios

4. 构建 Web：
   - flutter build web
```

## 📝 常见问题

### 1. SDK 路径问题

```
问题：找不到 Flutter SDK
解决：
1. File → Settings → Languages & Frameworks → Flutter
2. 设置 Flutter SDK 路径
3. 确保路径正确
4. 重启 Android Studio
```

### 2. 模拟器问题

```
问题：模拟器无法启动
解决：
1. 检查 BIOS 设置（启用虚拟化）
2. 安装 HAXM 或 Hypervisor Driver
3. 更新系统镜像
4. 重新创建 AVD
```

### 3. 插件冲突

```
问题：插件之间冲突
解决：
1. 禁用冲突插件
2. 更新插件版本
3. 重启 Android Studio
4. 检查兼容性
```

---

> 完成以上配置后，Android Studio 就成为了一个强大的 Flutter 开发环境。