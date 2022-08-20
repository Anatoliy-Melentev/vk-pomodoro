import { getDay, getCurSeconds } from '../../utils/appFn';

export const checkStatistics = state => !!state.statistics[getDay(getCurSeconds())];
export const selectStatistics = id => state => state.statistics[id] || {
  id, tomato: 0, totalDT: 0, pauseDT: 0, tomatoDT: 0, stopTimes: 0,
};
