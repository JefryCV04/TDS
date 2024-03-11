import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { Comment } from '../entities/Comment';

@Service()
export class CommentService {
  public async getAll() {
    return await GUSystemDataSource.manager.find(Comment, {
      order: {
        creationDate: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(Comment, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<Comment>) {
    const savedComment = await GUSystemDataSource.manager.save(Comment, entity);
    return this.getOne(savedComment.id);
  }

  public async remove(id: string) {
    return await GUSystemDataSource.manager.delete(Comment, id);
  }
}
