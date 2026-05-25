# url_launcher 详解

> 在 Flutter 中打开外链、电话、邮件、地图与系统浏览器（wiki：`[[url_launcher]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [url_launcher](https://pub.dev/packages/url_launcher) |
| **能力** | `http(s)`、`tel:`、`mailto:`、`sms:`、应用商店等 |
| **配合** | [[35-paypal详解]] 外链结账、隐私政策页、客服电话 |
| **站内** | [[06-工具库详解]] |

无法在 App 内完成的 OAuth/支付 H5，常用 `LaunchMode.externalApplication` 交系统浏览器。

## 安装

```yaml
dependencies:
  url_launcher: ^6.3.0
```

iOS 需在 `Info.plist` 配置 `LSApplicationQueriesSchemes`（如 `https`、`tel`），否则 `canLaunchUrl` 可能 false。

## 基本用法

```dart
import 'package:url_launcher/url_launcher.dart';

Future<void> openWeb(String url) async {
  final uri = Uri.parse(url);
  if (!await canLaunchUrl(uri)) {
    throw StateError('无法打开: $url');
  }
  await launchUrl(uri, mode: LaunchMode.externalApplication);
}

Future<void> callPhone(String number) async {
  final uri = Uri(scheme: 'tel', path: number);
  await launchUrl(uri);
}

Future<void> sendEmail(String to, {String? subject}) async {
  final uri = Uri(
    scheme: 'mailto',
    path: to,
    queryParameters: subject != null ? {'subject': subject} : null,
  );
  await launchUrl(uri);
}
```

## LaunchMode 选型

| 模式 | 行为 |
| --- | --- |
| `platformDefault` | 平台默认 |
| `inAppWebView` | 应用内 WebView（简单 H5） |
| `inAppBrowserView` | 应用内浏览器（SFSafariView / Custom Tabs） |
| `externalApplication` | 系统浏览器或对应 App |

PayPal / 复杂 OAuth 建议 **externalApplication** + Deep Link 回 App，见 [[35-paypal详解]]。

## 封装

```dart
class ExternalLinks {
  static Future<bool> tryOpen(Uri uri, {LaunchMode mode = LaunchMode.platformDefault}) async {
    if (await canLaunchUrl(uri)) {
      return launchUrl(uri, mode: mode);
    }
    return false;
  }

  static Future<void> openPrivacyPolicy(String url) =>
      tryOpen(Uri.parse(url), mode: LaunchMode.inAppBrowserView);
}
```

## 最佳实践

1. **先 canLaunchUrl**：再 `launchUrl`，失败时 Toast 提示。
2. **encode**：query 参数用 `Uri` 构造，避免手写拼接。
3. **Android 11+**：`<queries>` 声明要检测的 scheme/intent。
4. **安全**：勿对用户输入直接 `launchUrl`；校验 scheme 白名单（仅 `https` 等）。
5. **与 WebView 包**：复杂 JS 桥接用 `webview_flutter`，url_launcher 适合轻量跳转。

## 相关链接

- [[35-paypal详解]]
- [[06-工具库详解]]
- [[00-第三方库索引]]
