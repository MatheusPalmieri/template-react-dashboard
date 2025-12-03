import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'green' | 'red' | 'blue';
  size?: 'sm' | 'md' | 'lg';
}

const glowColorClasses = {
  cyan: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20',
  purple: 'from-purple-500/20 via-pink-500/20 to-purple-500/20',
  green: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
  red: 'from-red-500/20 via-red-600/20 to-red-500/20',
  blue: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
};

const sizeClasses = {
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12',
};

export function GlassCard({
  children,
  className,
  glowColor = 'cyan',
  size = 'md',
}: GlassCardProps) {
  return (
    <div className="relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-3xl',
            glowColorClasses[glowColor]
          )}
        ></div>
      </div>

      {/* Glass card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-2xl backdrop-blur-2xl',
          sizeClasses[size],
          className
        )}
      >
        {/* Animated border gradient */}
        <div
          className={cn(
            'absolute inset-0 -z-10 animate-pulse rounded-3xl bg-gradient-to-r opacity-50 blur-xl',
            glowColorClasses[glowColor]
          )}
        ></div>

        {children}
      </div>
    </div>
  );
}
