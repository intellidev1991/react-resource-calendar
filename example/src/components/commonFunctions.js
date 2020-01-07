const commonFunctions = {
  uuidv4: () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  getGridColor: color => {
    let c = `${color}`.toLowerCase();
    switch (c) {
      case "red":
        return "#FF0000";
      case "green":
        return "#48CC70";
      case "blue":
        return "#009BDE";
      case "black":
        return "#000000";
      case "yellow":
        return "#FCB95C";
      case "purple":
        return "#A094ED";
      default:
        return "#FF0000"; //red
    }
  }
};

export { commonFunctions };
