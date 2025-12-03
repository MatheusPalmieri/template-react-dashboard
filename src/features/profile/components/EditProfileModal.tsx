import { useState } from 'react';

import type { User } from '@supabase/supabase-js';

import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib';

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditProfileModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  const [name, setName] = useState(user.user_metadata?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name },
      });

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-lg border border-neutral-800 bg-neutral-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
            <p className="mt-2 text-sm text-gray-400">
              Atualize suas informações pessoais
            </p>
          </div>

          <div className="h-px bg-neutral-800"></div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white transition-colors placeholder:text-gray-500 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 focus:outline-none"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                O email não pode ser alterado
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="h-px bg-neutral-800"></div>

          <div className="space-y-3">
            <Button
              isFullWidth
              type="submit"
              disabled={loading || !name.trim()}
              className="flex items-center justify-center space-x-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
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
                  <span>Salvando...</span>
                </>
              ) : (
                <span>Salvar Alterações</span>
              )}
            </Button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
