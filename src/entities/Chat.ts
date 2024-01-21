import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { User } from './User';
import { Message } from './Message';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Chat extends IEntity {
  @Column({ type: 'uuid', length: 36 })
  userOneId!: string;

  @Column({ type: 'uuid', length: 36 })
  userTwoId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public userOne!: User;

  @Field(() => User)
  @ManyToOne(() => User)
  public userTwo!: User;

  @Field(() => [Message], { nullable: true })
  @ManyToOne(() => Message, { nullable: true })
  @JoinTable()
  public messages?: Message[];
}
