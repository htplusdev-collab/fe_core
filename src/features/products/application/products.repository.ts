import { BaseRepository } from '@infrastructure/repository';
import { httpClient } from '@core/config';
import { type ProductDto, type CreateProductDto, type UpdateProductDto } from '../types';
import { type Product } from '../domain';
import { productMapper } from '../domain';
import { ProductsApiService } from '../api';

class ProductsRepository extends BaseRepository<
    Product,
    ProductDto,
    CreateProductDto,
    UpdateProductDto
> {
    constructor() {
        super(new ProductsApiService(httpClient), productMapper);
    }
}

export const productsRepository = new ProductsRepository();
