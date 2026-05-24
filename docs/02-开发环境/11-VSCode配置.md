# VS Code 配置

> 在 VS Code 中配置 Flutter/Dart 开发环境的完整指南。

## 📦 安装 VS Code

### 1. 下载安装

```
下载地址：https://code.visualstudio.com/

支持平台：
- Windows
- macOS
- Linux
```

### 2. 基本配置

```bash
# 安装中文扩展（可选）
code --install-extension ms-ceintl.vscode-language-pack-zh-hans

# 安装主题
code --install-extension dracula-theme.theme-dracula
code --install-extension PKief.material-icon-theme
```

## 🔌 Flutter/Dart 扩展

### 1. 必装扩展

```bash
# Flutter 扩展（包含 Dart）
code --install-extension Dart-Code.flutter

# Dart 扩展
code --install-extension Dart-Code.dart-code

# 这两个扩展会自动安装以下功能：
# - 语法高亮
# - 代码补全
# - 跳转定义
# - 重命名
# - 格式化
# - 调试支持
# - Widget 检查器
```

### 2. 推荐扩展

```bash
# Git 相关
code --install-extension eamodio.gitlens
code --install-extension mhutchie.git-graph

# 代码质量
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension dbaeumer.vscode-eslint

# 效率工具
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension alefragnani.project-manager

# 主题和图标
code --install-extension PKief.material-icon-theme
code --install-extension zhuangtongfa.Material-theme
```

## ⚙️ VS Code 设置

### 1. 用户设置

```json
// settings.json
{
  // 编辑器设置
  "editor.fontSize": 14,
  "editor.lineHeight": 24,
  "editor.fontFamily": "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.suggestSelection": "first",
  "editor.snippetSuggestions": "top",
  
  // Dart 设置
  "dart.openDevTools": "flutter",
  "dart.flutterSdkPath": "~/flutter",
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "dart.showTodos": true,
  "dart.updateImportsOnRename": true,
  "dart.analysisExcludedFolders": [
    "**/build/**"
  ],
  
  // 文件设置
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/build": true,
    "**/.dart_tool": true
  },
  
  // 搜索设置
  "search.exclude": {
    "**/build": true,
    "**/.dart_tool": true,
    "**/*.g.dart": true,
    "**/*.freezed.dart": true
  },
  
  // 终端设置
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "bash"
}
```

### 2. 工作区设置

```json
// .vscode/settings.json (项目级别)
{
  "dart.flutterSdkPath": "~/flutter",
  "editor.tabSize": 2,
  "editor.rulers": [80, 120],
  "files.associations": {
    "*.dart": "dart"
  },
  "dart.lineLength": 80
}
```

## 🐛 调试配置

### 1. launch.json

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "flutterMode": "debug"
    },
    {
      "name": "Flutter (Profile)",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "flutterMode": "profile"
    },
    {
      "name": "Flutter (Release)",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "flutterMode": "release"
    },
    {
      "name": "Flutter for Chrome",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "deviceId": "chrome"
    }
  ]
}
```

### 2. 调试技巧

```
调试快捷键：
- F5：开始调试
- F10：单步跳过
- F11：单步进入
- Shift+F11：单步跳出
- Shift+F5：停止调试
- Ctrl+Shift+F5：重启调试
- F9：切换断点

调试控制台：
- 可以执行表达式
- 查看变量值
- 修改变量值
```

## ⌨️ 快捷键

### 1. 常用快捷键

```
通用：
- Ctrl+Shift+P：命令面板
- Ctrl+P：快速打开文件
- Ctrl+`：切换终端
- Ctrl+B：切换侧边栏

代码编辑：
- Ctrl+D：选择下一个相同内容
- Ctrl+Shift+L：选择所有相同内容
- Alt+↑/↓：移动行
- Shift+Alt+↑/↓：复制行
- Ctrl+/：切换注释
- Ctrl+Shift+I：格式化文档

Flutter 特定：
- Ctrl+Shift+R：重构
- Ctrl+.：快速修复
- F12：跳转到定义
- Alt+F12：查看定义
- Shift+F12：查找引用
```

