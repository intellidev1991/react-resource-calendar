import React, { useEffect, useRef, useState } from "react";

const DayResourceName = ({ id, name, subText, events = [] }) => {
  useEffect(() => {}, [events]);

  const node = useRef();

  // if id== -1 >> just draw empty holder
  if (`${id}` !== "-1") {
    return (
      <div
        ref={node}
        style={styles.container}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div style={styles.textContainer}>
          <div style={styles.textHead}>{name}</div>
          <div style={styles.textSub}>{subText}</div>
        </div>
      </div>
    );
  } else {
    return <div style={styles.container} ref={node}></div>;
  }
};

export { DayResourceName };

const styles = {
  container: {
    height: "56px",
    backgroundColor: "#F4F4F4",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: "1",
    marginLeft: "7px",
    marginRight: "7px",
    marginTop: "5px"
  },
  icon: {
    width: "34px",
    height: "25px",
    marginTop: "5px",
    marginLeft: "5px"
  },
  menu: {
    width: "4px",
    height: "14px",
    marginTop: "10px",
    marginRight: "10px",
    cursor: "pointer",
    zIndex: "2"
  },
  menuContainer: { position: "absolute", top: "0px", right: "0px" },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
    height: "100%"
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
  }
};
