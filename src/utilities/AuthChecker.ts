import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { GUSystemContext } from '../apollo';
import { GraphQLError } from 'graphql';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';

@Service()
export class AuthChecker implements AuthCheckerInterface<GUSystemContext> {
  constructor(private readonly userService: UserService) {}

  async check(
    { root, args, context, info }: ResolverData<GUSystemContext>,
    roles: string[]
  ): Promise<boolean> {
    if (!context.user) {
      throw new GraphQLError('Usuario no encontrado!', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    const user = await this.userService.getUserByEmail(context.user.email);

    if (!user) {
      throw new GraphQLError('Usuario no encontrado!', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    return true;
  }
}
