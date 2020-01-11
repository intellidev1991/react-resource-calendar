import { createStore } from "react-redux-global-state-manager";

// List of Constant Types
const types = {
  ADD_DAY_VIEW_PENDING_ITEM: "ADD_DAY_VIEW_PENDING_ITEM",
  EDIT_DAY_VIEW_PENDING_ITEM: "EDIT_DAY_VIEW_PENDING_ITEM"
};
// define store with name,initialState and reducer
const logisticsPlannerDispatchPending = createStore(
  "logisticsPlannerDispatchPending",
  {
    dayViewDispatchPendingItems: []
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
          i => i.events.eventId !== action.payload.eventId
        );
        return {
          ...state,
          dayViewDispatchPendingItems: [...unmovedItems, action.payload.obj]
        };
      default:
        return state;
    }
  }
);

export { logisticsPlannerDispatchPending, types };
