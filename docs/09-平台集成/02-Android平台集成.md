# Android 平台集成

> 掌握 Flutter 与 Android 平台的集成，开发原生 Android 功能。

## 📱 Android 平台概述

### 1. 平台架构
```dart
// Flutter Android 架构
// 1. Flutter Engine - 渲染引擎
// 2. FlutterActivity - Android Activity
// 3. MethodChannel - 方法通道
// 4. EventChannel - 事件通道
// 5. PlatformView - 平台视图
```

### 2. 开发环境
```dart
// Android 开发环境要求
// 1. Android Studio
// 2. Android SDK
// 3. Android 模拟器或真机
// 4. Flutter Android 工具链
```

## 🔧 基础配置

### 1. Android 项目配置
```gradle
// android/app/build.gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
        
        // 多 Dex 支持
        multiDexEnabled true
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    
    // 编译选项
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

// 依赖配置
dependencies {
    implementation 'com.google.firebase:firebase-analytics:21.0.0'
    implementation 'com.google.firebase:firebase-messaging:23.0.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
}
```

### 2. AndroidManifest.xml 配置
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp">

    <!-- 权限声明 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:label="My App"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            
            <meta-data
                android:name="io.flutter.embedding.android.NormalTheme"
                android:resource="@style/NormalTheme" />
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
            
            <!-- 深度链接 -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="myapp" android:host="example.com" />
            </intent-filter>
        </activity>
        
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
```

## 🎯 MethodChannel 通信

### 1. Flutter 端实现
```dart
// Flutter 端 MethodChannel
import 'package:flutter/services.dart';

class NativeService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/native');
  
  // 调用 Android 原生方法
  static Future<String> getPlatformVersion() async {
    try {
      final String version = await _channel.invokeMethod('getPlatformVersion');
      return version;
    } on PlatformException catch (e) {
      return "Failed to get platform version: '${e.message}'.";
    }
  }
  
  // 获取电池电量
  static Future<int> getBatteryLevel() async {
    try {
      final int batteryLevel = await _channel.invokeMethod('getBatteryLevel');
      return batteryLevel;
    } on PlatformException catch (e) {
      print("Failed to get battery level: '${e.message}'.");
      return -1;
    }
  }
  
  // 获取设备信息
  static Future<Map<String, String>> getDeviceInfo() async {
    try {
      final Map<dynamic, dynamic> deviceInfo = await _channel.invokeMethod('getDeviceInfo');
      return Map<String, String>.from(deviceInfo);
    } on PlatformException catch (e) {
      print("Failed to get device info: '${e.message}'.");
      return {};
    }
  }
  
  // 打开原生页面
  static Future<void> openNativePage(String pageName) async {
    try {
      await _channel.invokeMethod('openNativePage', {'pageName': pageName});
    } on PlatformException catch (e) {
      print("Failed to open native page: '${e.message}'.");
    }
  }
  
  // 发送数据到原生
  static Future<void> sendDataToNative(Map<String, dynamic> data) async {
    try {
      await _channel.invokeMethod('sendDataToNative', data);
    } on PlatformException catch (e) {
      print("Failed to send data: '${e.message}'.");
    }
  }
  
  // 调用原生相机
  static Future<String?> takePhoto() async {
    try {
      final String? imagePath = await _channel.invokeMethod('takePhoto');
      return imagePath;
    } on PlatformException catch (e) {
      print("Failed to take photo: '${e.message}'.");
      return null;
    }
  }
  
  // 调用原生扫码
  static Future<String?> scanQRCode() async {
    try {
      final String? result = await _channel.invokeMethod('scanQRCode');
      return result;
    } on PlatformException catch (e) {
      print("Failed to scan QR code: '${e.message}'.");
      return null;
    }
  }
}
```

### 2. Android 端实现
```kotlin
// android/app/src/main/kotlin/com/example/myapp/MainActivity.kt
package com.example.myapp

