export const getPreferences = state => state.preferences;

export const checkLight = state => state.preferences.light;

export const selectTimeOutLength = curCountBreaks => ({ preferences: {
  workStage, workTimeOut, countBreaks, longTimeOut, breakTimeOut,
} }) => workStage ? workTimeOut : (curCountBreaks === countBreaks ? longTimeOut : breakTimeOut);

export const toSecFn = state => state.preferences.seconds ? min => min * 60 : min => min;
