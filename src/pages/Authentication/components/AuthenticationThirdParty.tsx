import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/lib/configs/firebaseAuth';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';

export function AuthenticationThirdParty() {
  const { start: login, isLoading } = useAsyncAction(signInWithGoogle);

  return (
    <div className='vh-flex-col'>
      <div className="relative mt-3 text-center text-sm text-foreground/70">
        Or continue with
      </div>

      <div className="mt-2 flex w-full gap-2">
        <Button
          disabled={isLoading}
          className="flex-1 bg-[#f44242]
            hover:bg-[#fa5a5a]
            border-b-[#a73131]
          text-white"
          onClick={login.bind(null, []) as VoidFunction}
        >
          Google
        </Button>
        <Button
          disabled={true}
          className="flex-1 text-white"
        >
          Facebook
        </Button>
      </div>
    </div>
  );
}
