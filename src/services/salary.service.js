const { StoreService } = require("./store.service");

class SalaryService {
  _store;
  constructor(store) {
    this._store = store;
  }

  extractNumber(str) {
    var r = /\d+.\d+/;
    var s = str.replace(',', '');
    var s = s.match(r) === null ? 0 : Number(s.match(r)[0])
    return isNaN(s) ? 0 : s;
  }

  getSalary(filter, sort) {
    const results = this.getSalaries(filter, sort);
    return results && results.length > 0 ? results[0] : [];
  }

  getSalaries(filter, sort) {
    const salaries = this._store.getSalaries();
    let results = [];

    // Transform data could be filter and sort
    // TODO: Consider move below normalize data to DataBase, no need to run normalize each time.
    salaries.forEach(element => {
      let newData = {};
      newData['timestamp'] = element.Timestamp;
      newData['timestamp_utc'] = new Date(element.Timestamp + "+0000").getTime();
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

    results.forEach(r => {
      if (isNaN(r.annualBasePay)) {
        console.log('nan:' + r.annualBasePay);
      }
    })
    // filter (Support fields needs to define at schema.js)
    if (filter) {
      if (filter.timestamp_gte !== undefined)
        results = results.filter((s) => s.timestamp_utc >= filter.timestamp_gte);
      if (filter.timestamp_lte !== undefined)
        results = results.filter((s) => s.timestamp_utc <= filter.timestamp_lte);
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
          const sortCol = s === 'timestamp' ? 'timestamp_utc' : s;
          if (sort[s] === 'ASC')
            results.sort((a, b) => a[sortCol] - b[sortCol]);
          else
            results.sort((a, b) => b[sortCol] - a[sortCol]);
        })
    }

    return results;
  }

}

module.exports = {
  SalaryService,
}
