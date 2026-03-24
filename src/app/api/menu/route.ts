import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { MenuCategory, MenuItem } from '@/types/menu';
import { DEFAULT_MENU_DATA } from '@/lib/menu-data';

const DATA_FILE = path.join(process.cwd(), 'data', 'menu.json');
const BACKUP_FILE = path.join(process.cwd(), 'data', 'menu_backup.json');

// 确保数据目录存在
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// 读取菜单数据
async function readMenuData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 如果主文件不存在，使用默认数据初始化
    const defaultData = {
      categories: [],
      lastModified: new Date().toISOString(),
    };
    await writeMenuData(defaultData);
    return defaultData;
  }
}

// 写入菜单数据（同时创建备份）
async function writeMenuData(data: { categories: MenuCategory[]; lastModified: string }) {
  // 先备份现有数据
  try {
    const existingData = await fs.readFile(DATA_FILE, 'utf-8');
    await fs.writeFile(BACKUP_FILE, existingData, 'utf-8');
  } catch (error) {
    // 如果主文件不存在，备份默认数据
    const defaultBackup = {
      categories: [],
      lastModified: new Date().toISOString(),
    };
    await fs.writeFile(BACKUP_FILE, JSON.stringify(defaultBackup, null, 2), 'utf-8');
  }
  
  // 写入新数据
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
}

// GET - 读取菜单数据
export async function GET() {
  try {
    await ensureDataDir();
    const data = await readMenuData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading menu data:', error);
    return NextResponse.json(
      { error: 'Failed to read menu data' },
      { status: 500 }
    );
  }
}

// POST - 保存菜单数据
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const data = await request.json();
    
    // 添加最后修改时间
    const dataWithTimestamp = {
      ...data,
      lastModified: new Date().toISOString(),
    };
    
    await writeMenuData(dataWithTimestamp);
    
    return NextResponse.json({ 
      success: true,
      message: 'Menu data saved successfully',
      lastModified: dataWithTimestamp.lastModified,
    });
  } catch (error) {
    console.error('Error saving menu data:', error);
    return NextResponse.json(
      { error: 'Failed to save menu data' },
      { status: 500 }
    );
  }
}

// PUT - 更新单个菜单项或类别
export async function PUT(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const { id, updates, categoryId } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readMenuData();
    
    // 如果是更新类别
    if (categoryId) {
      const categoryIndex = data.categories.findIndex((cat: MenuCategory) => cat.id === categoryId);
      
      if (categoryIndex === -1) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      
      data.categories[categoryIndex] = {
        ...data.categories[categoryIndex],
        ...updates,
      };
      
      data.lastModified = new Date().toISOString();
      await writeMenuData(data);
      
      return NextResponse.json({ 
        success: true,
        message: 'Category updated successfully',
        category: data.categories[categoryIndex],
      });
    }
    
    // 更新菜单项
    let found = false;
    for (const category of data.categories) {
      const itemIndex = category.items.findIndex((item: MenuItem) => item.id === id);
      if (itemIndex !== -1) {
        category.items[itemIndex] = {
          ...category.items[itemIndex],
          ...updates,
        };
        found = true;
        break;
      }
    }
    
    if (!found) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    data.lastModified = new Date().toISOString();
    await writeMenuData(data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Menu item updated successfully',
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE - 删除菜单项或重置所有数据
export async function DELETE(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      // 删除单个菜单项
      const data = await readMenuData();
      let found = false;
      
      for (const category of data.categories) {
        const originalLength = category.items.length;
        category.items = category.items.filter((item: MenuItem) => item.id !== id);
        if (category.items.length < originalLength) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        return NextResponse.json(
          { error: 'Item not found' },
          { status: 404 }
        );
      }
      
      data.lastModified = new Date().toISOString();
      await writeMenuData(data);
      
      return NextResponse.json({ 
        success: true,
        message: 'Menu item deleted successfully',
      });
    } else {
      // 重置所有数据到默认值
      const resetData = {
        categories: [],
        lastModified: new Date().toISOString(),
      };
      
      await writeMenuData(resetData);
      
      return NextResponse.json({ 
        success: true,
        message: 'Menu data reset successfully',
      });
    }
  } catch (error) {
    console.error('Error deleting menu data:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu data' },
      { status: 500 }
    );
  }
}

// PATCH - 从备份恢复数据
export async function PATCH() {
  try {
    await ensureDataDir();
    
    // 读取备份文件
    const backupData = await fs.readFile(BACKUP_FILE, 'utf-8');
    const parsedBackup = JSON.parse(backupData);
    
    // 恢复到主文件
    await fs.writeFile(DATA_FILE, backupData, 'utf-8');
    
    return NextResponse.json({ 
      success: true,
      message: 'Menu data restored from backup successfully',
      data: parsedBackup,
    });
  } catch (error) {
    console.error('Error restoring from backup:', error);
    return NextResponse.json(
      { error: 'Failed to restore from backup' },
      { status: 500 }
    );
  }
}
