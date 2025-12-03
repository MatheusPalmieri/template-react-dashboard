import { useState } from 'react';

export function useProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const openEdit = () => {
    setIsProfileOpen(false);
    setIsEditOpen(true);
  };

  const closeEdit = () => setIsEditOpen(false);

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    // Optionally reopen profile modal
    setTimeout(() => setIsProfileOpen(true), 300);
  };

  return {
    isProfileOpen,
    isEditOpen,
    openProfile,
    closeProfile,
    openEdit,
    closeEdit,
    handleEditSuccess,
  };
}
