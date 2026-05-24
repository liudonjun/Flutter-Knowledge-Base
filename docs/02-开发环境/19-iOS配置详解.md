# iOS 配置详解

> Flutter iOS 项目配置的完整指南，包括 Xcode、CocoaPods 和证书管理。

## 🍎 Xcode 配置

### 1. 项目配置

```bash
# 打开 iOS 项目
open ios/Runner.xcworkspace

# 在 Xcode 中配置：
# 1. 选择 Runner 项目
# 2. 选择 Runner Target
# 3. General 标签：
#    - Bundle Identifier: com.example.app
#    - Version: 1.0.0
#    - Build: 1
#    - Deployment Target: iOS 12.0
#    - Devices: iPhone & iPad
```

### 2. 签名配置

```
自动签名（推荐）：
1. Xcode → Runner → Signing & Capabilities
2. 勾选 "Automatically manage signing"
3. Team: 选择你的开发团队
4. Bundle Identifier: 唯一标识符

手动签名：
1. 取消勾选 "Automatically manage signing"
2. Debug:
   - Provisioning Profile: 自动
   - Signing Certificate: Apple Development
3. Release:
   - Provisioning Profile: 手动选择
   - Signing Certificate: Apple Distribution
```

### 3. 权限配置

```xml
<!-- ios/Runner/Info.plist -->
<dict>
    <!-- 相机权限 -->
    <key>NSCameraUsageDescription</key>
    <string>需要访问相机以拍照</string>
    
    <!-- 相册权限 -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>需要访问相册以选择图片</string>
    
    <!-- 位置权限 -->
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>需要访问位置以提供位置服务</string>
    
    <key>NSLocationAlwaysUsageDescription</key>
    <string>需要始终访问位置以提供后台位置服务</string>
    
    <!-- 麦克风权限 -->
    <key>NSMicrophoneUsageDescription</key>
    <string>需要访问麦克风以录音</string>
    
    <!-- 蓝牙权限 -->
    <key>NSBluetoothPeripheralUsageDescription</key>
    <string>需要访问蓝牙以连接设备</string>
    
    <!-- 通知权限 -->
    <key>NSUserNotificationsUsageDescription</key>
    <string>需要发送通知以提醒您</string>
</dict>
```

## 📦 CocoaPods 配置

### 1. 安装 CocoaPods

```bash
# 安装 Ruby（推荐使用 Homebrew）
brew install ruby

# 添加 Ruby 到 PATH
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 安装 CocoaPods
sudo gem install cocoapods

# 验证安装
pod --version
```

### 2. Podfile 配置

```ruby
# ios/Podfile
platform :ios, '12.0'

# CocoaPods 分析器
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
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
    
    # 解决某些依赖的最低版本问题
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
    end
  end
end
```

### 3. 常用 CocoaPods 命令

```bash
# 安装依赖
cd ios && pod install

# 更新依赖
cd ios && pod update

# 清除缓存
pod cache clean --all

# 重新安装
cd ios && pod deintegrate && pod install

# 查看已安装的 pods
pod list
```

## 🔐 证书管理

### 1. 证书类型

```
开发证书：
- Apple Development：用于开发和测试
- 可以安装到任意数量的设备
- 有效期 1 年

发布证书：
- Apple Distribution：用于 App Store 发布
- Ad Hoc：用于内部分发
- Enterprise：用于企业分发
- 有效期 1 年
```

### 2. 创建证书

```
使用 Xcode 自动管理：
1. Xcode → Preferences → Accounts
2. 选择 Apple ID → Manage Certificates
3. 点击 + → iOS Development
4. 等待证书创建

手动创建：
1. 钥匙串访问 → 证书助理 → 从证书颁发机构请求证书
2. 保存 .certSigningRequest 文件
3. 访问 https://developer.apple.com
4. Certificates → + → 选择证书类型
5. 上传 .certSigningRequest 文件
6. 下载 .cer 文件
7. 双击安装到钥匙串
```

### 3. Provisioning Profile

```
类型：
- Development：用于开发测试
- Ad Hoc：用于指定设备分发
- App Store：用于 App Store 发布

创建步骤：
1. 访问 https://developer.apple.com
2. Profiles → + → 选择类型
3. 选择 App ID
4. 选择证书
5. 选择设备（Development/Ad Hoc）
6. 下载 .mobileprovision 文件
7. 双击安装到 Xcode
```

## 🛠️ 常见问题

### 1. 签名错误

```
问题：Signing requires a development team
解决：
1. Xcode → Preferences → Accounts
2. 添加 Apple ID
3. 选择 Team
4. Runner → Signing & Capabilities
5. 选择 Team

问题：No provisioning profile found
解决：
1. 勾选 "Automatically manage signing"
2. 或者手动创建并安装 Provisioning Profile
```

### 2. CocoaPods 问题

```
问题：pod install 失败
解决：
1. 更新 CocoaPods
   sudo gem install cocoapods
2. 清除缓存
   pod cache clean --all
3. 重新安装
   pod deintegrate
   pod install

问题：依赖版本冲突
解决：
1. 手动指定版本
2. 使用 pod update
3. 检查 Podfile.lock
```

### 3. 构建问题

```
问题：Command PhaseScriptExecution failed
解决：
1. cd ios
2. pod deintegrate
3. pod install
4. flutter clean
5. flutter build ios

问题：No such module 'Flutter'
解决：
1. 打开 ios/Runner.xcworkspace（不是 .xcodeproj）
2. 运行 pod install
3. 重新构建
```

## 🚀 构建命令

```bash
# 构建 Debug 版本
flutter build ios --debug

# 构建 Release 版本
flutter build ios --release

# 构建 IPA
flutter build ipa

# 运行在模拟器
flutter run -d iPhone

# 运行在真机
flutter run -d "设备名称"
```

---

> iOS 配置涉及证书、签名和权限，正确配置是发布应用的前提。