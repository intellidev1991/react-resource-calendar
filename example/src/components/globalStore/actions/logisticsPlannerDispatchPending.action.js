import { types } from "../stores/logisticsPlannerDispatchPending.store";

const logisticsPlannerDispatchPending = {
  addDayViewPendingItem: obj => ({
    type: types.ADD_DAY_VIEW_PENDING_ITEM,
    payload: obj
  }),
  editDayViewPendingItem: (eventId, obj) => ({
    type: types.EDIT_DAY_VIEW_PENDING_ITEM,
    payload: { obj, eventId }
  }),
  addWeekViewPendingItem: obj => ({
    type: types.ADD_WEEK_VIEW_PENDING_ITEM,
    payload: obj
  }),
  editWeekViewPendingItem: (eventId, obj) => ({
    type: types.EDIT_WEEK_VIEW_PENDING_ITEM,
    payload: { obj, eventId }
  }),
  addMonthViewPendingItem: obj => ({
    type: types.ADD_MONTH_VIEW_PENDING_ITEM,
    payload: obj
  }),
  editMonthViewPendingItem: (eventId, obj) => ({
    type: types.EDIT_MONTH_VIEW_PENDING_ITEM,
    payload: { obj, eventId }
  })
};

export { logisticsPlannerDispatchPending };
