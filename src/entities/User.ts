import {
  Column,
  Entity,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';

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

}
