import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { DiscussionGroup } from '../entities/DiscussionGroup';
import { GUSystemDataSource } from '../datasource';
import { DiscussionGroupInputType } from './inputTypes/DiscussionGroupInputType';
import { DiscussionGroupService } from '../services/DiscussionGroupService';
import { Service } from 'typedi';

@Service()
@Resolver(DiscussionGroup)
export class DiscussionGroupResolver {
  constructor(private readonly discussionGroupService: DiscussionGroupService) {}

  @Mutation(() => DiscussionGroup, {
    description: 'Saves a new discussionGroup ',
  })
  async saveDiscussionGroup(@Arg('discussionGroup') saveDiscussionGroupInputType: DiscussionGroupInputType): Promise<DiscussionGroup> {
    try {
      const discussionGroup = await GUSystemDataSource.manager.create(DiscussionGroup, {
        ...saveDiscussionGroupInputType,
      });

      return await this.discussionGroupService.save({
        ...discussionGroup,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Authorized()
  @Query(() => [DiscussionGroup], {
    description: 'Returns a list of comments',
  })
  async comments(): Promise<DiscussionGroup[]> {
    return this.discussionGroupService.getAll();
  }
}
