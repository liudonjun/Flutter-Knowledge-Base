# iOS 平台集成

> 掌握 Flutter 与 iOS 平台的集成，开发原生 iOS 功能。

## 📱 iOS 平台概述

### 1. 平台架构
```dart
// Flutter iOS 架构
// 1. Flutter Engine - 渲染引擎
// 2. FlutterViewController - iOS ViewController
// 3. FlutterMethodChannel - 方法通道
// 4. FlutterEventChannel - 事件通道
// 5. FlutterPlatformView - 平台视图
```

### 2. 开发环境
```dart
// iOS 开发环境要求
// 1. macOS 系统
// 2. Xcode
// 3. iOS 模拟器或真机
// 4. CocoaPods
// 5. Flutter iOS 工具链
```

## 🔧 基础配置

### 1. iOS 项目配置
```ruby
# ios/Podfile
platform :ios, '13.0'

# CocoaPods analytics sends network stats synchronously affecting flutter build latency.
ENV['COCOAPODS_DISABLE_STATS'] = 'true'

project 'Runner', {
  'Debug' => :debug,
  'Profile' => :release,
  'Release' => :release,
}

def flutter_root
  generated_xcode_build_settings_path = File.expand_path(File.join('..', 'Flutter', 'Generated.xcconfig'), __FILE__)
  unless File.exist?(generated_xcode_build_settings_path)
    raise "#{generated_xcode_build_settings_path} must exist. If you're running pod install manually, make sure flutter pub get is executed first"
  end

  File.foreach(generated_xcode_build_settings_path) do |line|
    matches = line.match(/FLUTTER_ROOT\=(.*)/)
    return matches[1].strip if matches
  end
  raise "FLUTTER_ROOT not found in #{generated_xcode_build_settings_path}. Try deleting Generated.xcconfig, then run flutter pub get"
end

require File.expand_path(File.join('packages', 'flutter_tools', 'bin', 'podhelper'), flutter_root)

flutter_ios_podfile_setup

target 'Runner' do
  use_frameworks!
  use_modular_headers!

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
  
  # 添加依赖
  pod 'Firebase/Analytics'
  pod 'Firebase/Messaging'
  pod 'GoogleMaps'
  pod 'Alamofire'
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
  end
end
```

### 2. Info.plist 配置
```xml
<!-- ios/Runner/Info.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleDisplayName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>$(FLUTTER_BUILD_NAME)</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleVersion</key>
	<string>$(FLUTTER_BUILD_NUMBER)</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIMainStoryboardFile</key>
	<string>Main</string>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UISupportedInterfaceOrientations~ipad</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationPortraitUpsideDown</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	
	<!-- 权限声明 -->
	<key>NSCameraUsageDescription</key>
	<string>需要访问相机进行拍照</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>需要访问相册选择图片</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>需要访问位置信息</string>
	<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
	<string>需要持续访问位置信息</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要访问麦克风进行录音</string>
	<key>NSContactsUsageDescription</key>
	<string>需要访问通讯录</string>
	<key>NSCalendarsUsageDescription</key>
	<string>需要访问日历</string>
	<key>NSRemindersUsageDescription</key>
	<string>需要访问提醒事项</string>
	
	<!-- URL Schemes -->
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLName</key>
			<string>com.example.myapp</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>myapp</string>
			</array>
		</dict>
	</array>
</dict>
</plist>
```

## 🎯 MethodChannel 通信

