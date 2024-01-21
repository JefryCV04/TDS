import { Service } from 'typedi';
import { TDSDataSource } from '../datasource';
import { User } from '../entities/User';
import { FilterUserInputType } from '../resolvers/inputTypes/filters/FilterUserInputType';
import isEmpty from 'lodash.isempty';
import { In } from 'typeorm';

@Service()
export class UserService {
  public async getUserByEmail(email: string) {
    return TDSDataSource.manager.findOne(User, {
      where: {
        email,
      },
      relations: {
        userStatus: true,
      },
    });
  }

  public async getAll(filters?: FilterUserInputType) {
    let where;
    if (filters) {
      where = {
        userStatusId: isEmpty(filters.userStatusIds)
          ? undefined
          : In(filters.userStatusIds),
      };
    }
    return await TDSDataSource.manager.find(User, {
      order: {
        firstName: 'ASC',
      },
      where,
      relations: this.getRelations(),
    });
  }

  public async getOne(userId: string) {
    return TDSDataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
      relations: this.getRelations(),
    });
  }

  public async save(user: Partial<User>) {
    const savedUser = await TDSDataSource.manager.save(User, user);

    return this.getOne(savedUser.id);
  }

  private getRelations() {
    return {
      userStatus: true,
    };
  }
}
