import { TimestampedEntity } from '@domain/base';
import { type ProductStatus } from '../types';

export class Product extends TimestampedEntity {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly sku: string,
        readonly price: number,
        readonly stock: number,
        readonly category: string,
        readonly status: ProductStatus,
        readonly createdAt: string,
        readonly updatedAt: string,
        readonly imageUrl?: string,
    ) {
        super();
    }

    get isPublished(): boolean {
        return this.status === 'published';
    }

    get isInStock(): boolean {
        return this.stock > 0;
    }

    get formattedPrice(): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(this.price);
    }
}
