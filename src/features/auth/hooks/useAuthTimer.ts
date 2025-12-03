import { useEffect, useState } from 'react';

const RESEND_COOLDOWN_KEY = 'auth_resend_cooldown';
const COOLDOWN_DURATION = 45; // seconds

interface UseAuthTimerReturn {
  remainingTime: number;
  startCooldown: () => void;
  handleRateLimitError: (errorMessage: string) => void;
  clearCooldown: () => void;
}

export function useAuthTimer(): UseAuthTimerReturn {
  const [remainingTime, setRemainingTime] = useState(0);

  // Check localStorage on mount
  useEffect(() => {
    const storedCooldown = localStorage.getItem(RESEND_COOLDOWN_KEY);
    if (storedCooldown) {
      const cooldownEnd = parseInt(storedCooldown, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((cooldownEnd - now) / 1000));

      if (remaining > 0) {
        setRemainingTime(remaining);
      } else {
        localStorage.removeItem(RESEND_COOLDOWN_KEY);
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          localStorage.removeItem(RESEND_COOLDOWN_KEY);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const startCooldown = () => {
    const cooldownEnd = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(RESEND_COOLDOWN_KEY, cooldownEnd.toString());
    setRemainingTime(COOLDOWN_DURATION);
  };

  const handleRateLimitError = (errorMessage: string) => {
    // Extract seconds from error message (this is the ACTUAL remaining time from Supabase)
    const match = errorMessage.match(/after (\d+) seconds/);
    const actualRemainingSeconds = match
      ? parseInt(match[1], 10)
      : COOLDOWN_DURATION;

    // Check if we already have a cooldown stored
    const storedCooldown = localStorage.getItem(RESEND_COOLDOWN_KEY);

    if (storedCooldown) {
      // If we have a stored cooldown, calculate the remaining time
      const cooldownEnd = parseInt(storedCooldown, 10);
      const now = Date.now();
      const storedRemaining = Math.max(
        0,
        Math.ceil((cooldownEnd - now) / 1000)
      );

      // Use the stored remaining time if it's valid, otherwise use the error time
      const finalRemaining =
        storedRemaining > 0 ? storedRemaining : actualRemainingSeconds;

      // Update cooldown end based on actual remaining time
      const newCooldownEnd = Date.now() + finalRemaining * 1000;
      localStorage.setItem(RESEND_COOLDOWN_KEY, newCooldownEnd.toString());
      setRemainingTime(finalRemaining);
    } else {
      // No stored cooldown, use the time from error
      const cooldownEnd = Date.now() + actualRemainingSeconds * 1000;
      localStorage.setItem(RESEND_COOLDOWN_KEY, cooldownEnd.toString());
      setRemainingTime(actualRemainingSeconds);
    }
  };

  const clearCooldown = () => {
    localStorage.removeItem(RESEND_COOLDOWN_KEY);
    setRemainingTime(0);
  };

  return {
    remainingTime,
    startCooldown,
    handleRateLimitError,
    clearCooldown,
  };
}
