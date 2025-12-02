import { useLayoutEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { ScreenCenter } from './Center';

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
    return <div>Loading...</div>;
  }

  return (
    <ScreenCenter
      className={cn(
        'p-6',
        'bg-[url("/images/blur.jpg")] bg-cover bg-center bg-no-repeat'
      )}
    >
      <Outlet />
    </ScreenCenter>
  );
};
