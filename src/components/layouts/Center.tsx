import type { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const ScreenCenter: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex h-dvh min-h-dvh w-full items-center justify-center',
        className
      )}
      {...props}
    />
  );
};
