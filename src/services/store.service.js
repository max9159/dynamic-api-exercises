const { salaries } = require('../data/salary_survey-3.js');

// TODO: Use DataBase connection instead when data move to DataBase.
class StoreService {
  constructor() {
  }
  getSalaries() {
    return salaries;
  }
}

module.exports = {
  StoreService,
}
