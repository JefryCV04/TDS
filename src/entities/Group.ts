import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';
import { Message } from './Message';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Group extends IEntity {
  @Column({ type: 'uuid', length: 36 })
  userCreatorId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public userCreator!: User;

  @Column({ type: 'uuid', length: 36 })
  chatId!: string;

  @Field(() => Chat)
  @ManyToOne(() => Chat)
  public chat!: Chat;

  @Field(() => [Message], { nullable: true })
  @ManyToOne(() => Message, { nullable: true })
  public messages?: Message[];

  @Field(() => [User])
  @ManyToOne(() => User)
  public users?: User[];
}
