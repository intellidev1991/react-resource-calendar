import { useState, useCallback } from 'react';

/**
 * force to render view in functional component, just call this hook as example
 *@example
   const forceUpdate = useForceUpdate();
   forceUpdate()
 */
export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
}
