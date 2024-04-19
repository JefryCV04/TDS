import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Post extends IEntity {
  @Field()
  @Column()
  public title: string;

  @Field()
  @Column({ type: 'longtext' })
  public content: string;

  @Column({ type: 'uuid', length: 36 })
  public authorId?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  public author: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  public comments: Comment[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post)
  public likes: Like[];
}
