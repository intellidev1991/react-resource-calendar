/* eslint-disable */
import React, { useState, useEffect } from "react";
import { commonFunctions } from "./commonFunctions";

const CircleGenerators = ({ badges }) => {
  useEffect(() => {}, []);

  const Circle = ({ label, colorName, right = 0 }) => {
    return (
      <div
        style={{
          position: "absolute",
          width: "30px",
          height: "30px",
          top: "-15px",
          right: right,
          borderRadius: "15px",
          backgroundColor: commonFunctions.getGridColor(colorName),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: "700"
        }}
      >
        <span>{label}</span>
      </div>
    );
  };

  const CircleGenerator = badges => {
    let _withWarning = badges.filter(item => item.label === "!"); //catch warning label >> !
    let _withoutWarning = badges.filter(item => item.label !== "!"); //catch rest of badge without ! alert badge
    let tempBadges = [..._withWarning, ..._withoutWarning];
    const data = tempBadges.map((item, i) => {
      if (i == 0)
        return <Circle key={i} label={item.label} colorName={item.colorName} />;
      return (
        <Circle
          key={i}
          right={i * 35}
          label={item.label}
          colorName={item.colorName}
        />
      );
    });
    return data;
  };

  return CircleGenerator(badges);
};

export { CircleGenerators };
