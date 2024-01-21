import { Field, InputType } from 'type-graphql';

@InputType()
export class FilterUserInputType {
  @Field(() => [String], { nullable: true })
  departmentIds?: string[];

  @Field(() => [String], { nullable: true })
  roleIds?: string[];

  @Field(() => [String], { nullable: true })
  userStatusIds?: string[];
}
