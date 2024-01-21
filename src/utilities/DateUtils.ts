import { format } from 'date-fns';
import { Maybe } from 'type-graphql';

export function formatSimple(date: Maybe<Date>): string {
  if (!date) {
    return '';
  }

  return format(date, 'yyyy-MM-dd');
}
