const fs = require('fs');

const { getCoincidences } = require('./utils/getCoincidences');

const acmeFlexibilityProblem = () => {
  fs.readFile('input.txt', 'utf8', (err, data) => {
    if (!err) {
      const lineArray = data.toString().split('\n');

      for (let i = 0; i < lineArray.length - 1; i++) {
        const [employeNameA, employeScheduleA] = lineArray[i].split('=');
        const [employeNameB, employeScheduleB] = lineArray[i + 1].split('=');

        const coincidences = getCoincidences(
          employeScheduleA,
          employeScheduleB
        );

        const response = `${employeNameA}-${employeNameB}: ${coincidences}`;
        console.log(response);
        console.log('// ====================================== //');
      }
    } else {
      console.error(err);
    }
  });
};

module.exports = { acmeFlexibilityProblem };
