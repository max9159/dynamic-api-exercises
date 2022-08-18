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

  type Query {
    salaries(jobTitle: String): [Salary!]!
  }

`
module.exports = {
  typeDefs,
}