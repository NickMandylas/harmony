import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Constants } from "utils";

const resolverPath: [string] = Constants.__prod__
  ? [__dirname + "/../modules/resolvers/**.js"]
  : [__dirname + "/../modules/resolvers/**.ts"];

export const createSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: resolverPath,
  });
};
