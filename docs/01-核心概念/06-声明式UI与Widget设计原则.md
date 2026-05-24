# 声明式 UI 与 Widget 设计原则

> 深入理解 Flutter 的声明式 UI 范式和 Widget 设计原则，掌握现代 UI 开发的核心理念。

## 📖 声明式 UI

### 1. 声明式 vs 命令式

```dart
// 声明式 vs 命令式
class DeclarativeVsImperative {
  /*
  声明式 UI vs 命令式 UI：
  
  1. 命令式 UI
     - 描述如何做
     - 手动操作 DOM/View
     - 状态分散
     - 难以追踪变化
  
  2. 声明式 UI
     - 描述做什么
     - UI = f(state)
     - 状态集中
     - 变化可预测
  
  3. Flutter 的声明式
     - Widget 树描述 UI
     - 状态驱动 UI 更新
     - 不可变 Widget
     - 框架管理渲染
  */
  
  void explain() {
    print('''
    声明式 UI vs 命令式 UI：
    
    1. 命令式 UI (传统方式)
       // Android/Java 示例
       TextView textView = findViewById(R.id.text);
       textView.setText("Hello");
       textView.setTextColor(Color.RED);
       textView.setVisibility(View.VISIBLE);
       
       // 需要手动管理 UI 状态
       // 状态分散在各处
       // 难以追踪变化
    
    2. 声明式 UI (Flutter)
       class MyWidget extends StatelessWidget {
         final String text;
         final Color color;
         final bool isVisible;
         
         @override
         Widget build(BuildContext context) {
           if (!isVisible) return SizedBox.shrink();
           
           return Text(
             text,
             style: TextStyle(color: color),
           );
         }
       }
       
       // UI 是状态的函数
       // 状态集中管理
       // 变化可预测
    
    3. 核心公式：UI = f(state)
       - f: build() 函数
       - state: Widget 的属性和状态
       - UI: 返回的 Widget 树
       
       class Counter extends StatefulWidget {
         @override
         _CounterState createState() => _CounterState();
       }
       
       class _CounterState extends State<Counter> {
         int _count = 0; // 状态
         
         @override
         Widget build(BuildContext context) {
           // UI = f(state)
           return Column(
             children: [
               Text('Count: $_count'),
               ElevatedButton(
                 onPressed: () => setState(() => _count++),
                 child: Text('Increment'),
               ),
             ],
           );
         }
       }
    ''');
  }
}
```

### 2. Widget 的不可变性

```dart
// Widget 的不可变性
class WidgetImmutability {
  /*
  Widget 的不可变性：
  
  1. 不可变 Widget
     - Widget 是不可变的
     - 配置信息，不是实际 UI
     - 轻量级，可以频繁创建
     - 由框架决定是否重建
  
  2. State 的可变性
     - State 是可变的
     - 管理 Widget 的状态
     - 决定 Widget 如何重建
     - 生命周期管理
  
  3. 重建机制
     - 框架比较 Widget
     - 决定是否需要重建
     - 最小化重建范围
     - 性能优化
  */
  
  void explain() {
    print('''
    Widget 的不可变性：
    
    1. 不可变 Widget
       class MyWidget extends StatelessWidget {
         final String title;
         final int count;
         
         // 构造函数不可变
         const MyWidget({
           Key? key,
           required this.title,
           required this.count,
         }) : super(key: key);
         
         @override
         Widget build(BuildContext context) {
           return Text('$title: $count');
         }
       }
       
       // Widget 是配置，不是实际 UI
       // 可以频繁创建，成本低
       // 框架决定是否重建
    
    2. State 的可变性
       class Counter extends StatefulWidget {
         @override
         _CounterState createState() => _CounterState();
       }
       
       class _CounterState extends State<Counter> {
         int _count = 0; // 可变状态
         
         void _increment() {
           setState(() {
             _count++; // 修改状态
           });
         }
         
         @override
         Widget build(BuildContext context) {
           return ElevatedButton(
             onPressed: _increment,
             child: Text('Count: $_count'),
           );
         }
       }
    
    3. 重建机制
       // 框架比较新旧 Widget
       // 如果 Widget 类型和 key 相同
       // 则更新 State，而不是重建
       
       class MyWidget extends StatefulWidget {
         final String title;
         
         const MyWidget({Key? key, required this.title}) : super(key: key);
         
         @override
         _MyWidgetState createState() => _MyWidgetState();
       }
       
       class _MyWidgetState extends State<MyWidget> {
         @override
         void didUpdateWidget(covariant MyWidget oldWidget) {
           super.didUpdateWidget(oldWidget);
           
           // Widget 配置改变时调用
           if (oldWidget.title != widget.title) {
             // 处理配置变化
           }
         }
         
         @override
         Widget build(BuildContext context) {
           return Text(widget.title);
         }
       }
    ''');
  }
}
```

