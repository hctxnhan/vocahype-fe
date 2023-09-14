import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';

import {
  Card,
  CardContent,
  CardFooter,
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
import { sendResetPassword } from '@/lib/configs/firebaseAuth';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { ResetPasswordLayout } from '../ResetPasswordLayout';

export function EnterEmail() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const toast = useToast();
  const { start, isLoading } = useAsyncAction(sendResetPassword, {
    onSuccess: () => {
      navigate('/');
      toast.success({ title: 'Reset password email has been sent' });
    },
    onError: () => {
      toast.error({
        title: 'Error encountered while sending reset password email',
      });
    },
  });

  const [, navigate] = useLocation();

  function onSubmit(data: { email: string }) {
    start([data.email]);
  }

  return (
    <ResetPasswordLayout>
      <Card className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
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
                      <FormDescription>
                        Please enter the email you using to sign up VocaHype
                        account.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <LoadingButton
                className="w-full bg-brand-600 font-medium text-white"
                type="submit"
                isLoading={isLoading}
              >
                Send
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </ResetPasswordLayout>
  );
}
