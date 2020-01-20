import deepMerge from 'merge-deep'
import { concatenateTypeDefs, makeExecutableSchema } from 'graphql-tools'
import { parse } from 'graphql'
import { definitions } from './definitions'

const schemaDefinition = {
  typeDefs: parse(
    concatenateTypeDefs(definitions.map(def => def.typeDefs).filter(Boolean)),
  ),
  resolvers: deepMerge(...definitions.map(def => def.resolvers)),
}

export const schema = makeExecutableSchema(schemaDefinition)
