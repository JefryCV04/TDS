import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IEntity } from '../interfaces/IEntity';
import { Comment } from './Comment';
import { Like } from './Like';
import { Post } from './Post';
import { Message } from './Message';
import { Rol } from './Rol';

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

  @Field()
  @Column({ unique: true })
  public roleId!: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: true }) // Indica que es una relación ManyToOne
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  @Field(() => Rol)
  public rol!: Rol;
  
  @Field({ nullable: true })
  @Column({ nullable: true }) // La columna puede ser nullable si la imagen no es requerida
  public profileImage?: string; // URL de la imagen de perfil

  @Field(() => [Comment], {nullable:true })
  @OneToMany(() => Comment, (comment) => comment.author, {nullable:true, eager: true })
  public comments: Comment[];

  @Field(() => [Like], {nullable:true })
  @OneToMany(() => Like, (likes) => likes.user, {nullable:true, eager: true })
  public likes?: Like[];

  @Field(() => [Post], {nullable:true })
  @OneToMany(() => Post, (post) => post.author, {nullable:true, eager: true })
  public posts?: Post[];

  @Field(() => [Message], {nullable:true})
  @OneToMany(() => Message, (message) => message.recipient,{ eager: true})
  public receivedMessages?: Message[];

  @Field(() => [Message], {nullable:true})
  @OneToMany(() => Message, (message) => message.author,{ eager: true})
  public sendMessages?: Message[];
    static findOneOrFail: any;
}
