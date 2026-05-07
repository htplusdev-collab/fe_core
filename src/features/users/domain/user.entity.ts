import { TimestampedEntity } from '@domain/base';
import { type UserStatus } from '../types';

export class User extends TimestampedEntity {
    constructor(
        readonly id: string,
        readonly email: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly role: string,
        readonly status: UserStatus,
        readonly createdAt: string,
        readonly updatedAt: string,
        readonly avatar?: string,
    ) {
        super();
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get isActive(): boolean {
        return this.status === 'active';
    }

    get initials(): string {
        return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
    }
}
