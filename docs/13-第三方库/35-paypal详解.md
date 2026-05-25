# PayPal 支付详解

> Flutter 接入 PayPal 收款的常见模式：服务端创建订单 + WebView/浏览器完成授权（wiki：`[[paypal]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **集成方式** | 无官方一等 Flutter SDK；主流为 **REST API + 托管结账页** |
| **典型插件** | [flutter_paypal_payment](https://pub.dev/packages/flutter_paypal_payment)、自建 WebView + [PayPal Checkout](https://developer.paypal.com/docs/checkout/) |
| **对比** | 国际卡原生体验优先 [[32-stripe详解]]；国内 [[33-alipay详解]]、[[34-wechat_pay详解]] |
| **站内** | [[11-支付系统设计]]、[[21-电商应用实战]] |

PayPal **Client Secret** 仅放服务端；App 只拿 `approval_url` 或 SDK 用的 client-side token。

## 整体流程（Checkout Orders API v2）

```
App 创建业务订单 → POST /payments/paypal { orderId }
     ↓
后端 PayPal「创建订单」→ 返回 approve 链接或 token
     ↓
App WebView / 外部浏览器打开 PayPal 登录并确认
     ↓
return_url / deep link 回 App
     ↓
后端 capture 订单 + webhook 确认 → 业务订单置已支付
```

## 后端职责（示意）

```text
POST /v2/checkout/orders
  → id, links[rel=approve].href

用户批准后：

POST /v2/checkout/orders/{id}/capture
  → status COMPLETED
```

Webhook 监听 `CHECKOUT.ORDER.APPROVED`、`PAYMENT.CAPTURE.COMPLETED` 做幂等入账。

## 客户端示例（WebView 思路）

```dart
import 'package:webview_flutter/webview_flutter.dart';

class PayPalCheckoutPage extends StatefulWidget {
  const PayPalCheckoutPage({required this.approveUrl, required this.onReturn});
  final String approveUrl;
  final void Function(String orderId) onReturn;

  @override
  State<PayPalCheckoutPage> createState() => _PayPalCheckoutPageState();
}

class _PayPalCheckoutPageState extends State<PayPalCheckoutPage> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setNavigationDelegate(
        NavigationDelegate(
          onNavigationRequest: (req) {
            // 匹配你在 PayPal 配置的 return_url，例如 myapp://paypal/return?token=...
            if (req.url.startsWith('myapp://paypal/return')) {
              final uri = Uri.parse(req.url);
              widget.onReturn(uri.queryParameters['token'] ?? '');
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.approveUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('PayPal')),
      body: WebViewWidget(controller: _controller),
    );
  }
}

Future<void> payWithPayPal(String businessOrderId) async {
  final checkout = await api.createPayPalCheckout(businessOrderId);
  // 打开 PayPalCheckoutPage(checkout.approveUrl, ...)
  // 回调后：await api.capturePayPal(checkout.paypalOrderId);
  // 轮询 GET /orders/{id} 确认最终状态
}
```

也可使用 [[14-url_launcher详解]] 调系统浏览器 + Universal Link / App Link 回跳。

## 与 Stripe 的选型

| 场景 | 建议 |
| --- | --- |
| 信用卡为主、订阅 | [[32-stripe详解]] |
| 用户已有 PayPal 余额/账号 | PayPal Checkout |
| 北美电商两者并存 | 后端抽象 `PaymentGateway`，UI 让用户选渠道 |

## 最佳实践

1. **权威状态在后端**：capture 成功 + webhook 双保险，不依赖 WebView URL  alone。
2. **Deep Link**：iOS Universal Link / Android App Link 配置 return URL。
3. **沙箱**：PayPal Sandbox 账号端到端测 approve + capture。
4. **货币与地区**：创建订单时指定 `purchase_units[].amount.currency_code`。
5. **幂等**：业务 `orderId` 与 PayPal `custom_id` 关联，防重复 capture。

## 相关链接

- [[32-stripe详解]]
- [[33-alipay详解]]
- [[11-支付系统设计]]
- [[21-电商应用实战]]
- [[00-第三方库索引]]
