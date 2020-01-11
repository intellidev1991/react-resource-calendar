/* eslint-disable */
import React, { useRef } from "react";

const ColumnHeader = ({
  id,
  data,
  columnHeaderContent: ColumnHeaderContent,
  columnHeaderContainerStyle = {}
}) => {
  const node = useRef();

  // if id== -1 >> just draw empty holder
  if (`${id}` !== "-1") {
    return (
      <div
        ref={node}
        style={{ ...styles.container, ...columnHeaderContainerStyle }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <ColumnHeaderContent {...data} />
      </div>
    );
  } else {
    return (
      <div
        style={{ ...styles.container, ...columnHeaderContainerStyle }}
        ref={node}
      ></div>
    );
  }
};

export { ColumnHeader };

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
  }
};
