import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Like } from '../../entities/Like';

@InputType()
export class LikeInputType implements Partial<Like> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  commentId?: string;
}