import { Service } from 'typedi';
import { TDSDataSource } from '../datasource';
import { UserStatus } from '../entities/UserStatus';

@Service()
export class UserStatusService {
  public async getAll() {
    return TDSDataSource.manager.find(UserStatus, {
      order: {
        name: 'ASC',
      },
      cache: {
        id: 'userStatus',
        milliseconds: 1000 * 60 * 60 * 24 * 20, // 20 days
      },
    });
  }
}
