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
import { Post } from './Post';
import { IEntity } from '../interfaces/IEntity';

import { Like } from './Like';
import { Forum } from './Forum';

@Entity()
@ObjectType({ implements: IEntity })
export class Comment extends IEntity {
  @Field()
  @Column({
    type: 'longtext',
    nullable: true,
  })
  public content: string;

  @Column({ type: 'uuid', length: 36 })
  public authorId?: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public author: User;

  @Column({ type: 'uuid', length: 36, nullable: true })
  public postId?: string;

  @Field(() => Post)
  @ManyToOne(() => Post)
  public post: Post;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.comment,{ eager: true, nullable: true })
  public likes?: Like[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.comments,{ eager: true, nullable: true })
  public replies?: Comment[];

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies,{ eager: true,nullable: true })
  public replyTo?: Comment;

  @Column({ type: 'uuid', length: 36, nullable: true })
  public replyToId?: string;

  @Column({ type: 'uuid', length: 36, nullable: true })
  forumId: string;

  @Field(() => Forum, { nullable: true })
  @ManyToOne(() => Forum, (forum) => forum.comments,{ eager: true, nullable: true })
  forum: Forum;
}
