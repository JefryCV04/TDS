import { DataSource, DataSourceOptions } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { AuthChecker } from '../src/utilities/AuthChecker';
import { Container } from 'typedi';
import { getResolvers } from '../src/resolvers';
import { ApolloServer } from '@apollo/server';
import { Apollo, TDSContext } from '../src/apollo';
import * as dataSources from '../src/datasource';
import { DateUtils } from 'typeorm/util/DateUtils';
import { Seeder } from './utilities/seeder';
import { UserStatus } from '../src/entities/UserStatus';
import { User } from '../src/entities/User';

export let mockedTDSContext: TDSContext;
export let mockedCurrentDate: string;
export let apolloTestServer: ApolloServer<TDSContext>;

beforeAll(async () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    cache: true,
    entities: [`${__dirname}/../src/entities/*.ts`],
  } as DataSourceOptions);

  await TestDataSource.initialize();

  Object.defineProperty(dataSources, 'TDSDataSource', {
    value: TestDataSource,
  });

  process.env.TZ = 'UTC';

  await Seeder.seed([UserStatus, User]);

  mockedCurrentDate = DateUtils.mixedDateToDatetimeString(
    new Date(1672531200000)
  );

  const resolvers = await getResolvers<unknown>(
    `${__dirname}/../src/resolvers`
  );

  const schema = await buildSchema({
    resolvers,
    validate: { forbidUnknownValues: false },
    authChecker: AuthChecker,
    container: Container,
  });

  apolloTestServer = new ApolloServer<TDSContext>({
    schema,
    formatError: Apollo.customFormatError,
  });

  mockedTDSContext = {
    user: {
      token: 'token',
      email: 'admin@email.test',
    },
  };
});

afterAll(async () => {
  await dataSources.TDSDataSource.destroy();
});
