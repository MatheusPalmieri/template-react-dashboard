import { useState } from 'react';

import { LayoutDashboard, LogOut, Menu, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/user/edit' },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const NavContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center border-b border-neutral-800 px-6">
        <span className="text-xl font-bold tracking-wider text-emerald-500">
          NEXUS
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-neutral-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-neutral-400 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40 lg:hidden"
          >
            <Menu className="h-6 w-6 text-neutral-400" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 border-neutral-800 bg-neutral-950 p-0 text-neutral-100"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-neutral-800 bg-neutral-950 lg:flex lg:flex-col">
        <NavContent />
      </aside>
    </>
  );
}
