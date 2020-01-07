import { logisticsPlannerDispatchPending } from "./actions/logisticsPlannerDispatchPending.action";
import { logisticsPlannerCurrentViewPortResources } from "./actions/logisticsPlannerCurrentViewPortResources.actions";

// ------ use this object as action function invoker in whole app
const storeActions = {
  logisticsPlanner: {
    logisticsPlannerDispatchPending,
    logisticsPlannerCurrentViewPortResources
  }
};

// ------
export { storeActions };
