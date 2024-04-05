import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Comment } from '../../entities/Comment';

@InputType()
export class CommentInputType implements Partial<Comment> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  authorId?: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  forumId?: string;

  @Field({ nullable: true })
  replyToId?: string;

  @Field({ nullable: true })
  public repliesIds?: string[];

  @Field({ nullable: true })
  likesIds?: string[];
}
