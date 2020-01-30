import gql from 'graphql-tag'
import { getUserId } from '../../../utils/session'

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

  input PropertyInput {
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
    properties: [Property!]
  }

  extend type Mutation {
    createProperty(newProperty: PropertyInput!): Property
    updateProperty(propertyId: ID!, property: PropertyInput!): Property
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
      return context.prisma.property({ id })
    },
    properties: async (rootObj, props, context) => {
      // const userId = getUserId(context)
      // return context.prisma.properties({ author: userId })
      return context.prisma.properties()
    },
  },
  Mutation: {
    createProperty: async (rootObj, { newProperty }, context) => {
      const userId = getUserId(context)
      return context.prisma.createProperty({
        ...newProperty,
        author: { connect: { id: userId } },
      })
    },

    updateProperty: async (rootObj, { propertyId, property }, context) => {
      const userId = getUserId(context)
      const author = await context.prisma.property({ id: propertyId }).author()
      if (!author || author.id !== userId) {
        throw new Error(`Property not found`)
      }
      return context.prisma.updateProperty({
        data: { ...property },
        where: { id: propertyId },
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
        data: { investment: { connnect: { id: investment.id } } },
        where: { AND: [{ id: propertyId }, { author: userId }] },
      })
    },
  },
}
