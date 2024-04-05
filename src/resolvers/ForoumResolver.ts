import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Forum } from '../entities/Forum';
import { GUSystemDataSource } from '../datasource';
import { ForumInputType } from './inputTypes/ForumInputType';
import { ForumService } from '../services/ForumService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginArgs } from './argsTypes/LoginArgs';
import { GUSystemContext } from '../apollo';
import { Service } from 'typedi';

@Service()
@Resolver(Forum)
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Mutation(() => Forum, {
    description: 'Saves a new forum ',
  })
  async saveForum(@Arg('forum') saveForumInputType: ForumInputType): Promise<Forum> {
    try {
      const forum = await GUSystemDataSource.manager.create(Forum, {
        ...saveForumInputType,
      });

      return await this.forumService.save({
        ...forum,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [Forum], {
    description: 'Returns a list of forums',
  })
  async forums(@Ctx() ctx: GUSystemContext): Promise<Forum[]> {
    return this.forumService.getAll();
  }
}
