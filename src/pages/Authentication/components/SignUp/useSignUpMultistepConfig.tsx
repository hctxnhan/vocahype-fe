import { Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import { useMultistep } from '@/lib/hooks/useMultiStep';

export function useSignUpMultiStepForm(
  form: UseFormReturn<
    {
      email: string;
      password: string;
      passwordConfirmation: string;
      name: string;
    },
    any
  >,
  isLoading: boolean,
  configs: Parameters<typeof useMultistep>[1]
) {
  const screens = [
    {
      screen: (
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
      ),
    },
    {
      screen: (
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

          <PasswordStrengthIndicator password={form.watch('password') ?? ''} />

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
      ),
    },
  ];

  return useMultistep(screens, configs);
}
