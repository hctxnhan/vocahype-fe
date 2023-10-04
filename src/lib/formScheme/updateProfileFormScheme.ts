import * as z from 'zod';

export const updateProfileFormScheme = z.object({
  avatar: z.any().optional(),
  email: z
    .string()
    .nonempty({
      message: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  name: z.string().nonempty({
    message: 'Name is required',
  }),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
});