import android.content.Context
import android.content.Intent
import android.os.BatteryManager
import android.os.Build
import android.provider.MediaStore
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.myapp/native"
    
    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call, result ->
            when (call.method) {
                "getPlatformVersion" -> {
                    result.success("Android ${Build.VERSION.RELEASE}")
                }
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
                "openNativePage" -> {
                    val pageName = call.argument<String>("pageName")
                    openNativePage(pageName)
                    result.success(null)
                }
                "sendDataToNative" -> {
                    val data = call.arguments as Map<String, Any>
                    handleDataFromFlutter(data)
                    result.success(null)
                }
                "takePhoto" -> {
                    takePhoto(result)
                }
                "scanQRCode" -> {
                    scanQRCode(result)
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
            "sdk" to Build.VERSION.SDK_INT.toString(),
            "brand" to Build.BRAND,
            "device" to Build.DEVICE,
            "product" to Build.PRODUCT
        )
    }
    
    private fun openNativePage(pageName: String?) {
        when (pageName) {
            "settings" -> {
                val intent = Intent(android.provider.Settings.ACTION_SETTINGS)
                startActivity(intent)
            }
            "camera" -> {
                val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                startActivity(intent)
            }
            "gallery" -> {
                val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                startActivity(intent)
            }
        }
    }
    
    private fun handleDataFromFlutter(data: Map<String, Any>) {
        // 处理来自 Flutter 的数据
        println("Received data from Flutter: $data")
    }
    
    private fun takePhoto(result: MethodChannel.Result) {
        // 实现拍照功能
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, REQUEST_IMAGE_CAPTURE)
        // 需要保存 result 并在 onActivityResult 中返回
    }
    
    private fun scanQRCode(result: MethodChannel.Result) {
        // 实现扫码功能
        // 可以集成 ZXing 或其他扫码库
    }
    
    companion object {
        private const val REQUEST_IMAGE_CAPTURE = 1
    }
}
```

## 🎭 EventChannel 通信

### 1. Flutter 端实现
```dart
// Flutter 端 EventChannel
import 'package:flutter/services.dart';

class NativeEventService {
  static const EventChannel _eventChannel = EventChannel('com.example.myapp/events');
  
  // 监听原生事件
  static Stream<Map<String, dynamic>> get eventStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      return Map<String, dynamic>.from(event);
    });
  }
  
  // 监听电池状态变化
  static Stream<int> get batteryLevelStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      return event['batteryLevel'] as int;
    });
  }
  
  // 监听网络状态变化
  static Stream<String> get networkStatusStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      return event['networkStatus'] as String;
    });
  }
}
```

### 2. Android 端实现
```kotlin
// android/app/src/main/kotlin/com/example/myapp/NativeEventService.kt
package com.example.myapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import io.flutter.plugin.common.EventChannel

class NativeEventService(private val context: Context) : EventChannel.StreamHandler {
    private var eventSink: EventChannel.EventSink? = null
    private var batteryReceiver: BroadcastReceiver? = null
    private var networkReceiver: BroadcastReceiver? = null
    
    override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
        eventSink = events
        registerReceivers()
    }
    
    override fun onCancel(arguments: Any?) {
        unregisterReceivers()
        eventSink = null
    }
    
    private fun registerReceivers() {
        // 电池状态监听
        batteryReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val level = intent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
                val scale = intent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
                val batteryLevel = level * 100 / scale
                
                eventSink?.success(mapOf(
                    "type" to "battery",
                    "batteryLevel" to batteryLevel
                ))
            }
        }
        
        val batteryFilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        context.registerReceiver(batteryReceiver, batteryFilter)
        
        // 网络状态监听
        networkReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val connectivityManager = context?.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
                val network = connectivityManager.activeNetwork
                val capabilities = connectivityManager.getNetworkCapabilities(network)
                
                val networkStatus = when {
                    capabilities == null -> "disconnected"
                    capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
                    capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
                    else -> "other"
                }
                
                eventSink?.success(mapOf(
                    "type" to "network",
                    "networkStatus" to networkStatus
                ))
            }
        }
        
        val networkFilter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        context.registerReceiver(networkReceiver, networkFilter)
    }
    
    private fun unregisterReceivers() {
        batteryReceiver?.let { context.unregisterReceiver(it) }
        networkReceiver?.let { context.unregisterReceiver(it) }
    }
}
```

## 🎨 PlatformView 集成

### 1. Flutter 端实现
```dart
// Flutter 端 PlatformView
import 'package:flutter/services.dart';

class NativeView extends StatelessWidget {
  final String viewType;
  final Map<String, dynamic> creationParams;
  final MessageCodec<dynamic> creationParamsCodec;
  
