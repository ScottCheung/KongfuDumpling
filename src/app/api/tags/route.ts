/** @format */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const TAGS_FILE = path.join(process.cwd(), 'data', 'tags.json');
const TAGS_BACKUP_FILE = path.join(process.cwd(), 'data', 'tags_backup.json');

export async function GET() {
  try {
    const data = await fs.readFile(TAGS_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading tags:', error);
    return NextResponse.json(
      { error: 'Failed to read tags' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const tags = await request.json();
    
    // Add timestamp
    tags.lastModified = new Date().toISOString();
    
    // Save to main file
    await fs.writeFile(TAGS_FILE, JSON.stringify(tags, null, 2));
    
    // Also update backup
    await fs.writeFile(TAGS_BACKUP_FILE, JSON.stringify(tags, null, 2));
    
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error saving tags:', error);
    return NextResponse.json(
      { error: 'Failed to save tags' },
      { status: 500 }
    );
  }
}
