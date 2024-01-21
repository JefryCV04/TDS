import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { TDSContext } from '../apollo';
import { GraphQLError } from 'graphql';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';

@Service()
export class AuthChecker implements AuthCheckerInterface<TDSContext> {
  constructor(private readonly userService: UserService) {}

  async check(
    { root, args, context, info }: ResolverData<TDSContext>,
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

    if (user.userStatus.name === 'Inactivo') {
      throw new GraphQLError(
        'Su usuario está desactivado, favor contactar con su Administrador!',
        {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        }
      );
    }

    return true;
  }
}
