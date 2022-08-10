const getTimes = (time) => {
  const [startT, endT] = time.split('-');

  const [strTHour, strtTMinute] = startT.split(':');
  const [endTHour, endTMinute] = endT.split(':');

  let startTime = new Date(100, 1, 1, Number(strTHour), Number(strtTMinute), 0);
  let endTime = new Date(100, 1, 1, Number(endTHour), Number(endTMinute), 0);

  return { startTime, endTime };
};

module.exports = { getTimes };
