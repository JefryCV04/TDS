import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { INameableEntity } from '../interfaces/INameableEntity';
import { IEntity } from '../interfaces/IEntity';
import { User } from './User';
import { Message } from './Message';

@Entity()
@ObjectType({ implements: [IEntity, INameableEntity] })
export class DiscussionGroup extends INameableEntity {
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @Field(() => [Message], { nullable: true })
  @ManyToOne(() => Message, (msg) => msg.discussionGroup,{ eager: true, nullable: true })
  messages?: Message[];
}
