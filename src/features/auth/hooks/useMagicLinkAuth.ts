import { useState } from 'react';

import { supabase } from '@/lib';

import { useAuthTimer } from './useAuthTimer';

interface UseMagicLinkAuthReturn {
  emailSent: boolean;
  remainingTime: number;
  sendMagicLink: (email: string) => Promise<void>;
  resendMagicLink: (email: string) => Promise<void>;
  resetState: () => void;
}

export function useMagicLinkAuth(): UseMagicLinkAuthReturn {
  const [emailSent, setEmailSent] = useState(false);
  const { remainingTime, startCooldown, handleRateLimitError, clearCooldown } =
    useAuthTimer();

  const sendMagicLink = async (email: string) => {
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

        // Check if error is about rate limiting
        if (error.message.includes('you can only request this after')) {
          handleRateLimitError(error.message);
          setEmailSent(true);
        }
      } else {
        setEmailSent(true);
        startCooldown();
      }
    } catch (error) {
      console.error('useMagicLinkAuth.ts', error);
    }
  };

  const resendMagicLink = async (email: string) => {
    if (remainingTime > 0) return;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Erro ao reenviar magic link:', error);

        // Check if error is about rate limiting
        if (error.message.includes('you can only request this after')) {
          handleRateLimitError(error.message);
        }
      } else {
        startCooldown();
      }
    } catch (error) {
      console.error('useMagicLinkAuth.ts', error);
    }
  };

  const resetState = () => {
    setEmailSent(false);
    clearCooldown();
  };

  return {
    emailSent,
    remainingTime,
    sendMagicLink,
    resendMagicLink,
    resetState,
  };
}
