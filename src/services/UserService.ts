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

  public async getOne(userId: string) {
    return GUSystemDataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
    });
  }

  public async save(user: Partial<User>) {
    const savedUser = await GUSystemDataSource.manager.save(User, user);
    return this.getOne(savedUser.id);
  }

}
