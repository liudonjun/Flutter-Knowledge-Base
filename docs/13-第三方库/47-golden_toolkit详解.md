# golden_toolkit 详解

> Widget 黄金图（Golden）测试：像素级 UI 回归（wiki：`[[golden_toolkit]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [golden_toolkit](https://pub.dev/packages/golden_toolkit)（社区维护；Flutter 3.16+ 也可直接用 `matchesGoldenFile`） |
| **适用** | 设计系统组件、多主题、多设备尺寸快照 |
| **配合** | [[08-Widget测试]]、[[07-测试库详解]] |

Golden 测试捕获 Widget 渲染图，与 baseline PNG 对比，防止 UI 非预期变化。

## 安装

```yaml
dev_dependencies:
  golden_toolkit: ^0.15.0
  flutter_test:
    sdk: flutter
```

## 基本 Golden 测试

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:golden_toolkit/golden_toolkit.dart';

void main() {
  GoldenToolkit.runWithConfiguration(
    () => _runTests(),
    config: GoldenToolkitConfiguration(
      enableRealShadows: true,
    ),
  );
}

void _runTests() {
  testGoldens('PrimaryButton light', (tester) async {
    await tester.pumpWidgetBuilder(
      const PrimaryButton(label: 'OK'),
      wrapper: materialAppWrapper(theme: ThemeData.light()),
    );
    await screenMatchesGolden(tester, 'primary_button_light');
  });
}
```

## 多设备 / 多主题

```dart
testGoldens('Card variants', (tester) async {
  final builder = DeviceBuilder()
    ..overrideDevicesFor(allDevices)
    ..addScenario(widget: const ProductCard(), name: 'default')
    ..addScenario(
      widget: const ProductCard(discount: true),
      name: 'discount',
    );

  await tester.pumpDeviceBuilder(builder);
  await screenMatchesGolden(tester, 'product_card_matrix');
});
```

## 最佳实践

1. **CI 更新**：`flutter test --update-goldens`  intentional 更新 baseline。
2. **字体**：加载项目字体或使用 `loadAppFonts()`，避免 CI 与本地字体差异。
3. **动画**：`pumpAndSettle` 或 mock 动画到结束帧。
4. **范围**：测设计系统原子组件，少测整页（易脆）。
5. **跨平台**：Mac/Linux CI 渲染可能略有差异，固定 CI 环境。

## 相关链接

- [[08-Widget测试]]
- [[07-测试库详解]]
- [[08-自动化测试]]
- [[00-第三方库索引]]
