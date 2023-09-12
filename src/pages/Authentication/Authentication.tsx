import { Redirect } from 'wouter';

import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signInWithGoogle } from '@/lib/configs/firebaseAuth';
import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';

import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

export function Authentication() {
  const { start, isLoading } = useAsyncAction(signInWithGoogle);
  const { authState } = useAuthState();
  if (authState === AuthState.LOADING) return null;
  if (authState === AuthState.SIGNED_IN) return <Redirect to="/" />;

  function login() {
    start();
  }

  return (
    <FillParent>
      <div className="absolute inset-0 -z-50 bg-sky-500/80" />
      <div className="w-[450px]">
        <div className="flex flex-col items-center gap-1 pb-8 text-sky-50">
          <div className="w-fit font-display text-4xl font-bold ">VocaHype</div>
          <div className="text-lg">
            The only English learning app that you’ve ever need
          </div>
        </div>
        <Tabs defaultValue="signIn">
          <TabsList>
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <SignIn />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUp />
          </TabsContent>
        </Tabs>

        {/* <div className="relative mt-8 text-center text-sm font-medium text-slate-500/60">
          Or continue with
        </div>

        <div className="mt-2 flex w-full gap-2">
          <Button
            disabled={isLoading}
            className="flex-1 bg-[#f44242] text-white"
            size="sm"
            onClick={login}
          >
            Google
          </Button>
          <Button
            disabled={true}
            size="sm"
            className="flex-1 bg-[#3B5998] text-white"
          >
            Facebook
          </Button>
        </div> */}
      </div>
    </FillParent>
  );
}
