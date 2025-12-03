import type { ReactNode } from 'react';

import { GlassCard } from '@/components';

interface AuthGlassCardProps {
  children: ReactNode;
  variant?: 'login' | 'success' | 'error' | 'loading';
  className?: string;
}

const variantToGlowColor = {
  login: 'cyan' as const,
  success: 'green' as const,
  error: 'red' as const,
  loading: 'cyan' as const,
};

export function AuthGlassCard({
  children,
  variant = 'login',
  className,
}: AuthGlassCardProps) {
  return (
    <GlassCard
      size="md"
      glowColor={variantToGlowColor[variant]}
      className={className}
    >
      {children}
    </GlassCard>
  );
}
