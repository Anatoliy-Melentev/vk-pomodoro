export const SET_START_TIME = 'TIMER::SET_START_TIME';
export const setStartTime = () => ({
  type: SET_START_TIME,
});

export const ADD_START_TIME = 'TIMER::ADD_START_TIME';
export const addStartTime = () => ({
  type: ADD_START_TIME,
});

export const SET_ADDED_TIME = 'TIMER::SET_ADDED_TIME';
export const setAddedTime = addedTime => ({
  type: SET_ADDED_TIME,
  payload: { addedTime },
});

export const ADD_MORE_START_TIME = 'TIMER::ADD_MORE_START_TIME';
export const addMoreTime = additingTime => ({
  type: ADD_MORE_START_TIME,
  payload: { additingTime },
});

export const SET_PAUSE_TIME = 'TIMER::SET_PAUSE_TIME';
export const setPauseTime = () => ({
  type: SET_PAUSE_TIME,
});

export const CLEAR_ALL_TIME = 'TIMER::CLEAR_ALL_TIME';
export const clearAllTime = () => ({
  type: CLEAR_ALL_TIME,
});

export const CHANGE_STAGE = 'TIMER::CHANGE_STAGE';
export const changeStage = countBreaks => ({
  type: CHANGE_STAGE,
  payload: { countBreaks },
});

export const SET_CUR_COUNT_BREAKS = 'PREFERENCES::SET_CUR_COUNT_BREAKS';
export const setCurCountBreaks = curCountBreaks => ({
  type: SET_CUR_COUNT_BREAKS,
  payload: { curCountBreaks },
});

export const SET_START_PREFERENCES = 'TIMER::SET_START_PREFERENCES';
export const setStartPreferences = countBreaks => ({
  type: SET_START_PREFERENCES,
  payload: { countBreaks },
});
