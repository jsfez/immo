import gql from 'graphql-tag'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../utils.js'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    properties: [Property!]
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`

export const resolvers = {
  User: {
    async properties(parent, args, context) {
      return context.prisma.user({ id: parent.id }).properties()
    },
  },
  Query: {
    user(rootObj, { id }, context) {
      return context.prisma.user({ id })
    },
    users(rootObj, params, context) {
      return context.prisma.users()
    },
  },
  Mutation: {
    signup: async (rootObj, { email, password, name }, context) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const existingUser = await context.prisma.user({ email })
      if (existingUser)
        throw new Error(`Email adresse "${email}" already existing.`)

      const user = await context.prisma.createUser({
        email,
        name,
        password: hashedPassword,
      })

      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return { user, token }
    },

    login: async (rootObj, { email, password }, context) => {
      const user = await context.prisma.user({ email })
      if (!user) throw new Error('User not found')

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) throw new Error('Invalid password')

      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return { token, user }
    },
  },
}
