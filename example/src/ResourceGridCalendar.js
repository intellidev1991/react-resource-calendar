/* eslint-disable */
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useImperativeHandle
} from "react";
import withForwardedRef from "./components/withForwardedRef";
import { ResourceCalendar } from "./components/ResourceCalendar";
import {
  storeNames,
  storeActions,
  dispatchDirectly
} from "./components/globalStore/index";

const ResourceGridCalendar = withForwardedRef(
  ({
    width,
    height,
    resourceData = [],
    startFrom7AM = true,
    calendarContainerStyle = {},
    columnHeaderContent = null,
    columnHeaderContainerStyle = {},
    topLeftBackIcon = null,
    topRightNextIcon = null,
    topLeftBackIconStyle = {},
    topRightNextIconStyle = {},
    onTopRightNextIconClicked = null,
    onTopLeftBackIconClicked = null,
    gridItemContent = null,
    onEventsChanged = null,
    forwardedRef,
    sidebarsWidth = 60,
    headerBarHeight = 65,
    topBarStyle = {},
    bottomBarStyle = {},
    bodyStyle = {},
    onItemClickHandler = null,
    onTopBarClickHandler = null,
    leftTimePanelStyle = {},
    leftTimePanelItemStyle = {},
    gridLinesStyle = {
      rowOddLines: {},
      rowEvenLines: {},
      columnOddLines: {},
      columnEvenLines: {}
    },
    innerMostLeftVerticalBorder = {},
    innerMostRightVerticalBorder = {}
  }) => {
    const [realHeightScrollingSpace, setRealHeightScrollingSpace] = useState(0);
    const refParentOfResourceCalendar = useRef(null);

    useLayoutEffect(() => {
      setRealHeightScrollingSpace(
        refParentOfResourceCalendar.current.clientHeight
      );
    });

    useImperativeHandle(forwardedRef, () => ({
      clearPendingList: () => {
        dispatchDirectly(
          storeNames.dispatchPendingList,
          storeActions.dispatchPendingList.clearPendingItem()
        );
      }
    }));

    const calc_containerHeight = () => {
      return height;
    };
    const calc_containerWidth = () => {
      return width;
    };

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
          onEventsChanged={onEventsChanged}
          sidebarsWidth={sidebarsWidth}
          headerBarHeight={headerBarHeight}
          topBarStyle={topBarStyle}
          bottomBarStyle={bottomBarStyle}
          bodyStyle={bodyStyle}
          onItemClickHandler={onItemClickHandler}
          onTopBarClickHandler={onTopBarClickHandler}
          leftTimePanelStyle={leftTimePanelStyle}
          leftTimePanelItemStyle={leftTimePanelItemStyle}
          gridLinesStyle={gridLinesStyle}
          innerMostLeftVerticalBorder={innerMostLeftVerticalBorder}
          innerMostRightVerticalBorder={innerMostRightVerticalBorder}
        />
      </div>
    );
  }
);

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
