import { Authorized, Query, Resolver } from 'type-graphql';
import { UserStatus } from '../entities/UserStatus';
import { UserStatusService } from '../services/UserStatusService';
import { Service } from 'typedi';

@Service()
@Resolver(UserStatus)
export class UserStatusResolver {
  constructor(private readonly userStatusService: UserStatusService) {}

  @Authorized()
  @Query(() => [UserStatus], {
    description: 'Returns a list of user status',
  })
  async userStatusList(): Promise<UserStatus[]> {
    return this.userStatusService.getAll();
  }
}
