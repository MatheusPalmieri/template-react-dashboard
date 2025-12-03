import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  variant?: 'orbs' | 'grid' | 'both';
  className?: string;
}

export function AnimatedBackground({
  variant = 'both',
  className,
}: AnimatedBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 -z-10', className)}>
      {/* Animated gradient orbs */}
      {(variant === 'orbs' || variant === 'both') && (
        <>
          <div
            className="absolute top-[20%] left-[20%] h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
            style={{ animationDuration: '4s' }}
          ></div>
          <div
            className="absolute right-[20%] bottom-[20%] h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-[50%] left-[50%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
            style={{ animationDuration: '5s', animationDelay: '2s' }}
          ></div>
        </>
      )}

      {/* Grid overlay for futuristic feel */}
      {(variant === 'grid' || variant === 'both') && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] bg-[size:100px_100px]"></div>
      )}
    </div>
  );
}
