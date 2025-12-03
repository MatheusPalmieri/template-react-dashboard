import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { EmailSentCard, LoginForm } from '@/features/auth/components';
import { useMagicLinkAuth } from '@/features/auth/hooks';
import {
  type LoginProps,
  loginSchema,
} from '@/features/auth/login/schemas/login.schema';

export default function LoginPage() {
  const {
    emailSent,
    remainingTime,
    sendMagicLink,
    resendMagicLink,
    resetState,
  } = useMagicLinkAuth();

  const form = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email }: LoginProps) => {
    await sendMagicLink(email);
  };

  const handleResend = async () => {
    const email = form.getValues('email');
    if (!email) {
      resetState();
      return;
    }

    await resendMagicLink(email);
  };

  if (emailSent) {
    return (
      <EmailSentCard
        remainingTime={remainingTime}
        onResend={handleResend}
        onBackToLogin={resetState}
      />
    );
  }

  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={form.formState.isSubmitting}
    />
  );
}
