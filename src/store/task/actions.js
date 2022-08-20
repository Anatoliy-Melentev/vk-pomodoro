export const ADD_TASK = 'TASKS::ADD_TASK';
export const addTask = (id, name) => ({
  type: ADD_TASK,
  payload: { id, name, count: 1, isCompleted: false, countCompleted: 0 },
});

export const EDIT_TASK = 'TASKS::EDIT_TASK';
export const editTask = (id, name) => ({
  type: EDIT_TASK,
  payload: { id, name },
});

export const DELETE_TASK = 'TASKS::DELETE_TASK';
export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: { id },
});

export const CHANGE_TIME_TASK = 'TASKS::CHANGE_TIME_TASK';
export const changeTimeTask = (id, count) => ({
  type: CHANGE_TIME_TASK,
  payload: { id, count },
});

export const SET_COMPLETED_TASK = 'TASKS::SET_COMPLETED_TASK';
export const setCompleted = id => ({
  type: SET_COMPLETED_TASK,
  payload: { id },
});

export const ADD_COMPLETED_COUNT = 'TASKS::ADD_COMPLETED_COUNT';
export const addCompletedCount = id => ({
  type: ADD_COMPLETED_COUNT,
  payload: { id },
});
