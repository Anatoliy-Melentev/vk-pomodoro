import { getDay, getCurSeconds } from '../../utils/appFn';

export const selectEditingId = state => state.editMode.editingId;
export const selectSort = state => state.editMode.sort
  .filter((key) => getDay(getCurSeconds(Number(key))) === getDay(getCurSeconds()));


