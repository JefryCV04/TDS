import { ArgumentValidationError, buildSchema } from 'type-graphql';
import { getResolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from 'jsonwebtoken';
import { GraphQLFormattedError } from 'graphql/error';
import { unwrapResolverError } from '@apollo/server/errors';
import { ValidationError } from './errors/ValidationError';
import { AuthChecker } from './utilities/AuthChecker';
import { Container } from 'typedi';


export interface GUSystemContext {
  user: {
    email: string;
    token: string;
  };
}

export class Apollo {
  static async initialize() {
    const resolvers = await getResolvers<unknown>();
    const schema = await buildSchema({
      resolvers,
      validate: { forbidUnknownValues: false },
      authChecker: AuthChecker,
      container: Container,
    });

    const server = new ApolloServer<GUSystemContext>({
      schema,
      formatError: Apollo.customFormatError,
    });

    const { url } = await startStandaloneServer<GUSystemContext>(server, {
      listen: { port: parseInt(process.env.BACKEND_PORT) },
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const sanitizedToken = token.replace('Bearer', '');
        return {
          user: sanitizedToken ? Apollo.getUser(sanitizedToken) : null,
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  }

  public static customFormatError(
    formattedError: GraphQLFormattedError,
    error: unknown
  ): GraphQLFormattedError {
    const originalError = unwrapResolverError(error);

    if (originalError instanceof ArgumentValidationError) {
      // Aquí exploramos la estructura de originalError para obtener información de validación
      const validationErrors = originalError['validationErrors'] || [];
      
      // Manejar errores de validación según tus necesidades
      return new ValidationError(validationErrors.map(error => error.message).join(', '));
    }

    return formattedError;
  }

  private static getUser(token: string): {
    email: string;
    token: string;
  } {
    try {
      if (token) {
        try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          user.token = token;
          return user;
        } catch (error) {
          const decoded = jwt.decode(token);
          return { email: decoded.upn, token };
        }
      }
      console.warn('No Token Provided!');
      return null;
    } catch (error) {
      console.error('An error happened decoding the JWT Token', error);
      return null;
    }
  }
}
