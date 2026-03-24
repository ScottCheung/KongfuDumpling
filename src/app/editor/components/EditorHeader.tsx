/** @format */

import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { Badge } from '@/components/UI/badge';
import { Monitor, Plus, Save, PackageOpen, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface EditorHeaderProps {
  modifiedCount: number;
  onAddNew: () => void;
  onSaveChanges: () => void;
  onRestoreBackup: () => void;
}

export function EditorHeader({
  modifiedCount,
  onAddNew,
  onSaveChanges,
  onRestoreBackup,
}: EditorHeaderProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync-backup', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('同步失败');
      }

      const result = await response.json();
      alert(`同步成功！已同步 ${result.synced.join(', ')}`);
    } catch (error) {
      alert(
        '同步失败: ' + (error instanceof Error ? error.message : '未知错误'),
      );
    } finally {
      setIsSyncing(false);
    }
  };
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    }
  };

  return (
    <header className='bg-panel/80 backdrop-blur-sm border-b border-border sticky top-0 z-10'>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-ink-primary'>Menu Editor</h1>
            <div className='flex items-center gap-2 mt-1'>
              {modifiedCount > 0 ?
                <Badge variant='warning'>{modifiedCount} items modified</Badge>
              : <p className='text-sm text-ink-secondary'>No changes</p>}
            </div>
          </div>
          <div className='flex gap-3'>
            <Link href='/screen/1' onClick={enterFullscreen}>
              <Button variant='secondary' Icon={Monitor}>
                Display Screen
              </Button>
            </Link>
            <Button onClick={onAddNew} variant='secondary' Icon={Plus}>
              Add Item
            </Button>
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              variant='secondary'
              Icon={RefreshCw}
            >
              {isSyncing ? 'Async...' : 'BackUp All Data'}
            </Button>
            <Button
              onClick={onSaveChanges}
              disabled={modifiedCount === 0}
              variant='default'
              Icon={Save}
            >
              Save {modifiedCount > 0 && `(${modifiedCount})`}
            </Button>
            <Button
              onClick={onRestoreBackup}
              variant='outline'
              Icon={PackageOpen}
            >
              Restore
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
