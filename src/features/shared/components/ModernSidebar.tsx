import type { User } from '@supabase/supabase-js';
import { Link, useLocation } from 'react-router-dom';

import { supabase } from '@/lib';

interface ModernSidebarProps {
  user: User;
  onProfileClick: () => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
];

export function ModernSidebar({ user, onProfileClick }: ModernSidebarProps) {
  const location = useLocation();

  const email = user.email || '';
  const name = user.user_metadata?.name || email.split('@')[0];
  const avatar = user.user_metadata?.avatar_url;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="flex w-64 flex-col bg-neutral-950">
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-600">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Dashboard</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 h-px bg-neutral-800"></div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          Menu
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${
                isActive
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto space-y-2 p-4">
        <div className="mb-3 h-px bg-neutral-800"></div>

        <button
          onClick={onProfileClick}
          className="w-full rounded-lg bg-neutral-900 p-3 transition-colors hover:bg-neutral-800"
        >
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-cyan-600">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
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
            <div className="flex-1 text-left">
              <p className="truncate text-sm font-medium text-white">{name}</p>
              <p className="truncate text-xs text-gray-500">Ver perfil</p>
            </div>
          </div>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-600/10 px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-600 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
