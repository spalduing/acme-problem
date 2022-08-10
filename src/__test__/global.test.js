const { getTimes } = require('../acme/utils/getTimes');
const { sliceByIndex } = require('../acme/utils/sliceByIndex');
const { getScheduleMap } = require('../acme/utils/getScheduleMap');
const { timeCoincidence } = require('../acme/utils/timeCoincidence');
const { getCoincidences } = require('../acme/utils/getCoincidences');

const time = '10:00-12:00';

const getTimesResponse = {
  startTime: new Date(100, 1, 1, Number('10'), Number('00'), 0),
  endTime: new Date(100, 1, 1, Number('12'), Number('00'), 0),
};

const GT_TITLE = 'getTimes(string) => { // Must return an object of dates}';

test(GT_TITLE, () => {
  const dateTime = getTimes(time);
  expect(dateTime).toMatchObject(getTimesResponse);
});

// ======================================================

const SBI_TITLE =
  'sliceByIndex(string) => { // Must split a string into two by the given index}';

const dayAndTime = 'MO10:00-12:00';
const sliceByIndexResponse = ['MO', '10:00-12:00'];

test(SBI_TITLE, () => {
  const dayTime = sliceByIndex(dayAndTime, 2);
  expect(dayTime).toEqual(expect.arrayContaining(sliceByIndexResponse));
});

// ======================================================

const GSM_TITLE = `getScheduleMap() => { 
                    // Must generate a map that contains the days that a worker
                    // arrived to the office as keys and the range time stayed in
                    // as values
                    }`;

const scheduleString = 'MO10:00-12:00,TH12:00-14:00,SU20:00-21:00';

const getScheduleMapResponse = new Map();
getScheduleMapResponse.set('MO', getTimes('10:00-12:00'));
getScheduleMapResponse.set('TH', getTimes('12:00-14:00'));
getScheduleMapResponse.set('SU', getTimes('20:00-21:00'));

test(GSM_TITLE, () => {
  const scheduledMap = getScheduleMap(scheduleString);
  expect(scheduledMap).toEqual(getScheduleMapResponse);
});

// ======================================================

const TC_TITLE = `timeCoincidence() => { 
                      // Must return true if the schedule time of the worker A coincides with worker's B  schedule time 
                      // The schedule of both workers coincide if:
                      //  - The range time of both workers is equal
                      //  - The range time of worker A contains the start time of worker B
                      //  - The range time of worker B contains the start time of worker A
                  }`;

const scheduledMapA = new Map(getScheduleMapResponse);
const dayB = 'MO';
const timeB = '10:00-12:00';

const timeCoincidenceResponse = true;

test(TC_TITLE, () => {
  const timeCoincided = timeCoincidence(scheduledMapA, dayB, timeB);
  expect(timeCoincided).toEqual(timeCoincidenceResponse);
});

// ======================================================

const GC_TITLE = `getCoincidences() => { 
                    // Must return the number of coincidences in the office of two workers
                  }`;

const workerScheduleA = `MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00`;
const workerScheduleB = `MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`;

const getCoincidencesResponse = 2;
test(GC_TITLE, () => {
  const coincidences = getCoincidences(workerScheduleA, workerScheduleB);
  expect(coincidences).toEqual(getCoincidencesResponse);
});
