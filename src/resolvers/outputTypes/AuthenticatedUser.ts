import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../entities/User';
import { IEntity } from '../../interfaces/IEntity';

@ObjectType({ implements: IEntity })
export class AuthenticatedUser {
  @Field(() => ID)
  public readonly token!: string;

  @Field(() => User)
  public user: User;
}
