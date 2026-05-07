import { BaseMapper } from '@domain/contracts';
import { type ProductDto } from '../types';
import { Product } from './product.entity';

export class ProductMapper extends BaseMapper<Product, ProductDto> {
    toDomain(dto: ProductDto): Product {
        return new Product(
            dto.id,
            dto.name,
            dto.description,
            dto.sku,
            dto.price,
            dto.stock,
            dto.category,
            dto.status,
            dto.created_at,
            dto.updated_at,
            dto.image_url,
        );
    }

    toDto(domain: Product): ProductDto {
        return {
            id: domain.id,
            name: domain.name,
            description: domain.description,
            sku: domain.sku,
            price: domain.price,
            stock: domain.stock,
            category: domain.category,
            status: domain.status,
            image_url: domain.imageUrl,
            created_at: domain.createdAt,
            updated_at: domain.updatedAt,
        };
    }
}

export const productMapper = new ProductMapper();
