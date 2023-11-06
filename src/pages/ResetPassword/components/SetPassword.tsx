import { zodResolver } from '@hookform/resolvers/zod';
import { AuthErrorCodes } from 'firebase/auth';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { resetPassword } from '@/lib/configs/firebaseAuth';
import { resetPasswordSchema } from '@/lib/formScheme/resetPasswordScheme';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { multiScreenContext } from '@/lib/hooks/useMultiStep';
import { useToast } from '@/lib/hooks/useToast';

import { ResetPasswordLayout } from '../ResetPasswordLayout';

interface SetPasswordProps {
  apiKey: string;
  oobCode: string;
}

export function SetPassword({ apiKey, oobCode }: SetPasswordProps) {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const multiScreen = useContext(multiScreenContext);

  const toast = useToast();

  const { start } = useAsyncAction(resetPassword, {
    onSuccess: () => {
      multiScreen?.nextScreen();
      toast.success({
        title: 'Password reset successfully',
        msg: 'You can now sign in with your new password.',
      });
    },
    onError: error => {
      switch (error.code) {
        case AuthErrorCodes.EXPIRED_OOB_CODE:
          toast.error({
            title: 'The link has expired',
            msg: 'Please try again.',
          });
          break;
        case AuthErrorCodes.INVALID_OOB_CODE:
          toast.error({
            title: 'The link is invalid',
            msg: 'Please try again.',
          });
          break;
        default:
          toast.error({
            title: 'Something went wrong',
            msg: 'Please try again later.',
          });
          break;
      }
      navigate('/');
    },
  });

  const [, navigate] = useLocation();

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    start([apiKey, oobCode, data.password]);
  }

  return (
    <ResetPasswordLayout>
      <Card className="bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardHeader>
              <CardTitle>Set new password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PasswordStrengthIndicator password={form.watch('password')} />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <LoadingButton className="w-full" type="submit" isLoading={false}>
                Send
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </ResetPasswordLayout>
  );
}
