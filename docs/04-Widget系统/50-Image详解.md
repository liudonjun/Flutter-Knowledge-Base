# Image Widget 详解

> 深入理解 Flutter 中的图片显示 Widget - Image。

## 📖 Image 基础

### 1. 图片来源

```dart
// Image 图片来源
class ImageSources {
  void explain() {
    print('''
    Image 图片来源：
    
    // 1. 网络图片
    Image.network(
      'https://example.com/image.jpg',
      width: 200,
      height: 200,
    )
    
    // 2. 本地资源图片
    // 需要在 pubspec.yaml 中配置
    // assets:
    //   - assets/images/
    Image.asset('assets/images/logo.png')
    
    // 3. 文件图片
    Image.file(File('/path/to/image.jpg'))
    
    // 4. 内存图片
    Image.memory(Uint8List.fromList(bytes))
    
    // 5. 图标
    Icon(Icons.star, size: 48, color: Colors.yellow)
    ''');
  }
}
```

### 2. 图片属性

```dart
// Image 属性
class ImageProperties {
  void explain() {
    print('''
    Image 属性：
    
    Image.network(
      'https://example.com/image.jpg',
      // 尺寸
      width: 200,
      height: 200,
      
      // 适应方式
      fit: BoxFit.cover,
      // BoxFit.fill      - 拉伸填满
      // BoxFit.contain   - 保持比例，完整显示
      // BoxFit.cover     - 保持比例，覆盖区域
      // BoxFit.fitWidth  - 保持比例，宽度填满
      // BoxFit.fitHeight - 保持比例，高度填满
      // BoxFit.none      - 原始大小
      // BoxFit.scaleDown - 缩小到合适
      
      // 对齐
      alignment: Alignment.center,
      
      // 颜色混合
      color: Colors.blue,
      colorBlendMode: BlendMode.overlay,
      
      // 重复
      repeat: ImageRepeat.noRepeat,
      // ImageRepeat.repeat
      // ImageRepeat.repeatX
      // ImageRepeat.repeatY
      
      // 语义
      semanticLabel: '图片描述',
      excludeFromSemantics: false,
    )
    ''');
  }
}
```

### 3. 图片加载状态

```dart
// 图片加载状态
class ImageLoading {
  void explain() {
    print('''
    图片加载状态：
    
    Image.network(
      'https://example.com/image.jpg',
      // 加载中
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return Center(
          child: CircularProgressIndicator(
            value: loadingProgress.expectedTotalBytes != null
                ? loadingProgress.cumulativeBytesLoaded / 
                  loadingProgress.expectedTotalBytes!
                : null,
          ),
        );
      },
      
      // 加载错误
      errorBuilder: (context, error, stackTrace) {
        return Container(
          color: Colors.grey[200],
          child: Icon(Icons.error, color: Colors.red),
        );
      },
      
      // 缓存尺寸
      cacheWidth: 200,
      cacheHeight: 200,
    )
    ''');
  }
}
```

## 📖 高级用法

### 1. 圆形图片

```dart
// 圆形图片
class CircleImage {
  void explain() {
    print('''
    圆形图片：
    
    // 方式1：ClipOval
    ClipOval(
      child: Image.network(
        'https://example.com/avatar.jpg',
        width: 100,
        height: 100,
        fit: BoxFit.cover,
      ),
    )
    
    // 方式2：CircleAvatar
    CircleAvatar(
      radius: 50,
      backgroundImage: NetworkImage('https://example.com/avatar.jpg'),
      // 或者
      child: Text('头像'),
      backgroundColor: Colors.blue,
    )
    
    // 方式3：Container + BoxDecoration
    Container(
      width: 100,
      height: 100,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: NetworkImage('https://example.com/avatar.jpg'),
          fit: BoxFit.cover,
        ),
      ),
    )
    ''');
  }
}
```

### 2. 图片缓存

```dart
// 图片缓存（使用 cached_network_image）
class ImageCaching {
  void explain() {
    print('''
    图片缓存：
    
    // 依赖
    // cached_network_image: ^3.2.0
    
    import 'package:cached_network_image/cached_network_image.dart';
    
    CachedNetworkImage(
      imageUrl: 'https://example.com/image.jpg',
      width: 200,
      height: 200,
      fit: BoxFit.cover,
      
      // 加载中
      placeholder: (context, url) => CircularProgressIndicator(),
      
      // 加载错误
      errorWidget: (context, url, error) => Icon(Icons.error),
      
      // 缓存配置
      memCacheWidth: 200,
      memCacheHeight: 200,
      
      // 淡入动画
      fadeInDuration: Duration(milliseconds: 300),
    )
    
    // 预加载图片
    precacheImage(
      NetworkImage('https://example.com/image.jpg'),
      context,
    )
    ''');
  }
}
```

---

> Image Widget 是显示图片的基础，掌握各种用法和优化技巧能让你的应用界面更加美观。