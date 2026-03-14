'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/login-form';
import { SignUpForm } from '@/components/signup-form';
import { AppLogo } from '@/components/icons';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthDialog({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-center sm:justify-start">
            <AppLogo className="h-8 w-8" />
            <span className="font-headline text-xl">HearStart</span>
          </DialogTitle>
          <DialogDescription>
            Your journey to monitoring early hearing starts here.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} key={defaultTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
