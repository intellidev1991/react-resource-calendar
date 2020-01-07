import { types } from '../stores/logisticsPlannerCurrentViewPortResources.store';

const logisticsPlannerCurrentViewPortResources = {
  /**
   * use this just for aware current resource ids for drag and drop use. not apply changes.
   */
  setCurrentViewportResources: objectArray => ({
    type: types.SET_CURRENT_VIEWPORT_RESOURCES,
    payload: objectArray
  })
};

export { logisticsPlannerCurrentViewPortResources };
