import * as z from 'zod';

export const updateProfileFormScheme = z.object({
  avatar: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  name: z.string({
    required_error: 'Name is required',
  }),
  phoneNumber: z.string({
    required_error: 'Phone Number is required',
  }),
});
