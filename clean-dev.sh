#!/bin/bash

echo "🧹 清理 Next.js 缓存和构建文件..."
echo ""

# 删除 .next 目录
if [ -d ".next" ]; then
    echo "  ✓ 删除 .next 目录"
    rm -rf .next
fi

# 删除 node_modules 缓存
if [ -d "node_modules/.cache" ]; then
    echo "  ✓ 删除 node_modules/.cache"
    rm -rf node_modules/.cache
fi

# 删除 Turbopack 缓存
if [ -d ".turbo" ]; then
    echo "  ✓ 删除 .turbo 目录"
    rm -rf .turbo
fi

echo ""
echo "✅ 缓存清理完成！"
echo ""
echo "🚀 启动开发服务器..."
echo ""

# 启动开发服务器
npm run dev
