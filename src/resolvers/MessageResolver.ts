import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Message } from '../entities/Message';
import { GUSystemDataSource } from '../datasource';
import { MessageInputType } from './inputTypes/MessageInputType';
import { MessageService } from '../services/MessageService';
import { Service } from 'typedi';

@Service()
@Resolver(Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message, {
    description: 'Saves a new message ',
  })
  async saveMessage(@Arg('message') saveMessageInputType: MessageInputType): Promise<Message> {
    try {
      const message = await GUSystemDataSource.manager.create(Message, {
        ...saveMessageInputType,
      });

      return await this.messageService.save({
        ...message,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [Message], {
    description: 'Returns a list of messages',
  })
  async messages(): Promise<Message[]> {
    return this.messageService.getAll();
  }
}
