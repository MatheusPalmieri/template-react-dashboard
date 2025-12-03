import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'cyan-purple' | 'green' | 'red' | 'blue';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const gradientVariants = {
  'cyan-purple': 'from-cyan-400 via-blue-400 to-purple-400',
  green: 'from-green-400 via-emerald-400 to-teal-400',
  red: 'from-red-400 via-red-500 to-red-600',
  blue: 'from-blue-400 via-cyan-400 to-blue-500',
};

export function GradientText({
  children,
  className,
  variant = 'cyan-purple',
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradientVariants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
