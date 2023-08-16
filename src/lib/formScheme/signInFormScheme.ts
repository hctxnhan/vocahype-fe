import * as z from 'zod';

export const signInFormScheme = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address',
    })
    .email('Please enter a valid email address'),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .min(1, 'Please enter a password'),
});
