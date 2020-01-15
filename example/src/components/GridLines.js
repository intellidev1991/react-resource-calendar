/* eslint-disable */
import React from "react";

const GridLines = ({
  viewType,
  number_of_rows,
  number_of_columns,
  rowHeight,
  viewportWidth, // visible viewport width
  heightWorkSpace, // scrolling height space
  gridLinesStyle = {
    rowOddLines: {},
    rowEvenLines: {},
    columnOddLines: {},
    columnEvenLines: {}
  }
}) => {
  if (viewType === "Day") {
    // rows grid
    let rows = [...Array(number_of_rows + 1).keys()].map(i => {
      let top = i * rowHeight; // each band has 60 px height
      if (i === 0) {
        top = 2;
      } // for a first row line
      i = i + 1;
      if (i % 2 === 0) {
        //even lines
        return (
          <div
            key={"dr" + i}
            style={{
              ...styles.drawGridRowLines_dayView(viewportWidth, top),
              ...gridLinesStyle.rowEvenLines
            }}
          />
        );
      } else {
        //odd lines
        return (
          <div
            key={"dr" + i}
            style={{
              ...styles.drawGridRowLines_dayView(viewportWidth, top),
              ...gridLinesStyle.rowOddLines
            }}
          />
        );
      }
    });
    //columns grid
    let columns = [...Array(number_of_columns - 1).keys()].map(i => {
      const left = (i + 1) * (viewportWidth / number_of_columns); // e.g: x/6
      i = i + 1;
      if (i % 2 === 0) {
        // even lines
        return (
          <div
            key={"dc" + i}
            style={{
              ...styles.drawGridColumnLines_dayView(
                heightWorkSpace, // scrolling height space
                left
              ),
              ...gridLinesStyle.columnEvenLines
            }}
          />
        );
      } else {
        // odd lines
        return (
          <div
            key={"dc" + i}
            style={{
              ...styles.drawGridColumnLines_dayView(
                heightWorkSpace, // scrolling height space
                left
              ),
              ...gridLinesStyle.columnOddLines
            }}
          />
        );
      }
    });
    return [...rows, ...columns];
  }
  return null;
};

export { GridLines };

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
