import { useState } from 'react';

import type { User } from '@supabase/supabase-js';
import {
  ChevronLeft,
  Home,
  LogOut,
  Menu,
  User as UserIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { supabase } from '@/lib';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  user: User;
  onProfileClick: () => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
];

export function AppSidebar({ user, onProfileClick }: AppSidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const email = user.email || '';
  const name = user.user_metadata?.name || email.split('@')[0];
  const avatar = user.user_metadata?.avatar_url;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-neutral-900 p-2 text-white lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-neutral-950 transition-all duration-300 lg:static',
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-4">
            {isOpen && (
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600">
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
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-neutral-800 hover:text-white lg:block"
            >
              <ChevronLeft
                className={cn(
                  'h-5 w-5 transition-transform',
                  !isOpen && 'rotate-180'
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {isOpen && (
              <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Menu
              </p>
            )}
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2.5 transition-colors',
                    isOpen ? 'space-x-3' : 'justify-center',
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-400 hover:bg-neutral-900 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="mt-auto border-t border-neutral-800 p-4">
            <div className="space-y-3">
              <button
                onClick={onProfileClick}
                className={cn(
                  'group w-full rounded-lg transition-all',
                  isOpen
                    ? 'bg-neutral-900 p-3 hover:bg-neutral-800'
                    : 'flex justify-center p-2 hover:bg-neutral-900'
                )}
              >
                {isOpen ? (
                  <div className="flex items-center space-x-3">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <UserIcon className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-neutral-950 bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="truncate text-sm font-semibold text-white">
                        {name}
                      </p>
                      <p className="truncate text-xs text-gray-400">{email}</p>
                    </div>
                    <svg
                      className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="relative h-10 w-10">
                    <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <UserIcon className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-neutral-950 bg-green-500"></div>
                  </div>
                )}
              </button>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className={cn(
                  'group flex w-full items-center rounded-lg border border-neutral-800 px-3 py-2.5 text-sm font-medium text-red-400 transition-all hover:border-red-600/50 hover:bg-red-600/10',
                  isOpen ? 'justify-center space-x-2' : 'justify-center'
                )}
              >
                <LogOut className="h-4 w-4" />
                {isOpen && <span>Sair</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
