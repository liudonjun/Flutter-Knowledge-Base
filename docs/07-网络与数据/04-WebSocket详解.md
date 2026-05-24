# WebSocket 详解

> 深入理解 Flutter 中的 WebSocket 实时通信，掌握实时数据传输、连接管理、错误处理等核心概念。

## 📖 WebSocket 基础

### 1. WebSocket 概述

```dart
// WebSocket 概述
class WebSocketOverview {
  /*
  WebSocket 概述：
  
  1. 核心概念
     - WebSocket：全双工通信协议
     - 实时通信：实时数据传输
     - 持久连接：保持连接
     - 事件驱动：基于事件
  
  2. 优势
     - 实时性：实时数据传输
     - 高效性：减少 HTTP 开销
     - 双向通信：客户端和服务器都可以发送
     - 低延迟：低延迟通信
  
  3. 使用场景
     - 实时聊天：聊天应用
     - 实时通知：消息推送
     - 实时数据：股票行情
     - 在线游戏：游戏通信
  */
  
  void explain() {
    print('''
    WebSocket 概述：
    
    1. 核心概念
       - WebSocket：全双工通信协议
       - 实时通信：实时数据传输
       - 持久连接：保持连接
       - 事件驱动：基于事件
       - 消息帧：数据帧传输
    
    2. 优势
       - 实时性：实时数据传输
       - 高效性：减少 HTTP 开销
       - 双向通信：客户端和服务器都可以发送
       - 低延迟：低延迟通信
       - 轻量级：协议开销小
    
    3. 使用场景
       - 实时聊天：聊天应用
       - 实时通知：消息推送
       - 实时数据：股票行情
       - 在线游戏：游戏通信
       - 协作编辑：实时协作
    
    4. 与 HTTP 对比
       - HTTP：请求-响应模式
       - WebSocket：全双工通信
       - HTTP：无状态
       - WebSocket：有状态连接
    
    示例：
    // WebSocket 连接
    final channel = WebSocketChannel.connect(
      Uri.parse('wss://echo.websocket.org'),
    );
    
    // 发送消息
    channel.sink.add('Hello, WebSocket!');
    
    // 接收消息
    channel.stream.listen((message) {
      print('收到消息: $message');
    });
    ''');
  }
}
```

### 2. WebSocket 基本使用

```dart
// WebSocket 基本使用
class WebSocketBasicUsage {
  /*
  WebSocket 基本使用：
  
  1. 添加依赖
     - pubspec.yaml 添加 web_socket_channel 包
     - 运行 flutter pub get
  
  2. 建立连接
     - WebSocketChannel.connect：建立连接
     - 监听连接状态
     - 处理连接错误
  
  3. 发送消息
     - channel.sink.add：发送消息
     - 发送文本消息
     - 发送二进制消息
  
  4. 接收消息
     - channel.stream.listen：监听消息
     - 处理消息
     - 处理错误
  */
  
  void explain() {
    print('''
    WebSocket 基本使用：
    
    1. 添加依赖
       # pubspec.yaml
       dependencies:
         web_socket_channel: ^2.0.0
    
    2. 建立连接
       final channel = WebSocketChannel.connect(
         Uri.parse('wss://echo.websocket.org'),
       );
       
       // 监听连接状态
       channel.stream.listen(
         (message) {
           print('收到消息: $message');
         },
         onError: (error) {
           print('连接错误: $error');
         },
         onDone: () {
           print('连接关闭');
         },
       );
    
    3. 发送消息
       // 发送文本消息
       channel.sink.add('Hello, WebSocket!');
       
       // 发送 JSON 消息
       channel.sink.add(jsonEncode({
         'type': 'message',
         'content': 'Hello',
       }));
    
    4. 关闭连接
       await channel.sink.close();
    
    示例：
    class WebSocketExample {
      final WebSocketChannel channel;
      
      WebSocketExample(String url)
          : channel = WebSocketChannel.connect(Uri.parse(url));
      
      void sendMessage(String message) {
        channel.sink.add(message);
      }
      
      Stream<dynamic> get stream => channel.stream;
      
      void dispose() {
        channel.sink.close();
      }
    }
    ''');
  }
}

// WebSocket 基本使用示例
void webSocketBasicUsageExample() {
  print('''
  // WebSocket 基本使用示例：
  
  import 'package:flutter/material.dart';
  import 'package:web_socket_channel/web_socket_channel.dart';
  import 'dart:convert';
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        home: WebSocketExamplePage(),
      );
    }
  }
  
  class WebSocketExamplePage extends StatefulWidget {
    @override
    _WebSocketExamplePageState createState() => _WebSocketExamplePageState();
  }
  
  class _WebSocketExamplePageState extends State<WebSocketExamplePage> {
    final TextEditingController _controller = TextEditingController();
    final List<String> _messages = [];
    WebSocketChannel? _channel;
    bool _isConnected = false;
  
    @override
    void initState() {
      super.initState();
      _connect();
    }
  
    void _connect() {
      try {
        _channel = WebSocketChannel.connect(
          Uri.parse('wss://echo.websocket.org'),
        );
  
        _channel!.stream.listen(
          (message) {
            setState(() {
              _messages.add('收到: $message');
            });
          },
          onError: (error) {
            setState(() {
              _messages.add('错误: $error');
              _isConnected = false;
            });
          },
          onDone: () {
            setState(() {
              _messages.add('连接已关闭');
              _isConnected = false;
            });
          },
        );
  
        setState(() {
          _isConnected = true;
          _messages.add('已连接到服务器');
        });
      } catch (e) {
        setState(() {
          _messages.add('连接失败: $e');
          _isConnected = false;
        });
      }
    }
  
    void _sendMessage() {
      if (_controller.text.isNotEmpty && _channel != null && _isConnected) {
        _channel!.sink.add(_controller.text);
        setState(() {
          _messages.add('发送: ${_controller.text}');
        });
        _controller.clear();
      }
    }
  
    void _disconnect() {
      if (_channel != null) {
        _channel!.sink.close();
        setState(() {
          _isConnected = false;
          _messages.add('已断开连接');
        });
      }
    }
  
    @override
    void dispose() {
      _channel?.sink.close();
      _controller.dispose();
      super.dispose();
    }
  
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('WebSocket 示例'),
          actions: [
            IconButton(
              icon: Icon(_isConnected ? Icons.link : Icons.link_off),
              onPressed: _isConnected ? _disconnect : _connect,
            ),
          ],
        ),
        body: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(_messages[index]),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        labelText: '输入消息',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: _isConnected ? _sendMessage : null,
                    child: Text('发送'),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    }
  }
  ''');
}
```

