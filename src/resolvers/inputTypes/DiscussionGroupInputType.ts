import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { DiscussionGroup } from '../../entities/DiscussionGroup';

@InputType()
export class DiscussionGroupInputType implements Partial<DiscussionGroup> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  membersIds?: string[];

  @Field({ nullable: true })
  messagesIds?: string[];
}
