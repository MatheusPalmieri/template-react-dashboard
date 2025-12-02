import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, Input } from '@/components/forms';
import { Button } from '@/components/ui/Button';
import {
  type LoginProps,
  loginSchema,
} from '@/features/auth/login/schemas/login.schema';
import { supabase } from '@/lib';

export default function LoginPage() {
  const [emailSent, setEmailSent] = useState(false);
  const form = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email }: LoginProps) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Erro ao enviar magic link:', error);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('LoginPage.tsx', error);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-neutral-500 bg-neutral-800 p-4">
        <h1 className="text-center text-xl font-semibold">
          Verifique seu email
        </h1>
        <p className="text-center text-sm text-neutral-400">
          Enviamos um link de acesso para o seu email. Clique no link para fazer
          login.
        </p>
        <Button
          isFullWidth
          onClick={() => setEmailSent(false)}
          variant="secondary"
        >
          Enviar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl bg-neutral-900/40 p-4 shadow-xl backdrop-blur-3xl">
      <h1 className="text-center text-xl font-semibold">Welcome</h1>

      <Form form={form} onSubmit={onSubmit}>
        <Input form={form} name="email" label="Email" />

        <Button isFullWidth disabled={form.formState.isSubmitting}>
          Continue with email
        </Button>
      </Form>

      <p className="text-sm text-neutral-400">
        A magic link will be sent to your email to complete the sign-in process.
      </p>
    </div>
  );
}
