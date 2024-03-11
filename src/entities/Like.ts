import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Like extends IEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @Column({ type: 'uuid', length: 36 })
  userId?: string;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.likes, { nullable: true })
  post?: Post;

  @Column({ type: 'uuid', length: 36 })
  postId?: string;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true })
  comment?: Comment;

  @Column({ type: 'uuid', length: 36 })
  commentId?: string;
}
