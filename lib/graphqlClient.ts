import { GraphQLClient } from "graphql-request";

export const makeClient = (token?: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
