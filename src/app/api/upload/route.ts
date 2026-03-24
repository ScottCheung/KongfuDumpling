import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const itemName = formData.get('itemName') as string;

    if (!file || !category || !itemName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 读取文件内容
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 获取文件扩展名
    const ext = path.extname(file.name);
    
    // 创建分类目录
    const categoryDir = path.join(process.cwd(), 'public', 'images', category);
    await mkdir(categoryDir, { recursive: true });

    // 使用菜品名称作为文件名
    const fileName = `${itemName}${ext}`;
    const filePath = path.join(categoryDir, fileName);

    // 保存文件
    await writeFile(filePath, buffer);

    // 返回相对路径
    const relativePath = `/images/${category}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      path: relativePath 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
