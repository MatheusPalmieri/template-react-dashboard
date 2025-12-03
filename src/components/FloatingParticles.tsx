import { cn } from '@/lib/utils';

interface FloatingParticlesProps {
  className?: string;
  variant?: 'cyan-purple' | 'green' | 'red' | 'blue';
}

const variantClasses = {
  'cyan-purple': [
    'bg-cyan-400/30',
    'bg-purple-400/30',
    'bg-blue-400/30',
    'bg-cyan-400/30',
  ],
  green: [
    'bg-green-400/30',
    'bg-emerald-400/30',
    'bg-teal-400/30',
    'bg-green-400/30',
  ],
  red: ['bg-red-400/30', 'bg-red-500/30', 'bg-red-600/30', 'bg-red-400/30'],
  blue: [
    'bg-blue-400/30',
    'bg-cyan-400/30',
    'bg-blue-500/30',
    'bg-cyan-400/30',
  ],
};

export function FloatingParticles({
  className,
  variant = 'cyan-purple',
}: FloatingParticlesProps) {
  const colors = variantClasses[variant];

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 -z-20', className)}
    >
      <div
        className={cn(
          'absolute top-[20%] left-[10%] h-2 w-2 animate-pulse rounded-full blur-sm',
          colors[0]
        )}
      ></div>
      <div
        className={cn(
          'absolute top-[30%] right-[15%] h-2 w-2 animate-pulse rounded-full blur-sm',
          colors[1]
        )}
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className={cn(
          'absolute bottom-[25%] left-[20%] h-2 w-2 animate-pulse rounded-full blur-sm',
          colors[2]
        )}
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className={cn(
          'absolute right-[10%] bottom-[20%] h-2 w-2 animate-pulse rounded-full blur-sm',
          colors[3]
        )}
        style={{ animationDelay: '1.5s' }}
      ></div>
    </div>
  );
}
