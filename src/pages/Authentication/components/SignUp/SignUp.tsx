import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { LoadingButton } from '@/components/ui/loading-button';
import { signInUser, signUpUser } from '@/lib/configs/firebaseAuth';
import { signUpFormScheme } from '@/lib/formScheme/signUpFormScheme';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { AuthenticationThirdParty } from '../AuthenticationThirdParty';

import { useSignUpMultiStepForm } from './useSignUpMultistepConfig';

export function SignUp(props: { goToSignIn: VoidFunction }) {
  const form = useForm<z.infer<typeof signUpFormScheme>>({
    resolver: zodResolver(signUpFormScheme),
  });
  const toast = useToast('Error encountered while signing up');
  const [, navigate] = useLocation();

  const { isLoading, start } = useAsyncAction<typeof signInUser>(signUpUser, {
    onSuccess: async user => {
      await updateProfile(user.user, {
        displayName: form.getValues('name'),
      });
      toast.success({
        msg: 'Successfully signed up',
      });
      navigate('/');
    },
    onError: () => {
      toast.error({
        msg: 'This email is already in use by another account.',
      });
    },
  });

  const { currentScreen, isLastStep, nextScreen } = useSignUpMultiStepForm(
    form,
    isLoading,
    {
      onFinish: () => {
        void form.handleSubmit(onSubmit)();
      },
    }
  );

  function onSubmit(data: z.infer<typeof signUpFormScheme>) {
    start([data.email, data.password]);
  }

  return (
    <>
      <Card className="bg-white">
        <Form {...form}>
          <form onSubmit={nextScreen as VoidFunction}>
            <CardHeader>
              <CardDescription className="flex flex-col gap-2">
                <div>
                  If you don’t have account. Just register one now before too
                  late. Just kidding, it never too late to use VocaHype.
                </div>
                <div>
                  Already have account?{' '}
                  <Button onClick={props.goToSignIn} variant={'link'}>
                    Sign in.
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex flex-col gap-4">{currentScreen}</div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-1 flex-col gap-1">
                <LoadingButton
                  className="w-full bg-brand-600 font-medium"
                  isLoading={isLoading}
                  type="submit"
                >
                  {isLastStep() ? 'Sign Up' : 'Next'}
                </LoadingButton>
                <AuthenticationThirdParty />
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