## 📖 WebSocket 高级特性

### 1. 连接管理

```dart
// WebSocket 连接管理
class WebSocketConnectionManagement {
  /*
  WebSocket 连接管理：
  
  1. 连接状态
     - 连接中：正在建立连接
     - 已连接：连接成功
     - 断开连接：连接断开
     - 重连中：正在重连
  
  2. 重连机制
     - 自动重连：自动重新连接
     - 重试策略：重试次数和间隔
     - 指数退避：指数退避策略
  
  3. 心跳机制
     - 心跳包：定期发送心跳
     - 超时检测：检测连接超时
     - 连接保活：保持连接活跃
  */
  
  void explain() {
    print('''
    WebSocket 连接管理：
    
    1. 连接状态
       - 连接中：正在建立连接
       - 已连接：连接成功
       - 断开连接：连接断开
       - 重连中：正在重连
       - 错误状态：连接错误
    
    2. 重连机制
       - 自动重连：自动重新连接
       - 重试策略：重试次数和间隔
       - 指数退避：指数退避策略
       - 最大重试：最大重试次数
    
    3. 心跳机制
       - 心跳包：定期发送心跳
       - 超时检测：检测连接超时
       - 连接保活：保持连接活跃
       - 心跳间隔：心跳发送间隔
    
    4. 最佳实践
       - 管理连接状态
       - 实现重连机制
       - 使用心跳保活
       - 处理连接错误
    
    示例：
    class WebSocketManager {
      WebSocketChannel? _channel;
      Timer? _heartbeatTimer;
      Timer? _reconnectTimer;
      int _reconnectAttempts = 0;
      final int _maxReconnectAttempts = 5;
      
      void connect() {
        _channel = WebSocketChannel.connect(
          Uri.parse('wss://example.com/ws'),
        );
        
        _channel!.stream.listen(
          _onMessage,
          onError: _onError,
          onDone: _onDone,
        );
        
        _startHeartbeat();
      }
      
      void _startHeartbeat() {
        _heartbeatTimer = Timer.periodic(
          Duration(seconds: 30),
          (_) => _sendHeartbeat(),
        );
      }
      
      void _sendHeartbeat() {
        if (_channel != null) {
          _channel!.sink.add(jsonEncode({'type': 'heartbeat'}));
        }
      }
      
      void _reconnect() {
        if (_reconnectAttempts < _maxReconnectAttempts) {
          _reconnectAttempts++;
          _reconnectTimer = Timer(
            Duration(seconds: _reconnectAttempts * 2),
            connect,
          );
        }
      }
    }
    ''');
  }
}

// WebSocket 连接管理示例
void webSocketConnectionManagementExample() {
  print('''
  // WebSocket 连接管理示例：
  
  import 'package:flutter/material.dart';
  import 'package:web_socket_channel/web_socket_channel.dart';
  import 'dart:async';
  import 'dart:convert';
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        home: WebSocketManagerPage(),
      );
    }
  }
  
  class WebSocketManagerPage extends StatefulWidget {
    @override
    _WebSocketManagerPageState createState() => _WebSocketManagerPageState();
  }
  
  class _WebSocketManagerPageState extends State<WebSocketManagerPage> {
    final WebSocketManager _manager = WebSocketManager();
    final TextEditingController _controller = TextEditingController();
    final List<String> _messages = [];
  
    @override
    void initState() {
      super.initState();
      _manager.onMessage = (message) {
        setState(() {
          _messages.add('收到: $message');
        });
      };
      _manager.onStatusChange = (status) {
        setState(() {
          _messages.add('状态: $status');
        });
      };
      _manager.connect();
    }
  
    void _sendMessage() {
      if (_controller.text.isNotEmpty) {
        _manager.sendMessage(_controller.text);
        setState(() {
          _messages.add('发送: ${_controller.text}');
        });
        _controller.clear();
      }
    }
  
    @override
    void dispose() {
      _manager.dispose();
      _controller.dispose();
      super.dispose();
    }
  
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('WebSocket 连接管理'),
          actions: [
            IconButton(
              icon: Icon(Icons.refresh),
              onPressed: () => _manager.reconnect(),
            ),
          ],
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Icon(
                    _manager.isConnected ? Icons.link : Icons.link_off,
                    color: _manager.isConnected ? Colors.green : Colors.red,
                  ),
                  SizedBox(width: 8),
                  Text(_manager.isConnected ? '已连接' : '未连接'),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(_messages[index]),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        labelText: '输入消息',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: _manager.isConnected ? _sendMessage : null,
                    child: Text('发送'),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    }
  }
  
  // WebSocket 管理器
  class WebSocketManager {
    WebSocketChannel? _channel;
    Timer? _heartbeatTimer;
    Timer? _reconnectTimer;
    int _reconnectAttempts = 0;
    final int _maxReconnectAttempts = 5;
    bool _isConnected = false;
  
    Function(String)? onMessage;
    Function(String)? onStatusChange;
  
    bool get isConnected => _isConnected;
  
    void connect() {
      try {
        _channel = WebSocketChannel.connect(
          Uri.parse('wss://echo.websocket.org'),
        );
  
        _channel!.stream.listen(
          _onMessage,
          onError: _onError,
          onDone: _onDone,
        );
  
        _isConnected = true;
        _reconnectAttempts = 0;
        _startHeartbeat();
        onStatusChange?.call('已连接');
      } catch (e) {
        _isConnected = false;
        onStatusChange?.call('连接失败: $e');
        _reconnect();
      }
    }
  
    void _onMessage(dynamic message) {
      onMessage?.call(message.toString());
    }
  
    void _onError(dynamic error) {
      _isConnected = false;
      onStatusChange?.call('连接错误: $error');
      _reconnect();
    }
  
    void _onDone() {
      _isConnected = false;
      _stopHeartbeat();
      onStatusChange?.call('连接已关闭');
      _reconnect();
    }
  
    void _startHeartbeat() {
      _heartbeatTimer = Timer.periodic(
        Duration(seconds: 30),
        (_) => _sendHeartbeat(),
      );
    }
  
    void _stopHeartbeat() {
      _heartbeatTimer?.cancel();
      _heartbeatTimer = null;
    }
  
    void _sendHeartbeat() {
      if (_channel != null && _isConnected) {
        _channel!.sink.add(jsonEncode({'type': 'heartbeat'}));
      }
    }
  
    void _reconnect() {
      if (_reconnectAttempts < _maxReconnectAttempts) {
        _reconnectAttempts++;
        onStatusChange?.call('重连中... ($_reconnectAttempts/$_maxReconnectAttempts)');
        
        _reconnectTimer = Timer(
          Duration(seconds: _reconnectAttempts * 2),
          connect,
        );
      } else {
        onStatusChange?.call('重连次数已达上限');
      }
    }
  
    void reconnect() {
      _reconnectAttempts = 0;
      _reconnectTimer?.cancel();
      connect();
    }
  
    void sendMessage(String message) {
      if (_channel != null && _isConnected) {
        _channel!.sink.add(message);
      }
    }
  
    void dispose() {
      _heartbeatTimer?.cancel();
      _reconnectTimer?.cancel();
      _channel?.sink.close();
    }
  }
  ''');
}
```

