/* eslint-disable */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ResourceCalendar } from "./components/ResourceCalendar";

const ResourceGridCalendar = ({
  width,
  height,
  resourceData = [],
  startFrom7AM = true,
  calendarContainerStyle = {},
  columnHeaderContent,
  columnHeaderContainerStyle = {},
  topLeftBackIcon = null,
  topRightNextIcon = null,
  topLeftBackIconStyle = {},
  topRightNextIconStyle = {},
  onTopRightNextIconClicked = null,
  onTopLeftBackIconClicked = null,
  gridItemContent
}) => {
  const [realHeightScrollingSpace, setRealHeightScrollingSpace] = useState(0);
  const refParentOfResourceCalendar = useRef(null);

  useLayoutEffect(() => {
    setRealHeightScrollingSpace(
      refParentOfResourceCalendar.current.clientHeight
    );
  });

  const calc_containerHeight = () => {
    return height;
  };
  const calc_containerWidth = () => {
    return width;
  };

  useEffect(() => {}, []);
  return (
    <div
      ref={refParentOfResourceCalendar}
      className="hide-native-scrollbar"
      style={{
        ...styles.calenderContainer(
          calc_containerWidth(),
          calc_containerHeight()
        ),
        ...calendarContainerStyle
      }}
    >
      <ResourceCalendar
        realHeightScrollingSpace={realHeightScrollingSpace} // inner height of ResourceTimeGrid includes overflowY
        containerHeightCalculator={calc_containerHeight} // fix ViewPoint height
        width={calc_containerWidth()}
        startFrom7AM={startFrom7AM}
        resourceData={resourceData}
        viewType={"Day"}
        columnHeaderContent={columnHeaderContent}
        columnHeaderContainerStyle={columnHeaderContainerStyle}
        topLeftBackIcon={topLeftBackIcon}
        topRightNextIcon={topRightNextIcon}
        topLeftBackIconStyle={topLeftBackIconStyle}
        topRightNextIconStyle={topRightNextIconStyle}
        onTopRightNextIconClicked={onTopRightNextIconClicked}
        onTopLeftBackIconClicked={onTopLeftBackIconClicked}
        gridItemContent={gridItemContent}
      />
    </div>
  );
};

export { ResourceGridCalendar };

const styles = {
  calenderContainer: (width, height) => ({
    position: "relative",
    overflowY: "scroll",
    border: "1px solid #c4c4c4",
    width: width,
    height: height
  })
};
