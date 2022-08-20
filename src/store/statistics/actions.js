export const CREATE_RECORD = 'STATISTICS::CREATE_RECORD';
export const createRecordStat = () => ({
  type: CREATE_RECORD,
});

export const ADD_TOTAL_TIME = 'STATISTICS::ADD_TOTAL_TIME';
export const addTotalTime = totalDT => ({
  type: ADD_TOTAL_TIME,
  payload: { totalDT },
});

export const ADD_TOMATO_TIME = 'STATISTICS::ADD_TOMATO_TIME';
export const addTomatoTime = tomatoDT => ({
  type: ADD_TOMATO_TIME,
  payload: { tomatoDT },
});

export const ADD_PAUSE_TIME = 'STATISTICS::ADD_PAUSE_TIME';
export const addPauseTime = pauseDT => ({
  type: ADD_PAUSE_TIME,
  payload: { pauseDT },
});

export const ADD_STOP = 'STATISTICS::ADD_STOP';
export const addStop = () => ({
  type: ADD_STOP,
});
