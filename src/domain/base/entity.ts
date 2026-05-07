export interface IIdentifiable<TId = string> {
    readonly id: TId;
}

export interface ITimestamped {
    readonly createdAt: string;
    readonly updatedAt: string;
}

export abstract class AbstractEntity<TId = string> implements IIdentifiable<TId> {
    abstract readonly id: TId;

    equals(other: AbstractEntity<TId>): boolean {
        return this.id === other.id;
    }
}

export abstract class TimestampedEntity<TId = string>
    extends AbstractEntity<TId>
    implements ITimestamped
{
    abstract readonly createdAt: string;
    abstract readonly updatedAt: string;
}
