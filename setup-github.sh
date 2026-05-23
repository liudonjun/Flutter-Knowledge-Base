#!/bin/bash

# Flutter 知识库 GitHub 配置脚本
# 使用方法: ./setup-github.sh YOUR_GITHUB_TOKEN

echo "🔧 Flutter 知识库 GitHub 配置"
echo "================================"

# 检查参数
if [ $# -eq 0 ]; then
    echo "❌ 错误: 请提供 GitHub Personal Access Token"
    echo ""
    echo "使用方法:"
    echo "  ./setup-github.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "获取 Token 步骤:"
    echo "1. 访问: https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. 选择 'repo' 权限"
    echo "4. 复制生成的 token"
    echo ""
    echo "或者使用 GitHub CLI:"
    echo "  gh auth login"
    exit 1
fi

TOKEN=$1

echo "📝 配置远程仓库..."
cd "$(dirname "$0")"

# 备份原始 URL
git remote get-url origin > .git/remote-url-backup 2>/dev/null || true

# 配置带 token 的 URL
git remote set-url origin https://${TOKEN}@github.com/liudonjun/Flutter-Knowledge-Base.git

echo "✅ 远程仓库已配置"

echo "🚀 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码推送成功!"
    echo ""
    echo "🔗 仓库地址: https://github.com/liudonjun/Flutter-Knowledge-Base"
    echo "🌐 访问地址: https://liudonjun.github.io/Flutter-Knowledge-Base/"
    echo ""
    echo "📝 恢复原始 URL (可选):"
    echo "  git remote set-url origin https://github.com/liudonjun/Flutter-Knowledge-Base.git"
else
    echo "❌ 推送失败"
    echo "请检查:"
    echo "1. Token 是否正确"
    echo "2. Token 是否有 'repo' 权限"
    echo "3. 仓库是否存在"
    echo ""
    echo "恢复原始 URL:"
    git remote set-url origin https://github.com/liudonjun/Flutter-Knowledge-Base.git
fi