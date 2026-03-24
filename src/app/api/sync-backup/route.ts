/** @format */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const synced: string[] = [];

    // 获取所有 JSON 文件（排除 backup 文件）
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(
      (file) => file.endsWith('.json') && !file.endsWith('_backup.json'),
    );

    // 同步每个文件到对应的 backup 文件
    for (const file of jsonFiles) {
      const sourcePath = path.join(dataDir, file);
      const backupFileName = file.replace('.json', '_backup.json');
      const backupPath = path.join(dataDir, backupFileName);

      // 读取源文件内容
      const content = await fs.readFile(sourcePath, 'utf-8');

      // 写入到 backup 文件
      await fs.writeFile(backupPath, content, 'utf-8');

      synced.push(file);
    }

    return NextResponse.json({
      success: true,
      synced,
      message: `成功同步 ${synced.length} 个文件`,
    });
  } catch (error) {
    console.error('同步备份失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 },
    );
  }
}
