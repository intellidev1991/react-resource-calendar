import { dispatchPendingList } from "./actions/dispatchPendingList.action";
import { currentViewPortResources } from "./actions/currentViewPortResources.actions";

// ------ use this object as action function invoker in whole app
const storeActions = {
  dispatchPendingList,
  currentViewPortResources
};

// ------
export { storeActions };
