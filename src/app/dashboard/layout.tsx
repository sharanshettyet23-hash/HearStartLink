'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut as firebaseSignOut } from 'firebase/auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Baby,
  ClipboardCheck,
  ListChecks,
  Ear,
  LogOut,
  UserCircle,
  AlertTriangle,
  LayoutDashboard,
  FileText,
  Users,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { AppLogo } from '@/components/icons';
import { useTheme } from 'next-themes';
import { InfantProvider, useInfant } from '@/hooks/use-infant';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/infants', icon: Users, label: 'Manage Infants' },
  { href: '/dashboard/profile', icon: Baby, label: 'Infant Profile' },
  { href: '/dashboard/risk-factors', icon: AlertTriangle, label: 'Risk Factors' },
  { href: '/dashboard/screening', icon: ClipboardCheck, label: 'Screening' },
  { href: '/dashboard/ling-test', icon: Ear, label: 'Ling-6 Test' },
  { href: '/dashboard/milestones', icon: ListChecks, label: 'Milestones' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', emoji: '🌅' };
  if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️' };
  return { text: 'Good Evening', emoji: '🌙' };
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { setTheme } = useTheme();
  const { selectedInfant } = useInfant();
  const greeting = getGreeting();

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };

  const currentPage = navItems.find(item => item.href === pathname);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              <AppLogo className="w-8 h-8" />
            </motion.div>
            <span className="text-lg font-semibold font-headline bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              HearStart
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item, index) => (
              <SidebarMenuItem key={item.href}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label, side: 'right' }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </motion.div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} tooltip={{ children: 'Logout', side: 'right' }}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30"
        >
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {selectedInfant ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="p-1.5 rounded-full bg-primary/10">
                  <Baby className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-lg">{selectedInfant.name}</span>
                  <span className="text-muted-foreground text-sm ml-3 hidden sm:inline">
                    {greeting.emoji} {greeting.text}!
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-muted-foreground">Select an infant from Manage Infants to get started</span>
              </div>
            )}
          </div>

          {/* Current page indicator */}
          {currentPage && pathname !== '/dashboard' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10"
            >
              <currentPage.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">{currentPage.label}</span>
            </motion.div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.photoURL ?? ''} />
                  <AvatarFallback>
                    <UserCircle />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="ml-2">Toggle theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.header>
        <main className="flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <InfantProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </InfantProvider>
  );
}
