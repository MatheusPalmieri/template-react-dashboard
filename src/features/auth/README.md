# Auth Feature

Módulo de autenticação seguindo arquitetura feature-based para escalabilidade e manutenibilidade.

## 📁 Estrutura

```
auth/
├── components/          # Componentes específicos de autenticação
│   ├── AuthGlassCard.tsx       # Card glassmorphism para auth
│   ├── AuthLoadingState.tsx    # Estado de carregamento
│   ├── AuthErrorState.tsx      # Estado de erro
│   ├── EmailSentCard.tsx       # Card de email enviado
│   ├── LoginForm.tsx           # Formulário de login
│   ├── ResendTimer.tsx         # Timer de reenvio
│   └── index.ts
├── hooks/              # Hooks customizados de auth
│   ├── useAuthTimer.ts         # Gerencia timer de cooldown
│   ├── useMagicLinkAuth.ts     # Lógica de magic link
│   └── index.ts
├── layouts/            # Layouts específicos de auth
│   ├── AuthLayout.tsx          # Layout com background animado
│   └── index.ts
├── login/              # Sub-feature de login
│   └── schemas/
│       └── login.schema.ts     # Validação do formulário
├── index.ts            # Barrel export
└── README.md           # Esta documentação
```

## 🎯 Componentes

### AuthGlassCard

Card reutilizável com efeito glassmorphism para páginas de autenticação.

**Props:**

- `variant`: 'login' | 'success' | 'error' | 'loading'
- `children`: ReactNode
- `className`: string (opcional)

### AuthLoadingState

Estado de carregamento com spinner futurístico.

**Props:**

- `title`: string (padrão: 'Autenticando')
- `description`: string (padrão: 'Verificando suas credenciais...')

### AuthErrorState

Estado de erro com ícone e botão de retry.

**Props:**

- `title`: string (padrão: 'Erro na autenticação')
- `message`: string (obrigatório)
- `onRetry`: () => void (opcional)
- `retryLabel`: string (padrão: 'Voltar para o login')

### EmailSentCard

Card exibido após envio do email com timer de reenvio.

**Props:**

- `remainingTime`: number
- `onResend`: () => void
- `onBackToLogin`: () => void

### LoginForm

Formulário de login com validação.

**Props:**

- `form`: UseFormReturn<LoginProps>
- `onSubmit`: (data: LoginProps) => void
- `isSubmitting`: boolean

### ResendTimer

Timer visual para reenvio de email.

**Props:**

- `remainingTime`: number

## 🪝 Hooks

### useAuthTimer

Gerencia o timer de cooldown para reenvio de email.

**Retorno:**

- `remainingTime`: number - Tempo restante em segundos
- `startCooldown`: () => void - Inicia cooldown de 45s
- `handleRateLimitError`: (errorMessage: string) => void - Trata erro de rate limit
- `clearCooldown`: () => void - Limpa o cooldown

**Funcionalidades:**

- Persiste no localStorage
- Sincroniza entre reloads
- Extrai tempo real do erro do Supabase
- Countdown automático

### useMagicLinkAuth

Gerencia toda a lógica de autenticação via magic link.

**Retorno:**

- `emailSent`: boolean - Se o email foi enviado
- `remainingTime`: number - Tempo restante do cooldown
- `sendMagicLink`: (email: string) => Promise<void> - Envia magic link
- `resendMagicLink`: (email: string) => Promise<void> - Reenvia magic link
- `resetState`: () => void - Reseta o estado

**Funcionalidades:**

- Integração com Supabase
- Tratamento de erros de rate limit
- Gerenciamento automático de timer
- Validação de email

## 🎨 Layouts

### AuthLayout

Layout principal para páginas de autenticação com background animado.

**Funcionalidades:**

- Background com gradientes animados
- Grid futurístico
- Loading state inicial
- Suporte a imagem de blur opcional

## 📝 Schemas

### loginSchema

Schema de validação para o formulário de login usando Zod.

**Campos:**

- `email`: string (email válido, obrigatório)

## 🔧 Uso

### Exemplo: Página de Login

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { EmailSentCard, LoginForm } from '@/features/auth';
import { useMagicLinkAuth } from '@/features/auth';
import { type LoginProps, loginSchema } from '@/features/auth';

export default function LoginPage() {
  const { emailSent, remainingTime, sendMagicLink, resendMagicLink, resetState } =
    useMagicLinkAuth();

  const form = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email }: LoginProps) => {
    await sendMagicLink(email);
  };

  if (emailSent) {
    return (
      <EmailSentCard
        remainingTime={remainingTime}
        onResend={() => resendMagicLink(form.getValues('email'))}
        onBackToLogin={resetState}
      />
    );
  }

  return <LoginForm form={form} onSubmit={onSubmit} isSubmitting={form.formState.isSubmitting} />;
}
```

### Exemplo: Callback de Autenticação

```tsx
import { AuthErrorState, AuthLoadingState } from '@/features/auth';

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ... lógica de autenticação

  if (loading) {
    return <AuthLoadingState />;
  }

  if (error) {
    return <AuthErrorState message={error} onRetry={() => navigate('/', { replace: true })} />;
  }

  return null;
}
```

## 🚀 Benefícios da Arquitetura

1. **Separação de Responsabilidades**: Cada componente tem uma única responsabilidade
2. **Reutilização**: Componentes podem ser usados em diferentes contextos
3. **Testabilidade**: Fácil de testar componentes isoladamente
4. **Escalabilidade**: Fácil adicionar novas features de auth
5. **Manutenibilidade**: Código organizado e fácil de encontrar
6. **Type Safety**: TypeScript em todos os componentes e hooks

## 📦 Dependências

- `react-hook-form`: Gerenciamento de formulários
- `zod`: Validação de schemas
- `@supabase/supabase-js`: Autenticação
- `react-router-dom`: Navegação

## 🔐 Segurança

- Rate limiting de 45 segundos entre envios
- Validação de email no frontend e backend
- Magic links com expiração automática
- Tokens seguros via Supabase
