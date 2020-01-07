/* eslint-disable */
import React, { useState, useEffect } from "react";
import { commonFunctions } from "./commonFunctions";

const RectangleBadge = ({
  label = "",
  color = commonFunctions.getGridColor("red"),
  marginTop = 0,
  pointer = false
}) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "23px",
      height: "23px",
      background: commonFunctions.getGridColor("red"),
      borderRadius: "3px",
      opacity: "1",
      fontSize: "14px",
      fontWeight: "700",
      color: "#FFFFFF",
      cursor: pointer ? "pointer" : "default"
    }
  };

  useEffect(() => {}, []);
  return (
    <div style={{ ...styles.container, background: color, marginTop }}>
      <span>{label}</span>
    </div>
  );
};

export { RectangleBadge };
