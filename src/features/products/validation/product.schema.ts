import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    sku: z
        .string()
        .min(3, 'SKU must be at least 3 characters')
        .regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
    price: z.coerce.number().positive('Price must be greater than 0'),
    stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
    category: z.string().min(1, 'Please select a category'),
});

export const updateProductSchema = z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    price: z.coerce.number().positive('Price must be greater than 0').optional(),
    stock: z.coerce.number().int().min(0, 'Stock cannot be negative').optional(),
    category: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;
