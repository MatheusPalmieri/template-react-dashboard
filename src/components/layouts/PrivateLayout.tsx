import { useLayoutEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

export const PrivateLayout = () => {
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
    <div className="space-y-5">
      <h1>Private Layout</h1>

      <Outlet />
    </div>
  );
};
