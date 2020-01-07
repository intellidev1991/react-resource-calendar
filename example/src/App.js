/* eslint-disable */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ResourceGrid } from "./components/ResourceGrid";
import { MockData } from "./mockdata.json";
import "./App.scss";
const App = props => {
  const [heightWorkSpace, setHeightWorkSpace] = useState(0);
  const refHeightWorkSpace = useRef(null);

  useLayoutEffect(() => {
    setHeightWorkSpace(refHeightWorkSpace.current.clientHeight);
  });

  const calc_containerHeight = () => {
    return 700;
  };
  const calc_containerWidth = () => {
    return 1200;
  };

  useEffect(() => {}, []);
  return (
    <div style={styles.centerScreen}>
      <h3>
        The simple drag and drop and resize-able resource calendar for 24 hours
      </h3>
      <div
        ref={refHeightWorkSpace}
        className="hide-native-scrollbar"
        style={styles.calenderContainer(
          calc_containerWidth(),
          calc_containerHeight()
        )}
      >
        <ResourceGrid
          heightWorkSpace={heightWorkSpace} // inner height of ResourceTimeGrid includes overflowY
          containerHeightCalculator={calc_containerHeight} // fix ViewPoint height
          width={calc_containerWidth()}
          startFrom7AM={true}
          resourceData={MockData.dayViewItems()}
          viewType={"Day"}
        />
      </div>
    </div>
  );
};

export { App };

const styles = {
  centerScreen: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  calenderContainer: (width, height) => ({
    position: "relative",
    overflowY: "scroll",
    border: "1px solid #c4c4c4",
    width: width,
    height: height
  })
};
