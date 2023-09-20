import { useState } from 'react';
import { Redirect } from 'wouter';

import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';

import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';

export function Authentication() {
  const [activeTab, setActiveTab] = useState<string>('signIn');

  const { authState } = useAuthState();

  if (authState === AuthState.LOADING) return null;
  if (authState === AuthState.SIGNED_IN) return <Redirect to="/" />;

  return (
    <FillParent>
      <div className="absolute inset-0 -z-50 bg-brand-500/80" />
      <div className="w-[450px]">
        <div className="flex flex-col items-center gap-1 pb-8 text-sky-50">
          <div className="w-fit font-display text-4xl font-bold ">VocaHype</div>
          <div className="text-lg">
            The only English learning app that you’ve ever need
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <SignIn goToSignUp={() => setActiveTab('signUp')} />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUp goToSignIn={() => setActiveTab('signIn')} />
          </TabsContent>
        </Tabs>
      </div>
    </FillParent>
  );
}
