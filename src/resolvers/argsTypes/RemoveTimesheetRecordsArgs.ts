import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RemoveTimesheetRecordsArgs {
  @Field()
  date: Date;

  @Field()
  eventType: number;
}
