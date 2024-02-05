import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class UpdateUserInputType implements Partial<User> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

}
