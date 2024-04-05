import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { GUSystemDataSource } from '../datasource';
import { PostInputType } from './inputTypes/PostInputType';
import { PostService } from '../services/PostService';
import { Service } from 'typedi';

@Service()
@Resolver(Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post, {
    description: 'Saves a new post ',
  })
  async savePost(@Arg('post') savePostInputType: PostInputType): Promise<Post> {
    try {
      const post = await GUSystemDataSource.manager.create(Post, {
        ...savePostInputType,
      });

      return await this.postService.save({
        ...post,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [Post], {
    description: 'Returns a list of posts',
  })
  async posts(): Promise<Post[]> {
    return this.postService.getAll();
  }
}
