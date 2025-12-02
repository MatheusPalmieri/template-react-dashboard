import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email.' })
    .min(1, { message: 'Email is required.' }),
});

type LoginProps = z.infer<typeof loginSchema>;

export { loginSchema, type LoginProps };
