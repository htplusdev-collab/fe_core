import { BaseApiService } from '@infrastructure/api';
import { type HttpClient } from '@infrastructure/http';
import { type UserDto, type CreateUserDto, type UpdateUserDto } from '../types';

export class UsersApiService extends BaseApiService<UserDto, CreateUserDto, UpdateUserDto> {
    constructor(http: HttpClient) {
        super(http, '/users');
    }
}
