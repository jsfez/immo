import { GraphQLServer } from 'graphql-yoga'
import { schema } from './graphql/schema'
import { prisma } from './prisma/generated/prisma-client'

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => {
  console.log(`Prisma server is running on : http://localhost:4466`)
  console.log(`Prisma admin is running on : http://localhost:4466/_admin`)
  console.log(`GraphQL Playground is running on : http://localhost:4000`)
})