### 3. 组合优于继承

```dart
// 组合优于继承
class CompositionOverInheritance {
  /*
  组合优于继承：
  
  1. 继承的问题
     - 紧耦合
     - 难以复用
     - 脆弱基类
     - 灵活性差
  
  2. 组合的优势
     - 松耦合
     - 易于复用
     - 灵活性高
     - 易于测试
  
  3. Widget 组合
     - 通过组合构建复杂 UI
     - 使用 child 参数
     - 使用 builder 模式
  */
  
  void explain() {
    print('''
    组合优于继承：
    
    1. 继承的问题
       // 不推荐：使用继承
       class BaseButton extends StatelessWidget {
         final VoidCallback onPressed;
         
         @override
         Widget build(BuildContext context) {
           return ElevatedButton(
             onPressed: onPressed,
             child: Text('Base'),
           );
         }
       }
       
       class PrimaryButton extends BaseButton {
         // 继承导致紧耦合
         // 难以复用
       }
    
    2. 组合的优势
       // 推荐：使用组合
       class CustomButton extends StatelessWidget {
         final Widget child;
         final VoidCallback onPressed;
         final Color? color;
         
         const CustomButton({
           Key? key,
           required this.child,
           required this.onPressed,
           this.color,
         }) : super(key: key);
         
         @override
         Widget build(BuildContext context) {
           return ElevatedButton(
             onPressed: onPressed,
             style: ElevatedButton.styleFrom(
               backgroundColor: color,
             ),
             child: child,
           );
         }
       }
       
       // 使用组合
       CustomButton(
         onPressed: () {},
         child: Text('Click Me'),
       )
    
    3. Widget 组合模式
       // child 模式
       class Card extends StatelessWidget {
         final Widget child;
         
         @override
         Widget build(BuildContext context) {
           return Container(
             decoration: BoxDecoration(
               border: Border.all(),
               borderRadius: BorderRadius.circular(8),
             ),
             child: child,
           );
         }
       }
       
       // builder 模式
       class FutureBuilder<T> extends StatelessWidget {
         final Future<T> future;
         final Widget Function(BuildContext, AsyncSnapshot<T>) builder;
         
         @override
         Widget build(BuildContext context) {
           return StreamBuilder<T>(
             stream: future.asStream(),
             builder: builder,
           );
         }
       }
       
       // children 模式
       class Column extends StatelessWidget {
         final List<Widget> children;
         
         @override
         Widget build(BuildContext context) {
           return Flex(
             direction: Axis.vertical,
             children: children,
           );
         }
       }
    ''');
  }
}
```

## 📖 Widget 设计原则

### 1. 单一职责

```dart
// 单一职责原则
class SingleResponsibility {
  /*
  单一职责原则：
  
  1. 每个 Widget 只做一件事
     - 职责清晰
     - 易于理解
     - 易于维护
     - 易于复用
  
  2. 拆分复杂 Widget
     - 识别职责
     - 提取子 Widget
     - 组合使用
  
  3. 最佳实践
     - 保持 Widget 小
     - 清晰的命名
     - 合理的粒度
  */
  
  void explain() {
    print('''
    单一职责原则：
    
    1. 每个 Widget 只做一件事
       // 不推荐：职责混合
       class UserProfile extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return Column(
             children: [
               // 负责显示头像
               CircleAvatar(...),
               // 负责显示名字
               Text(...),
               // 负责显示邮箱
               Text(...),
               // 负责编辑按钮
               ElevatedButton(...),
               // 负责删除按钮
               ElevatedButton(...),
             ],
           );
         }
       }
       
       // 推荐：职责分离
       class UserProfile extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return Column(
             children: [
               UserAvatar(avatarUrl: avatarUrl),
               UserInfo(name: name, email: email),
               UserActions(
                 onEdit: onEdit,
                 onDelete: onDelete,
               ),
             ],
           );
         }
       }
    
    2. 拆分复杂 Widget
       class UserCard extends StatelessWidget {
         final User user;
         
         @override
         Widget build(BuildContext context) {
           return Card(
             child: Column(
               children: [
                 _buildHeader(),
                 _buildContent(),
                 _buildFooter(),
               ],
             ),
           );
         }
         
         Widget _buildHeader() {
           return UserCardHeader(user: user);
         }
         
         Widget _buildContent() {
           return UserCardContent(user: user);
         }
         
         Widget _buildFooter() {
           return UserCardFooter(user: user);
         }
       }
    
    3. 最佳实践
       - Widget 不超过 100 行
       - 方法不超过 20 行
       - 清晰的命名
       - 合理的粒度
    ''');
  }
}
```

