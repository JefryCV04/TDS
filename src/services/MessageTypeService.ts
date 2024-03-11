import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { MessageType } from '../entities/MessageType';

@Service()
export class MessageTypeService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(MessageType, {
      order: {
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(MessageType, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<MessageType>) {
    const savedMessageType = await GUSystemDataSource.manager.save(
      MessageType,
      entity
    );
    return this.getOne(savedMessageType.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(MessageType, id);
  }
}
