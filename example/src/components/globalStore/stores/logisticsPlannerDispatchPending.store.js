import { createStore } from "react-redux-global-state-manager";

// List of Constant Types
const types = {
  ADD_DAY_VIEW_PENDING_ITEM: "ADD_DAY_VIEW_PENDING_ITEM",
  EDIT_DAY_VIEW_PENDING_ITEM: "EDIT_DAY_VIEW_PENDING_ITEM",
  ADD_WEEK_VIEW_PENDING_ITEM: "ADD_WEEK_VIEW_PENDING_ITEM",
  EDIT_WEEK_VIEW_PENDING_ITEM: "EDIT_WEEK_VIEW_PENDING_ITEM",
  ADD_MONTH_VIEW_PENDING_ITEM: "ADD_MONTH_VIEW_PENDING_ITEM",
  EDIT_MONTH_VIEW_PENDING_ITEM: "EDIT_MONTH_VIEW_PENDING_ITEM"
};
// define store with name,initialState and reducer
const logisticsPlannerDispatchPending = createStore(
  "logisticsPlannerDispatchPending",
  {
    dayViewDispatchPendingItems: [],
    weekViewDispatchPendingItems: [],
    monthViewDispatchPendingItems: []
  },
  (state, action) => {
    // when a reducer is being used, you must return a new state value
    switch (action.type) {
      case types.ADD_DAY_VIEW_PENDING_ITEM:
        return {
          ...state,
          dayViewDispatchPendingItems: [
            ...state.dayViewDispatchPendingItems,
            action.payload
          ]
        };
      case types.EDIT_DAY_VIEW_PENDING_ITEM:
        // get unmoved item - remaining items
        const unmovedItems = state.dayViewDispatchPendingItems.filter(
          i => i.events[0].eventId !== action.payload.eventId
        );
        return {
          ...state,
          dayViewDispatchPendingItems: [...unmovedItems, action.payload.obj]
        };
      case types.ADD_WEEK_VIEW_PENDING_ITEM:
        return {
          ...state,
          weekViewDispatchPendingItems: [
            ...state.weekViewDispatchPendingItems,
            action.payload
          ]
        };
      case types.EDIT_WEEK_VIEW_PENDING_ITEM:
        // get unmoved item - remaining items
        const unmovedItems_w = state.weekViewDispatchPendingItems.filter(
          i => i.events[0].eventId !== action.payload.eventId
        );
        return {
          ...state,
          weekViewDispatchPendingItems: [...unmovedItems_w, action.payload.obj]
        };

      case types.ADD_MONTH_VIEW_PENDING_ITEM:
        return {
          ...state,
          monthViewDispatchPendingItems: [
            ...state.monthViewDispatchPendingItems,
            action.payload
          ]
        };
      case types.EDIT_MONTH_VIEW_PENDING_ITEM:
        // get unmoved item - remaining items
        const unmovedItems_m = state.monthViewDispatchPendingItems.filter(
          i => i.events[0].eventId !== action.payload.eventId
        );
        return {
          ...state,
          monthViewDispatchPendingItems: [...unmovedItems_m, action.payload.obj]
        };
      default:
        return state;
    }
  }
);

export { logisticsPlannerDispatchPending, types };
