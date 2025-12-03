import type { User } from '@supabase/supabase-js';

import { Button } from '@/components/ui/Button';

interface ProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
}

export function ProfileModal({
  user,
  isOpen,
  onClose,
  onEditClick,
}: ProfileModalProps) {
  if (!isOpen) return null;

  const email = user.email || 'Não informado';
  const name = user.user_metadata?.name || email.split('@')[0];
  const avatar = user.user_metadata?.avatar_url;
  const createdAt = new Date(user.created_at).toLocaleDateString('pt-BR');

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

        <div className="space-y-6">
          {/* Avatar and name */}
          <div className="flex flex-col items-center space-y-4">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-cyan-600">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-800"></div>

          {/* User info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-3">
              <span className="text-sm text-gray-400">Membro desde</span>
              <span className="text-sm font-medium text-white">
                {createdAt}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-3">
              <span className="text-sm text-gray-400">Status</span>
              <span className="flex items-center space-x-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                <span className="text-sm font-medium text-green-400">
                  Ativo
                </span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-800"></div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              isFullWidth
              onClick={onEditClick}
              className="flex items-center justify-center space-x-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Editar Perfil</span>
            </Button>

            <button
              onClick={onClose}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
