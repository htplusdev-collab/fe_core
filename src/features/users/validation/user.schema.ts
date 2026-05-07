import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.email('Please enter a valid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    role: z.enum(['admin', 'manager', 'user', 'viewer']),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const updateUserSchema = z.object({
    email: z.email('Please enter a valid email address').optional(),
    firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
    role: z.enum(['admin', 'manager', 'user', 'viewer']).optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
