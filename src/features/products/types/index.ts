export type ProductStatus = 'draft' | 'published' | 'archived';

export interface ProductEntity {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    status: ProductStatus;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductDto {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    status: ProductStatus;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateProductDto {
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    status?: ProductStatus;
}
