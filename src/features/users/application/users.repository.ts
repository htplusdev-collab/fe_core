import { BaseRepository } from '@infrastructure/repository';
import { httpClient } from '@core/config';
import { type UserDto, type CreateUserDto, type UpdateUserDto } from '../types';
import { type User } from '../domain';
import { userMapper } from '../domain';
import { UsersApiService } from '../api';

class UsersRepository extends BaseRepository<User, UserDto, CreateUserDto, UpdateUserDto> {
    constructor() {
        super(new UsersApiService(httpClient), userMapper);
    }
}

export const usersRepository = new UsersRepository();
