import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
  variant?: 'cyan-purple' | 'green' | 'red' | 'blue';
}

const variantClasses = {
  'cyan-purple': ['bg-cyan-400', 'bg-blue-400', 'bg-purple-400'],
  green: ['bg-green-400', 'bg-emerald-400', 'bg-teal-400'],
  red: ['bg-red-400', 'bg-red-500', 'bg-red-600'],
  blue: ['bg-blue-400', 'bg-cyan-400', 'bg-blue-500'],
};

export function LoadingDots({
  className,
  variant = 'cyan-purple',
}: LoadingDotsProps) {
  const colors = variantClasses[variant];

  return (
    <div className={cn('flex space-x-2', className)}>
      <div
        className={cn('h-2 w-2 animate-bounce rounded-full', colors[0])}
        style={{ animationDelay: '0s' }}
      ></div>
      <div
        className={cn('h-2 w-2 animate-bounce rounded-full', colors[1])}
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className={cn('h-2 w-2 animate-bounce rounded-full', colors[2])}
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  );
}
