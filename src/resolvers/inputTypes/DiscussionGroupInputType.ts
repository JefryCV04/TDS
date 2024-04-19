import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { DiscussionGroup } from '../../entities/DiscussionGroup';

@InputType()
export class DiscussionGroupInputType implements Partial<DiscussionGroup> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field(()=>[String],{ nullable: true })
  membersIds?: string[];

  @Field(()=>[String],{ nullable: true })
  messagesIds?: string[];
}