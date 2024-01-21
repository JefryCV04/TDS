import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UpdateUserInputType } from './UpdateUserInputType';

@InputType()
export class UserInputType extends UpdateUserInputType {
  @Field()
  username: string;

  @Field()
  @Length(6, 20, { message: 'Password must have between 6 and 20 characters' })
  password?: string;
}
