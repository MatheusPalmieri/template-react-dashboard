import type { UseFormReturn } from 'react-hook-form';

import { FloatingParticles, GradientText, IconContainer } from '@/components';
import { Form, Input } from '@/components/forms';
import { Button } from '@/components/ui/Button';
import type { LoginProps } from '@/features/auth/login/schemas/login.schema';

import { AuthGlassCard } from './AuthGlassCard';

interface LoginFormProps {
  form: UseFormReturn<LoginProps>;
  onSubmit: (data: LoginProps) => void;
  isSubmitting: boolean;
}

export function LoginForm({ form, onSubmit, isSubmitting }: LoginFormProps) {
  return (
    <div className="relative w-full max-w-md">
      <AuthGlassCard variant="login">
        <div className="space-y-6">
          <IconContainer
            variant="cyan-purple"
            size="md"
            shape="rounded"
            className="mx-auto"
          >
            <svg
              className="h-8 w-8 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </IconContainer>

          <div className="space-y-2 text-center">
            <GradientText
              as="h1"
              variant="cyan-purple"
              className="text-3xl font-bold"
            >
              Bem-vindo
            </GradientText>
            <p className="text-sm text-gray-400">
              Entre com seu email para continuar
            </p>
          </div>

          <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-4">
              <Input
                form={form}
                name="email"
                label="Email"
                className="rounded-xl border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
              />

              <Button
                isFullWidth
                disabled={isSubmitting}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Continuar com email</span>
                  )}
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
            </div>
          </Form>

          <div className="flex items-center space-x-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          </div>

          <p className="text-center text-xs leading-relaxed text-gray-400">
            Um link mágico será enviado para seu email para completar o processo
            de autenticação de forma segura.
          </p>
        </div>
      </AuthGlassCard>

      <FloatingParticles variant="cyan-purple" />
    </div>
  );
}
