import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { Post } from '../entities/Post';

@Service()
export class PostService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(Post, {
      order: {
        title: 'ASC',
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(Post, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<Post>) {
    const savedPost = await GUSystemDataSource.manager.save(Post, entity);
    return this.getOne(savedPost.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(Post, id);
  }
}
