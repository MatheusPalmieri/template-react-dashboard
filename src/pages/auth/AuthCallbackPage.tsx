import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthErrorState, AuthLoadingState } from '@/features/auth/components';
import { supabase } from '@/lib';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle the magic link callback
    const handleCallback = async () => {
      try {
        // The Supabase client automatically processes the tokens from the URL
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error during authentication:', error);
          setError(error.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          // User is authenticated successfully
          // Check if this window was opened from another window (likely from email link)
          // If so, we can try to close it or communicate with the opener
          if (window.opener && !window.opener.closed) {
            // Try to redirect the opener window to home
            try {
              window.opener.location.href = '/home';
              // Close this window after a short delay
              setTimeout(() => {
                window.close();
              }, 500);
            } catch {
              // If we can't access opener (cross-origin), just redirect normally
              navigate('/dashboard', { replace: true });
            }
          } else {
            // Normal redirect if no opener window
            navigate('/dashboard', { replace: true });
          }
        } else {
          setError('No session found. Please try again.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate]);

  if (loading) {
    return <AuthLoadingState />;
  }

  if (error) {
    return (
      <AuthErrorState
        message={error}
        onRetry={() => navigate('/', { replace: true })}
      />
    );
  }

  return null;
}
