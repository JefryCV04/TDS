import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Like } from '../entities/Like';
import { GUSystemDataSource } from '../datasource';
import { LikeInputType } from './inputTypes/LikeInputType';
import { LikeService } from '../services/LikeService';
import { Service } from 'typedi';

@Service()
@Resolver(Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like, {
    description: 'Saves a new like ',
  })
  async saveLike(@Arg('like') saveLikeInputType: LikeInputType): Promise<Like> {
    try {
      const like = await GUSystemDataSource.manager.create(Like, {
        ...saveLikeInputType,
      });

      return await this.likeService.save({
        ...like,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [Like], {
    description: 'Returns a list of likes',
  })
  async likes(): Promise<Like[]> {
    return this.likeService.getAll();
  }
}
