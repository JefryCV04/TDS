import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';
import { Comment } from './Comment';
import { Like } from './Like';
import { Post } from './Post';
import { Message } from './Message';

@Entity()
@ObjectType({ implements: IEntity })
export class User extends IEntity {
  @Field()
  @Column()
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

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author, { nullable: true })
  public comments: Comment[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (likes) => likes.user, { nullable: true })
  public likes?: Like[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.author, { nullable: true })
  public posts?: Post[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.recipient)
  public receivedMessages?: Message[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.author)
  public sendMessages?: Message[];
}
