import { dispatchPendingList } from "./stores/dispatchPendingList.store";
import { currentViewPortResources } from "./stores/currentViewPortResources.store";

// ------ use this object as store identifier invoker in whole app
const storeNames = {
  dispatchPendingList,
  currentViewPortResources
};
// ------
export { storeNames };
