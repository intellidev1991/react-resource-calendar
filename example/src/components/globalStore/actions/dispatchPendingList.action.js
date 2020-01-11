import { types } from "../stores/dispatchPendingList.store";

const dispatchPendingList = {
  addDayViewPendingItem: obj => ({
    type: types.ADD_DAY_VIEW_PENDING_ITEM,
    payload: obj
  }),
  editDayViewPendingItem: (eventId, obj) => ({
    type: types.EDIT_DAY_VIEW_PENDING_ITEM,
    payload: { obj, eventId }
  }),
  clearPendingItem: () => ({
    type: types.CLEAR_DAY_VIEW_PENDING_ITEM
  })
};

export { dispatchPendingList };