### 1. Flutter 端实现
```dart
// Flutter 端 MethodChannel
import 'package:flutter/services.dart';

class NativeIOSService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/ios');
  
  // 获取 iOS 版本
  static Future<String> getIOSVersion() async {
    try {
      final String version = await _channel.invokeMethod('getIOSVersion');
      return version;
    } on PlatformException catch (e) {
      return "Failed to get iOS version: '${e.message}'.";
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
  
  // 打开设置
  static Future<void> openSettings() async {
    try {
      await _channel.invokeMethod('openSettings');
    } on PlatformException catch (e) {
      print("Failed to open settings: '${e.message}'.");
    }
  }
  
  // 获取电池状态
  static Future<Map<String, dynamic>> getBatteryStatus() async {
    try {
      final Map<dynamic, dynamic> status = await _channel.invokeMethod('getBatteryStatus');
      return Map<String, dynamic>.from(status);
    } on PlatformException catch (e) {
      print("Failed to get battery status: '${e.message}'.");
      return {};
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
  
  // 获取联系人
  static Future<List<Map<String, String>>> getContacts() async {
    try {
      final List<dynamic> contacts = await _channel.invokeMethod('getContacts');
      return contacts.map((contact) => Map<String, String>.from(contact)).toList();
    } on PlatformException catch (e) {
      print("Failed to get contacts: '${e.message}'.");
      return [];
    }
  }
  
  // 分享内容
  static Future<void> shareContent(String content, {String? subject}) async {
    try {
      await _channel.invokeMethod('shareContent', {
        'content': content,
        'subject': subject,
      });
    } on PlatformException catch (e) {
      print("Failed to share content: '${e.message}'.");
    }
  }
}
```

### 2. iOS 端实现
```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  private let channelName = "com.example.myapp/ios"
  
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    
    // 设置 MethodChannel
    setupMethodChannel()
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  private func setupMethodChannel() {
    guard let controller = window?.rootViewController as? FlutterViewController else {
      return
    }
    
    let channel = FlutterMethodChannel(
      name: channelName,
      binaryMessenger: controller.binaryMessenger
    )
    
    channel.setMethodCallHandler { [weak self] (call: FlutterMethodCall, result: @escaping FlutterResult) in
      switch call.method {
      case "getIOSVersion":
        self?.getIOSVersion(result: result)
      case "getDeviceInfo":
        self?.getDeviceInfo(result: result)
      case "openSettings":
        self?.openSettings(result: result)
      case "getBatteryStatus":
        self?.getBatteryStatus(result: result)
      case "takePhoto":
        self?.takePhoto(result: result)
      case "scanQRCode":
        self?.scanQRCode(result: result)
      case "getContacts":
        self?.getContacts(result: result)
      case "shareContent":
        self?.shareContent(call: call, result: result)
      default:
        result(FlutterMethodNotImplemented)
      }
    }
  }
  
  private func getIOSVersion(result: @escaping FlutterResult) {
    let version = UIDevice.current.systemVersion
    result("iOS \(version)")
  }
  
  private func getDeviceInfo(result: @escaping FlutterResult) {
    let device = UIDevice.current
    let deviceInfo: [String: String] = [
      "model": device.model,
      "name": device.name,
      "systemName": device.systemName,
      "systemVersion": device.systemVersion,
      "identifierForVendor": device.identifierForVendor?.uuidString ?? "",
      "localizedModel": device.localizedModel
    ]
    result(deviceInfo)
  }
  
  private func openSettings(result: @escaping FlutterResult) {
    if let settingsUrl = URL(string: UIApplication.openSettingsURLString) {
      if UIApplication.shared.canOpenURL(settingsUrl) {
        UIApplication.shared.open(settingsUrl) { success in
          result(success)
        }
      } else {
        result(false)
      }
    } else {
      result(false)
    }
  }
  
  private func getBatteryStatus(result: @escaping FlutterResult) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let batteryLevel = UIDevice.current.batteryLevel
    let batteryState = UIDevice.current.batteryState
    
    let status: [String: Any] = [
      "level": Int(batteryLevel * 100),
      "state": batteryState == .charging ? "charging" : 
               batteryState == .full ? "full" : 
               batteryState == .unplugged ? "unplugged" : "unknown"
    ]
    result(status)
  }
  
  private func takePhoto(result: @escaping FlutterResult) {
    // 实现拍照功能
    // 需要集成 UIImagePickerController
  }
  
  private func scanQRCode(result: @escaping FlutterResult) {
    // 实现扫码功能
    // 需要集成 AVFoundation
  }
  
  private func getContacts(result: @escaping FlutterResult) {
    // 实现获取联系人功能
    // 需要集成 Contacts 框架
  }
  
  private func shareContent(call: FlutterMethodCall, result: @escaping FlutterResult) {
    guard let args = call.arguments as? [String: Any],
          let content = args["content"] as? String else {
      result(FlutterError(code: "INVALID_ARGUMENTS", message: "Invalid arguments", details: nil))
      return
    }
    
    let subject = args["subject"] as? String
    let activityItems: [Any] = subject != nil ? [subject!, content] : [content]
    
    let activityViewController = UIActivityViewController(
      activityItems: activityItems,
      applicationActivities: nil
    )
    
    if let controller = window?.rootViewController {
      controller.present(activityViewController, animated: true) {
        result(true)
      }
    } else {
      result(false)
    }
  }
}
```

