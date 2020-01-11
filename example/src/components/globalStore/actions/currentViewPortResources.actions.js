import { types } from "../stores/currentViewPortResources.store";

const currentViewPortResources = {
  /**
   * use this just for aware current resource ids for drag and drop use.
   */
  setCurrentViewportResources: objectArray => ({
    type: types.SET_CURRENT_VIEWPORT_RESOURCES,
    payload: objectArray
  })
};

export { currentViewPortResources };
