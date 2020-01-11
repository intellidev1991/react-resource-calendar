import { createStore } from "react-redux-global-state-manager";

// List of Constant Types
const types = {
  ADD_DAY_VIEW_PENDING_ITEM: "ADD_DAY_VIEW_PENDING_ITEM",
  EDIT_DAY_VIEW_PENDING_ITEM: "EDIT_DAY_VIEW_PENDING_ITEM",
  CLEAR_DAY_VIEW_PENDING_ITEM: "CLEAR_DAY_VIEW_PENDING_ITEM"
};
// define store with name,initialState and reducer
const dispatchPendingList = createStore(
  "dispatchPendingList",
  {
    pendingList_day: []
  },
  (state, action) => {
    // when a reducer is being used, you must return a new state value
    switch (action.type) {
      case types.ADD_DAY_VIEW_PENDING_ITEM:
        return {
          ...state,
          pendingList_day: [...state.pendingList_day, action.payload]
        };
      case types.EDIT_DAY_VIEW_PENDING_ITEM:
        // get unmoved item - remaining items
        const unmovedItems = state.pendingList_day.filter(
          i => i.events.eventId !== action.payload.eventId
        );
        return {
          ...state,
          pendingList_day: [...unmovedItems, action.payload.obj]
        };
      case types.CLEAR_DAY_VIEW_PENDING_ITEM:
        return {
          ...state,
          pendingList_day: []
        };
      default:
        return state;
    }
  }
);

export { dispatchPendingList, types };
