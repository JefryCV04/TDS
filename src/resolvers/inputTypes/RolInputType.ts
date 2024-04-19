import { InputType, Field } from 'type-graphql';


@InputType()
export class UserRoleInputType  {
  @Field({ nullable: true })
  id: string;

  @Field()
  rolname: string;
}
