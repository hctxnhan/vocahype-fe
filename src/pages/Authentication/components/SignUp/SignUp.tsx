import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { z } from 'zod';

import { MultiStepPage } from '@/components/layout/MultistepPage/MultistepPage';
import { Button } from '@/components/ui/button';
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
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import { signInUser, signUpUser } from '@/lib/configs/firebaseAuth';
import { signUpFormScheme } from '@/lib/formScheme/signUpFormScheme';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { AuthenticationThirdParty } from '../AuthenticationThirdParty';

export function SignUp(props: { goToSignIn: VoidFunction }) {
  const form = useForm<z.infer<typeof signUpFormScheme>>({
    resolver: zodResolver(signUpFormScheme),
  });
  const toast = useToast();
  const [, navigate] = useLocation();

  const { isLoading, start } = useAsyncAction<typeof signInUser>(signUpUser, {
    onSuccess: async user => {
      await updateProfile(user.user, {
        displayName: form.getValues('name'),
      });
      toast.success({
        title: 'Welcome',
        msg: 'Successfully signed up',
      });
      navigate('/');
    },
    onError: () => {
      toast.error({
        title: 'Error encountered while signing up',
        msg: 'This email is already in use by another account.',
      });
    },
  });

  function onSubmit(data: z.infer<typeof signUpFormScheme>) {
    start([data.email, data.password]);
  }

  return (
    <MultiStepPage.Root
      onFinish={form.handleSubmit(onSubmit) as VoidFunction}
      stepCount={2}
      className="vh-flex-column gap-4"
    >
      <Card className="bg-white">
        <Form {...form}>
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
            <MultiStepPage.StepContainer>
              <MultiStepPage.Step
                preCondition={() => form.trigger(['email', 'name'])}
              >
                <Fragment key={'info'}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
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
                </Fragment>
              </MultiStepPage.Step>
              <MultiStepPage.Step
                preCondition={() =>
                  form.trigger(['password', 'passwordConfirmation'])
                }
              >
                <Fragment key={'password'}>
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
                </Fragment>
              </MultiStepPage.Step>
            </MultiStepPage.StepContainer>
          </CardContent>
          <CardFooter>
            <div className="flex flex-1 flex-col gap-1">
              <MultiStepPage.NextButton
                lastStepText="Sign up"
                nextStepText="Next"
                className="w-full bg-brand-600 font-medium"
                isLoading={isLoading}
                type="submit"
              />
              <AuthenticationThirdParty />
            </div>
          </CardFooter>
        </Form>
      </Card>
    </MultiStepPage.Root>
  );
}
