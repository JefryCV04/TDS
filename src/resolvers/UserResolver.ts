import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import { GUSystemDataSource } from '../datasource';
import { UserInputType } from './inputTypes/UserInputType';
import { AuthenticatedUser } from './outputTypes/AuthenticatedUser';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginArgs } from './argsTypes/LoginArgs';
import { GUSystemContext } from '../apollo';
import { UpdateUserInputType } from './inputTypes/UpdateUserInputType';
import { Service } from 'typedi';
import { Rol } from '../entities/Rol';

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthenticatedUser, {
    description: 'Logins an user into the system',
  })
  async login(@Args() loginArgs: LoginArgs): Promise<AuthenticatedUser> {
    const user = await GUSystemDataSource.manager.findOne(User, {
      where: [
        { username: loginArgs.usernameOrEmail },
        { email: loginArgs.usernameOrEmail },
      ],
    });

    if (!user) {
      throw new Error('El usere especificado no existe!');
    }
    const isValid = await bcrypt.compare(loginArgs.password, user.password);
    if (!isValid) {
      throw new Error('Contraseña Incorrecta!');
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
  async me(@Ctx() ctx: GUSystemContext): Promise<AuthenticatedUser> {
    const user = await GUSystemDataSource.manager.findOne(User, {
      where: {
        email: ctx.user.email,
      },
    });

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

  @Mutation(() => User, {
    description: 'Saves a new user (password required)',
  })
  async saveUser(@Arg('user') saveUserInputType: UserInputType): Promise<User> {
    try {
      // Obtén el rol por nombre antes de crear el usuario
      const rol = await GUSystemDataSource.manager.findOne(Rol, {
        where: { rolname: saveUserInputType.rolname },
      });

      if (!rol) {
        throw new Error(
          `Rol with rolname ${saveUserInputType.rolname} not found.`
        );
      }

      const user = await GUSystemDataSource.manager.create(User, {
        ...saveUserInputType,
        rol,
        password: await bcrypt.hash(saveUserInputType.password, 10),
      });

      return await this.userService.save({
        ...user,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Mutation(() => User, {
    description: 'Updates a  user',
  })
  async updateUser(
    @Arg('user') updateUserInputType: UpdateUserInputType
  ): Promise<User> {
    try {
      const rol = await GUSystemDataSource.manager.findOne(Rol, {
        where: { rolname: updateUserInputType.rolname },
      });

      if (!rol) {
        throw new Error(
          `Rol with rolname ${updateUserInputType.rolname} not found.`
        );
      }
      const user = GUSystemDataSource.manager.create(User, {
        ...updateUserInputType,
        rol,
      });

      return this.userService.save(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [User], {
    description: 'Returns a list of users',
  })
  async users(@Ctx() ctx: GUSystemContext): Promise<User[]> {
    return this.userService.getAll();
  }
}
