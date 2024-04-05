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

  public async update(entityId: string, entity: Partial<User>) {
    await GUSystemDataSource.manager.update(User, entityId, entity);
    return this.getOne(entityId);
  }

  public async remove(entityId: string) {
    await GUSystemDataSource.manager.delete(User, entityId);
    return entityId;
  }

  public async updateProfileImage(entityId: string, profileImage: string) {
    const user = await GUSystemDataSource.manager.findOne(User, {
      where: {
        id: entityId,
      },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.profileImage = profileImage;
    return GUSystemDataSource.manager.save(User, user);
  }
}
