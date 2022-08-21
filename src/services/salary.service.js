const { StoreService } = require("./store.service");

class SalaryService {
  _store;
  constructor(store) {
    this._store = store;
  }

  extractNumber(str) {
    var r = /\d+.\d+/;
    var s = str.replace(',', '');
    return s.match(r) === null ? 0 : Number(s.match(r)[0]);
  }

  get(filter, sort) {
    const salaries = this._store.getSalaries();
    let results = [];

    // Transform data could be filter and sort
    // TODO: Consider move below normalize data to DataBase, no need to run normalize each time.
    salaries.forEach(element => {
      let newData = {};
      newData['timestamp'] = element.Timestamp;
      newData['employer'] = element.Employer;
      newData['location'] = element.Location;
      newData['jobTitle'] = element.JobTitle;
      newData['yearsatEmployer'] = element.YearsatEmployer;
      newData['annualBasePay'] = this.extractNumber(element.AnnualBasePay);
      newData['signingBonus'] = this.extractNumber(element.SigningBonus);
      newData['annualBonus'] = this.extractNumber(element.AnnualBonus);
      newData['annualStockValueBonus'] = element.AnnualStockValueBonus;
      newData['gender'] = element.Gender;
      newData['additionalComments'] = element.AdditionalComments;

      results.push(newData);
    });

    // filter (Support fields needs to define at schema.js)
    if (filter) {
      if (filter.jobTitle !== undefined)
        results = results.filter((s) => s.jobTitle.toLowerCase().indexOf(filter.jobTitle.toLowerCase()) !== -1);
      if (filter.annualBasePay_gte !== undefined)
        results = results.filter((s) => s.annualBasePay >= filter.annualBasePay_gte);
      if (filter.annualBasePay_lte !== undefined)
        results = results.filter((s) => s.annualBasePay <= filter.annualBasePay_lte);
    }

    // sort (Support all fields)
    if (sort) {
      Object.keys(sort)
        .forEach((s) => {
          if (sort[s] === 'ASC')
            results.sort((a, b) => a[s] - b[s]);
          else
            results.sort((a, b) => b[s] - a[s]);
        })
    }

    return results;
  }

}

module.exports = {
  SalaryService,
}
