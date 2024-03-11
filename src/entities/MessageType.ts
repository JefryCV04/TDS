import { ObjectType } from 'type-graphql';
import { INameableEntity } from '../interfaces/INameableEntity';
import { IEntity } from '../interfaces/IEntity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [IEntity, INameableEntity] })
export class MessageType extends INameableEntity {}
