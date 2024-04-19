import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql'; // Importa el decorador Field
import { User } from './User';

@Entity()
@ObjectType()
export class Rol {
  @Field() // Añade el decorador Field para exponer el campo en GraphQL
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public rolname: string;

  @OneToMany(() => User, (user) => user.rol) // Indica que es una relación OneToMany
  @Field(() => [User])
  public users!: User[];
}