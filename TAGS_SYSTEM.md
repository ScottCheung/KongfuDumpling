# Tags 系统说明

## 概述
Tags 系统现在支持自定义输入，并且有独立的备份机制。

## 文件结构

### 数据文件
- `data/tags.json` - 当前使用的 tags 配置
- `data/tags_backup.json` - tags 的备份文件

### 核心文件
- `src/lib/store/tags-store.ts` - Tags 状态管理
- `src/app/api/tags/route.ts` - Tags API（读取和保存）
- `src/app/api/tags/restore/route.ts` - 从备份恢复 API
- `src/app/editor/components/ManageTagsModal.tsx` - Tags 管理界面
- `src/app/editor/components/TagSelector.tsx` - Tags 选择器组件
- `src/app/editor/components/SearchFilters.tsx` - 搜索过滤器（包含 tags 过滤）

## Tags 结构

```json
{
  "ingredients": ["Pork", "Beef", "Chicken", ...],
  "flavors": ["Spicy", "Sweet", "Sour", ...],
  "restrictions": ["gluten-free", "dairy-free", ...],
  "lastModified": "2026-03-14T00:00:00.000Z"
}
```

## 功能特性

### 1. 自定义 Tags
- 在编辑器页面点击 "Manage Tags" 按钮
- 可以为三种类型添加自定义 tags：
  - Ingredients（食材）
  - Flavors（口味）
  - Dietary Restrictions（饮食限制）

### 2. Tags 管理
- 添加新 tag：输入名称后点击 "Add" 或按 Enter
- 删除 tag：点击 tag 上的 X 按钮
- 保存更改：点击 "Save Tags" 按钮
- 重置更改：点击 "Reset Changes" 按钮
- 恢复备份：点击 "Restore Backup" 按钮

### 3. 备份机制
- 每次保存 tags 时，会同时更新 `tags.json` 和 `tags_backup.json`
- 可以随时从备份恢复

### 4. 实时同步
- Tags 更改后，所有使用 tags 的组件会自动更新：
  - 搜索过滤器
  - 菜品编辑器
  - 新增菜品表单

## 使用方法

### 在编辑器中管理 Tags
1. 打开编辑器页面（`/editor`）
2. 在搜索过滤区域找到 "Manage Tags" 按钮
3. 在弹出的对话框中添加或删除 tags
4. 点击 "Save Tags" 保存更改

### 在菜品中使用 Tags
- 编辑菜品时，可以从可用的 tags 中选择
- Tags 会自动显示在搜索过滤器中
- 用户可以通过 tags 过滤菜品

## API 端点

### GET /api/tags
获取当前的 tags 配置

### POST /api/tags
保存 tags 配置（同时更新主文件和备份文件）

### POST /api/tags/restore
从备份恢复 tags 配置
