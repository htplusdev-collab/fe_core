import { BaseMapper } from '@domain/contracts';
import { type UserDto } from '../types';
import { User } from './user.entity';

export class UserMapper extends BaseMapper<User, UserDto> {
    toDomain(dto: UserDto): User {
        return new User(
            dto.id,
            dto.email,
            dto.first_name,
            dto.last_name,
            dto.role,
            dto.status,
            dto.created_at,
            dto.updated_at,
            dto.avatar,
        );
    }

    toDto(domain: User): UserDto {
        return {
            id: domain.id,
            email: domain.email,
            first_name: domain.firstName,
            last_name: domain.lastName,
            role: domain.role,
            status: domain.status,
            avatar: domain.avatar,
            created_at: domain.createdAt,
            updated_at: domain.updatedAt,
        };
    }
}

export const userMapper = new UserMapper();
