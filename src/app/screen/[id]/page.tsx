'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ScreenPage() {
  const params = useParams();
  const router = useRouter();
  const screenId = params.id as string;

  useEffect(() => {
    // Redirect to specific screen page
    if (screenId === '1' || screenId === '2' || screenId === '3') {
      router.replace(`/screen/${screenId}`);
    }
  }, [screenId, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-4xl font-bold text-white">加载中...</div>
    </div>
  );
}
