const { salaries } = require('./salary_survey-3.js');

const resolvers = {

  Salary: {
    timestamp: (parent) => parent.Timestamp,
    employer: (parent) => parent.Employer,
    location: (parent) => parent.Location,
    jobTitle: (parent) => parent.JobTitle,
    yearsatEmployer: (parent) => parent.YearsatEmployer,
    yearsofExperience: (parent) => parent.YearsofExperience,
    annualBasePay: (parent) => parent.AnnualBasePay,
    signingBonus: (parent) => parent.SigningBonus,
    annualBonus: (parent) => parent.AnnualBonus,
    annualStockValueBonus: (parent) => parent.AnnualStockValueBonus,
    gender: (parent) => parent.Gender,
    additionalComments: (parent) => parent.AdditionalComments
  },

  Query: {
    salaries: (parent, args) => {
      return salaries.filter((s) => s.JobTitle.toLowerCase().indexOf(args.jobTitle.toLowerCase()) !== -1);
    }
  }

}

module.exports = {
  resolvers,
}