### 2. 可复用性

```dart
// 可复用性原则
class Reusability {
  /*
  可复用性原则：
  
  1. 参数化配置
     - 通过参数定制
     - 避免硬编码
     - 提高灵活性
  
  2. 通用组件
     - 提取通用组件
     - 建立组件库
     - 复用代码
  
  3. 组合复用
     - 通过组合构建
     - 避免重复代码
     - 灵活组合
  */
  
  void explain() {
    print('''
    可复用性原则：
    
    1. 参数化配置
       // 不推荐：硬编码
       class RedButton extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return ElevatedButton(
             style: ElevatedButton.styleFrom(
               backgroundColor: Colors.red,
             ),
             onPressed: () {},
             child: Text('Button'),
           );
         }
       }
       
       // 推荐：参数化
       class CustomButton extends StatelessWidget {
         final String text;
         final Color? color;
         final VoidCallback onPressed;
         
         const CustomButton({
           Key? key,
           required this.text,
           required this.onPressed,
           this.color,
         }) : super(key: key);
         
         @override
         Widget build(BuildContext context) {
           return ElevatedButton(
             style: ElevatedButton.styleFrom(
               backgroundColor: color ?? Theme.of(context).primaryColor,
             ),
             onPressed: onPressed,
             child: Text(text),
           );
         }
       }
    
    2. 通用组件
       class AppButton extends StatelessWidget {
         final String text;
         final VoidCallback onPressed;
         final AppButtonStyle style;
         
         @override
         Widget build(BuildContext context) {
           switch (style) {
             case AppButtonStyle.primary:
               return _buildPrimaryButton();
             case AppButtonStyle.secondary:
               return _buildSecondaryButton();
             case AppButtonStyle.outline:
               return _buildOutlineButton();
           }
         }
       }
       
       // 使用
       AppButton(
         text: 'Submit',
         onPressed: _submit,
         style: AppButtonStyle.primary,
       )
    
    3. 组合复用
       class UserCard extends StatelessWidget {
         final User user;
         
         @override
         Widget build(BuildContext context) {
           return Card(
             child: ListTile(
               leading: UserAvatar(user: user),
               title: UserName(user: user),
               subtitle: UserEmail(user: user),
               trailing: UserActions(user: user),
             ),
           );
         }
       }
    ''');
  }
}
```

### 3. 性能考虑

```dart
// 性能考虑
class PerformanceConsiderations {
  /*
  性能考虑：
  
  1. 使用 const
     - 编译时常量
     - 避免重建
     - 提高性能
  
  2. 避免不必要的重建
     - 精确控制重建
     - 使用 Key
     - 使用 shouldRebuild
  
  3. 优化 Widget 树
     - 减少嵌套
     - 使用合适的 Widget
     - 避免过度绘制
  */
  
  void explain() {
    print('''
    性能考虑：
    
    1. 使用 const
       // 不推荐：每次重建都创建新对象
       class MyWidget extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return Column(
             children: [
               Text('Title'), // 每次重建都创建新对象
               Icon(Icons.star),
             ],
           );
         }
       }
       
       // 推荐：使用 const
       class MyWidget extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return Column(
             children: const [
               Text('Title'), // 编译时常量
               Icon(Icons.star),
             ],
           );
         }
       }
    
    2. 避免不必要的重建
       // 使用 Key
       class MyList extends StatelessWidget {
         @override
         Widget build(BuildContext context) {
           return ListView.builder(
             itemCount: items.length,
             itemBuilder: (context, index) {
               return MyItem(
                 key: ValueKey(items[index].id), // 使用 Key
                 item: items[index],
               );
             },
           );
         }
       }
       
       // 使用 shouldRebuild
       class MyWidget extends StatelessWidget {
         final String data;
         
         @override
         bool shouldRebuild(covariant MyWidget oldWidget) {
           return oldWidget.data != data;
         }
         
         @override
         Widget build(BuildContext context) {
           return Text(data);
         }
       }
    
    3. 优化 Widget 树
       // 减少嵌套
       // 不推荐
       Container(
         child: Padding(
           padding: EdgeInsets.all(8),
           child: Column(
             children: [...],
           ),
         ),
       )
       
       // 推荐
       Padding(
         padding: EdgeInsets.all(8),
         child: Column(
           children: [...],
         ),
       )
    ''');
  }
}
```

## 📖 常见 Widget 设计模式

### 1. Builder 模式

