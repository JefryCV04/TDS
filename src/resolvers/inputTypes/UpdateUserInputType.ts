import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class UpdateUserInputType implements Partial<User> {
  @Field({ nullable: true })
  id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Invalid External Email' })
  externalEmail?: string;

  @Field({ nullable: true })
  imageURL?: string;

  @Field(() => [String])
  roleIds!: string[];

  @Field(() => [String])
  departmentIds!: string[];

  @Field({ nullable: true })
  userStatusId?: string;

  @Field({ nullable: true })
  employeePositionId?: string;
}
