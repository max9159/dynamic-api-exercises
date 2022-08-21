const { gql } = require('apollo-server')

const typeDefs = gql`
  type Salary {
    timestamp: String
    employer: String
    location: String
    jobTitle: String
    yearsatEmployer: String
    yearsofExperience: String
    annualBasePay: Float
    signingBonus: Float
    annualBonus: Float
    annualStockValueBonus: String
    gender: String
    additionalComments: String
  }

  enum SortMethods {
    ASC,
    DESC
  }

  input Filter {
    timestamp_gte: String
    timestamp_lte: String
    jobTitle: String
    annualBasePay_gte: Float
    annualBasePay_lte: Float
  }

  input Sort {
    timestamp: SortMethods
    annualBasePay : SortMethods
  }

  type Query {
    salaries(filter: Filter!, sort: Sort): [Salary!]!
  }

`
module.exports = {
  typeDefs,
}