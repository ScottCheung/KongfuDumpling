/** @format */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const TAGS_FILE = path.join(process.cwd(), 'data', 'tags.json');
const TAGS_BACKUP_FILE = path.join(process.cwd(), 'data', 'tags_backup.json');

export async function POST() {
  try {
    // Read backup file
    const backupData = await fs.readFile(TAGS_BACKUP_FILE, 'utf-8');
    const tags = JSON.parse(backupData);
    
    // Restore to main file
    await fs.writeFile(TAGS_FILE, JSON.stringify(tags, null, 2));
    
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error restoring tags from backup:', error);
    return NextResponse.json(
      { error: 'Failed to restore tags from backup' },
      { status: 500 }
    );
  }
}
