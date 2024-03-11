import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/User';
import { Comment } from '../../entities/Comment';

@InputType()
export class UpdateUserInputType implements Partial<User> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  commentsIds?: string[];

  @Field({ nullable: true })
  likesIds?: string[];

  @Field({ nullable: true })
  postsIds?: string[];

  @Field({ nullable: true })
  receivedMessagesIds?: string[];

  @Field({ nullable: true })
  sendMessagesIds?: string[];
}
