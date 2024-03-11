import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';
import { IEntity } from '../interfaces/IEntity';
import { DiscussionGroup } from './DiscussionGroup';
import { MessageType } from './MessageType';

@Entity()
@ObjectType({ implements: IEntity })
export class Message extends IEntity {
  @Field()
  @Column({
    type: 'longtext',
    nullable: true,
  })
  public content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sendMessages)
  author: User;

  @Column({ type: 'uuid', length: 36 })
  public authorId?: string;

  @Column({ type: 'uuid', length: 36, nullable: true })
  public parentMessageId?: string;

  @Field(() => Message, { nullable: true })
  @ManyToOne(() => Message, (message) => message.replies)
  public parentMessage: Message;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.parentMessage)
  public replies: Message[];

  @Column({ type: 'uuid', length: 36, nullable: true })
  public messageTypeId: string;

  @Field(() => MessageType, { nullable: true })
  @ManyToOne(() => MessageType, { eager: true, nullable: true })
  public messageType: MessageType;

  @Column({ type: 'uuid', length: 36, nullable: true })
  public recipientId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.receivedMessages)
  public recipient: User;

  @Column({ type: 'uuid', length: 36, nullable: true })
  public discussionGroupId: string;

  @Field(() => DiscussionGroup, { nullable: true })
  @ManyToOne(() => DiscussionGroup, (group) => group.messages)
  public discussionGroup: DiscussionGroup;
}
