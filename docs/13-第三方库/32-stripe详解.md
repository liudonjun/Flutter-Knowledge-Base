# Stripe 详解

> 在 Flutter 中集成 Stripe 支付（`flutter_stripe`），配合服务端 PaymentIntent 完成收款。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `flutter_stripe`（索引/wiki：`stripe`） |
| **模式** | 客户端 SDK + **服务端**创建 PaymentIntent（密钥不可放客户端） |
| **适用** | 国际信用卡、Apple Pay / Google Pay（视地区） |
| **站内** | [[11-支付系统设计]]、[[08-retrofit详解]] |

国内微信/支付宝见 [[34-wechat_pay详解]]、[[33-alipay详解]]。

## 安装

```yaml
dependencies:
  flutter_stripe: ^11.0.0
```

Android/iOS 需按 [官方文档](https://docs.page/flutter-stripe/flutter_stripe) 配置 ProGuard、URL Scheme 等。

## 流程概览

```
App 请求后端 → 创建 PaymentIntent（含 client_secret）
     ↓
flutter_stripe 调起支付 sheet
     ↓
用户确认 → Stripe 回调 → 后端 webhook 确认订单
```

## 客户端示例

```dart
import 'package:flutter_stripe/flutter_stripe.dart';

Future<void> initStripe() async {
  Stripe.publishableKey = 'pk_test_xxx';
  await Stripe.instance.applySettings();
}

Future<void> pay(String clientSecret) async {
  await Stripe.instance.initPaymentSheet(
    paymentSheetParameters: SetupPaymentSheetParameters(
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'My Shop',
    ),
  );
  await Stripe.instance.presentPaymentSheet();
}
```

`clientSecret` 必须由你的后端调用 Stripe API 生成，App 只传订单 id 换 secret。

## 最佳实践

1. **幂等**：订单号唯一，webhook 重复投递要防重复入账。
2. **状态机**：待支付 → 支付中 → 成功/失败/取消，UI 与后端一致。
3. **测试卡**：Stripe 测试模式 + 后端 test key，勿用生产 key 调试。
4. **错误**：捕获 `StripeException`，区分用户取消与网络错误。

## 相关链接

- [[11-支付系统设计]]
- [[00-第三方库索引]]
- [flutter_stripe · pub.dev](https://pub.dev/packages/flutter_stripe)
