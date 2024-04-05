import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Message } from '../../entities/Message';

@InputType()
export class MessageInputType implements Partial<Message> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  content: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  discussionGroupId?: string;

  @Field()
  messageTypeId?: string;

  @Field({ nullable: true })
  recipientId?: string;

  @Field({ nullable: true })
  parentMessageId?: string;

  @Field({ nullable: true })
  repliesIds?: string[];
}
