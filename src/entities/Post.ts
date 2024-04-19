import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

import { IEntity } from '../interfaces/IEntity';
import { PublicationPrivacy, PublicationStatus } from './HomePage';

@Entity()
@ObjectType()
export class Post extends IEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: 'longtext' })
  content: string;
  
  @Column({ type: 'uuid', length: 36 })
  public authorId?: string;

  @Field(() => PublicationStatus)
  @ManyToOne(() => PublicationStatus, { eager: true })
  status: PublicationStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Field(() => PublicationPrivacy)
  @ManyToOne(() => PublicationPrivacy, { eager: true })
  privacy: PublicationPrivacy;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
