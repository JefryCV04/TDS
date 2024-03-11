import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { Like } from '../entities/Like';

@Service()
export class LikeService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(Like);
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(Like, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<Like>) {
    const savedLike = await GUSystemDataSource.manager.save(Like, entity);
    return this.getOne(savedLike.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(Like, id);
  }
}
