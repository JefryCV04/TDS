import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Coment } from './Coment';
import { Like } from './Like';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: IEntity })
export class Post extends IEntity {
  @Field()
  @Column()
  public description!: string;

  @Column({ type: 'uuid', length: 36 })
  userCreatorId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  public userCreator!: User;

  @Field(() => [Coment], { nullable: true })
  @OneToMany(() => Coment, (comment) => comment.post, { nullable: true })
  public coments?: Coment[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  public likes?: Like[];
}
