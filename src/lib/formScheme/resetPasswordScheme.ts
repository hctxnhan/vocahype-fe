import * as z from 'zod';

import { regexElementSatisfied } from '../utils/regex';

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      }),
    passwordConfirmation: z.string({
      required_error: 'Password confirmation is required',
    }),
  })
  .superRefine((value, ctx) => {
    const { password, passwordConfirmation } = value;

    if (regexElementSatisfied(password) < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is too weak',
        path: ['password'],
      });
    }

    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      });
    }
  });
