# 平台集成

> Flutter 平台特定功能集成指南。

## 📱 Android 平台集成

### 1. Android 特定配置
```dart
// android/app/build.gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.debug
        }
    }
}

// 添加依赖
dependencies {
    implementation 'com.google.firebase:firebase-analytics:21.0.0'
    implementation 'com.google.firebase:firebase-messaging:23.0.0'
}
```

### 2. Android 原生代码集成
```kotlin
// android/app/src/main/kotlin/com/example/myapp/MainActivity.kt
package com.example.myapp

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.myapp/native"
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call, result ->
            when (call.method) {
                "getBatteryLevel" -> {
                    val batteryLevel = getBatteryLevel()
                    if (batteryLevel != -1) {
                        result.success(batteryLevel)
                    } else {
                        result.error("UNAVAILABLE", "Battery level not available.", null)
                    }
                }
                "getDeviceInfo" -> {
                    val deviceInfo = getDeviceInfo()
                    result.success(deviceInfo)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }
    
    private fun getBatteryLevel(): Int {
        val batteryManager = getSystemService(BATTERY_SERVICE) as BatteryManager
        return batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }
    
    private fun getDeviceInfo(): Map<String, String> {
        return mapOf(
            "model" to Build.MODEL,
            "manufacturer" to Build.MANUFACTURER,
            "version" to Build.VERSION.RELEASE,
            "sdk" to Build.VERSION.SDK_INT.toString()
        )
    }
}
```

### 3. Flutter 调用 Android 原生代码
```dart
// Flutter 端调用
import 'package:flutter/services.dart';

class NativeService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/native');
  
  static Future<int> getBatteryLevel() async {
    try {
      final int batteryLevel = await _channel.invokeMethod('getBatteryLevel');
      return batteryLevel;
    } on PlatformException catch (e) {
      print("Failed to get battery level: '${e.message}'.");
      return -1;
    }
  }
  
  static Future<Map<String, String>> getDeviceInfo() async {
    try {
      final Map<dynamic, dynamic> deviceInfo = await _channel.invokeMethod('getDeviceInfo');
      return Map<String, String>.from(deviceInfo);
    } on PlatformException catch (e) {
      print("Failed to get device info: '${e.message}'.");
      return {};
    }
  }
}

// 使用示例
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int _batteryLevel = 0;
  Map<String, String> _deviceInfo = {};
  
  @override
  void initState() {
    super.initState();
    _getNativeData();
  }
  
  Future<void> _getNativeData() async {
    final batteryLevel = await NativeService.getBatteryLevel();
    final deviceInfo = await NativeService.getDeviceInfo();
    
    setState(() {
      _batteryLevel = batteryLevel;
      _deviceInfo = deviceInfo;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('电池电量: $_batteryLevel%'),
        Text('设备型号: ${_deviceInfo['model']}'),
        Text('制造商: ${_deviceInfo['manufacturer']}'),
        Text('系统版本: ${_deviceInfo['version']}'),
      ],
    );
  }
}
```

## 🍎 iOS 平台集成

### 1. iOS 特定配置
```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}

// ios/Runner/Info.plist
<key>NSCameraUsageDescription</key>
<string>需要访问相机</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>需要访问相册</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>需要访问位置</string>
```

### 2. iOS 原生代码集成
```swift
// ios/Runner/NativeViewController.swift
import Flutter
import UIKit

class NativeViewController: NSObject, FlutterPlugin {
    static func register(with registrar: FlutterPluginRegistrar) {
        let channel = FlutterMethodChannel(
            name: "com.example.myapp/native",
            binaryMessenger: registrar.messenger()
        )
        let instance = NativeViewController()
        registrar.addMethodCallDelegate(instance, channel: channel)
    }
    
    func handle(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
        switch call.method {
        case "getBatteryLevel":
            let batteryLevel = getBatteryLevel()
            result(batteryLevel)
        case "getDeviceInfo":
            let deviceInfo = getDeviceInfo()
            result(deviceInfo)
        case "getPlatformVersion":
            result("iOS \(UIDevice.current.systemVersion)")
        default:
            result(FlutterMethodNotImplemented)
        }
    }
    
    private func getBatteryLevel() -> Int {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let batteryLevel = UIDevice.current.batteryLevel
        return Int(batteryLevel * 100)
    }
    
    private func getDeviceInfo() -> [String: String] {
        return [
            "model": UIDevice.current.model,
            "name": UIDevice.current.name,
            "systemName": UIDevice.current.systemName,
            "systemVersion": UIDevice.current.systemVersion
        ]
    }
}
```

### 3. Flutter 调用 iOS 原生代码
```dart
// Flutter 端调用 (与 Android 相同)
import 'package:flutter/services.dart';

class NativeService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/native');
  
  static Future<String> getPlatformVersion() async {
    try {
      final String version = await _channel.invokeMethod('getPlatformVersion');
      return version;
    } on PlatformException catch (e) {
      return "Failed to get platform version: '${e.message}'.";
    }
  }
}
```

## 🌐 Web 平台集成

### 1. Web 特定配置
```dart
// web/index.html
<!DOCTYPE html>
<html>
<head>
  <base href="$FLUTTER_BASE_HREF">
  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="Flutter Web App">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Flutter Web App">
  <link rel="manifest" href="manifest.json">
  <title>Flutter Web App</title>
  <script src="main.dart.js" type="application/javascript"></script>
</head>
<body>
</body>
</html>

// web/manifest.json
{
  "name": "Flutter Web App",
  "short_name": "Flutter",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#0175C2",
  "theme_color": "#0175C2",
  "description": "Flutter Web Application",
  "orientation": "portrait-primary",
  "prefer_related_applications": false
}
```

