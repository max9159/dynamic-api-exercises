const { SalaryService } = require('./../services/salary.service');
const { StoreService } = require('./../services/store.service');

const resolvers = {

  Salary: {
    timestamp: (parent) => parent.timestamp,
    employer: (parent) => parent.employer,
    location: (parent) => parent.location,
    jobTitle: (parent) => parent.jobTitle,
    yearsatEmployer: (parent) => parent.yearsatEmployer,
    yearsofExperience: (parent) => parent.yearsofExperience,
    annualBasePay: (parent) => parent.annualBasePay,
    signingBonus: (parent) => parent.signingBonus,
    annualBonus: (parent) => parent.annualBonus,
    annualStockValueBonus: (parent) => parent.annualStockValueBonus,
    gender: (parent) => parent.gender,
    additionalComments: (parent) => parent.additionalComments
  },

  Query: {
    salaries: (parent, args) => {
      const store = new StoreService();
      const salaryService = new SalaryService(store);
      return salaryService.get(args.filter, args.sort);
    },
  }

}

module.exports = {
  resolvers,
}