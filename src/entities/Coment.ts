import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { Like } from './Like';
import { Post } from './Post';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Coment extends IEntity {
  @Column({ type: 'uuid', length: 36 })
  userCreatorId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public userCreator!: User;

  @Column({ type: 'uuid', length: 36 })
  postId!: string;

  @Field(() => Post)
  @ManyToOne(() => Post)
  public post!: Post;

  @Field()
  @Column({ type: 'text' })
  public description!: string;

  @Field(() => [Like], { nullable: true })
  @ManyToOne(() => Like, { nullable: true })
  public likes?: Like[];
}