## 🎭 EventChannel 通信

### 1. Flutter 端实现
```dart
// Flutter 端 EventChannel
import 'package:flutter/services.dart';

class NativeIOSEventService {
  static const EventChannel _eventChannel = EventChannel('com.example.myapp/ios/events');
  
  // 监听 iOS 事件
  static Stream<Map<String, dynamic>> get eventStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      return Map<String, dynamic>.from(event);
    });
  }
  
  // 监听电池状态变化
  static Stream<Map<String, dynamic>> get batteryStatusStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      if (event['type'] == 'battery') {
        return Map<String, dynamic>.from(event);
      }
      return {};
    });
  }
  
  // 监听网络状态变化
  static Stream<String> get networkStatusStream {
    return _eventChannel.receiveBroadcastStream().map((event) {
      if (event['type'] == 'network') {
        return event['status'] as String;
      }
      return 'unknown';
    });
  }
}
```

### 2. iOS 端实现
```swift
// ios/Runner/NativeIOSEventService.swift
import Flutter
import UIKit

class NativeIOSEventService: NSObject, FlutterStreamHandler {
    private var eventSink: FlutterEventSink?
    private var batteryObserver: NSObjectProtocol?
    private var networkObserver: NSObjectProtocol?
    
    func onListen(withArguments arguments: Any?, eventSink events: @escaping FlutterEventSink) -> FlutterError? {
        eventSink = events
        startListening()
        return nil
    }
    
    func onCancel(withArguments arguments: Any?) -> FlutterError? {
        stopListening()
        eventSink = nil
        return nil
    }
    
    private func startListening() {
        // 监听电池状态变化
        UIDevice.current.isBatteryMonitoringEnabled = true
        batteryObserver = NotificationCenter.default.addObserver(
            forName: UIDevice.batteryStateDidChangeNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.sendBatteryStatus()
        }
        
        // 监听网络状态变化
        networkObserver = NotificationCenter.default.addObserver(
            forName: .reachabilityChanged,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.sendNetworkStatus()
        }
        
        // 发送初始状态
        sendBatteryStatus()
        sendNetworkStatus()
    }
    
    private func stopListening() {
        if let observer = batteryObserver {
            NotificationCenter.default.removeObserver(observer)
        }
        if let observer = networkObserver {
            NotificationCenter.default.removeObserver(observer)
        }
    }
    
    private func sendBatteryStatus() {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let batteryLevel = UIDevice.current.batteryLevel
        let batteryState = UIDevice.current.batteryState
        
        let status: [String: Any] = [
            "type": "battery",
            "level": Int(batteryLevel * 100),
            "state": batteryState == .charging ? "charging" : 
                     batteryState == .full ? "full" : 
                     batteryState == .unplugged ? "unplugged" : "unknown"
        ]
        
        eventSink?(status)
    }
    
    private func sendNetworkStatus() {
        // 实现网络状态检测
        let status: [String: Any] = [
            "type": "network",
            "status": "connected" // 需要实际检测
        ]
        
        eventSink?(status)
    }
}
```

## 🎨 PlatformView 集成

