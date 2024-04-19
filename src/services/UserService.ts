import { Service } from 'typedi';
import { GUSystemDataSource } from '../datasource';
import { User } from '../entities/User';

@Service()
export class UserService {
  public async getUserByEmail(email: string) {
    return GUSystemDataSource.manager.findOne(User, {
      where: {
        email,
      },
    });
  }

  public async getAll() {
    return await GUSystemDataSource.manager.find(User, {
      order: {
        firstName: 'ASC',
      },
    });
  }

  public async getOne(entityId: string) {
    return GUSystemDataSource.manager.findOne(User, {
      where: {
        id: entityId,
      },
    });
  }

  public async save(entity: Partial<User>) {
    const savedUser = await GUSystemDataSource.manager.save(User, entity);
    return this.getOne(savedUser.id);
  }
}
