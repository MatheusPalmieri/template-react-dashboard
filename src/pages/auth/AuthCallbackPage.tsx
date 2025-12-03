import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <h2 className="text-xl font-semibold">Autenticando...</h2>
          <p className="text-gray-600">Por favor, aguarde.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-800">
            Erro na autenticação
          </h2>
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Voltar para o login
          </button>
        </div>
      </div>
    );
  }

  return null;
}
