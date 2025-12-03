import { FuturisticSpinner, GradientText, LoadingDots } from '@/components';

import { AuthGlassCard } from './AuthGlassCard';

interface AuthLoadingStateProps {
  title?: string;
  description?: string;
}

export function AuthLoadingState({
  title = 'Autenticando',
  description = 'Verificando suas credenciais...',
}: AuthLoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthGlassCard variant="loading">
        <div className="flex flex-col items-center space-y-6">
          <FuturisticSpinner size="md" variant="triple" />

          <div className="space-y-2 text-center">
            <GradientText
              as="h2"
              variant="cyan-purple"
              className="text-2xl font-bold"
            >
              {title}
            </GradientText>
            <p className="text-sm text-gray-400">{description}</p>
          </div>

          <LoadingDots variant="cyan-purple" />
        </div>
      </AuthGlassCard>
    </div>
  );
}
