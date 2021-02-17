import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart'
// make a fake gql tagged template Literal

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
