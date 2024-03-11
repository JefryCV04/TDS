import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { DiscussionGroup } from '../entities/DiscussionGroup';

@Service()
export class DiscussionGroupService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(DiscussionGroup, {
      order: {
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(DiscussionGroup, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<DiscussionGroup>) {
    const savedDiscussionGroup = await GUSystemDataSource.manager.save(
      DiscussionGroup,
      entity
    );
    return this.getOne(savedDiscussionGroup.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(DiscussionGroup, id);
  }
}
