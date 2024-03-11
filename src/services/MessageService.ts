import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { Message } from '../entities/Message';

@Service()
export class MessageService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(Message, {
      order: {
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(Message, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<Message>) {
    const savedMessage = await GUSystemDataSource.manager.save(Message, entity);
    return this.getOne(savedMessage.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(Message, id);
  }
}
