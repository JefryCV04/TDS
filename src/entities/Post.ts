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

  @Field(() => PublicationStatus, {nullable:true})
  @ManyToOne(() => PublicationStatus, {nullable:true, eager: true })
  status: PublicationStatus;

  @Field(() => User, {nullable:true})
  @ManyToOne(() => User, (user) => user.posts, {nullable:true, eager: true })
  author: User;

  @Field(() => PublicationPrivacy)
  @ManyToOne(() => PublicationPrivacy, {nullable:true, eager: true })
  privacy: PublicationPrivacy;

  @Field(() => [Comment], {nullable:true})
  @OneToMany(() => Comment, (comment) => comment.post, {nullable:true, eager: true })
  comments: Comment[];

  @Field(() => [Like], {nullable:true})
  @OneToMany(() => Like, (like) => like.post, {nullable:true, eager: true })
  likes: Like[];
}
