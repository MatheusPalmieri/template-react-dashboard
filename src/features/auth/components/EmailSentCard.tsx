import { GradientText, IconContainer } from '@/components';
import { Button } from '@/components/ui/Button';

import { AuthGlassCard } from './AuthGlassCard';
import { ResendTimer } from './ResendTimer';

interface EmailSentCardProps {
  remainingTime: number;
  onResend: () => void;
  onBackToLogin: () => void;
}

export function EmailSentCard({
  remainingTime,
  onResend,
  onBackToLogin,
}: EmailSentCardProps) {
  const canResend = remainingTime === 0;

  return (
    <AuthGlassCard variant="success" className="w-full max-w-md">
      <div className="space-y-6">
        <IconContainer
          variant="green"
          size="lg"
          shape="circle"
          className="mx-auto"
        >
          <svg
            className="h-10 w-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </IconContainer>

        <GradientText
          as="h1"
          variant="green"
          className="text-center text-2xl font-bold"
        >
          Verifique seu email
        </GradientText>

        <p className="text-center text-sm leading-relaxed text-gray-300">
          Enviamos um link mágico para o seu email. Clique no link para acessar
          sua conta de forma segura.
        </p>

        {remainingTime > 0 && <ResendTimer remainingTime={remainingTime} />}

        <div className="flex items-center space-x-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </div>

        <Button
          isFullWidth
          onClick={onResend}
          variant="secondary"
          disabled={!canResend}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="relative z-10">
            {canResend ? 'Enviar novamente' : 'Aguarde para reenviar'}
          </span>
        </Button>

        <button
          onClick={onBackToLogin}
          className="w-full text-center text-xs text-gray-500 transition-colors hover:text-gray-300"
        >
          Voltar ao login
        </button>
      </div>
    </AuthGlassCard>
  );
}
