/** @format */

'use client';

import { HomeIcon, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  // 获取当前页码
  const getCurrentPage = () => {
    const match = pathname.match(/\/screen\/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };

  const currentPage = getCurrentPage();
  const totalPages = 4; // 总共有4个页面

  // 处理鼠标移动
  const handleMouseMove = useCallback(() => {
    setShowNav(true);

    // 清除之前的定时器
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    // 设置新的定时器，3秒后隐藏
    const timer = setTimeout(() => {
      setShowNav(false);
    }, 3000);

    setHideTimer(timer);
  }, [hideTimer]);

  // 页面切换
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/screen/${page}`);
    }
  };

  useEffect(() => {
    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [handleMouseMove, hideTimer]);

  return (
    <div className='relative'>
      {children}

      {/* 导航控件 */}
      <div
        className={`fixed top-1/2 right-[3vh] -translate-y-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showNav ?
            'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-[4vh] pointer-events-none'
          }`}
      >
        <div
          className='relative rounded-[2.5vh] p-[1.2vh] backdrop-blur-3xl'
          style={{
            background:
              'linear-gradient(180deg, rgba(20, 20, 20, 0.7) 0%, rgba(30, 30, 30, 0.8) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.25)',
            boxShadow: '0 2vh 5vh -1vh rgba(0, 0, 0, 0.8), inset 0 0 2vh rgba(255, 215, 0, 0.05)',
          }}
        >
          {/* 页面指示器 */}
          <div className='flex flex-col gap-[1.5vh]'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`group relative w-[5.5vh] h-[5.5vh] rounded-[1.5vh] flex items-center justify-center transition-all duration-500 ease-out ${currentPage === page ? 'scale-110' : 'hover:scale-110 active:scale-95'
                  }`}
                style={{
                  background:
                    currentPage === page ?
                      'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                  border:
                    currentPage === page ?
                      '1px solid rgba(255, 215, 0, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    currentPage === page ?
                      '0 0.8vh 2.5vh rgba(255, 215, 0, 0.4), inset 0 0 1vh rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
              >
                <span
                  className={`text-[2.2vh] font-black transition-colors duration-300 ${currentPage === page ? 'text-[#1a1a1a]' : (
                      'text-white/40 group-hover:text-white'
                    )
                    }`}
                >
                  {page}
                </span>

                {/* Hover tooltip */}
                <div
                  className='absolute right-full mr-[2vh] top-1/2 -translate-y-1/2 px-[1.5vh] py-[0.8vh] rounded-[1vh] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-[1vh] group-hover:translate-x-0'
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className='text-[1.4vh] text-white font-bold tracking-wider'>
                    Screen {page}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 导航箭头 & 首页 */}
          <div className='mt-[2vh] pt-[2vh] border-t border-white/10 flex flex-col gap-[1.2vh]'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='w-[5.5vh] h-[4.5vh] rounded-[1.2vh] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ChevronUp className='w-[2.4vh] h-[2.4vh] text-white/60 group-hover:text-white transition-colors' />
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='w-[5.5vh] h-[4.5vh] rounded-[1.2vh] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ChevronDown className='w-[2.4vh] h-[2.4vh] text-white/60 group-hover:text-white transition-colors' />
            </button>
            <Link
              href={'/'}
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch((err) => {
                    console.error(`Error attempting to exit full-screen mode: ${err.message}`);
                  });
                }
              }}
              className='w-[5.5vh] h-[5.5vh] rounded-[1.5vh] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 group mt-[0.5vh]'
              style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
              }}
            >
              <HomeIcon className='w-[2.4vh] h-[2.4vh] text-gold group-hover:text-white transition-colors' style={{ color: '#ffd700' }} />
            </Link>
          </div>
        </div>
      </div>

      {/* 首页快速入口提示 - 仅在首次访问时显示 */}
      {pathname === '/screen' && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm'>
          <div
            className='rounded-3xl p-12 max-w-2xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 149, 0, 0.05) 100%)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h2
              className='text-5xl font-black mb-8 text-center'
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Select Screen
            </h2>
            <div className='grid grid-cols-3 gap-6'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className='group relative aspect-square rounded-2xl transition-all duration-300 hover:scale-105'
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 149, 0, 0.1) 100%)',
                      border: '2px solid rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <div
                      className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      style={{
                        background:
                          'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                      }}
                    />
                    <div className='relative h-full flex flex-col items-center justify-center'>
                      <span className='text-6xl font-black text-white group-hover:text-black transition-colors duration-300'>
                        {page}
                      </span>
                      <span className='text-sm text-white/60 group-hover:text-black/60 transition-colors duration-300 mt-2'>
                        Page {page}
                      </span>
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
