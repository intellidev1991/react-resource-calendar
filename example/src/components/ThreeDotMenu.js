/* eslint-disable */
import React from "react";

const ThreeDotMenu = ({ style = {}, color = "green", onClick = null }) => {
  return (
    <div
      style={{ ...styles.container, ...style }}
      onClick={e => {
        if (onClick) onClick(e);
      }}
    >
      <div style={{ ...styles.dot, backgroundColor: color }} />
      <div style={{ ...styles.dot, backgroundColor: color }} />
      <div style={{ ...styles.dot, backgroundColor: color }} />
    </div>
  );
};

export { ThreeDotMenu };

const styles = {
  container: {
    width: "4px",
    height: "14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "10px"
  },
  dot: {
    width: "4px",
    height: "4px",
    borderRadius: "2px"
  }
};
