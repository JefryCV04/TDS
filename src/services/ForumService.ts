import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { Forum } from '../entities/Forum';

@Service()
export class ForumService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(Forum, {
      order: {
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(Forum, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<Forum>) {
    const savedForum = await GUSystemDataSource.manager.save(Forum, entity);
    return this.getOne(savedForum.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(Forum, id);
  }
}
