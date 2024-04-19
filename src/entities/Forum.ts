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
import { Comment } from './Comment';

@Entity()
@ObjectType({ implements: [IEntity, INameableEntity] })
export class Forum extends INameableEntity {
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  public members: User[];

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

  @Field(() => [Comment], { nullable: true })
  @ManyToOne(() => Comment, (msg) => msg.forum, { nullable: true })
  public comments?: Comment[];
}
