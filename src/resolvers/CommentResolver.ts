import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Comment } from '../entities/Comment';
import { GUSystemDataSource } from '../datasource';
import { CommentInputType } from './inputTypes/CommentInputType';
import { CommentService } from '../services/CommentService';
import { Service } from 'typedi';

@Service()
@Resolver(Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment, {
    description: 'Saves a new comment ',
  })
  async saveComment(@Arg('comment') saveCommentInputType: CommentInputType): Promise<Comment> {
    try {
      const comment = await GUSystemDataSource.manager.create(Comment, {
        ...saveCommentInputType,
      });

      return await this.commentService.save({
        ...comment,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [Comment], {
    description: 'Returns a list of comments',
  })
  async comments(): Promise<Comment[]> {
    return this.commentService.getAll();
  }
}