### 2. 自定义快捷键

```json
// keybindings.json
[
  {
    "key": "ctrl+shift+f",
    "command": "editor.action.formatDocument",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+r",
    "command": "editor.action.refactor",
    "when": "editorTextFocus"
  },
  {
    "key": "f5",
    "command": "workbench.action.debug.start",
    "when": "debugFocus"
  }
]
```

## 🔧 代码片段

### 1. Flutter 代码片段

```json
// dart.json (用户代码片段)
{
  "Flutter Stateful Widget": {
    "prefix": "stful",
    "body": [
      "class ${1:WidgetName} extends StatefulWidget {",
      "  const ${1:WidgetName}({Key? key}) : super(key: key);",
      "",
      "  @override",
      "  State<${1:WidgetName}> createState() => _${1:WidgetName}State();",
      "}",
      "",
      "class _${1:WidgetName}State extends State<${1:WidgetName}> {",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return Container();",
      "  }",
      "}"
    ],
    "description": "Create a Flutter StatefulWidget"
  },
  "Flutter Stateless Widget": {
    "prefix": "stless",
    "body": [
      "class ${1:WidgetName} extends StatelessWidget {",
      "  const ${1:WidgetName}({Key? key}) : super(key: key);",
      "",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return Container();",
      "  }",
      "}"
    ],
    "description": "Create a Flutter StatelessWidget"
  },
  "Flutter Build Method": {
    "prefix": "build",
    "body": [
      "@override",
      "Widget build(BuildContext context) {",
      "  return ${1:Container}();",
      "}"
    ],
    "description": "Create build method"
  }
}
```

## 🎯 推荐主题

### 1. 暗色主题

```
推荐主题：
1. Dracula Theme
   - code --install-extension dracula-theme.theme-dracula

2. One Dark Pro
   - code --install-extension zhuangtongfa.Material-theme

3. GitHub Theme
   - code --install-extension GitHub.github-vscode-theme

4. Palenight Theme
   - code --install-extension whizkydee.material-palenight-theme
```

### 2. 图标主题

```
推荐图标：
1. Material Icon Theme
   - code --install-extension PKief.material-icon-theme

2. vscode-icons
   - code --install-extension vscode-icons-team.vscode-icons

3. Ayu
   - code --install-extension teabyii.ayu
```

## 🔌 工作流程

### 1. 日常开发

```
1. 打开项目
   code .

2. 选择设备
   - 底部状态栏选择设备
   - 或者按 F5 选择

3. 运行应用
   - F5 开始调试
   - Ctrl+F5 直接运行

4. 热重载
   - 保存文件自动热重载
   - 或者按 r 在终端热重载

5. 热重启
   - 按 R 在终端热重启

6. 调试
   - 设置断点
   - 使用调试控制台
   - 查看变量
```

### 2. 代码质量

```
1. 格式化
   - 保存时自动格式化
   - 或者 Shift+Alt+F 手动格式化

2. 重构
   - Ctrl+. 快速修复
   - Ctrl+Shift+R 重构菜单

3. 代码分析
   - 问题面板查看警告
   - 使用 lint 规则

4. 测试
   - 测试面板运行测试
   - 覆盖率报告
```

## 📝 常见问题

### 1. Flutter SDK 路径

```
问题：找不到 Flutter SDK
解决：
1. 打开设置
2. 搜索 "dart.flutterSdkPath"
3. 设置正确的路径
```

### 2. 扩展冲突

```
问题：扩展之间冲突
解决：
1. 禁用冲突的扩展
2. 重新加载 VS Code
3. 检查扩展顺序
```

### 3. 性能问题

```
问题：VS Code 运行缓慢
解决：
1. 禁用不必要的扩展
2. 增加内存限制
3. 排除大文件夹
4. 清理缓存
```

---

> 完成以上配置后，VS Code 就成为了一个强大的 Flutter 开发环境。