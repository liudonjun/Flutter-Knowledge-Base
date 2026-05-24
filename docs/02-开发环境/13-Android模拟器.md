# Android 模拟器配置

> 配置和使用 Android 模拟器进行 Flutter 开发。

## 📱 创建模拟器

### 1. 使用 Android Studio

```
创建步骤：
1. Tools → Device Manager
2. Create Device
3. 选择硬件配置：
   - Phone: Pixel 6, Pixel 7 等
   - Tablet: Nexus 10 等
   - 自定义: New Hardware Profile

4. 选择系统镜像：
   - 建议选择 x86_64 镜像
   - 选择 API 级别（建议最新稳定版）
   - 下载镜像（如果未安装）

5. 配置 AVD：
   - 启动方向：Portrait
   - 内存：2048 MB 或更高
   - 存储：6 GB 或更高
   - 启用硬件加速

6. Finish 完成创建
```

### 2. 使用命令行

```bash
# 列出可用的系统镜像
sdkmanager --list | grep system-images

# 安装系统镜像
sdkmanager "system-images;android-33;google_apis;x86_64"

# 创建 AVD
avdmanager create avd \
  -n Pixel_6_API_33 \
  -k "system-images;android-33;google_apis;x86_64" \
  -d "pixel_6"

# 列出已创建的 AVD
avdmanager list avd

# 启动模拟器
emulator -avd Pixel_6_API_33
```

## ⚙️ 性能优化

### 1. 硬件加速

```
Windows：
1. 启用 Hyper-V 或 HAXM
   - 控制面板 → 程序 → 启用 Windows 功能
   - 勾选 Hyper-V

2. 安装 HAXM
   - SDK Manager → SDK Tools
   - 勾选 Intel x86 Emulator Accelerator

macOS：
1. 启用 Hypervisor Framework
   - 默认已启用

2. 安装 HAXM（Intel Mac）
   - SDK Manager → SDK Tools
   - 勾选 Intel x86 Emulator Accelerator

Linux：
1. 启用 KVM
   sudo apt install qemu-kvm
   sudo adduser $USER kvm
   # 重新登录

2. 验证 KVM
   kvm-ok
```

### 2. 模拟器配置

```
优化配置：
1. Graphics: Hardware - GLES 2.0
2. Boot: Cold boot 或 Quick boot
3. Memory: 2048 MB - 4096 MB
4. VM Heap: 512 MB
5. Internal Storage: 6 GB - 8 GB
6. SD Card: 512 MB（可选）

高级配置：
1. Multi-Core CPU: 4 核
2. Enable Device Frame: 禁用（提高性能）
3. Enable Clipboard Sharing: 启用
4. Enable Snapshots: 启用（快速启动）
```

## 🔧 常用操作

### 1. 模拟器控制

```
常用快捷键：
- Ctrl+P：电源按钮
- Ctrl+H：Home 按钮
- Ctrl+B：返回按钮
- Ctrl+M：菜单按钮
- Ctrl+L：最近应用
- Ctrl+S：截图
- Ctrl+F11：旋转屏幕
- Ctrl+Up/Down：调节音量

手势模拟：
- 点击：鼠标点击
- 长按：鼠标长按
- 滑动：鼠标拖动
- 双击：鼠标双击
- 缩放：Ctrl + 鼠标滚轮
```

### 2. 网络配置

```
网络模拟：
1. 速度限制：
   - GSM: 14.4 kbps
   - HSCSD: 43.2 kbps
   - GPRS: 48 kbps
   - EDGE: 236.8 kbps
   - UMTS: 384 kbps
   - HSDPA: 7.2 Mbps
   - LTE: 25 Mbps

2. 延迟设置：
   - None: 无延迟
   - GPRS: 150 ms
   - EDGE: 80 ms
   - UMTS: 35 ms

3. 代理配置：
   - Settings → Network → Proxy
   - 设置代理服务器和端口
```

### 3. 位置模拟

```
GPS 模拟：
1. 打开 Extended Controls（三个点）
2. 选择 Location
3. 设置经纬度
4. 可以导入 GPX/KML 文件
5. 模拟移动轨迹

常用位置：
- 北京: 39.9042, 116.4074
- 上海: 31.2304, 121.4737
- 深圳: 22.5431, 114.0579
- 旧金山: 37.7749, -122.4194
- 纽约: 40.7128, -74.0060
```

## 🐛 调试技巧

### 1. 日志查看

```bash
# 查看模拟器日志
adb logcat

# 过滤 Flutter 日志
adb logcat | grep flutter

# 查看特定应用日志
adb logcat --pid=$(adb shell pidof com.example.app)

# 清除日志
adb logcat -c

# 保存日志到文件
adb logcat > emulator.log
```

### 2. 文件操作

```bash
# 推送文件到模拟器
adb push local_file.txt /sdcard/

# 从模拟器拉取文件
adb pull /sdcard/file.txt ./

# 安装 APK
adb install app.apk

# 卸载应用
adb uninstall com.example.app

# 查看已安装应用
adb shell pm list packages | grep flutter
```

### 3. 屏幕录制

```bash
# 开始录制
adb shell screenrecord /sdcard/recording.mp4

# 停止录制（Ctrl+C）

# 拉取录制文件
adb pull /sdcard/recording.mp4 ./

# 使用模拟器内置录制
# Extended Controls → Record Screen
```

## 🚀 Flutter 集成

### 1. 运行 Flutter 应用

```bash
# 列出可用设备
flutter devices

# 运行在模拟器
flutter run

# 指定模拟器运行
flutter run -d emulator-5554

# 热重载
r

# 热重启
R

# 退出
q
```

### 2. 调试 Flutter 应用

```bash
# 以调试模式运行
flutter run --debug

# 以性能模式运行
flutter run --profile

# 以发布模式运行
flutter run --release

# 打开 DevTools
flutter run --debug
# 然后在浏览器中打开显示的 URL
```

## 📝 常见问题

### 1. 模拟器启动慢

```
解决方案：
1. 启用 Quick Boot
2. 增加内存分配
3. 使用 SSD
4. 启用硬件加速
5. 减少 AVD 存储大小
```

### 2. 模拟器卡顿

```
解决方案：
1. 增加 CPU 核心数
2. 增加内存
3. 降低分辨率
4. 关闭不必要的动画
5. 使用 x86_64 镜像
```

### 3. 网络连接问题

```
解决方案：
1. 检查主机网络
2. 重启模拟器
3. 清除模拟器数据
4. 检查防火墙设置
5. 配置 DNS
```

---

> Android 模拟器是 Flutter 开发的重要工具，合理配置可以提高开发效率。