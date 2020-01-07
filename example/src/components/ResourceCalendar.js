/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./ResourceCalendar.css";
import { DayResourceName } from "./DayResourceName";
import { GridLineDayView } from "./GridLineDayView";
import { DayItem } from "./DayItem";

import {
  storeNames,
  storeActions,
  useStore,
  dispatchDirectly
} from "./globalStore/index";

import Icon_left_time from "./icon_left_time_back.svg";
import Icon_right_time from "./icon_right_time_back.svg";

//--- outer-grid box margins
const outerGridMarginHorizontal = 60; // margin horizontal panel-left and right as pixel
const outerGridMarginTop = 65; // margin horizontal panel-left and right as pixel
const number_of_rows = 24; // as cell
const number_of_columns = 6; // as cell
const rowHeight = 60; // as pixel

const ResourceCalendar = ({
  heightWorkSpace, // scrolling height space
  containerHeightCalculator, // viewport space
  width,
  startFrom7AM = true,
  resourceData = [],
  viewType // one of "Day","Week","Month"
}) => {
  const [resourceViewPort, setResourceViewPort] = useState([]);
  const [indexViewPort, setIndexViewPort] = useState(1);
  const [isNextBtnNavigatorEnabled, setIsNextBtnNavigatorEnabled] = useState(
    true
  );
  const [isBackBtnNavigatorEnabled, setIsBackBtnNavigatorEnabled] = useState(
    false
  );

  const [{ dayViewDispatchPendingItems }, dispatchPending] = useStore(
    storeNames.logisticsPlanner.logisticsPlannerDispatchPending
  );
  //----- Refs
  const [refState, setRefState] = useState(false);
  const refFirstPoint = useRef(null); // to look view from 7AM - 1st time
  const refStartPoint = useRef(null); // to look view from 7AM - after 1st time
  //-----
  useEffect(() => {
    jumpToStartViewPoint();
  }, [startFrom7AM]);

  useEffect(() => {
    refreshViewPort();
  }, [indexViewPort, resourceData]);

  useEffect(() => {
    jumpToStartViewPoint();
  }, [viewType]);

  // jump to 7 am of viewPort screen-scheduler
  const jumpToStartViewPoint = () => {
    // iff start from 7 am enabled
    if (startFrom7AM) {
      if (refState === false) {
        // first time
        ReactDOM.findDOMNode(refFirstPoint.current).scrollIntoView({
          alignToTop: true
        });
        setRefState(true);
      } else {
        if (viewType === "Day") {
          ReactDOM.findDOMNode(refFirstPoint.current).scrollIntoView({
            alignToTop: true
          });
        } else if (viewType === "Week") {
          ReactDOM.findDOMNode(refStartPoint.current).scrollIntoView({
            alignToTop: true
          });
        }
      }
    }
  };

  //-----------------------------

  // just viewport width without 2 left and right margin
  const calculate_viewportWidth = () => {
    return width - outerGridMarginHorizontal * 2;
  };

  // just viewport height without resource bar height (not scrolling height)
  const calculate_viewportHeight = () => {
    return containerHeightCalculator() - outerGridMarginTop - 6;
  };
  // ---------------------------------------- View port navigation
  const refreshViewPort = () => {
    let pageSize = number_of_columns;
    let startIndex = (indexViewPort - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    //--- view Bound
    let isLastPage = indexViewPort * pageSize > resourceData.length;
    if (isLastPage) {
      // calculate amount of empty holders
      let diff = indexViewPort * pageSize - resourceData.length;
      let deff_array = [...Array(diff).keys()].map(i => ({
        resourceId: -1,
        name: "",
        vehicle: "",
        events: []
      }));
      let nextBound = [
        ...resourceData.slice(startIndex, resourceData.length),
        ...deff_array
      ];
      setResourceViewPort(nextBound);
      // update for drag-and-drop without re-rendering
      dispatchDirectly(
        storeNames.logisticsPlanner.logisticsPlannerCurrentViewPortResources,
        storeActions.logisticsPlanner.logisticsPlannerCurrentViewPortResources.setCurrentViewportResources(
          nextBound
        )
      );
    } else {
      let viewBound = resourceData.slice(startIndex, endIndex);
      setResourceViewPort(viewBound);
      // update for drag-and-drop without re-rendering
      dispatchDirectly(
        storeNames.logisticsPlanner.logisticsPlannerCurrentViewPortResources,
        storeActions.logisticsPlanner.logisticsPlannerCurrentViewPortResources.setCurrentViewportResources(
          viewBound
        )
      );
    }

    //--- calc back btn enabled or not
    if (indexViewPort === 1) {
      setIsBackBtnNavigatorEnabled(false);
    } else {
      setIsBackBtnNavigatorEnabled(true);
    }
    //--- calc next btn enabled or not
    hasMoreData();
  };
  const hasMoreData = () => {
    let currentData = indexViewPort * number_of_columns;
    if (resourceData.length > currentData) {
      setIsNextBtnNavigatorEnabled(true);
      return true;
    } else {
      setIsNextBtnNavigatorEnabled(false);
      return false;
    }
  };

  const nextViewPort = () => {
    if (isNextBtnNavigatorEnabled) {
      let index = indexViewPort + 1;
      setIndexViewPort(index);
    }
  };

  const backViewPort = () => {
    if (isBackBtnNavigatorEnabled) {
      let index = indexViewPort - 1;
      if (index === 0) {
        index = 1;
      }
      setIndexViewPort(index);
    }
  };

  const timeAM_PM = i => {
    if (i === 24) return "0 AM";
    return i < 12 ? `${i} AM` : `${i} PM`;
  };
  // ----------------------------------------

  // Grid- at First row, most first left cell [Back icon]
  const resourceBar_LeftBackIcon = () => {
    return (
      <div
        className={"flex-column flex-jc-center flex-ai-center iconRTGRight"}
        style={{
          ...styles.iconTimeNavigator,
          cursor: isBackBtnNavigatorEnabled ? "pointer" : "no-drop"
        }}
        onClick={() => {
          console.log("back clicked");
          backViewPort();
        }}
      >
        <div style={styles.iconTimeArrow}>
          <img src={Icon_left_time} alt="back" />
        </div>
      </div>
    );
  };

  // Grid- at First row, most first right cell [next icon]
  const resourceBar_RightNextIcon = () => {
    return (
      <div
        className={"flex-column flex-jc-center flex-ai-center iconRTGRight"}
        style={{
          ...styles.iconTimeNavigator,
          cursor: isNextBtnNavigatorEnabled ? "pointer" : "no-drop"
        }}
        onClick={() => {
          console.log("next clicked");
          nextViewPort();
        }}
      >
        <div style={styles.iconTimeArrow}>
          <img src={Icon_right_time} alt="next" />
        </div>
      </div>
    );
  };

  const leftTimeBarIndicator = () => {
    return (
      <div style={styles.leftTimePanelItemsContainer}>
        {[...Array(number_of_rows).keys()].map(i => {
          if (i === 0) {
            return (
              <div
                style={{
                  ...styles.leftTimePanelItemStyle(viewType),
                  top: "7px"
                }}
                key={"tl" + i}
              >
                {timeAM_PM(i)}
              </div>
            );
          } else if (i === 5)
            return [
              <div //WeekView ref
                key={"tl" + i}
                style={{
                  ...styles.leftTimePanelItemStyle(viewType),
                  height: "45px"
                }}
              >
                <span ref={refStartPoint}>{timeAM_PM(i)}</span>
              </div>,
              <div
                ref={refFirstPoint} //DayViewRef
                key={"tlx" + i}
                style={{
                  ...styles.leftTimePanelItemStyle(viewType),
                  height: "15px"
                }}
              ></div>
            ];
          else if (i === 7)
            // minus 5px, 7AM label
            return (
              <div
                key={"tl" + i}
                style={{
                  ...styles.leftTimePanelItemStyle(viewType),
                  top: "5px"
                }}
              >
                <span>{timeAM_PM(i)}</span>
              </div>
            );
          else
            return (
              <div
                key={"tl" + i}
                style={styles.leftTimePanelItemStyle(viewType)}
              >
                {timeAM_PM(i)}
              </div>
            );
        })}
      </div>
    );
    return null;
  };

  // Grid- at First row, center big cell [resource names]
  const resourceBar_centerResourceNames = () => {
    if (viewType === "Day") {
      return (
        <div
          style={{ position: "absolute", width: "100%", top: "0px" }}
          className="flex-row flex-jc-space-between flex-ai-flex-start"
        >
          {resourceViewPort &&
            resourceViewPort.length > 0 &&
            resourceViewPort.map((item, i) => {
              return (
                <DayResourceName
                  key={"dtr" + i}
                  id={item.resourceId}
                  name={item.name}
                  subText={item.vehicle}
                  events={item.events}
                />
              );
            })}
        </div>
      );
    }
  };

  const resourceColumnsSeparator_DayView = () => {
    if (viewType === "Day") {
      return [...Array(number_of_columns - 1).keys()].map(i => {
        const left = (i + 1) * (calculate_viewportWidth() / 6);
        return (
          <div
            key={"rdc" + i}
            style={styles.drawGridLinesColumn_dayViewStyle(
              outerGridMarginTop,
              left
            )}
          />
        );
      });
    }
  };

  const topFixResourceBarContainer = () => {
    return (
      <div style={styles.topFixResourceBar(width)}>
        <div style={{ ...styles.colGutter, ...styles.borderRight }}>
          {resourceBar_LeftBackIcon()}
        </div>
        <div style={styles.colMain}>
          {resourceColumnsSeparator_DayView()}
          {resourceBar_centerResourceNames()}
        </div>
        <div style={{ ...styles.colGutter, ...styles.borderLeft }}>
          {resourceBar_RightNextIcon()}
        </div>
      </div>
    );
  };

  // add calender item to pending list when we moved it for first time
  const add_calender_Items_into_pending_list = data => {
    const {
      endTime,
      startTime,
      eventId,
      newCol,
      originalCol,
      subColumn, // just for WeekItem and MontItem, in DayItem this is undefined
      resourceId_original,
      resourceId_new
    } = data;
    //set moved item into pending list
    const event = resourceViewPort[originalCol].events.filter(
      i => i.eventId === eventId
    )[0];
    const events = [{ ...event, endTime, startTime, eventId }]; //recalculate event- only on item is here

    if (viewType === "Day") {
      const pendingItem = {
        resourceId: resourceId_new, // with this id we assign this object into that resource into events array
        colNumber: newCol,
        type: "calenderItem",
        events: events // only one object is here in array
      };
      // dispatch pending day items
      dispatchPending(
        storeActions.logisticsPlanner.logisticsPlannerDispatchPending.addDayViewPendingItem(
          pendingItem
        )
      );
    }
  };

  const render_eventItems_DayView = () => {
    if (viewType === "Day") {
      if (resourceViewPort && resourceViewPort.length > 0) {
        //current pending list events ids
        const day_pending_events_ids = dayViewDispatchPendingItems.map(
          i => i.events[0].eventId
        );
        const dayItemArray = resourceViewPort.map((item, i) => {
          const colIndex = i;
          const events = item.events.map(e => {
            if (!day_pending_events_ids.includes(e.eventId)) {
              // check to prevent draw again items that now exist in pending list
              return (
                <DayItem
                  viewportWidth={calculate_viewportWidth()}
                  number_of_columns={number_of_columns}
                  rowHeight={rowHeight}
                  colNum={colIndex} // 0-5 => 6
                  resourceId={item.resourceId}
                  eventId={e.eventId}
                  key={e.eventId}
                  startTime={new Date(e.startTime)}
                  endTime={new Date(e.endTime)}
                  badges={e.badges}
                  descriptions={e.descriptions}
                  notifyPositionChanged={x => {
                    console.log(x);
                    add_calender_Items_into_pending_list(x);
                  }}
                />
              );
            } else return null;
          });
          return events;
        });
        // show list of DayItems
        return dayItemArray;
      } else {
        // if resourceViewPort is not available
        return null;
      }
    }
    return null;
  };

  // re-calculate pending items values after we moved them again
  const recalculate_pending_items_when_moved = data => {
    const {
      endTime,
      startTime,
      eventId,
      newCol,
      subColumn, //only for weekItem and MonthItem
      resourceId_original,
      resourceId_new
    } = data;
    if (viewType === "Day") {
      // get moved item from Day Repo
      let movedItem = dayViewDispatchPendingItems.filter(
        i => i.events[0].eventId === eventId
      );

      movedItem = movedItem[0]; //get only exist object from array
      const events = [{ ...movedItem.events[0], endTime, startTime, eventId }]; //recalculate event- only on item is here
      movedItem = {
        ...movedItem,
        colNumber: newCol,
        resourceId: resourceId_new,
        events
      }; // new item object
      dispatchPending(
        storeActions.logisticsPlanner.logisticsPlannerDispatchPending.editDayViewPendingItem(
          eventId,
          movedItem
        )
      );
    }
  };

  const render_pending_items = () => {
    // get current view port resourceIds, this is used for compare when we try to draw pending items on calendar.
    const current_viewport_resourceIds = resourceViewPort.map(
      i => i.resourceId
    );
    if (viewType === "Day") {
      const events_pending = dayViewDispatchPendingItems.map(e => {
        const event = e.events[0];
        if (current_viewport_resourceIds.includes(e.resourceId)) {
          return (
            <DayItem
              viewportWidth={calculate_viewportWidth()}
              number_of_columns={number_of_columns}
              rowHeight={rowHeight}
              colNum={e.colNumber} // 0-5 => 6
              resourceId={e.resourceId}
              eventId={event.eventId}
              key={event.eventId}
              startTime={new Date(event.startTime)}
              endTime={new Date(event.endTime)}
              badges={event.badges}
              descriptions={event.descriptions}
              notifyPositionChanged={x => {
                console.log("moved:", x);
                recalculate_pending_items_when_moved(x);
              }}
            />
          );
        } else return null;
      });
      return events_pending;
    }
  };

  return (
    <div>
      {topFixResourceBarContainer()}
      <div style={styles.mainGrid(viewType)}>
        <div
          style={{
            ...styles.colGutter,
            ...styles.borderRight,
            height:
              viewType !== "Month"
                ? number_of_rows * rowHeight
                : calculate_viewportHeight()
          }}
        >
          {leftTimeBarIndicator()}
        </div>
        <div style={styles.colMain}>
          <GridLineDayView
            viewType={viewType}
            number_of_rows={number_of_rows}
            number_of_columns={number_of_columns}
            rowHeight={rowHeight}
            heightWorkSpace={number_of_rows * rowHeight}
            viewportWidth={calculate_viewportWidth()}
          />
          <div
            className={"playground-drag-and-drop"}
            style={styles.playgroundDnD(
              calculate_viewportWidth(),
              number_of_rows * rowHeight
            )}
          >
            {render_eventItems_DayView()}
            {render_pending_items()}
          </div>
        </div>
        <div style={{ ...styles.colGutter, ...styles.borderLeft }}></div>
      </div>
    </div>
  );
};

export { ResourceCalendar };

const styles = {
  playgroundDnD: (width_viewport, height_workspace) => {
    return {
      position: "absolute",
      width: width_viewport,
      height: height_workspace,
      top: "0px",
      left: "0px",
      overflowX: "hidden"
    };
  },
  mainGrid: viewType => {
    return {
      display: "table",
      width: "100%",
      position: "relative",
      top: `${
        viewType === "Week" ? outerGridMarginTop * 2 : outerGridMarginTop
      }px`
    };
  },
  topFixResourceBar: width => ({
    display: "table",
    width: width,
    height: `${outerGridMarginTop}px`,
    position: "fixed",
    backgroundColor: "#FFF",
    zIndex: "90000" // overlay has 100,000, it have to less that 100,000 and greater that 9999(events item between 1,9999)
  }),
  colGutter: {
    width: "60px",
    display: "table-cell",
    textAlign: "center"
  },
  colMain: {
    position: "relative",
    width: `calc(100% - ${outerGridMarginHorizontal * 2}px)`,
    display: "table-cell"
  },
  borderLeft: {
    borderLeft: "1px solid #B7B7B8"
  },
  borderRight: {
    borderRight: "1px solid #B7B7B8"
  },
  mainTopRow: {
    height: `${outerGridMarginTop}px`,
    display: "table-row",
    border: "#f0f0f0 1px solid"
  },
  iconTimeNavigator: {
    cursor: "pointer",
    height: "100%"
  },
  leftTimePanelItemStyle: viewType => {
    return {
      position: "relative",
      color: `${viewType === "Month" ? "#FFF" : "#8C97B2"}`,
      fontSize: `${viewType === "Month" ? 8 : 14}px`,
      height: `${viewType === "Month" ? 15 : rowHeight}px`
    };
  },
  leftTimePanelItemsContainer: {
    position: "absolute",
    width: `${outerGridMarginHorizontal}px`,
    zIndex: "10",
    top: "-10px"
  },
  drawGridLinesColumn_dayViewStyle: (line_height, left) => {
    return {
      position: "absolute",
      left: `${left}px`,
      top: "0px",
      width: "1px",
      height: `${line_height}px`,
      backgroundColor: "#DADFEA"
    };
  }
};
