# Flutter 算法题

> 面试常见算法、Dart 编码与手写 UI 题的思路与示例。

## 答题习惯

1. **澄清**：输入输出、边界、是否可改原数组
2. **暴力 → 优化**：先说 O(n²) 再优化
3. **写 Dart**：注意 null safety、`final`/`const`
4. **测例**：空数组、单元素、负数

复杂度用 Big-O 表述；移动端面试算法 **深度通常低于纯后端**，但手写要清晰。

---

## 数组与字符串

**题：两数之和（LeetCode 1）**

```dart
List<int> twoSum(List<int> nums, int target) {
  final seen = <int, int>{};
  for (var i = 0; i < nums.length; i++) {
    final need = target - nums[i];
    if (seen.containsKey(need)) {
      return [seen[need]!, i];
    }
    seen[nums[i]] = i;
  }
  return [];
}
```

O(n) 时间，O(n) 空间。

**题：反转字符串**

```dart
String reverseString(String s) => String.fromCharCodes(s.runes.toList().reversed);
```

**题：判断回文**

双指针首尾向中间；忽略非字母数字可先 normalize。

---

## 链表（概念 + Dart）

Dart 无内置链表；面试可能让写节点类：

```dart
class ListNode {
  ListNode(this.val, [this.next]);
  int val;
  ListNode? next;
}

ListNode? reverseList(ListNode? head) {
  ListNode? prev;
  var cur = head;
  while (cur != null) {
    final next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
```

---

## 树与图遍历

**题：二叉树前序遍历（递归/栈）**

```dart
class TreeNode {
  TreeNode(this.val, [this.left, this.right]);
  int val;
  TreeNode? left, TreeNode? right;
}

List<int> preorder(TreeNode? root) {
  if (root == null) return [];
  return [root.val, ...preorder(root.left), ...preorder(root.right)];
}
```

BFS 用 `Queue`（`dart:collection`）。

**题：岛屿数量** — DFS/BFS 网格；注意 visited 标记。

---

## 动态规划入门

**题：爬楼梯（LeetCode 70）**

```dart
int climbStairs(int n) {
  if (n <= 2) return n;
  var a = 1, b = 2;
  for (var i = 3; i <= n; i++) {
    final c = a + b;
    a = b;
    b = c;
  }
  return b;
}
```

**题：最大子数组和** — Kadane 算法 O(n)。

---

## 哈希与计数

**题：有效字母异位词**

```dart
bool isAnagram(String s, String t) {
  if (s.length != t.length) return false;
  final count = List<int>.filled(26, 0);
  for (var i = 0; i < s.length; i++) {
    count[s.codeUnitAt(i) - 97]++;
    count[t.codeUnitAt(i) - 97]--;
  }
  return count.every((c) => c == 0);
}
```

---

## 手写 Widget / 布局题

**题：实现无限下拉加载列表**

要点：`ScrollController` 监听 `maxScrollExtent - 200` 触发 loadMore；`ListView.builder`；loading footer。

**题：防抖搜索**

```dart
Timer? _debounce;
void onQueryChanged(String q) {
  _debounce?.cancel();
  _debounce = Timer(const Duration(milliseconds: 300), () => search(q));
}
```

见 [[23-代码面试详解]]。

---

## Flutter 特化

**题：Top K 频次 Widget 重建？**

DevTools / Timeline — 非纯算法，考调试思路。

**题：Isolate 何时用？**

大 JSON 解析、图片编解码 — `compute()` / `Isolate.run()`。

---

## 回答技巧

- 先口述思路再写码
- 写完后 walk through 例子
- 与 [[13-数据结构题]] 交叉复习

## 相关链接

- [[13-数据结构题]]
- [[23-代码面试详解]]
- [[03-Dart基础面试题]]
- [[03-Dart进阶特性]]
- [[01-面试准备]]
- [[00-面试与进阶索引]]
