/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable from "react-draggable";
import moment from "moment";
import { commonFunctions } from "./commonFunctions";
import { CircleGenerators } from "./CircleGenerators";
import { useForceUpdate } from "./useForceUpdate";
import { readOnlyStore, storeNames } from "./globalStore/index";
import "./GridItem.css"; // custom

const calculate_Y_AxisAsStartPoint = (startTime, rowHeight) => {
  let start = 0;
  let minutesDivider = rowHeight / 60; //e.g: 60 pix / 60 min = 1 px
  let startHour = startTime.getHours() * 60 * minutesDivider;
  let startMin = startTime.getMinutes() * minutesDivider;
  start = startHour + startMin;
  if (start < 0) start = 0;
  return start;
};

const calculate_Height_AsEndPoint = (startTime, endTime, rowHeight) => {
  let minutesDivider = rowHeight / 60; //e.g: 60 pix / 60 min = 1 px

  let start = 0;
  let startHour = startTime.getHours() * 60 * minutesDivider;
  let startMin = startTime.getMinutes() * minutesDivider;
  start = startHour + startMin;
  if (start < 0) start = 0;

  let end = 0;
  let endHour = endTime.getHours() * 60 * minutesDivider;
  let endMin = endTime.getMinutes() * minutesDivider;
  end = endHour + endMin;
  if (end < 0) end = 0;
  // calc delta time x2-x1
  return end - start;
};

const addMinutes = (baseDate, min) => {
  return moment(baseDate)
    .add(min, "minutes")
    .toDate();
};

