# Container Widget 详解

> 深入理解 Flutter 中最常用的容器 Widget - Container。

## 📖 Container 基础

### 1. 基本用法

```dart
// Container 基本用法
class ContainerBasics {
  void explain() {
    print('''
    Container 基本用法：
    
    // 最简单的 Container
    Container()
    
    // 带子组件的 Container
    Container(
      child: Text('Hello'),
    )
    
    // 设置尺寸
    Container(
      width: 200,
      height: 100,
      child: Text('固定尺寸'),
    )
    
    // 设置颜色
    Container(
      color: Colors.blue,
      child: Text('蓝色背景'),
    )
    
    // 设置内边距
    Container(
      padding: EdgeInsets.all(16),
      child: Text('有内边距'),
    )
    
    // 设置外边距
    Container(
      margin: EdgeInsets.all(16),
      child: Text('有外边距'),
    )
    ''');
  }
}
```

### 2. 装饰器

```dart
// Container 装饰器
class ContainerDecoration {
  void explain() {
    print('''
    Container 装饰器：
    
    // BoxDecoration
    Container(
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: Colors.black,
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey,
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Text('装饰后的容器'),
    )
    
    // 渐变背景
    Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue, Colors.purple],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
    )
    
    // 圆形图片
    Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: NetworkImage('https://example.com/image.jpg'),
        ),
      ),
    )
    ''');
  }
}
```

### 3. 约束

```dart
// Container 约束
class ContainerConstraints {
  void explain() {
    print('''
    Container 约束：
    
    // BoxConstraints
    Container(
      constraints: BoxConstraints(
        minWidth: 100,
        maxWidth: 200,
        minHeight: 50,
        maxHeight: 100,
      ),
      child: Text('约束容器'),
    )
    
    // 紧约束
    Container(
      constraints: BoxConstraints.tightFor(
        width: 100,
        height: 100,
      ),
    )
    
    // 松约束
    Container(
      constraints: BoxConstraints.loose(
        Size(200, 200),
      ),
    )
    
    // 扩展约束
    Container(
      constraints: BoxConstraints.expand(),
    )
    ''');
  }
}
```

## 📖 Container 变换

### 1. 位置变换

```dart
// Container 变换
class ContainerTransform {
  void explain() {
    print('''
    Container 变换：
    
    // Matrix4 变换
    Container(
      transform: Matrix4.rotationZ(0.1),
      child: Text('旋转'),
    )
    
    // 平移
    Container(
      transform: Matrix4.translationValues(10, 20, 0),
      child: Text('平移'),
    )
    
    // 缩放
    Container(
      transform: Matrix4.diagonal3Values(1.5, 1.5, 1),
      child: Text('缩放'),
    )
    
    // 组合变换
    Container(
      transform: Matrix4.identity()
        ..translate(10.0, 20.0)
        ..rotateZ(0.1)
        ..scale(1.5),
      child: Text('组合变换'),
    )
    
    // 对齐变换原点
    Container(
      transform: Matrix4.rotationZ(0.1),
      transformAlignment: Alignment.center,
      child: Text('居中旋转'),
    )
    ''');
  }
}
```

## 📖 Container 对齐

### 1. 对齐和定位

```dart
// Container 对齐
class ContainerAlignment {
  void explain() {
    print('''
    Container 对齐：
    
    // alignment 属性
    Container(
      width: 200,
      height: 200,
      alignment: Alignment.center,
      child: Text('居中'),
    )
    
    // 预定义对齐
    Container(alignment: Alignment.topLeft)
    Container(alignment: Alignment.topCenter)
    Container(alignment: Alignment.topRight)
    Container(alignment: Alignment.centerLeft)
    Container(alignment: Alignment.center)
    Container(alignment: Alignment.centerRight)
    Container(alignment: Alignment.bottomLeft)
    Container(alignment: Alignment.bottomCenter)
    Container(alignment: Alignment.bottomRight)
    
    // 自定义对齐
    Container(
      alignment: Alignment(0.5, -0.5), // x, y: -1 到 1
    )
    
    // FractionalOffset
    Container(
      alignment: FractionalOffset(0.25, 0.75), // x, y: 0 到 1
    )
    ''');
  }
}
```

---

> Container 是 Flutter 中最灵活的 Widget，掌握它的各种用法能让你构建出丰富的 UI。