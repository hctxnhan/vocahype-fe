import { PropsWithChildren } from 'react';
import { Redirect } from 'wouter';

import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';

interface ResetPasswordLayoutProps extends PropsWithChildren {
  showLoginText?: boolean;
}

export function ResetPasswordLayout({
  children,
  showLoginText = true,
}: ResetPasswordLayoutProps) {
  const { authState } = useAuthState();
  if (authState === AuthState.LOADING) return null;
  if (authState === AuthState.SIGNED_IN) return <Redirect to="/" />;

  return (
    <FillParent>
      <div className="absolute inset-0 -z-50 bg-sky-500/80" />
      <div className="w-[450px]">
        <div className="flex flex-col items-center gap-1 pb-8 text-sky-50">
          <div className="w-fit font-display text-3xl font-bold ">VocaHype</div>
          <div className="text-lg ">
            The only English learning app that you’ve ever need
          </div>
        </div>
        <Tabs defaultValue="resetPassword">
          <TabsList>
            <TabsTrigger value="resetPassword">Reset password</TabsTrigger>
          </TabsList>
          <TabsContent value="resetPassword">{children}</TabsContent>
        </Tabs>

        {showLoginText && (
          <div className="relative mt-2 text-center text-sm font-medium leading-9 text-sky-50">
            If that not you, return to login here
          </div>
        )}
      </div>
    </FillParent>
  );
}
