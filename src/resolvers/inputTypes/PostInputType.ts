import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Post } from '../../entities/Post';

@InputType()
export class PostInputType implements Partial<Post> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  authorId?: string;

  @Field(()=>[String],{ nullable: true })
  commentsIds?: string[];

  @Field(()=>[String],{ nullable: true })
  likesIds?: string[];
}
