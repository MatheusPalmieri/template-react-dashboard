import { cn } from '@/lib/utils';

interface FuturisticSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'triple' | 'single';
  className?: string;
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
};

export function FuturisticSpinner({
  size = 'md',
  variant = 'triple',
  className,
}: FuturisticSpinnerProps) {
  if (variant === 'single') {
    return (
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-700 border-t-cyan-400',
          sizeClasses[size],
          className
        )}
      ></div>
    );
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-400"></div>
      {/* Middle ring */}
      <div
        className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400"
        style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
      ></div>
      {/* Inner ring */}
      <div
        className="absolute inset-4 animate-spin rounded-full border-4 border-transparent border-t-purple-400 border-r-cyan-400"
        style={{ animationDuration: '2s' }}
      ></div>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
    </div>
  );
}
