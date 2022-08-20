import { getCurSeconds } from '../../utils/appFn';
import {
  SET_START_TIME,
  ADD_START_TIME,
  SET_PAUSE_TIME,
  CLEAR_ALL_TIME,
  CHANGE_STAGE,
  ADD_MORE_START_TIME,
  SET_START_PREFERENCES,
  SET_ADDED_TIME, SET_CUR_COUNT_BREAKS,
} from './actions';

const initialState = {
  startDT: 0,
  pauseDT: 0,
  workStage: true,
  curCountBreaks: 4,
  addedTime: 0,
};

export const timerReducer = (storeState = initialState, { type, payload }) => {
  switch (type) {
    case SET_START_TIME: {
      return { ...storeState, startDT: getCurSeconds() };
    }
    case ADD_START_TIME: {
      return {
        ...storeState,
        startDT: storeState.startDT + getCurSeconds() - storeState.pauseDT,
        pauseDT: 0,
      };
    }
    case ADD_MORE_START_TIME: {
      return {
        ...storeState,
        startDT: storeState.startDT + payload.additingTime,
      };
    }
    case SET_ADDED_TIME: {
      return {
        ...storeState,
        addedTime: payload.addedTime,
      };
    }
    case SET_PAUSE_TIME: {
      return { ...storeState, pauseDT: getCurSeconds() };
    }
    case CLEAR_ALL_TIME: {
      return { ...storeState, pauseDT: 0, startDT: 0 };
    }
    case SET_CUR_COUNT_BREAKS: {
      return { ...storeState, curCountBreaks: payload.curCountBreaks };
    }
    case CHANGE_STAGE: {
      const count = storeState.curCountBreaks < payload.curCountBreaks ? storeState.curCountBreaks + 1 : 1;
      return {
        ...storeState,
        workStage: !storeState.workStage,
        curCountBreaks: storeState.workStage ? count : storeState.curCountBreaks,
      };
    }
    case SET_START_PREFERENCES: {
      return {
        ...storeState,
        startDT: 0,
        pauseDT: 0,
        workStage: true,
        countBreaks: payload.countBreaks,
      };
    }
    default:
      return storeState;
  }
};
