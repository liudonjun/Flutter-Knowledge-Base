# ThemeData 详解

> 深入理解 Flutter 中的 ThemeData。

## 📖 ThemeData 基础

### 1. 什么是 ThemeData

```dart
// ThemeData 概念
class ThemeDataConcept {
  void explain() {
    print('''
    ThemeData 概念：
    
    // 1. 什么是 ThemeData
    // - Flutter 的主题数据
    // - 定义应用视觉风格
    // - 支持全局配置
    // - 支持动态切换
    
    // 2. ThemeData 的特点
    // - 全局配置：全局视觉风格
    // - 可定制：支持自定义
    // - 动态切换：支持主题切换
    // - 继承性：支持主题继承
    
    // 3. ThemeData 的属性
    // - primarySwatch：主色调
    // - brightness：亮度
    // - textTheme：文本主题
    // - colorScheme：颜色方案
    
    // 4. ThemeData 的使用场景
    // - 主题配置
    // - 暗黑模式
    // - 品牌定制
    // - 动态主题
    ''');
  }
}
```

### 2. ThemeData 实现

```dart
// ThemeData 实现
class ThemeDataImplementation {
  void explain() {
    print('''
    ThemeData 实现：
    
    // 1. 基本配置
    MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.light,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    )
    
    // 2. 暗黑主题
    MaterialApp(
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.system,
      home: MyHomePage(),
    )
    
    // 3. 自定义主题
    ThemeData(
      primaryColor: Colors.blue,
      accentColor: Colors.orange,
      textTheme: TextTheme(
        headline1: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        bodyText1: TextStyle(fontSize: 16),
      ),
      buttonTheme: ButtonThemeData(
        buttonColor: Colors.blue,
        textTheme: ButtonTextTheme.primary,
      ),
    )
    
    // 4. 动态切换主题
    class ThemeController extends ChangeNotifier {
      ThemeMode _themeMode = ThemeMode.light;
      
      ThemeMode get themeMode => _themeMode;
      
      void toggleTheme() {
        _themeMode = _themeMode == ThemeMode.light
            ? ThemeMode.dark
            : ThemeMode.light;
        notifyListeners();
      }
    }
    ''');
  }
}
```

## 🔗 相关链接

- [[Material Design]]
- [[颜色系统]]
- [[字体系统]]
- [[组件样式]]

---

> ThemeData 是 Flutter 主题系统的核心，掌握它对于定制应用外观非常重要。