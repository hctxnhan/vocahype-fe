import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLocation } from 'wouter';

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
      <Card className="bg-white/80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardHeader>
              <CardTitle>Create new account</CardTitle>
              <CardDescription>
                If you don’t have account. Just register one now before too
                late. Just kidding, it never too late to use VocaHype.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Lionel Messy"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We will use this name to display on your profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="lionelmessy@mail.com"
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
                          type="password"
                          placeholder="12345678abc@_#"
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
                          type="password"
                          placeholder="12345678abc@_#"
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
                className="w-full"
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
