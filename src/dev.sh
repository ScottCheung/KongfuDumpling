#!/bin/bash

# 菜单系统快速启动脚本

echo "🍜 菜单系统启动脚本"
echo "===================="
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo ""
fi

# 确保 data 目录存在
if [ ! -d "data" ]; then
    echo "📁 创建 data 目录..."
    mkdir -p data
fi

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "⚙️  创建环境变量文件..."
    echo "NEXT_PUBLIC_ENV=development" > .env.local
fi

echo "✅ 准备完成！"
echo ""
echo "🚀 启动开发服务器..."
echo ""
echo "📝 功能说明:"
echo "  - 编辑器: http://localhost:3000/editor"
echo "  - 展示屏: http://localhost:3000/screen"
echo "  - 数据文件: data/menu.json"
echo ""
echo "💡 提示:"
echo "  - 在开发模式下，所有修改会保存到 data/menu.json"
echo "  - 支持增删改查操作"
echo "  - 按 Ctrl+C 停止服务器"
echo ""
echo "===================="
echo ""

# 启动开发服务器
npm run dev
