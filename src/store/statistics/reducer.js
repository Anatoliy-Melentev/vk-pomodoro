import { ADD_PAUSE_TIME, ADD_STOP, ADD_TOMATO_TIME, ADD_TOTAL_TIME, CREATE_RECORD } from './actions';
import { getDay, getCurSeconds } from '../../utils/appFn';

const initialState = {};

export const statisticsReducer = (storeState = initialState, { type, payload }) => {
  const id = getDay(getCurSeconds());
  switch (type) {
    case CREATE_RECORD: {
      return {
        ...storeState,
        [id]: {
          id, tomato: 0, totalDT: 0, pauseDT: 0, tomatoDT: 0, stopTimes: 0,
        },
      };
    }
    case ADD_TOTAL_TIME: {
      return {
        ...storeState,
        [id]: {
          ...storeState[id],
          totalDT: storeState[id].totalDT + payload.totalDT,
        },
      };
    }
    case ADD_TOMATO_TIME: {
      return {
        ...storeState,
        [id]: {
          ...storeState[id],
          tomatoDT: storeState[id].tomatoDT + payload.tomatoDT,
          totalDT: storeState[id].totalDT + payload.tomatoDT,
          tomato: storeState[id].tomato + 1,
        },
      };
    }
    case ADD_PAUSE_TIME: {
      return {
        ...storeState,
        [id]: {
          ...storeState[id],
          pauseDT: storeState[id].pauseDT + payload.pauseDT,
          totalDT: storeState[id].totalDT + payload.pauseDT,
        },
      };
    }
    case ADD_STOP: {
      return {
        ...storeState,
        [id]: {
          ...storeState[id],
          stopTimes: storeState[id].stopTimes + 1,
        },
      };
    }
    default:
      return storeState;
  }
};
