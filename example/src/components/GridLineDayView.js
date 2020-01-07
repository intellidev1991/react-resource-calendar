/* eslint-disable */
import React from "react";

const GridLineDayView = ({
  viewType,
  number_of_rows,
  number_of_columns,
  rowHeight,
  viewportWidth, // visible viewport width
  heightWorkSpace // scrolling height space
}) => {
  if (viewType === "Day") {
    let rows = [...Array(number_of_rows + 1).keys()].map(i => {
      let top = i * rowHeight; // each band has 60 px height
      if (i === 0) {
        top = 2;
      } // for a first row line
      return (
        <div
          key={"dr" + i}
          style={styles.drawGridRowLines_dayView(viewportWidth, top)}
        />
      );
    });
    let columns = [...Array(number_of_columns - 1).keys()].map(i => {
      const left = (i + 1) * (viewportWidth / number_of_columns); // e.g: x/6
      return (
        <div
          key={"dc" + i}
          style={styles.drawGridColumnLines_dayView(
            heightWorkSpace, // scrolling height space
            left
          )}
        />
      );
    });
    return [...rows, ...columns];
  }
  return null;
};

export { GridLineDayView };

const styles = {
  drawGridRowLines_dayView: (line_width, top) => {
    return {
      position: "absolute",
      top: `${top}px`,
      height: "1px",
      width: `${line_width}px`,
      backgroundColor: "#DADFEA"
    };
  },
  drawGridColumnLines_dayView: (line_height, left) => {
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
