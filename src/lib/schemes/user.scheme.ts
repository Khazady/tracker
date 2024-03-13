import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/regex.constants';
import { z } from 'zod';

export const userScheme = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
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

export const loginUser = createUser;