  const NativeView({
    Key? key,
    required this.viewType,
    required this.creationParams,
    required this.creationParamsCodec,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return PlatformViewLink(
      viewType: viewType,
      surfaceFactory: (context, controller) {
        return AndroidViewSurface(
          controller: controller as AndroidViewController,
          hitTestBehavior: PlatformViewHitTestBehavior.opaque,
          gestureRecognizers: const <Factory<OneSequenceGestureRecognizer>>{},
        );
      },
      onCreatePlatformView: (params) {
        return PlatformViewsService.initSurfaceAndroidView(
          id: params.id,
          viewType: viewType,
          layoutDirection: TextDirection.lutter,
          creationParams: creationParams,
          creationParamsCodec: creationParamsCodec,
          onFocus: () => params.onFocusChanged(true),
        )
        ..addOnPlatformViewCreatedListener(params.onPlatformViewCreated)
        ..create();
      },
    );
  }
}

// 使用示例
class MapViewExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('地图')),
      body: NativeView(
        viewType: 'com.example.myapp/mapview',
        creationParams: {
          'latitude': 39.9042,
          'longitude': 116.4074,
          'zoom': 12.0,
        },
        creationParamsCodec: StandardMessageCodec(),
      ),
    );
  }
}
```

### 2. Android 端实现
```kotlin
// android/app/src/main/kotlin/com/example/myapp/MapViewFactory.kt
package com.example.myapp

import android.content.Context
import android.view.View
import io.flutter.plugin.common.StandardMessageCodec
import io.flutter.plugin.platform.PlatformView
import io.flutter.plugin.platform.PlatformViewFactory

class MapViewFactory : PlatformViewFactory(StandardMessageCodec.INSTANCE) {
    override fun create(context: Context, viewId: Int, args: Any?): PlatformView {
        val creationParams = args as Map<String, Any>?
        return MapView(context, viewId, creationParams)
    }
}

class MapView(
    private val context: Context,
    private val id: Int,
    private val creationParams: Map<String, Any>?
) : PlatformView {
    private val view: View
    
    init {
        // 创建原生视图
        view = View(context)
        view.setBackgroundColor(android.graphics.Color.BLUE)
        
        // 获取参数
        val latitude = creationParams?.get("latitude") as? Double ?: 0.0
        val longitude = creationParams?.get("longitude") as? Double ?: 0.0
        val zoom = creationParams?.get("zoom") as? Double ?: 12.0
        
        // 初始化地图
        initializeMap(latitude, longitude, zoom)
    }
    
    private fun initializeMap(latitude: Double, longitude: Double, zoom: Double) {
        // 初始化地图视图
        // 可以集成高德地图、百度地图或 Google Maps
    }
    
    override fun getView(): View {
        return view
    }
    
    override fun dispose() {
        // 清理资源
    }
}
```

## 🔄 数据持久化

### 1. Android 原生存储
```kotlin
// Android 端 SharedPreferences
class NativeStorage(private val context: Context) {
    private val prefs = context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
    
    fun saveString(key: String, value: String) {
        prefs.edit().putString(key, value).apply()
    }
    
    fun getString(key: String, defaultValue: String = ""): String {
        return prefs.getString(key, defaultValue) ?: defaultValue
    }
    
    fun saveInt(key: String, value: Int) {
        prefs.edit().putInt(key, value).apply()
    }
    
    fun getInt(key: String, defaultValue: Int = 0): Int {
        return prefs.getInt(key, defaultValue)
    }
    
    fun saveBoolean(key: String, value: Boolean) {
        prefs.edit().putBoolean(key, value).apply()
    }
    
    fun getBoolean(key: String, defaultValue: Boolean = false): Boolean {
        return prefs.getBoolean(key, defaultValue)
    }
    
    fun clear() {
        prefs.edit().clear().apply()
    }
}
```

### 2. 通过 MethodChannel 访问
```dart
// Flutter 端访问原生存储
class NativeStorageService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/native');
  
  static Future<void> saveString(String key, String value) async {
    await _channel.invokeMethod('saveString', {'key': key, 'value': value});
  }
  
  static Future<String> getString(String key, [String defaultValue = '']) async {
    final result = await _channel.invokeMethod('getString', {'key': key});
    return result ?? defaultValue;
  }
  
  static Future<void> saveInt(String key, int value) async {
    await _channel.invokeMethod('saveInt', {'key': key, 'value': value});
  }
  
  static Future<int> getInt(String key, [int defaultValue = 0]) async {
    final result = await _channel.invokeMethod('getInt', {'key': key});
    return result ?? defaultValue;
  }
}
```

## 🎯 推送通知集成

### 1. Firebase 配置
```kotlin
// android/app/src/main/kotlin/com/example/myapp/MyFirebaseMessagingService.kt
package com.example.myapp

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import io.flutter.plugin.common.MethodChannel

