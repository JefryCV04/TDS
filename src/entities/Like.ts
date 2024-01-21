import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { Coment } from './Coment';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Like extends IEntity {
  @Column({ type: 'uuid', length: 36 })
  userCreatorId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public userCreator!: User;

  @Column({ type: 'uuid', length: 36, nullable: true })
  postId!: string;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.likes, { nullable: true })
  public post?: Post;

  @Column({ type: 'uuid', length: 36, nullable: true })
  comentId?: string;

  @Field(() => Coment, { nullable: true })
  @ManyToOne(() => Coment, (coment) => coment.likes, { nullable: true })
  public coment?: Coment;
}
