/* eslint-disable */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ResourceGridCalendar } from "./ResourceGridCalendar";
import { MockData } from "./mockdata.json";
import "./App.scss";

const App = props => {
  const [numberOfChanged, setNumberOfChanged] = useState(0);
  const [mockData, setMockData] = useState(MockData.dayViewItems());
  const refRGCalendar = useRef();

  return (
    <div style={styles.centerScreen}>
      <h3>
        The simple drag and drop and resize-able resource calendar for 24 hours{" "}
        <span style={styles.changedEvents}>
          Updated events: {numberOfChanged}{" "}
        </span>
        <span>
          <button onClick={() => refRGCalendar.current.clearPendingList()}>
            Clear
          </button>
        </span>
      </h3>
      <ResourceGridCalendar
        ref={refRGCalendar}
        width={1200}
        height={800}
        startFrom7AM={true}
        resourceData={mockData}
        calendarContainerStyle={{ border: "1px solid #c4c4c4" }}
        columnHeaderContent={({ name, job }) => {
          return (
            <div style={styles.textContainer}>
              <div style={styles.textHead}>{name}</div>
              <div style={styles.textSub}>{job}</div>
            </div>
          );
        }}
        columnHeaderContainerStyle={{ height: 55, marginTop: "5px" }}
        topLeftBackIcon={"https://img.icons8.com/ios/50/000000/less-than.png"}
        topRightNextIcon={"https://img.icons8.com/ios/50/000000/more-than.png"}
        topLeftBackIconStyle={{}}
        topRightNextIconStyle={{}}
        onTopRightNextIconClicked={null}
        onTopLeftBackIconClicked={null}
        gridItemContent={props => {
          let descriptions = null;
          if (props && props.events && props.events.descriptions)
            descriptions = props.events.descriptions;
          return (
            <div style={styles.innerContent}>
              <div style={styles.description}>
                {descriptions.title && (
                  <div>
                    <span style={styles.bold}>{descriptions.title}</span>
                  </div>
                )}
                {descriptions.customer && (
                  <div>
                    <span style={styles.bold}>Customer:</span>
                    <span> {descriptions.customer}</span>
                  </div>
                )}
              </div>
            </div>
          );
        }}
        topBarStyle={{ backgroundColor: "#F50057", height: "2px" }}
        bodyStyle={{ backgroundColor: "#ECEFF1" }}
        bottomBarStyle={{ backgroundColor: "#2979FF" }}
        onItemClickHandler={() => {}}
        onTopBarClickHandler={() => {}}
        onEventsChanged={events => {
          //get list of changed items
          setNumberOfChanged(events.length);
        }}
        sidebarsWidth={50}
        headerBarHeight={65}
        leftTimePanelStyle={{ backgroundColor: "#fff" }}
        leftTimePanelItemStyle={{ color: "#F50057" }}
        gridLinesStyle={{
          rowOddLines: { backgroundColor: "#66BB6A" },
          rowEvenLines: { backgroundColor: "#B0BEC5" },
          columnOddLines: { backgroundColor: "#8D6E63" },
          columnEvenLines: { backgroundColor: "#FFA726" }
        }}
        innerMostLeftVerticalBorder={{ borderLeft: "1px solid #263238" }} // just pass borderLeft
        innerMostRightVerticalBorder={{ borderRight: "1px solid #263238" }} // just pass borderRight
      />
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
  // column header
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
    height: "100%"
  },
  changedEvents: {
    color: "#1976D2"
  },
  textSub: {
    color: "#000000",
    fontSize: "14px",
    lineHeight: "19px"
  },
  textHead: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "19px"
  },
  // grid Item
  innerContent: {
    position: "absolute",
    width: "100%"
  },
  description: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "3px"
  },
  menuContainer: { position: "absolute", top: "0px", right: "0px" },
  dotMenu: {
    width: "4px",
    height: "14px",
    marginRight: "10px",
    position: "absolute",
    top: "20px",
    right: "4px",
    zIndex: "20"
  },
  bold: {
    fontWeight: "700"
  },
  status: {
    color: "#059162",
    fontWeight: "700"
  }
};
