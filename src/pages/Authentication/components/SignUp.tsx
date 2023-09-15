import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
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
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import { signInUser, signUpUser } from '@/lib/configs/firebaseAuth';
import { signUpFormScheme } from '@/lib/formScheme/signUpFormScheme';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

export function SignUp() {
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

  function onSubmit(data: z.infer<typeof signUpFormScheme>) {
    start([data.email, data.password]);
  }

  return (
    <>
      <Card className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardHeader>
              <CardDescription className="flex flex-col gap-2">
                <div>
                  If you don’t have account. Just register one now before too
                  late. Just kidding, it never too late to use VocaHype.
                </div>
                <div>Already have account? Sign in.</div>
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
                        <Input
                          placeholder="Email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          disabled={isLoading}
                          {...field}
                        />
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
                        <Input
                          disabled={isLoading}
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PasswordStrengthIndicator
                  password={form.watch('password') ?? ''}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <LoadingButton
                className="w-full bg-brand-600 font-medium"
                type="submit"
                isLoading={isLoading}
              >
                Sign up
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
