import { GradientText, IconContainer } from '@/components';

import { AuthGlassCard } from './AuthGlassCard';

interface AuthErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function AuthErrorState({
  title = 'Erro na autenticação',
  message,
  onRetry,
  retryLabel = 'Voltar para o login',
}: AuthErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthGlassCard variant="error" className="max-w-md">
        <div className="space-y-6 text-center">
          <IconContainer
            variant="red"
            size="md"
            shape="circle"
            className="mx-auto"
          >
            <svg
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </IconContainer>

          <div className="space-y-2">
            <GradientText as="h2" variant="red" className="text-2xl font-bold">
              {title}
            </GradientText>
            <p className="text-sm text-red-300/80">{message}</p>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/50"
            >
              <span className="relative z-10">{retryLabel}</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          )}
        </div>
      </AuthGlassCard>
    </div>
  );
}