## 📖 总结

### WebSocket 核心概念

| 概念 | 描述 | 使用场景 |
|------|------|----------|
| **WebSocket** | 全双工通信协议 | 实时通信 |
| **实时通信** | 实时数据传输 | 聊天、通知 |
| **持久连接** | 保持连接 | 长连接应用 |
| **心跳机制** | 保持连接活跃 | 连接保活 |
| **重连机制** | 自动重连 | 网络恢复 |

### 最佳实践总结

1. **连接管理**：管理连接状态，实现重连机制
2. **心跳保活**：使用心跳机制保持连接活跃
3. **错误处理**：处理连接错误和异常情况
4. **性能优化**：优化消息传输和处理性能
5. **安全考虑**：使用 WSS，处理敏感信息

### 学习路径

1. **基础 WebSocket**：学习 WebSocket 基础
2. **连接管理**：学习连接状态管理
3. **消息处理**：学习消息收发处理
4. **高级特性**：学习心跳、重连等高级特性

### 下一步学习

- **数据序列化**：学习数据序列化
- **数据库**：学习本地数据存储
- **实时应用**：学习实时应用开发

---

> 深入理解 Flutter 中的 WebSocket 实时通信，掌握实时数据传输、连接管理、错误处理等核心概念。WebSocket 是实时应用开发的重要技术。