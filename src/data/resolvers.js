const { salaries } = require('./salary_survey-3.js');

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
      let results = [];
      salaries.forEach(element => {
        let newData = {};
        newData['timestamp'] = element.Timestamp;
        newData['employer'] = element.Employer;
        newData['location'] = element.Location;
        newData['jobTitle'] = element.JobTitle;
        newData['yearsatEmployer'] = element.YearsatEmployer;
        newData['annualBasePay'] = isNaN(element.AnnualBasePay) ? 0 : Number(element.AnnualBasePay);
        newData['signingBonus'] = isNaN(element.SigningBonus) ? 0 : Number(element.SigningBonus);
        newData['annualBonus'] = isNaN(element.AnnualBonus) ? 0 : Number(element.AnnualBonus);
        newData['annualStockValueBonus'] = element.AnnualStockValueBonus;
        newData['gender'] = element.Gender;
        newData['additionalComments'] = element.AdditionalComments;

        results.push(newData);
      });

      if (args.filter) {
        if (args.filter.jobTitle)
          results = results.filter((s) => s.jobTitle.toLowerCase().indexOf(args.filter.jobTitle.toLowerCase()) !== -1);
        if (args.filter.annualBasePay_gte)
          results = results.filter((s) => s.annualBasePay >= args.filter.annualBasePay_gte);
        if (args.filter.annualBasePay_lte)
          results = results.filter((s) => s.annualBasePay <= args.filter.annualBasePay_lte);
      }

      if (args.sort) {
        Object.keys(args.sort)
          .forEach((s) => {
            if (args.sort[s] === 'ASC')
              results.sort((a, b) => a[s] - b[s]);
            else
              results.sort((a, b) => b[s] - a[s]);
          })
      }

      return results;
    },
  }

}

module.exports = {
  resolvers,
}