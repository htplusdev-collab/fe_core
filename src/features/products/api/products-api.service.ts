import { BaseApiService } from '@infrastructure/api';
import { type HttpClient } from '@infrastructure/http';
import { type ProductDto, type CreateProductDto, type UpdateProductDto } from '../types';

export class ProductsApiService extends BaseApiService<
    ProductDto,
    CreateProductDto,
    UpdateProductDto
> {
    constructor(http: HttpClient) {
        super(http, '/products');
    }
}
