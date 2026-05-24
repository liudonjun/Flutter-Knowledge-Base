# Web 开发环境与部署

> Flutter Web 开发环境配置和应用部署的完整指南。

## 🌐 Web 开发环境

### 1. 启用 Web 支持

```bash
# 启用 Flutter Web 支持
flutter config --enable-web

# 验证 Web 支持
flutter devices
# 应该看到 Chrome 和 Web Server

# 创建支持 Web 的项目
flutter create --platforms web my_web_app

# 添加 Web 支持到现有项目
flutter create --platforms web .
```

### 2. 安装 Chrome

```bash
# macOS
brew install --cask google-chrome

# Ubuntu/Debian
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt install google-chrome-stable

# Windows
# 下载安装程序：https://www.google.com/chrome/
```

### 3. 配置 Chrome 路径

```bash
# 设置 Chrome 可执行文件路径
export CHROME_EXECUTABLE=/usr/bin/google-chrome

# macOS
export CHROME_EXECUTABLE=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome

# 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export CHROME_EXECUTABLE=/path/to/chrome' >> ~/.zshrc
```

## 🔧 Web 配置

### 1. Web 渲染器

```bash
# 使用 HTML 渲染器（默认）
flutter run -d chrome --web-renderer html

# 使用 CanvasKit 渲染器（更好的性能）
flutter run -d chrome --web-renderer canvaskit

# 自动选择渲染器
flutter run -d chrome --web-renderer auto
```

### 2. index.html 配置

```html
<!-- web/index.html -->
<!DOCTYPE html>
<html>
<head>
  <base href="$FLUTTER_BASE_HREF">
  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="Flutter Web App">
  
  <!-- iOS 元标签 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="My App">
  
  <!-- PWA 元标签 -->
  <link rel="manifest" href="manifest.json">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png"/>
  
  <title>My Flutter App</title>
  <link rel="manifest" href="manifest.json">
  
  <!-- 自定义样式 -->
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script src="flutter.js" defer></script>
</body>
</html>
```

### 3. manifest.json 配置

```json
{
  "name": "My Flutter App",
  "short_name": "MyApp",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196F3",
  "description": "A Flutter web application",
  "orientation": "portrait-primary",
  "prefer_related_applications": false,
  "icons": [
    {
      "src": "icons/Icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/Icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🚀 运行和调试

### 1. 运行应用

```bash
# 在 Chrome 中运行
flutter run -d chrome

# 在 Edge 中运行
flutter run -d edge

# 使用 Web Server 运行
flutter run -d web-server

# 指定端口
flutter run -d chrome --web-port 8080

# 指定主机
flutter run -d web-server --web-hostname 0.0.0.0
```

### 2. 调试应用

```bash
# 调试模式运行
flutter run -d chrome --debug

# 打开 DevTools
flutter run -d chrome --debug
# 在浏览器中打开显示的 URL

# 使用 Chrome DevTools
# 右键 → 检查
# 或者 F12
```

## 📦 构建和部署

### 1. 构建 Web 应用

```bash
# 构建生产版本
flutter build web

# 指定渲染器
flutter build web --web-renderer canvaskit

# 构建调试版本
flutter build web --debug

# 构建输出目录
flutter build web --output build/web

# 构建产物位置
ls build/web/
```

### 2. 部署到 Firebase Hosting

```bash
# 安装 Firebase CLI
npm install -g firebase-tools

# 登录 Firebase
firebase login

# 初始化项目
firebase init hosting

# 配置：
# - Public directory: build/web
# - Single-page app: Yes
# - Overwrite index.html: No

# 部署
firebase deploy --only hosting
```

### 3. 部署到 GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.x.x'
    
    - run: flutter pub get
    - run: flutter build web
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build/web
```

### 4. 部署到 Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 构建应用
flutter build web

# 部署
netlify deploy --dir=build/web --prod

# 或者连接 Git 仓库自动部署
```

### 5. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 构建应用
flutter build web

# 部署
vercel --prod build/web
```

## ⚡ 性能优化

### 1. 构建优化

```bash
# 使用 Tree Shaking
flutter build web --tree-shake-icons

# 压缩资源
flutter build web --release

# 使用 CanvasKit 渲染器
flutter build web --web-renderer canvaskit

# 分析构建大小
flutter build web --analyze-size
```

### 2. 代码优化

```dart
// 使用 const 构造函数
const MyWidget({Key? key}) : super(key: key);

// 延迟加载
import 'package:flutter/material.dart';
import 'heavy_library.dart' deferred as heavy;

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  bool _loaded = false;

  void _loadLibrary() async {
    await heavy.loadLibrary();
    setState(() => _loaded = true);
  }

  @override
  Widget build(BuildContext context) {
    if (!_loaded) {
      return CircularProgressIndicator();
    }
    return heavy.HeavyWidget();
  }
}
```

## 🔧 常见问题

### 1. CORS 问题

```
问题：跨域请求被阻止
解决：
1. 服务器配置 CORS 头
2. 使用代理服务器
3. 开发时使用 --disable-web-security
```

### 2. 路由问题

```
问题：刷新页面 404
解决：
1. 配置服务器重定向到 index.html
2. 使用 HashRouter
3. 配置 base href
```

### 3. 性能问题

```
问题：加载缓慢
解决：
1. 使用 CanvasKit 渲染器
2. 延迟加载
3. 压缩资源
4. 使用 CDN
```

---

> Flutter Web 开发需要考虑浏览器兼容性和性能优化。