const GridItem = ({
  viewportWidth,
  number_of_columns,
  rowHeight,
  colNum,
  resourceId,
  eventId,
  startTime,
  endTime,
  badges = [], // array of => [{ label: '!', colorName: 'red' }] > as convention if badges array contain more that 1 item then: the first item contain the smallCircleBadge info, otherwise small badge should be gone.
  descriptions = {},
  notifyPositionChanged = null,
  gridItemContent: GridItemContent,
  data
}) => {
  const forceUpdate = useForceUpdate();

  const EndTimeRef = useRef(endTime);
  const StartTimeRef = useRef(startTime);

  //--- Drag and Drop
  const xy = useRef({
    x: colNum * (viewportWidth / number_of_columns), //which column
    y: calculate_Y_AxisAsStartPoint(startTime, rowHeight) // start vertical point
  });
  const [axis, setAxis] = useState("both"); //both - x - y
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);
  //---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // top and bottom border color
  const [primaryColor, setPrimaryColor] = useState("green");

  // --- effects
  useEffect(() => {
    // remove badge with label ! and select the most first badge and choice its info
    let _withWarning = badges.filter(item => item.label === "!"); //catch warning label >> !
    let _withoutWarning = badges.filter(item => item.label !== "!"); //catch rest of badge without !
    if (badges.length === 1 && _withWarning.length === 1) {
      //set primary color to warning
      setPrimaryColor(commonFunctions.getGridColor(_withWarning[0].colorName));
    } else {
      // if more that 1 badges available, then set color to most first item of them without consider warning item
      if (_withoutWarning && _withoutWarning[0]) {
        setPrimaryColor(
          commonFunctions.getGridColor(_withoutWarning[0].colorName)
        );
      }
    }
    return () => {
      try {
        document.removeEventListener("mousemove", handleParentMouseMove);
      } catch (e) {}
      try {
        document.removeEventListener("mouseup", handleMouseUp);
      } catch (e) {}
    };
  }, [badges]);
  //---------------------------- store movement data
  // The distance the mouse has moved since `mousedown`.
  const delta = useRef({ x: 0, y: 0 });
  // Store startDragPos in a `ref` so handlers always have the latest value.
  const startDragPos = useRef({ x: 0, y: 0 });

  // `useCallback` is needed because `removeEventListener`` requires the handler
  // to be the same as `addEventListener`.  Without `useCallback` React will
  // create a new handler each render.
  const handleParentMouseMove = useCallback(e => {
    delta.current = {
      x: e.clientX - startDragPos.current.x,
      y: e.clientY - startDragPos.current.y
    };
    // calc original height
    const original_height = calculate_Height_AsEndPoint(
      StartTimeRef.current,
      EndTimeRef.current,
      rowHeight
    );
    //calc current height during drag
    const height = original_height + (e.clientY - startDragPos.current.y);
    // apply current height straight into div using CSS
    node.current.style.height = height + "px";
  }, []);

  const handleMouseUp = e => {
    let newEndTime = addMinutes(EndTimeRef.current, delta.current.y);
    EndTimeRef.current = newEndTime; //save new End time
    notifyMyPositionChanged(xy.current);
    forceUpdate();
    // remove temp resize listeners
    document.removeEventListener("mousemove", handleParentMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  //----------------------------
  //---------------------------- fetch outside click
  const node = useRef(); // ref to root of container
  const nodeTobBar = useRef();
  const nodeBottomBar = useRef();
  //---

  const onMouseDown_nodeBottomBarHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    startDragPos.current = { x: e.clientX, y: e.clientY }; //save current position
    document.addEventListener("mousemove", handleParentMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    console.log("nbb", e);
    return;
  };
  //-----------------------------

  // calculate zIndex based on event hour and minutes, max seconds in one day equals to 86400s - (hour+min) as int> result less time has bigger zIndex
  const zIndexCalcBasedOnOwnTime = startTime => {
    let minStr = startTime.getMinutes() + "";
    if (minStr.length === 1) minStr = "0" + minStr;
    let compoundTime = parseInt(`${startTime.getHours()}${minStr}`);
    return 86400 - compoundTime;
  };

  // ---- Dnd
  const handleStart = (e, data) => {
    console.log("Event: ", e.type); //mousedown
  };
  const handleStop = (e, data) => {
    if (!isDragging) {
      // onClick stuff here
      console.log("click");
    } else {
      // drag stop
      setIsDragging(false);

      console.log("Event: ", e.type); //mouseup
      let { lastX, lastY } = data;
      console.log(lastX, lastY);
      // ---------- check ant condition here, if position was ok, set it otherwise ignore setXY to component jump to previous position
      let pos = { x: lastX, y: lastY };
      // for both,x,y axis movement
      if (axis === "both") {
      } else if (axis === "y") {
        pos = { x: xy.current.x, y: pos.y };
      } else if (axis === "x") {
        pos = { x: pos.x, y: xy.current.y };
      }

      let deltaY = lastY - xy.current.y;
      console.log(deltaY);
      // calc original height before apply new start time
      const original_height = calculate_Height_AsEndPoint(
        StartTimeRef.current,
        EndTimeRef.current,
        rowHeight
      );
      console.log(original_height);
      // apply new start time
      let newStartTime = addMinutes(StartTimeRef.current, deltaY);
      StartTimeRef.current = newStartTime;
      // apply new end time (start time + original height)
      let newEndTime = addMinutes(StartTimeRef.current, original_height);
      EndTimeRef.current = newEndTime;
      // save new xy pos and call notify
      xy.current = pos;
      forceUpdate();
      notifyMyPositionChanged(pos);
      // ----------
    }
  };

  const handleDrag = (e, data) => {
    setIsDragging(true);
    console.log("Event: ", e.type); //mousemove
    //console.log(positionFetcher(data));
  };

  // calculate column number based on current x position
  const calculate_new_column_number = xyValue => {
    const offset = 10;
    const { x } = xyValue;
    const portion = viewportWidth / number_of_columns - offset;
    return Math.floor(x / portion);
  };

  // call parent handler for know this item has been moved
  const notifyMyPositionChanged = xyValue => {
    if (notifyPositionChanged) {
      //new col after moved
      const newCol = calculate_new_column_number(xyValue);
      //---- note: resourceId=-1 is empty boxes
      const { currentViewportResources } = readOnlyStore(
        storeNames.logisticsPlanner.logisticsPlannerCurrentViewPortResources
      );
      const resourceId_new = currentViewportResources[newCol].resourceId;
      //----
      notifyPositionChanged({
        resourceId_original: resourceId, // original resource id
        resourceId_new, // after moved, new resource id
        eventId,
        xy: xyValue,
        originalCol: colNum,
        newCol,
        startTime: StartTimeRef.current,
        endTime: EndTimeRef.current
      });
    }
  };
  // ----

  return (
    <div
      style={styles.holder(
        zIndexCalcBasedOnOwnTime(StartTimeRef.current),
        isDragging
      )}
    >
      <Draggable
        position={xy.current} // if present, become controlled component
        axis={axis}
        grid={[viewportWidth / number_of_columns, 5]}
        bounds=".playground-drag-and-drop" // "parent"
        cancel=".draggableDisabled"
        disabled={!isDraggingEnabled}
        onStart={handleStart}
        onStop={handleStop}
        onDrag={handleDrag}
      >
        <div
          ref={node}
          style={styles.container(
            viewportWidth,
            number_of_columns,
            calculate_Height_AsEndPoint(
              StartTimeRef.current,
              EndTimeRef.current,
              rowHeight
            ),
            zIndexCalcBasedOnOwnTime(StartTimeRef.current)
          )}
          className="gridItemContainer"
        >
          <div
            ref={nodeTobBar}
            className={"draggableDisabled"}
            style={{
              ...styles.top,
              ...styles.nodeTobBar,
              backgroundColor: primaryColor
            }}
          ></div>
          <div
            style={styles.body(isMenuOpen)}
            onClick={e => {
              e.preventDefault();
            }}
          >
            <GridItemContent {...data} />
          </div>
          <div
            ref={nodeBottomBar}
            className={"draggableDisabled"}
            style={{
              ...styles.bottom,
              ...styles.nodeBottomBar,
              backgroundColor: primaryColor
            }}
            onMouseDown={onMouseDown_nodeBottomBarHandler}
          />
        </div>
      </Draggable>
    </div>
  );
};

export { GridItem };

const styles = {
  holder: (zIndex, isDragging) => {
    return {
      position: "absolute",
      zIndex: isDragging ? "200000" : zIndex
    };
  },
  container: (viewportWidth, number_of_columns, height, zIndex) => {
    return {
      position: "absolute",
      zIndex: zIndex,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      cursor: "pointer",
      width: viewportWidth / number_of_columns,
      height: height
    };
  },
  top: {
    position: "relative",
    backgroundColor: "#E94343",
    borderRadius: "5px",
    height: "3px",
    width: "calc(100% - 8px)",
    marginLeft: "4px",
    marginRight: "-4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    zIndex: "10"
  },
  bottom: {
    backgroundColor: "#E94343",
    borderRadius: "5px",
    height: "3px",
    width: "calc(100% - 8px)",
    marginLeft: "4px",
    marginRight: "-4px"
  },
  body: isMenuOpen => {
    return {
      flex: "1",
      backgroundColor: "#F5F5F5",
      transform: "scaleX(0.96)",
      zIndex: isMenuOpen ? "3" : "1"
    };
  },
  nodeTobBar: {
    cursor: "default"
  },
  nodeBottomBar: {
    cursor: "s-resize",
    zIndex: "2"
  }
};
