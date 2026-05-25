# bezier_chart 详解

> 贝塞尔曲线风格折线面积图（wiki：`[[bezier_chart]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [bezier_chart](https://pub.dev/packages/bezier_chart) |
| **特点** | 平滑曲线 + 渐变填充，视觉偏消费类 App |
| **状态** | 维护频率一般，新项目优先 [[18-fl_chart详解]] |
| **适用** | 健康、运动、简单趋势展示 |

## 安装

```yaml
dependencies:
  bezier_chart: ^1.0.0
```

集成前在 pub.dev 确认与当前 Flutter SDK 兼容。

## 基本用法

```dart
import 'package:bezier_chart/bezier_chart.dart';

BezierChart(
  BezierLine(
    BezierChartConfig(
      startY: 0,
      endY: 100,
      formatYLabel: (v) => '${v.toInt()}',
    ),
    series: [
      BezierLineData(
        lineColor: Colors.blue,
        data: [
          BezierChartDataPoint(timeStamp: 1, value: 20),
          BezierChartDataPoint(timeStamp: 2, value: 45),
          BezierChartDataPoint(timeStamp: 3, value: 30),
        ],
      ),
    ],
  ),
);
```

外层需固定高度 `SizedBox(height: 240)`。

## 选型

| 库 | 说明 |
| --- | --- |
| **bezier_chart** | 快速曲线面积风格 |
| fl_chart | 通用、维护活跃 |
| syncfusion | 企业级 |

## 相关链接

- [[18-fl_chart详解]]
- [[51-syncfusion_flutter_charts详解]]
- [[00-第三方库索引]]
