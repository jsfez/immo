import gql from 'graphql-tag'

export const typeDefs = gql`
  type Investment {
    id: ID!
    property: Property!

    advantages: String
    condominiumFees: Float
    csgTax: Float
    description: String
    disadvantages: String
    homeownerInsurance: Float
    loanAmount: Float
    loanInsuranceRate: Float
    loanLender: String
    loanMensualRepaymentAmount: Float
    loanMonthsOfdeferredReimbursement: Int
    loanRate: Float
    monthlyGain: Float
    name: String
    notaryFees: Float
    numberOfMonths: Int
    paybackperiod: Int
    personalContribution: Float
    personnalContribution: Float
    propertyTax: Float
    realEstatePrice: Float
    renovationsPrice: Float
    taxes: Float
  }

  input NewInvestment {
    advantages: String
    condominiumFees: Float
    csgTax: Float
    description: String
    disadvantages: String
    homeownerInsurance: Float
    loanAmount: Float
    loanInsuranceRate: Float
    loanLender: String
    loanMensualRepaymentAmount: Float
    loanMonthsOfdeferredReimbursement: Int
    loanRate: Float
    monthlyGain: Float
    name: String
    notaryFees: Float
    numberOfMonths: Int
    paybackperiod: Int
    personalContribution: Float
    personnalContribution: Float
    propertyTax: Float
    realEstatePrice: Float
    renovationsPrice: Float
    taxes: Float
  }

  extend type Query {
    investment(id: ID!): Investment
  }

  extend type Mutation {
    createInvestment(
      newInvestment: NewInvestment!
      propertyId: ID!
    ): Investment!
  }
`

export const resolvers = {
  Query: {
    investment: async (rootObj, { id }, context) => {
      return context.prisma.investment({ id })
    },
  },
  Mutation: {
    createInvestment: async (
      rootObj,
      { newInvestment, newInitialCost, newMonthlyFees, newLoan, propertyId },
      context,
      info,
    ) => {
      const initialCost = newInitialCost
        ? await context.prisma.createInitialCost(newInitialCost)
        : null
      const monthlyFees = newMonthlyFees
        ? await context.prisma.createMonthlyFees(newMonthlyFees)
        : null
      const loan = newLoan ? await context.prisma.createLoan(newLoan) : null
      return context.prisma.createInvestment({
        ...newInvestment,
        ...(initialCost && {
          initialCost: { connnect: { id: initialCost.id } },
        }),
        ...(monthlyFees && {
          monthlyFees: { connnect: { id: monthlyFees.id } },
        }),
        ...(loan && {
          loan: { connnect: { id: loan.id } },
        }),
        property: { connect: { id: propertyId } },
      })
    },
  },
}
