import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { Sidebar } from '@/components/ui/Sidebar';
import { useAuth } from '@/hooks/useAuth';

export function PrivateLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950 text-emerald-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