```dart
// Builder 模式
class BuilderPattern {
  /*
  Builder 模式：
  
  1. 功能
     - 延迟构建
     - 访问上下文
     - 条件构建
  
  2. 使用场景
     - 需要 BuildContext
     - 条件渲染
     - 动态构建
  
  3. 示例
     - LayoutBuilder
     - OrientationBuilder
     - MediaQuery
  */
  
  void explain() {
    print('''
    Builder 模式：
    
    1. 基本 Builder
       class MyBuilder extends StatelessWidget {
         final Widget Function(BuildContext context) builder;
         
         const MyBuilder({Key? key, required this.builder}) : super(key: key);
         
         @override
         Widget build(BuildContext context) {
           return builder(context);
         }
       }
       
       // 使用
       MyBuilder(
         builder: (context) {
           // 可以访问 context
           final theme = Theme.of(context);
           return Text('Hello', style: theme.textTheme.headline6);
         },
       )
    
    2. LayoutBuilder
       LayoutBuilder(
         builder: (context, constraints) {
           if (constraints.maxWidth > 600) {
             return _buildWideLayout();
           } else {
             return _buildNarrowLayout();
           }
         },
       )
    
    3. 自定义 Builder
       class ThemeBuilder extends StatelessWidget {
         final Widget Function(BuildContext context, ThemeData theme) builder;
         
         @override
         Widget build(BuildContext context) {
           final theme = Theme.of(context);
           return builder(context, theme);
         }
       }
       
       // 使用
       ThemeBuilder(
         builder: (context, theme) {
           return Container(
             color: theme.primaryColor,
             child: Text('Themed'),
           );
         },
       )
    ''');
  }
}
```

### 2. 工厂模式

```dart
// 工厂模式
class FactoryPattern {
  /*
  工厂模式：
  
  1. 功能
     - 创建对象
     - 封装创建逻辑
     - 统一接口
  
  2. 使用场景
     - 复杂对象创建
     - 条件创建
     - 缓存对象
  
  3. 示例
     - Widget 工厂
     - 命名构造函数
     - 静态方法
  */
  
  void explain() {
    print('''
    工厂模式：
    
    1. 命名构造函数工厂
       class Button extends StatelessWidget {
         final String text;
         final VoidCallback onPressed;
         final ButtonStyle style;
         
         const Button({
           Key? key,
           required this.text,
           required this.onPressed,
           required this.style,
         }) : super(key: key);
         
         // 工厂方法
         factory Button.primary({
           Key? key,
           required String text,
           required VoidCallback onPressed,
         }) {
           return Button(
             key: key,
             text: text,
             onPressed: onPressed,
             style: ButtonStyle.primary,
           );
         }
         
         factory Button.secondary({
           Key? key,
           required String text,
           required VoidCallback onPressed,
         }) {
           return Button(
             key: key,
             text: text,
             onPressed: onPressed,
             style: ButtonStyle.secondary,
           );
         }
       }
       
       // 使用
       Button.primary(text: 'Submit', onPressed: _submit)
    
    2. Widget 工厂
       class AppButtonFactory {
         static Widget create({
           required String text,
           required VoidCallback onPressed,
           ButtonType type = ButtonType.primary,
         }) {
           switch (type) {
             case ButtonType.primary:
               return ElevatedButton(onPressed: onPressed, child: Text(text));
             case ButtonType.secondary:
               return OutlinedButton(onPressed: onPressed, child: Text(text));
             case ButtonType.text:
               return TextButton(onPressed: onPressed, child: Text(text));
           }
         }
       }
       
       // 使用
       AppButtonFactory.create(
         text: 'Click',
         onPressed: () {},
         type: ButtonType.primary,
       )
    ''');
  }
}
```

## 📖 总结

### 声明式 UI 核心原则

| 原则 | 描述 | 优势 |
|------|------|------|
| **UI = f(state)** | UI 是状态的函数 | 可预测、易调试 |
| **不可变 Widget** | Widget 是配置 | 轻量、可复用 |
| **组合优于继承** | 通过组合构建 | 灵活、松耦合 |
| **单一职责** | 每个 Widget 一个职责 | 清晰、易维护 |

### Widget 设计原则

1. **单一职责**：每个 Widget 只做一件事
2. **可复用性**：参数化配置，提取通用组件
3. **性能考虑**：使用 const，避免不必要的重建
4. **清晰接口**：定义清晰的参数和回调

### 设计模式

1. **Builder 模式**：延迟构建，访问上下文
2. **工厂模式**：封装创建逻辑，统一接口
3. **组合模式**：通过组合构建复杂 UI

### 下一步学习

- **性能优化**：深入学习 Widget 性能优化
- **自定义 Widget**：学习创建自定义 Widget
- **架构设计**：学习应用架构设计

---

> 掌握声明式 UI 和 Widget 设计原则，构建高效、可维护的 Flutter 应用。