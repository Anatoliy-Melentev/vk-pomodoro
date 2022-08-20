export const SET_EDIT_MODE = 'EDIT_TASK::SET_EDIT_MODE';
export const setEditMode = id => ({
  type: SET_EDIT_MODE,
  payload: { id },
});

export const SET_SORT = 'EDIT_TASK::SET_SORT';
export const setSort = (id, position) => ({
  type: SET_SORT,
  payload: { id, position },
});

export const DELETE_SORT = 'EDIT_TASK::DELETE_SORT';
export const deleteSort = id => ({
  type: DELETE_SORT,
  payload: { id },
});
