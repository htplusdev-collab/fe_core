export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: UserStatus;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDto {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    status: UserStatus;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateUserDto {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    status?: UserStatus;
}
