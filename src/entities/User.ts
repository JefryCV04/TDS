import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Post } from './Post';
import { Coment } from './Coment';
import { UserStatus } from './UserStatus';
import { Message } from './Message';
import { Like } from './Like';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class User extends IEntity {
  @Field()
  @Column({ unique: true })
  public username!: string;

  @Field()
  @Column()
  public firstName!: string;

  @Field()
  @Column()
  public lastName!: string;

  @Column()
  public password!: string;

  @Field()
  @Column({ unique: true })
  public email!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public imageURL: string;

  @Column({ type: 'uuid', length: 36 })
  userStatusId!: string;

  @Field(() => UserStatus)
  @ManyToOne(() => UserStatus, { eager: true })
  public userStatus!: UserStatus;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  public following?: User[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  public followers?: User[];

  @Field(() => [Coment], { nullable: true })
  @OneToMany(() => Coment, (coment) => coment.userCreator, { nullable: true })
  public coments?: Coment[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.userCreator, { nullable: true })
  public posts?: Post[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.userCreator, {
    nullable: true,
  })
  public messagesCreated?: Message[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.userReceiver, {
    nullable: true,
  })
  public messagesReceived?: Message[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.userCreator, { nullable: true })
  public likeMe?: Like[];
}
