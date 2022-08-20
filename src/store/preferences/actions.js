export const SET_WORK_TIME = 'PREFERENCES::SET_WORK_TIME';
export const setWorkTime = workTimeOut => ({
  type: SET_WORK_TIME,
  payload: { workTimeOut },
});

export const SET_ADD_TIME = 'PREFERENCES::SET_ADD_TIME';
export const setAddTime = additingTime => ({
  type: SET_ADD_TIME,
  payload: { additingTime },
});

export const SET_BREAK_TIME = 'PREFERENCES::SET_BREAK_TIME';
export const setBreakTime = breakTimeOut => ({
  type: SET_BREAK_TIME,
  payload: { breakTimeOut },
});

export const SET_LONG_TIME = 'PREFERENCES::SET_LONG_TIME';
export const setLongTime = longTimeOut => ({
  type: SET_LONG_TIME,
  payload: { longTimeOut },
});

export const SET_COUNT_BREAKS = 'PREFERENCES::SET_COUNT_BREAKS';
export const setCountBreaks = countBreaks => ({
  type: SET_COUNT_BREAKS,
  payload: { countBreaks },
});

export const SET_SOUND = 'PREFERENCES::SET_SOUND';
export const setSound = sound => ({
  type: SET_SOUND,
  payload: { sound },
});

export const SET_NOTIFY = 'PREFERENCES::SET_NOTIFY';
export const setNotify = notify => ({
  type: SET_NOTIFY,
  payload: { notify },
});

export const SET_SECONDS = 'PREFERENCES::SET_SECONDS';
export const setSeconds = seconds => ({
  type: SET_SECONDS,
  payload: { seconds },
});

export const SET_LIGHT = 'PREFERENCES::SET_LIGHT';
export const setLight = () => ({
  type: SET_LIGHT,
});