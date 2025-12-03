import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { EditProfileModal, ProfileModal, useProfile } from '@/features/profile';
import { AppSidebar } from '@/features/shared';
import { useAuth } from '@/hooks/useAuth';

export function PrivateLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const {
    isProfileOpen,
    isEditOpen,
    openProfile,
    closeProfile,
    openEdit,
    closeEdit,
    handleEditSuccess,
  } = useProfile();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-700 border-t-cyan-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      <AppSidebar user={user} onProfileClick={openProfile} />

      <main className="flex-1 overflow-y-auto bg-neutral-900 p-8">
        <Outlet />
      </main>

      {/* Modals */}
      <ProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={closeProfile}
        onEditClick={openEdit}
      />
      <EditProfileModal
        user={user}
        isOpen={isEditOpen}
        onClose={closeEdit}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