### 1. Flutter 端实现
```dart
// Flutter 端 PlatformView
import 'package:flutter/services.dart';

class IOSNativeView extends StatelessWidget {
  final String viewType;
  final Map<String, dynamic> creationParams;
  final MessageCodec<dynamic> creationParamsCodec;
  
  const IOSNativeView({
    Key? key,
    required this.viewType,
    required this.creationParams,
    required this.creationParamsCodec,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return UiKitView(
      viewType: viewType,
      creationParams: creationParams,
      creationParamsCodec: creationParamsCodec,
      onPlatformViewCreated: (id) {
        print('PlatformView created with id: $id');
      },
    );
  }
}

// 使用示例
class MapViewExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('iOS 地图')),
      body: IOSNativeView(
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

### 2. iOS 端实现
```swift
// ios/Runner/MapViewFactory.swift
import Flutter
import UIKit

class MapViewFactory: NSObject, FlutterPlatformViewFactory {
    func create(
        withFrame frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?
    ) -> FlutterPlatformView {
        return MapView(
            frame: frame,
            viewIdentifier: viewId,
            arguments: args,
            binaryMessenger: nil
        )
    }
    
    func createArgsCodec() -> FlutterMessageCodec & NSObjectProtocol {
        return FlutterStandardMessageCodec.sharedInstance()
    }
}

class MapView: NSObject, FlutterPlatformView {
    private var _view: UIView
    
    init(
        frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?,
        binaryMessenger messenger: FlutterBinaryMessenger?
    ) {
        _view = UIView()
        super.init()
        
        // 创建原生视图
        _view.backgroundColor = .blue
        _view.frame = frame
        
        // 获取参数
        if let params = args as? [String: Any] {
            let latitude = params["latitude"] as? Double ?? 0.0
            let longitude = params["longitude"] as? Double ?? 0.0
            let zoom = params["zoom"] as? Double ?? 12.0
            
            // 初始化地图
            initializeMap(latitude: latitude, longitude: longitude, zoom: zoom)
        }
    }
    
    func view() -> UIView {
        return _view
    }
    
    private func initializeMap(latitude: Double, longitude: Double, zoom: Double) {
        // 初始化地图视图
        // 可以集成 MapKit、Google Maps 或其他地图 SDK
    }
}
```

## 🔄 数据持久化

### 1. iOS 原生存储
```swift
// ios/Runner/NativeStorage.swift
import Foundation

class NativeStorage {
    private let defaults = UserDefaults.standard
    
    func saveString(key: String, value: String) {
        defaults.set(value, forKey: key)
        defaults.synchronize()
    }
    
    func getString(key: String, defaultValue: String = "") -> String {
        return defaults.string(forKey: key) ?? defaultValue
    }
    
    func saveInt(key: String, value: Int) {
        defaults.set(value, forKey: key)
        defaults.synchronize()
    }
    
    func getInt(key: String, defaultValue: Int = 0) -> Int {
        return defaults.integer(forKey: key)
    }
    
    func saveBool(key: String, value: Bool) {
        defaults.set(value, forKey: key)
        defaults.synchronize()
    }
    
    func getBool(key: String, defaultValue: Bool = false) -> Bool {
        return defaults.bool(forKey: key)
    }
    
    func clear() {
        let domain = Bundle.main.bundleIdentifier!
        defaults.removePersistentDomain(forName: domain)
        defaults.synchronize()
    }
}
```

### 2. 钥匙串存储
```swift
// ios/Runner/KeychainService.swift
import Security
import Foundation

class KeychainService {
    static let shared = KeychainService()
    
    func save(key: String, value: String) -> Bool {
        guard let data = value.data(using: .utf8) else { return false }
        
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]
        
        // 删除现有项目
        SecItemDelete(query as CFDictionary)
        
        // 添加新项目
        let status = SecItemAdd(query as CFDictionary, nil)
        return status == errSecSuccess
    }
    
    func load(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        guard status == errSecSuccess,
              let data = result as? Data,
              let string = String(data: data, encoding: .utf8) else {
            return nil
        }
        
        return string
    }
    
    func delete(key: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key
        ]
        
        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess
    }
}
```

## 🎯 推送通知集成

### 1. APNs 配置
```swift
// ios/Runner/AppDelegate.swift (扩展)
extension AppDelegate {
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        print("APNs Token: \(token)")
        
