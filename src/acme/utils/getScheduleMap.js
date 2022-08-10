const { getTimes } = require('./getTimes');
const { sliceByIndex } = require('./sliceByIndex');

const getScheduleMap = (scheduleString) => {
  const scheduleArray = scheduleString.split(',');
  let scheduleMap = new Map();

  scheduleArray.forEach((schedule) => {
    const [day, time] = sliceByIndex(schedule, 2);
    const dateTime = getTimes(time);
    scheduleMap.set(day, dateTime);
  });

  return scheduleMap;
};

module.exports = { getScheduleMap };
