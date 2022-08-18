const { gql } = require('apollo-server')

const typeDefs = gql`
  type Salary {
    timestamp: String
    employer: String
    location: String
    jobTitle: String
    yearsatEmployer: String
    yearsofExperience: String
    annualBasePay: String
    signingBonus: String
    annualBonus: String
    annualStockValueBonus: String
    gender: String
    additionalComments: String
  }

  input Filter {
    jobTitle: String
    annualBasePay_gte: String
    annualBasePay_lte: String
  }

  type Query {
    salaries(filter: Filter!): [Salary!]!
  }

`
module.exports = {
  typeDefs,
}