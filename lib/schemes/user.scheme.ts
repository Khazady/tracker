import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/regex.constants';
import { z } from 'zod';

const MAX_FILE_SIZE = 50_000_00;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const userScheme = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  image: z
    .custom<File>()
    .refine((file) => file?.name.length > 0, 'File is required.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Must be a JPG, PNG, or WEBP image.',
    )
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

export const createUser = userScheme.omit({
  id: true,
  name: true,
  image: true,
});

export const updateUserProfileScheme = z.object({
  name: userScheme.shape.name,
  image: userScheme.shape.image,
});

export const updateUserSettingsScheme = z.object({
  email: userScheme.shape.email,
  password: userScheme.shape.password,
});

export const loginUser = createUser;
