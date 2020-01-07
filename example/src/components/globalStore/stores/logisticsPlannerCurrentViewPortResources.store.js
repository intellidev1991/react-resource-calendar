import { createStore } from "react-redux-global-state-manager";

// List of Constant Types
const types = {
  SET_CURRENT_VIEWPORT_RESOURCES: "SET_CURRENT_VIEWPORT_RESOURCES"
};
// define store with name,initialState and reducer
const logisticsPlannerCurrentViewPortResources = createStore(
  "logisticsPlannerCurrentViewPortResources",
  {
    currentViewportResources: []
  },
  (state, action) => {
    // when a reducer is being used, you must return a new state value
    switch (action.type) {
      case types.SET_CURRENT_VIEWPORT_RESOURCES:
        return {
          ...state,
          currentViewportResources: action.payload
        };
      default:
        return state;
    }
  }
);

export { logisticsPlannerCurrentViewPortResources, types };
