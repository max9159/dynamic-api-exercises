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
      let results = [];
      if (args.filter.jobTitle)
        results = salaries.filter((s) => s.JobTitle.toLowerCase().indexOf(args.filter.jobTitle.toLowerCase()) !== -1);
      if (args.filter.annualBasePay_gte)
        results = salaries.filter((s) => s.AnnualBasePay >= args.filter.annualBasePay_gte);
      if (args.filter.annualBasePay_lte)
        results = salaries.filter((s) => s.AnnualBasePay <= args.filter.annualBasePay_lte);

      return results;
    },
  }

}

module.exports = {
  resolvers,
}