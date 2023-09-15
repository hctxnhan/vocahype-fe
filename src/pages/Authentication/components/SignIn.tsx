import { zodResolver } from '@hookform/resolvers/zod';
import { AuthErrorCodes } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'wouter';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { signInUser } from '@/lib/configs/firebaseAuth';
import { signInFormScheme } from '@/lib/formScheme/signInFormScheme';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

export function SignIn() {
  const form = useForm<z.infer<typeof signInFormScheme>>({
    resolver: zodResolver(signInFormScheme),
  });
  const toast = useToast('Error encountered while signing in');
  const [, navigate] = useLocation();

  const { start, isLoading } = useAsyncAction<typeof signInUser>(signInUser, {
    onSuccess: () => {
      toast.success({
        msg: 'Successfully signed in',
      });
      navigate('/');
    },
    onError: error => {
      switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          toast.error({
            msg: 'The password is invalid. Please try again.',
          });
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          toast.error({
            msg: 'The email is invalid. Please try again.',
          });
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          toast.error({
            msg: 'Too many attempts. Please try again later.',
          });
          break;
        default:
          toast.error();
          break;
      }
    },
  });

  function onSubmit(data: z.infer<typeof signInFormScheme>) {
    start([data.email, data.password]);
  }

  return (
    <Card className="bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
          <CardHeader>
            <CardDescription className="flex flex-col gap-2">
              <div>
                If you don’t have account. Just register one now before too
                late. Just kidding, it never too late to use VocaHype.
              </div>
              <div>Click here to quickly set your account up.</div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-1 flex-col gap-1">
              <LoadingButton
                className="w-full"
                type="submit"
                isLoading={isLoading}
              >
                Sign in
              </LoadingButton>
              <div className="text-center text-sm text-slate-600">
                Forgot password?{' '}
                <Link href="/auth/reset-password">
                  <a className="font-bold hover:cursor-pointer">Reset</a>
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
