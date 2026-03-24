#!/bin/bash

echo "🍜 Kong Fu Kitchen 菜单系统"
echo "=========================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null
then
    echo "❌ 未检测到 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo ""
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo ""
echo "访问地址："
echo "  主页:     http://localhost:3000"
echo "  编辑器:   http://localhost:3000/editor"
echo "  展示屏:   http://localhost:3000/screen"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
