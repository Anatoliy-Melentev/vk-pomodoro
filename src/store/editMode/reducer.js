import { SET_EDIT_MODE, SET_SORT, DELETE_SORT } from './actions';

const initialState = {
  editingId: 0,
  sort: [],
};

export const editModeReducer = (storeState = initialState, { type, payload }) => {
  switch (type) {
    case SET_EDIT_MODE: {
      return { ...storeState, editingId: payload.id };
    }
    case SET_SORT: {
      const sort = storeState.sort.filter((id) => id !== payload.id);
      sort.splice(typeof payload.position === 'number' ? payload.position : sort.length, 0, payload.id);
      return { ...storeState, sort };
    }
    case DELETE_SORT: {
      const sort = storeState.sort.filter((id) => id !== payload.id);
      return { ...storeState, sort };
    }
    default:
      return storeState;
  }
};
