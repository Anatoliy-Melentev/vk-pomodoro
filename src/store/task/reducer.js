import {
  ADD_TASK, EDIT_TASK, CHANGE_TIME_TASK, DELETE_TASK, SET_COMPLETED_TASK, ADD_COMPLETED_COUNT,
} from './actions';

const initialState = {};

export const tasksReducer = (storeState = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK: {
      return {
        ...storeState,
        [payload.id]: payload,
      };
    }
    case EDIT_TASK: {
      return {
        ...storeState,
        [payload.id]: {
          ...storeState[payload.id],
          name: payload.name,
        },
      };
    }
    case DELETE_TASK: {
      const newStore = storeState;
      delete newStore[payload.id];
      return newStore;
    }
    case CHANGE_TIME_TASK: {
      return {
        ...storeState,
        [payload.id]: {
          ...storeState[payload.id],
          count: payload.count,
        },
      };
    }
    case SET_COMPLETED_TASK: {
      return {
        ...storeState,
        [payload.id]: {
          ...storeState[payload.id],
          isCompleted: true,
        },
      };
    }
    case ADD_COMPLETED_COUNT: {
      const { countCompleted } = storeState[payload.id];

      return {
        ...storeState,
        [payload.id]: {
          ...storeState[payload.id],
          countCompleted: countCompleted + 1,
        },
      };
    }
    default:
      return storeState;
  }
};
