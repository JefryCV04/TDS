import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { MessageStatus } from './MessageStatus';
import { Chat } from './Chat';
import { Group } from './Group';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Message extends IEntity {
  @Field()
  @Column()
  public description!: string;

  @Column({ type: 'uuid', length: 36 })
  userCreatorId!: string;

  @Column({ type: 'uuid', length: 36 })
  userReceiverId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messagesCreated)
  public userCreator!: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messagesReceived, { nullable: true })
  public userReceiver: User;

  @Column({ type: 'uuid', length: 36, nullable: true })
  groupId!: string;

  @Field(() => Group, { nullable: true })
  @ManyToOne(() => Group, (group) => group.messages, { nullable: true })
  public group: Group;

  @Column({ type: 'uuid', length: 36 })
  messageStatusId!: string;

  @Field(() => MessageStatus)
  @ManyToOne(() => MessageStatus, { eager: true })
  public messageStatus!: MessageStatus;

  @Column({ type: 'uuid', length: 36 })
  chatId!: string;

  @Field(() => Chat)
  @ManyToOne(() => Chat)
  public chat!: Chat;
}
