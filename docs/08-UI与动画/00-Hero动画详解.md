# Hero 动画详解

> 深入理解 Flutter 中的 Hero 动画。

## 📖 Hero 动画基础

### 1. 什么是 Hero 动画

```dart
// Hero 动画概念
class HeroAnimationConcept {
  void explain() {
    print('''
    Hero 动画概念：
    
    // 1. 什么是 Hero 动画
    // - 页面切换时的共享元素动画
    // - 元素从一个页面飞到另一个页面
    // - 提供视觉连续性
    // - 增强用户体验
    
    // 2. Hero 动画的特点
    // - 共享元素：两个页面共享同一个元素
    // - 自动动画：自动计算动画路径
    // - 流畅过渡：流畅的视觉效果
    // - 易于使用：只需设置 Hero
    
    // 3. Hero 动画的使用场景
    // - 列表到详情
    // - 图片预览
    // - 页面切换
    // - 交互反馈
    
    // 4. Hero 动画的优势
    // - 视觉连续性
    // - 用户体验好
    // - 实现简单
    // - 性能优化
    ''');
  }
}
```

### 2. Hero 动画实现

```dart
// Hero 动画实现
class HeroAnimationImplementation {
  void explain() {
    print('''
    Hero 动画实现：
    
    // 1. 源页面
    class SourcePage extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DetailPage(),
                  ),
                );
              },
              child: Hero(
                tag: 'hero-tag',
                child: Image.network(
                  'https://example.com/image.jpg',
                  width: 100,
                  height: 100,
                ),
              ),
            ),
          ),
        );
      }
    }
    
    // 2. 目标页面
    class DetailPage extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: Hero(
              tag: 'hero-tag',
              child: Image.network(
                'https://example.com/image.jpg',
                width: 300,
                height: 300,
              ),
            ),
          ),
        );
      }
    }
    
    // 3. 自定义 Hero 动画
    Hero(
      tag: 'hero-tag',
      flightShuttleBuilder: (flightContext, animation, flightDirection, fromHeroContext, toHeroContext) {
        return RotationTransition(
          turns: animation,
          child: Icon(Icons.star),
        );
      },
      child: Icon(Icons.star),
    )
    ''');
  }
}
```

## 🔗 相关链接

- [[动画基础]]
- [[页面转场动画]]
- [[Navigator基础]]
- [[显式动画]]

---

> Hero 动画是页面切换的重要动画效果，掌握它对于创建流畅的页面切换非常重要。