class MyFirebaseMessagingService : FirebaseMessagingService() {
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // 发送 Token 到 Flutter
        sendTokenToFlutter(token)
    }
    
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        
        // 处理前台消息
        val data = remoteMessage.data
        val notification = remoteMessage.notification
        
        // 发送消息到 Flutter
        sendNotificationToFlutter(data, notification)
    }
    
    private fun sendTokenToFlutter(token: String) {
        // 通过 MethodChannel 发送 Token
    }
    
    private fun sendNotificationToFlutter(data: Map<String, String>, notification: RemoteMessage.Notification?) {
        // 通过 MethodChannel 发送通知
    }
}
```

### 2. Flutter 端处理
```dart
// Flutter 端推送通知处理
class PushNotificationService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/push');
  
  // 获取 Token
  static Future<String?> getToken() async {
    try {
      final String? token = await _channel.invokeMethod('getToken');
      return token;
    } on PlatformException catch (e) {
      print("Failed to get token: '${e.message}'.");
      return null;
    }
  }
  
  // 监听 Token 刷新
  static Stream<String> get onTokenRefresh {
    return _channel.receiveBroadcastStream().map((event) {
      return event['token'] as String;
    });
  }
  
  // 监听通知
  static Stream<Map<String, dynamic>> get onNotificationReceived {
    return _channel.receiveBroadcastStream().map((event) {
      return Map<String, dynamic>.from(event);
    });
  }
  
  // 订阅主题
  static Future<void> subscribeToTopic(String topic) async {
    await _channel.invokeMethod('subscribeToTopic', {'topic': topic});
  }
  
  // 取消订阅
  static Future<void> unsubscribeFromTopic(String topic) async {
    await _channel.invokeMethod('unsubscribeFromTopic', {'topic': topic});
  }
}
```

## 🚀 最佳实践

### 1. 错误处理
```dart
// 统一错误处理
class PlatformException implements Exception {
  final String message;
  final String? code;
  final dynamic details;
  
  PlatformException(this.message, [this.code, this.details]);
  
  @override
  String toString() => 'PlatformException: $message (code: $code)';
}

// 安全调用
Future<T?> safePlatformCall<T>(Future<T> Function() call) async {
  try {
    return await call();
  } on PlatformException catch (e) {
    print('Platform error: ${e.message}');
    return null;
  } catch (e) {
    print('Unexpected error: $e');
    return null;
  }
}
```

### 2. 性能优化
```dart
// 批量调用
Future<void> batchPlatformCalls() async {
  final results = await Future.wait([
    NativeService.getBatteryLevel(),
    NativeService.getDeviceInfo(),
    NativeService.getPlatformVersion(),
  ]);
  
  print('Battery: ${results[0]}');
  print('Device: ${results[1]}');
  print('Version: ${results[2]}');
}

// 缓存结果
class PlatformCache {
  static final Map<String, dynamic> _cache = {};
  
  static Future<T> getWithCache<T>(
    String key,
    Future<T> Function() getter, {
    Duration maxAge = const Duration(minutes: 5),
  }) async {
    final item = _cache[key];
    if (item != null && !item.isExpired) {
      return item.value as T;
    }
    
    final value = await getter();
    _cache[key] = CacheItem(value, DateTime.now().add(maxAge));
    return value;
  }
}
```

## 📚 学习资源

### 官方文档
- [Flutter Android 集成](https://flutter.dev/docs/development/platform-integration/android)
- [MethodChannel 文档](https://api.flutter.dev/flutter/services/MethodChannel-class.html)
- [PlatformView 文档](https://api.flutter.dev/flutter/widgets/PlatformViewLink-class.html)

### 示例项目
- [Android 平台集成示例](https://github.com/niclin/flutter-android-integration)
- [MethodChannel 示例](https://github.com/niclin/flutter-method-channel-example)

### 学习资源
- [Flutter Android 集成指南](https://medium.com/flutter-community/flutter-android-integration-guide-7b3bf6f0d78e)
- [PlatformView 最佳实践](https://medium.com/flutter-community/flutter-platformview-best-practices-2020-54f3a3f50946)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Dart 语言]] - Dart 语言

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[平台集成指南]] - 平台集成指南
- [[国际化详解]] - 国际化详解

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*