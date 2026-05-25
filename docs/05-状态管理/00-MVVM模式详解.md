# MVVM 模式详解

> 深入理解 Flutter 中的 MVVM 模式。

## 📖 MVVM 模式基础

### 1. 什么是 MVVM 模式

```dart
// MVVM 模式概念
class MVVMPatternConcept {
  void explain() {
    print('''
    MVVM 模式概念：
    
    // 1. 什么是 MVVM 模式
    // - Model-View-ViewModel
    // - 模型-视图-视图模型
    // - 现代架构模式
    // - 数据绑定
    
    // 2. MVVM 模式的特点
    // - 数据绑定：View 和 ViewModel 绑定
    // - 分离关注点：M、V、VM 分离
    // - 可测试性：易于测试
    // - 响应式：响应式数据
    
    // 3. MVVM 模式的组成部分
    // - Model：数据和业务逻辑
    // - View：用户界面
    // - ViewModel：视图逻辑和状态
    
    // 4. MVVM 模式的使用场景
    // - 现代移动应用
    // - 响应式应用
    // - 数据驱动应用
    // - Flutter 应用
    ''');
  }
}
```

### 2. MVVM 模式实现

```dart
// MVVM 模式实现
class MVVMPatternImplementation {
  void explain() {
    print('''
    MVVM 模式实现：
    
    // 1. Model
    class UserModel {
      String name;
      int age;
      
      UserModel(this.name, this.age);
    }
    
    // 2. ViewModel
    class UserViewModel extends ChangeNotifier {
      final UserModel _model;
      
      UserViewModel(this._model);
      
      String get name => _model.name;
      int get age => _model.age;
      
      void updateName(String name) {
        _model.name = name;
        notifyListeners();
      }
      
      void updateAge(int age) {
        _model.age = age;
        notifyListeners();
      }
    }
    
    // 3. View
    class UserView extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        final viewModel = Provider.of<UserViewModel>(context);
        
        return Column(
          children: [
            Text('Name: ${viewModel.name}'),
            Text('Age: ${viewModel.age}'),
            ElevatedButton(
              onPressed: () => viewModel.updateName('Jane'),
              child: Text('Update Name'),
            ),
          ],
        );
      }
    }
    
    // 4. 使用 MVVM
    ChangeNotifierProvider(
      create: (context) => UserViewModel(UserModel('John', 30)),
      child: UserView(),
    )
    ''');
  }
}
```

## 🔗 相关链接

- [[MVC模式]]
- [[状态分离]]
- [[状态管理对比]]
- [[Provider基础]]

---

> MVVM 模式是现代应用开发的重要模式，掌握它对于构建响应式应用非常重要。