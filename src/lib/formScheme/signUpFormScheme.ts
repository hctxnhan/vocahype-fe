import * as z from 'zod';
import { regexElementSatisfied } from '../utils/regex';

export const signUpFormScheme = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Email is invalid',
      }),
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
    name: z.string({
      required_error: 'Name is required',
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