        // 发送 Token 到 Flutter
        sendTokenToFlutter(token)
    }
    
    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        print("Failed to register for remote notifications: \(error)")
    }
    
    func application(
        _ application: UIApplication,
        didReceiveRemoteNotification userInfo: [AnyHashable: Any],
        fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
    ) {
        // 处理推送通知
        handlePushNotification(userInfo)
        completionHandler(.newData)
    }
    
    private func sendTokenToFlutter(_ token: String) {
        // 通过 MethodChannel 发送 Token
    }
    
    private func handlePushNotification(_ userInfo: [AnyHashable: Any]) {
        // 处理推送通知
        // 发送到 Flutter
    }
}
```

### 2. Flutter 端处理
```dart
// Flutter 端推送通知处理
class iOSPushNotificationService {
  static const MethodChannel _channel = MethodChannel('com.example.myapp/push');
  
  // 请求通知权限
  static Future<bool> requestPermission() async {
    try {
      final bool granted = await _channel.invokeMethod('requestPermission');
      return granted;
    } on PlatformException catch (e) {
      print("Failed to request permission: '${e.message}'.");
      return false;
    }
  }
  
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
  
  // 监听通知
  static Stream<Map<String, dynamic>> get onNotificationReceived {
    return _channel.receiveBroadcastStream().map((event) {
      return Map<String, dynamic>.from(event);
    });
  }
  
  // 注册通知类别
  static Future<void> registerNotificationCategories() async {
    await _channel.invokeMethod('registerNotificationCategories');
  }
}
```

## 🚀 最佳实践

### 1. 权限处理
```dart
// 权限处理
class iOSPermissionService {
  static Future<bool> requestCameraPermission() async {
    // 检查权限状态
    final status = await Permission.camera.status;
    
    if (status.isGranted) {
      return true;
    }
    
    if (status.isDenied) {
      // 请求权限
      final result = await Permission.camera.request();
      return result.isGranted;
    }
    
    if (status.isPermanentlyDenied) {
      // 打开设置
      await openAppSettings();
      return false;
    }
    
    return false;
  }
  
  static Future<bool> requestLocationPermission() async {
    final status = await Permission.location.status;
    
    if (status.isGranted) {
      return true;
    }
    
    if (status.isDenied) {
      final result = await Permission.location.request();
      return result.isGranted;
    }
    
    if (status.isPermanentlyDenied) {
      await openAppSettings();
      return false;
    }
    
    return false;
  }
}
```

### 2. 错误处理
```dart
// iOS 特定错误处理
class iOSExceptionHandler {
  static void handlePlatformException(PlatformException e) {
    switch (e.code) {
      case 'PERMISSION_DENIED':
        print('权限被拒绝: ${e.message}');
        break;
      case 'NOT_AVAILABLE':
        print('功能不可用: ${e.message}');
        break;
      case 'INVALID_ARGUMENTS':
        print('参数无效: ${e.message}');
        break;
      case 'UNAVAILABLE':
        print('服务不可用: ${e.message}');
        break;
      default:
        print('未知错误: ${e.message}');
    }
  }
}
```

## 📚 学习资源

### 官方文档
- [Flutter iOS 集成](https://flutter.dev/docs/development/platform-integration/ios)
- [Swift 文档](https://developer.apple.com/documentation/swift)
- [iOS 开发文档](https://developer.apple.com/documentation/)

### 示例项目
- [iOS 平台集成示例](https://github.com/niclin/flutter-ios-integration)
- [Swift MethodChannel 示例](https://github.com/niclin/flutter-swift-method-channel)

### 学习资源
- [Flutter iOS 集成指南](https://medium.com/flutter-community/flutter-ios-integration-guide-7b3bf6f0d78e)
- [Swift 与 Flutter 通信](https://medium.com/flutter-community/flutter-swift-communication-2020-54f3a3f50946)

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