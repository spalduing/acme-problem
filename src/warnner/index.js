const fs = require('fs');

// let startTimeA = new Date(100, 1, 1, Number('13'), Number('00'), 0);
// let endTimeA = new Date(100, 1, 1, Number('13'), Number('15'), 0);

// let startTimeB = new Date(100, 1, 1, Number('12'), Number('00'), 0);
// let endTimeB = new Date(100, 1, 1, Number('14'), Number('00'), 0);
// // let startTimeA = new Date(100, 1, 1, Number('10'), Number('00'), 0);
// // let endTimeA = new Date(100, 1, 1, Number('12'), Number('00'), 0);

// // let startTimeB = new Date(100, 1, 1, Number('12'), Number('00'), 0);
// // let endTimeB = new Date(100, 1, 1, Number('14'), Number('00'), 0);

// const rangeA = endTimeA.getTime() - startTimeA.getTime();
// // const rangeB = endTimeB.getTime() - startTimeB.getTime();

// // console.log('rangeB:', rangeB);

// console.log(endTimeA.getTime());
// console.log(startTimeA.getTime());
// console.log('rangeA:', rangeA);

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (!err) {
    const lineArray = data.toString().split('\n');

    for (let i = 0; i < lineArray.length - 1; i++) {
      const [employeNameA, employeScheduleA] = lineArray[i].split('=');
      const [employeNameB, employeScheduleB] = lineArray[i + 1].split('=');
      // ======================================
      const coincidences = getCoincidences(employeScheduleA, employeScheduleB);
      // ======================================
      const response = `${employeNameA}-${employeNameB}:${coincidences}`;
      // ======================================
      console.log(response);
      console.log('// ====================================== //');
    }
  } else {
    console.err(err);
  }
});

const sliceByIndex = (str, index) => {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
};

const getTimes = (time) => {
  const [startT, endT] = time.split('-');

  const [strTHour, strtTMinute] = startT.split(':');
  const [endTHour, endTMinute] = endT.split(':');

  let startTime = new Date(100, 1, 1, Number(strTHour), Number(strtTMinute), 0);
  let endTime = new Date(100, 1, 1, Number(endTHour), Number(endTMinute), 0);

  return { startTime, endTime };
};

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

const timeCoincidence = (scheduleMapA, dayB, timeB) => {
  const tempMapA = new Map(scheduleMapA);
  const dateTimeA = tempMapA.get(dayB);
  const dateTimeB = getTimes(timeB);

  console.log(' dateTimeA:', dateTimeA);
  console.log(' dateTimeB:', dateTimeB);

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

const getCoincidences = (employeScheduleA, employeScheduleB) => {
  let coincidences = 0;

  const scheduleMapA = getScheduleMap(employeScheduleA);
  const scheduleArrayB = employeScheduleB.split(',');

  console.log('pivA-d&h:', scheduleMapA);

  scheduleArrayB.forEach((scheduleB) => {
    const [dayB, timeB] = sliceByIndex(scheduleB, 2); // splits the string by the given index
    console.log('pivB-d&h:', `${dayB}:${timeB}`);
    // ================================================================
    const isDayConincidence = scheduleMapA.has(dayB);
    console.log('Day coincidence?:', isDayConincidence);

    const isTimeCoincidence = isDayConincidence
      ? timeCoincidence(scheduleMapA, dayB, timeB)
      : false;

    console.log('Time coincidence?:', isTimeCoincidence);
    console.log('// ================================================== //');
    // ================================================================

    if (isDayConincidence && isTimeCoincidence) {
      coincidences++;
    }
  });

  return coincidences;
};
