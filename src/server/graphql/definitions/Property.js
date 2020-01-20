import gql from 'graphql-tag'
import { getUserId } from '../../utils.js'

export const typeDefs = gql`
  type Property {
    id: ID!
    author: User!
    name: String!

    address: String
    advantages: String
    area: String
    bathroomsCount: Int
    bedroomsCount: Int
    city: String
    disadvantages: String
    floor: Int
    investments: Investment
    parking: Int
    surface: Float
    zipCode: String
  }

  input PropertyCreate {
    name: String!

    address: String
    advantages: String
    area: String
    bathroomsCount: Int
    bedroomsCount: Int
    city: String
    disadvantages: String
    floor: Int
    parking: Int
    surface: Float
    zipCode: String
  }

  extend type Query {
    property(id: ID!): Property!
    properties(userId: String!): [Property!]
  }

  extend type Mutation {
    createProperty(newProperty: PropertyCreate!): Property
    addPropertyInvestment(propertyId: ID!, InvestmentId: ID!): Property!
  }
`

export const resolvers = {
  Property: {
    async author(parent, args, context) {
      return context.prisma.user({ id: parent.id }).id
    },
  },
  Query: {
    property: async (rootObj, { id }, context) => {
      return context.prisma.properties({ id })
    },
    properties: async (rootObj, { userId }, context) => {
      return context.prisma.properties({ author: userId })
    },
  },
  Mutation: {
    createProperty: async (rootObj, { newProperty }, context, info) => {
      const userId = getUserId(context)
      console.log({ userId })

      return context.prisma.createProperty({
        ...newProperty,
        author: { connect: { id: userId } },
      })
    },

    addPropertyInvestment: async (
      rootObj,
      { propertyId, investmentId },
      context,
      info,
    ) => {
      const userId = getUserId(context)
      const investment = context.prisma.investment({
        id: investmentId,
        author: userId,
      })
      if (!investment) {
        throw new Error(`Investment not found for current user`)
      }

      return context.prisma.UpdateProperty({
        data: {
          investment: { connnect: { id: investment.id } },
        },
        where: {
          id: propertyId,
          author: userId,
        },
      })
    },
  },
}
