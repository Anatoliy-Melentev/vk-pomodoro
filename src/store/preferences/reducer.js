import {
  SET_ADD_TIME,
  SET_BREAK_TIME,
  SET_COUNT_BREAKS,
  SET_LIGHT,
  SET_LONG_TIME,
  SET_NOTIFY,
  SET_SECONDS,
  SET_SOUND,
  SET_WORK_TIME,
} from './actions';

const initialState = {
  workTimeOut: 25,
  breakTimeOut: 5,
  longTimeOut: 30,
  additingTime: 5,
  countBreaks: 4,
  notify: false,
  seconds: false,
  light: true,
  sound: 0,
};

export const preferencesReducer = (storeState = initialState, { type, payload }) => {
  switch (type) {
    case SET_WORK_TIME: {
      return { ...storeState, workTimeOut: payload.workTimeOut };
    }
    case SET_BREAK_TIME: {
      return { ...storeState, breakTimeOut: payload.breakTimeOut };
    }
    case SET_LONG_TIME: {
      return { ...storeState, longTimeOut: payload.longTimeOut };
    }
    case SET_ADD_TIME: {
      return { ...storeState, additingTime: payload.additingTime };
    }
    case SET_COUNT_BREAKS: {
      return { ...storeState, countBreaks: payload.countBreaks };
    }
    case SET_SOUND: {
      return { ...storeState, sound: payload.sound };
    }
    case SET_NOTIFY: {
      return { ...storeState, notify: payload.notify };
    }
    case SET_SECONDS: {
      return { ...storeState, seconds: payload.seconds };
    }
    case SET_LIGHT: {
      return { ...storeState, light: !storeState.light };
    }
    default:
      return storeState;
  }
};
