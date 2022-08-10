const { getTimes } = require('./getTimes');

const timeCoincidence = (scheduleMapA, dayB, timeB) => {
  const tempMapA = new Map(scheduleMapA);
  const dateTimeA = tempMapA.get(dayB);
  const dateTimeB = getTimes(timeB);

  // console.log(' dateTimeA:', dateTimeA);
  // console.log(' dateTimeB:', dateTimeB);

  const equalRanges =
    dateTimeA.startTime.getTime() === dateTimeB.startTime.getTime() ||
    dateTimeA.endTime.getTime() === dateTimeB.endTime.getTime();

  const rageAContainsTimeB =
    dateTimeB.startTime.getTime() > dateTimeA.startTime.getTime() &&
    dateTimeB.startTime.getTime() < dateTimeA.endTime.getTime();

  const rangeBContainsTimeA =
    dateTimeA.startTime.getTime() > dateTimeB.startTime.getTime() &&
    dateTimeA.startTime.getTime() < dateTimeB.endTime.getTime();

  if (equalRanges || rageAContainsTimeB || rangeBContainsTimeA) return true;

  return false;
};

module.exports = { timeCoincidence };
