import { Resolver, Mutation, Arg } from 'type-graphql';
import GraphQLUpload from 'graphql-upload';
import { User } from '../entities/User';
import { UserService } from '../services/UserService';
import { createWriteStream } from 'fs';
import path from 'path';

@Resolver()
export class ProfileImageResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async uploadProfileImage(
    @Arg('userId') userId: string,
    @Arg('image', () => GraphQLUpload) upload: any
  ): Promise<User> {
    const { createReadStream, filename } = await upload;

    // Guardar la imagen en el servidor
    const imagePath = path.join(__dirname, '..', 'uploads', filename);
    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject)
    );

    // Actualizar el campo profileImage del usuario en la base de datos
    await this.userService.updateProfileImage(userId, imagePath);

    // Retornar el usuario actualizado
    return await this.userService.getOne(userId);
  }
}
