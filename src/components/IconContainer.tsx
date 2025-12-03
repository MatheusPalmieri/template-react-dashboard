import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IconContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'cyan-purple' | 'green' | 'red' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'rounded';
}

const variantClasses = {
  'cyan-purple': 'from-cyan-500/20 to-purple-500/20 ring-white/10',
  green: 'from-green-500/20 to-emerald-500/20 ring-green-500/20',
  red: 'from-red-500/10 to-red-600/10 ring-red-500/20',
  blue: 'from-blue-500/20 to-cyan-500/20 ring-blue-500/20',
};

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
};

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

export function IconContainer({
  children,
  className,
  variant = 'cyan-purple',
  size = 'md',
  shape = 'rounded',
}: IconContainerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br ring-4',
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      {children}
    </div>
  );
}
