# iOS 模拟器与真机调试

> 在 macOS 上配置和使用 iOS 模拟器，以及真机调试 Flutter 应用。

## 📱 iOS 模拟器

### 1. 安装 Xcode

```bash
# 从 App Store 安装 Xcode
# 安装完成后运行以下命令

# 安装 Xcode 命令行工具
sudo xcode-select --install

# 同意 Xcode 许可证
sudo xcodebuild -license

# 验证安装
xcode-select -p
# 应该输出: /Applications/Xcode.app/Contents/Developer
```

### 2. 打开 iOS 模拟器

```bash
# 方法1：使用命令行
open -a Simulator

# 方法2：从 Xcode 打开
# Xcode → Open Developer Tool → Simulator

# 方法3：从 Spotlight
# 搜索 "Simulator"
```

### 3. 管理模拟器

```bash
# 列出可用模拟器
xcrun simctl list devices

# 列出可用设备类型
xcrun simctl list devicetypes

# 列出可用运行时
xcrun simctl list runtimes

# 创建新模拟器
xcrun simctl create "iPhone 15" "iPhone 15" "iOS17.0"

# 删除模拟器
xcrun simctl delete "设备ID"

# 启动模拟器
xcrun simctl boot "设备ID"

# 关闭模拟器
xcrun simctl shutdown "设备ID"
```

### 4. 模拟器操作

```
常用快捷键：
- Cmd+H：Home 按钮
- Cmd+Shift+H：Home 按钮（慢速）
- Cmd+1：50% 缩放
- Cmd+2：100% 缩放
- Cmd+3：200% 缩放
- Cmd+Z：摇晃设备
- Cmd+T：切换通话状态
- Cmd+S：截图
- Cmd+K：切换键盘

手势操作：
- 点击：鼠标点击
- 长按：鼠标长按
- 滑动：鼠标拖动
- 双指缩放：Option + 鼠标拖动
- 旋转：Option + Shift + 鼠标拖动
```

## 📲 真机调试

### 1. 准备工作

```
需要：
1. Mac 电脑
2. iPhone/iPad
3. USB 数据线
4. Apple ID（免费即可）
5. Xcode 已安装
```

### 2. 配置 Xcode

```bash
# 打开 Xcode
open -a Xcode

# 添加 Apple ID
# Xcode → Preferences → Accounts
# 点击 + → Apple ID → 登录

# 配置开发团队
# 选择你的 Apple ID → Team → 点击 Manage Certificates
# 点击 + → iOS Development
```

### 3. 配置 iPhone

```
配置步骤：
1. 连接 iPhone 到 Mac
2. 在 iPhone 上弹出 "信任此电脑" 对话框 → 信任
3. 打开 iPhone 设置 → 通用 → VPN 与设备管理
4. 开发者 App → 信任你的 Apple ID

首次真机调试：
1. Xcode → Window → Devices and Simulators
2. 选择你的 iPhone
3. 点击 "Use for Development"
4. 等待 Xcode 配置设备
```

### 4. 运行 Flutter 应用

```bash
# 列出可用设备
flutter devices
# 应该看到你的 iPhone

# 运行在真机
flutter run

# 指定设备运行
flutter run -d "你的设备ID"

# 查看设备日志
flutter logs
```

## 🔧 iOS 配置

### 1. Bundle ID 配置

```bash
# 打开 iOS 项目
open ios/Runner.xcworkspace

# 在 Xcode 中配置
# 1. 选择 Runner 项目
# 2. 选择 Runner Target
# 3. General 标签
# 4. Bundle Identifier: com.example.appname
# 5. Team: 选择你的开发团队
```

### 2. 签名配置

```
自动签名：
1. Xcode → Runner → Signing & Capabilities
2. 勾选 "Automatically manage signing"
3. Team: 选择你的开发团队
4. Bundle Identifier: 唯一标识符

手动签名：
1. 取消勾选 "Automatically manage signing"
2. Provisioning Profile: 选择配置文件
3. Signing Certificate: 选择证书
```

### 3. 权限配置

```
配置权限（Info.plist）：
1. 打开 ios/Runner/Info.plist
2. 添加权限描述：

相机权限：
<key>NSCameraUsageDescription</key>
<string>需要访问相机</string>

相册权限：
<key>NSPhotoLibraryUsageDescription</key>
<string>需要访问相册</string>

位置权限：
<key>NSLocationWhenInUseUsageDescription</key>
<string>需要访问位置</string>

麦克风权限：
<key>NSMicrophoneUsageDescription</key>
<string>需要访问麦克风</string>
```

## 🐛 调试技巧

### 1. Xcode 调试

```bash
# 打开 Xcode 调试器
open ios/Runner.xcworkspace

# 运行调试
# Product → Run (Cmd+R)

# 断点调试
# 点击行号左侧设置断点

# 查看日志
# View → Debug Area → Activate Console
```

### 2. Flutter 调试

```bash
# 调试模式运行
flutter run --debug

# 打开 DevTools
flutter run --debug
# 在浏览器中打开显示的 URL

# 查看 Widget 树
# DevTools → Flutter Inspector

# 性能分析
# DevTools → Performance
```

### 3. 日志查看

```bash
# 查看设备日志
flutter logs

# 查看 Xcode 日志
# Xcode → Window → Devices and Simulators
# 选择设备 → Open Console

# 过滤日志
flutter logs | grep "关键词"

# 保存日志
flutter logs > ios_logs.txt
```

## 📦 iOS 构建

### 1. 构建配置

```bash
# 构建 Debug 版本
flutter build ios --debug

# 构建 Release 版本
flutter build ios --release

# 构建 Archive（用于发布）
flutter build ipa
```

### 2. 导出 IPA

```
使用 Xcode 导出：
1. Product → Archive
2. 等待归档完成
3. Window → Organizer
4. 选择归档 → Distribute App
5. 选择分发方式：
   - App Store Connect：上架 App Store
   - Ad Hoc：内部分发
   - Enterprise：企业分发
   - Development：开发测试
```

## 📝 常见问题

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
2. 或者手动创建 Provisioning Profile
```

### 2. 设备未识别

```
问题：iPhone 未出现在设备列表
解决：
1. 检查 USB 连接
2. 信任此电脑
3. 重启 Xcode
4. 重启 iPhone
5. 更新 Xcode

问题：Could not locate device support files
解决：
1. 更新 Xcode
2. 下载对应的 iOS 支持文件
```

### 3. 构建失败

```
问题：Command PhaseScriptExecution failed
解决：
1. 清除构建缓存
   cd ios && pod deintegrate && pod install
2. 清除 Flutter 缓存
   flutter clean
3. 重新构建

问题：No such module 'Flutter'
解决：
1. 打开 ios/Runner.xcworkspace（不是 .xcodeproj）
2. 运行 pod install
3. 重新构建
```

## 🚀 Flutter 集成

### 1. 运行应用

```bash
# 列出设备
flutter devices

# 运行在模拟器
flutter run -d iPhone

# 运行在真机
flutter run -d "iPhone 名称"

# 热重载
r

# 热重启
R

# 退出
q
```

### 2. 调试应用

```bash
# 调试模式
flutter run --debug

# 性能模式
flutter run --profile

# 发布模式
flutter run --release

# 打开 DevTools
flutter run --debug
# 浏览器中打开 URL
```

---

> iOS 模拟器和真机调试是 Flutter iOS 开发的重要工具。