import { logisticsPlannerDispatchPending } from "./stores/logisticsPlannerDispatchPending.store";
import { logisticsPlannerCurrentViewPortResources } from "./stores/logisticsPlannerCurrentViewPortResources.store";

// ------ use this object as store identifier invoker in whole app
const storeNames = {
  logisticsPlanner: {
    logisticsPlannerDispatchPending,
    logisticsPlannerCurrentViewPortResources
  }
};
// ------
export { storeNames };
