# 热刷新修复说明

## 问题原因

1. **多个 lockfiles 冲突**: Next.js 检测到父目录 `/Users/xianzhezhang/Projects/` 也有 `package-lock.json`，导致错误推断工作区根目录
2. **缓存问题**: `.next` 和 Turbopack 缓存可能包含过期的模块解析信息

## 已修复的内容

### 1. 更新 `next.config.ts`
添加了 Turbopack 根目录配置，明确指定项目根目录：

```typescript
experimental: {
  turbo: {
    root: process.cwd(),
  },
}
```

### 2. 添加清理脚本
创建了 `clean-dev.sh` 脚本来清理缓存并启动开发服务器。

### 3. 添加 npm 脚本
在 `package.json` 中添加了 `dev:clean` 命令。

## 使用方法

### 方法 1: 使用清理脚本（推荐）
```bash
./clean-dev.sh
```

### 方法 2: 使用 npm 命令
```bash
npm run dev:clean
```

### 方法 3: 手动清理
```bash
rm -rf .next node_modules/.cache .turbo
npm run dev
```

## 验证热刷新是否工作

1. 启动开发服务器后，打开 http://localhost:3000/editor
2. 修改任意组件文件（如 `src/app/editor/page.tsx`）
3. 保存文件
4. 浏览器应该自动刷新，无需手动刷新

## 常见问题

### Q: 仍然没有热刷新？
A: 尝试以下步骤：
1. 完全停止开发服务器（Ctrl+C）
2. 运行 `./clean-dev.sh` 重新启动
3. 清除浏览器缓存（Cmd+Shift+R 或 Ctrl+Shift+R）

### Q: 看到 "Fast Refresh had to perform a full reload" 警告？
A: 这通常是因为：
- 组件有语法错误
- 组件导出方式不符合 Fast Refresh 要求
- 检查终端中的错误信息

### Q: 仍然看到 "Can't resolve '../styles/main.css'" 错误？
A: 这是缓存问题，运行清理脚本即可解决。

## 技术细节

Next.js Fast Refresh 要求：
- 组件必须是默认导出或命名导出
- 不能在组件外部有副作用
- 使用 `'use client'` 指令的客户端组件
- 避免在渲染过程中使用匿名函数作为组件
