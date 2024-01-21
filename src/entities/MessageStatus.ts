import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';
import { INameableEntity } from '../interfaces/INameableEntity';
import { IEntity } from '../interfaces/IEntity';

@Entity()
@ObjectType({ implements: [INameableEntity, IEntity] })
export class MessageStatus extends INameableEntity {}
