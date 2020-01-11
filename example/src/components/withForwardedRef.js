import React, { forwardRef } from "react";

/**
 * Add ref capability to your component
 * @param {React.Component} Comp Your component that need to add ref capability
 * @example
 * export const MyInput = withForwardedRef(_MyInput);
  // We should get forwardedRef from props inside _MyInput component and then pass ref={forwardedRef} to main root div of _MyInput component.
  // Call Time:
  const myRef=useRef()
  <MyInput
    ref={myRef}
  />

 */
const withForwardedRef = Comp => {
  const handle = (props, ref) => <Comp {...props} forwardedRef={ref} />;

  const name = Comp.displayName || Comp.name;
  handle.displayName = `withForwardedRef(${name})`;

  return forwardRef(handle);
};

export default withForwardedRef;
