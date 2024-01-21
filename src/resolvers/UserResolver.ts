import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UnauthorizedError,
} from 'type-graphql';
import { User } from '../entities/User';
import { TDSDataSource } from '../datasource';
import { UserInputType } from './inputTypes/UserInputType';
import { AuthenticatedUser } from './outputTypes/AuthenticatedUser';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserStatus } from '../entities/UserStatus';
import { LoginArgs } from './argsTypes/LoginArgs';
import { TDSContext } from '../apollo';
import { UpdateUserInputType } from './inputTypes/UpdateUserInputType';
import { In } from 'typeorm';
import { FilterUserInputType } from './inputTypes/filters/FilterUserInputType';
import { GraphQLError } from 'graphql/index';
import { Service } from 'typedi';

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthenticatedUser, {
    description: 'Logins an user into the system',
  })
  async login(@Args() loginArgs: LoginArgs): Promise<AuthenticatedUser> {
    const user = await TDSDataSource.manager.findOne(User, {
      where: [
        { username: loginArgs.usernameOrEmail },
        { email: loginArgs.usernameOrEmail },
      ],
      relations: {
        userStatus: true,
      },
    });

    if (!user) {
      throw new Error('El usuario especificado no existe!');
    }
    const isValid = await bcrypt.compare(loginArgs.password, user.password);
    if (!isValid) {
      throw new Error('Contraseña Incorrecta!');
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

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1y',
    });
    return {
      token,
      user,
    };
  }

  @Authorized()
  @Query(() => AuthenticatedUser, {
    description: 'Returns logged in user details',
  })
  async me(@Ctx() ctx: TDSContext): Promise<AuthenticatedUser> {
    const user = await TDSDataSource.manager.findOne(User, {
      where: {
        email: ctx.user.email,
      },
      relations: this.getRelations(),
    });

    if (user.userStatus.name === 'Inactivo') {
      throw new UnauthorizedError();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return {
      token,
      user,
    };
  }

  @Authorized('Administrador')
  @Mutation(() => User, {
    description: 'Saves a new user (password required)',
  })
  async saveUser(@Arg('user') saveUserInputType: UserInputType): Promise<User> {
    try {
      let userStatusId = saveUserInputType.userStatusId;

      if (!userStatusId) {
        const activeStatus = await TDSDataSource.manager.findOne(UserStatus, {
          where: {
            name: 'Activo',
          },
        });
        userStatusId = activeStatus.id;
      }

      const user = await TDSDataSource.manager.create(User, {
        ...saveUserInputType,
        password: await bcrypt.hash(saveUserInputType.password, 10),
        userStatusId,
      });

      return await this.userService.save({
        ...user,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized('Administrador')
  @Mutation(() => User, {
    description: 'Updates a new user',
  })
  async updateUser(
    @Arg('user') updateUserInputType: UpdateUserInputType
  ): Promise<User> {
    try {
      const user = TDSDataSource.manager.create(User, {
        ...updateUserInputType,
      });

      return this.userService.save(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized('Administrador')
  @Mutation(() => ID, {
    description: 'Deactivates an user',
  })
  async deactivateUser(@Arg('userId') userId: string): Promise<string> {
    const inactiveStatus = await TDSDataSource.manager.findOne(UserStatus, {
      where: {
        name: 'Inactivo',
      },
    });
    const updateResult = await TDSDataSource.manager.update(User, userId, {
      userStatusId: inactiveStatus.id,
    });

    if (updateResult.affected > 0) {
      return userId;
    }

    throw new Error('An error has occurred deleting this user!');
  }

  @Authorized()
  @Query(() => [User], {
    description: 'Returns a list of users',
  })
  async users(
    @Ctx() ctx: TDSContext,
    @Arg('filters', { nullable: true }) filters?: FilterUserInputType
  ): Promise<User[]> {
    return this.userService.getAll(filters);
  }

  private getRelations() {
    return {
      userStatus: true,
      roles: {
        permissions: {
          module: true,
          permissionAccess: true,
        },
      },
      departments: true,
      timer: {
        user: true,
        case: true,
      },
    };
  }
}
