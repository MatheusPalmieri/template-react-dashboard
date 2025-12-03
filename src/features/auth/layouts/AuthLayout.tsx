import { useLayoutEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { AnimatedBackground, FuturisticSpinner } from '@/components';
import { ScreenCenter } from '@/components/layouts/Center';
import { cn } from '@/lib/utils';

export const AuthLayout = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="relative">
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-3xl"></div>
          </div>

          <FuturisticSpinner size="md" variant="single" />
        </div>
      </div>
    );
  }

  return (
    <ScreenCenter
      className={cn(
        'relative overflow-hidden p-6',
        'bg-gradient-to-br from-gray-900 via-slate-900 to-black'
      )}
    >
      <AnimatedBackground variant="both" />

      {/* Optional: Fallback blur image with overlay */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/blur.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>

      <Outlet />
    </ScreenCenter>
  );
};
