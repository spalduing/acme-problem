const { timeCoincidence } = require('./timeCoincidence');
const { getScheduleMap } = require('./getScheduleMap');
const { sliceByIndex } = require('./sliceByIndex');

const getCoincidences = (employeScheduleA, employeScheduleB) => {
  let coincidences = 0;

  const scheduleMapA = getScheduleMap(employeScheduleA);
  const scheduleArrayB = employeScheduleB.split(',');

  // console.log('pivA-d&h:', scheduleMapA);

  scheduleArrayB.forEach((scheduleB) => {
    const [dayB, timeB] = sliceByIndex(scheduleB, 2); // splits the string by the given index
    // console.log('pivB-d&h:', `${dayB}:${timeB}`);
    // ================================================================
    const isDayConincidence = scheduleMapA.has(dayB);
    // console.log('Day coincidence?:', isDayConincidence);

    const isTimeCoincidence = isDayConincidence
      ? timeCoincidence(scheduleMapA, dayB, timeB)
      : false;

    // console.log('Time coincidence?:', isTimeCoincidence);
    // console.log('// ================================================== //');
    // ================================================================

    if (isDayConincidence && isTimeCoincidence) {
      coincidences++;
    }
  });

  return coincidences;
};

module.exports = { getCoincidences };
