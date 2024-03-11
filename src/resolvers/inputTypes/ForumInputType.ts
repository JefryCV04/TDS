import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Forum } from '../../entities/Forum';

@InputType()
export class ForumInputType implements Partial<Forum> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  content: string;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  authorId?: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  commentsIds?: string[];

  @Field({ nullable: true })
  membersIds?: string[];
}