### 2. Web 特定功能
```dart
// Web 特定代码
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:html' as html;

class WebService {
  static void openUrl(String url) {
    if (kIsWeb) {
      html.window.open(url, '_blank');
    }
  }
  
  static void downloadFile(String url, String filename) {
    if (kIsWeb) {
      final anchor = html.AnchorElement(href: url)
        ..setAttribute('download', filename)
        ..click();
    }
  }
  
  static String getBaseUrl() {
    if (kIsWeb) {
      return html.window.location.href;
    }
    return '';
  }
  
  static void setWindowTitle(String title) {
    if (kIsWeb) {
      html.document.title = title;
    }
  }
}
```

## 🖥️ 桌面平台集成

### 1. 桌面平台配置
```yaml
# pubspec.yaml
name: my_desktop_app
description: Flutter Desktop Application

environment:
  sdk: ">=2.17.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  window_size:
    git:
      url: https://github.com/google/flutter-desktop-embedding.git
      path: plugins/window_size

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

### 2. 桌面平台功能
```dart
// 桌面平台特定功能
import 'package:window_size/window_size.dart';

class DesktopService {
  static void setWindowTitle(String title) {
    setWindowTitle(title);
  }
  
  static void setWindowSize(double width, double height) {
    setWindowMinSize(Size(width, height));
    setWindowMaxSize(Size(width, height));
  }
  
  static void centerWindow() {
    setWindowFrame(Rect.fromCenter(
      center: Offset(
        (await getCurrentScreen())!.frame.width / 2,
        (await getCurrentScreen())!.frame.height / 2,
      ),
      width: 800,
      height: 600,
    ));
  }
}
```

## 🔧 平台判断和适配

### 1. 平台判断
```dart
import 'package:flutter/foundation.dart';
import 'dart:io';

class PlatformService {
  static bool get isAndroid => Platform.isAndroid;
  static bool get isIOS => Platform.isIOS;
  static bool get isWeb => kIsWeb;
  static bool get isWindows => Platform.isWindows;
  static bool get isMacOS => Platform.isMacOS;
  static bool get isLinux => Platform.isLinux;
  
  static String get platformName {
    if (isAndroid) return 'Android';
    if (isIOS) return 'iOS';
    if (isWeb) return 'Web';
    if (isWindows) return 'Windows';
    if (isMacOS) return 'macOS';
    if (isLinux) return 'Linux';
    return 'Unknown';
  }
}
```

### 2. 条件导入
```dart
// 条件导入示例
import 'package:flutter/foundation.dart';

// 通用接口
abstract class PlatformInterface {
  Future<String> getPlatformVersion();
  Future<void> openUrl(String url);
}

// Android 实现
class AndroidPlatform implements PlatformInterface {
  @override
  Future<String> getPlatformVersion() async {
    // Android 特定实现
    return 'Android';
  }
  
  @override
  Future<void> openUrl(String url) async {
    // Android 特定实现
  }
}

// iOS 实现
class IOSPlatform implements PlatformInterface {
  @override
  Future<String> getPlatformVersion() async {
    // iOS 特定实现
    return 'iOS';
  }
  
  @override
  Future<void> openUrl(String url) async {
    // iOS 特定实现
  }
}

// Web 实现
class WebPlatform implements PlatformInterface {
  @override
  Future<String> getPlatformVersion() async {
    // Web 特定实现
    return 'Web';
  }
  
  @override
  Future<void> openUrl(String url) async {
    // Web 特定实现
    html.window.open(url, '_blank');
  }
}

// 工厂方法
class PlatformFactory {
  static PlatformInterface create() {
    if (kIsWeb) {
      return WebPlatform();
    } else if (Platform.isAndroid) {
      return AndroidPlatform();
    } else if (Platform.isIOS) {
      return IOSPlatform();
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }
}
```

## 🚀 最佳实践

### 1. 平台特定代码组织
```
lib/
├── platform/
│   ├── platform_interface.dart    # 通用接口
│   ├── android/
│   │   └── android_platform.dart  # Android 实现
│   ├── ios/
│   │   └── ios_platform.dart      # iOS 实现
│   ├── web/
│   │   └── web_platform.dart      # Web 实现
│   └── platform_factory.dart      # 工厂方法
```

### 2. 条件编译
```dart
// 使用条件编译
import 'package:flutter/foundation.dart';

void myFunction() {
  if (kIsWeb) {
    // Web 特定代码
  } else if (Platform.isAndroid) {
    // Android 特定代码
  } else if (Platform.isIOS) {
    // iOS 特定代码
  }
}
```

### 3. 平台适配策略
```dart
// 平台适配策略
class PlatformAdapter {
  static Widget adaptWidget({
    required Widget android,
    required Widget ios,
    required Widget web,
  }) {
    if (kIsWeb) {
      return web;
    } else if (Platform.isAndroid) {
      return android;
    } else if (Platform.isIOS) {
      return ios;
    } else {
      return android; // 默认
    }
  }
}
```

## 📚 学习资源

### 官方文档
- [Flutter 平台集成](https://flutter.dev/docs/development/platform-integration)
- [Android 集成](https://flutter.dev/docs/development/platform-integration/android)
- [iOS 集成](https://flutter.dev/docs/development/platform-integration/ios)
- [Web 集成](https://flutter.dev/docs/development/platform-integration/web)

### 社区资源
- [Flutter 平台插件](https://pub.dev/)
- [平台特定最佳实践](https://flutterchina.club/platform/)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Dart 语言]] - Dart 语言

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[状态管理]] - 状态管理方案
- [[性能优化]] - 性能优化策略

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*