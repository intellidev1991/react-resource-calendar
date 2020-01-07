import { commonFunctions } from "./components/commonFunctions";
import moment from "moment";

//-------------------------------------------- utility function
const red_BadgeDescription = () => {
  return {
    badges: [{ label: "!", colorName: "red" }],
    descriptions: {
      title: "Daily Vehicle Inspection",
      status: "Waiting Inspection"
    }
  };
};
const redGreen_BadgeDescription = () => {
  return {
    badges: [
      { label: "!", colorName: "red" },
      { label: "D", colorName: "green" }
    ],
    descriptions: {
      title: "Daily Vehicle Inspection",
      customer: "Live Trakway",
      product: "Long rigged panel",
      area: "Liverpool",
      postcode: "L3",
      status: "Waiting Inspection"
    }
  };
};
const green_BadgeDescription = () => {
  return {
    badges: [{ label: "D", colorName: "green" }],
    descriptions: {
      customer: "Live Trakway",
      product: "Long rigged panel",
      area: "Liverpool",
      postcode: "L3",
      status: "On my way"
    }
  };
};
const purple_BadgeDescription = () => {
  return {
    badges: [{ label: "C", colorName: "purple" }],
    descriptions: {
      customer: "Live Trakway",
      product: "Long rigged panel",
      area: "Liverpool",
      postcode: "L3",
      status: "On my way"
    }
  };
};
const blue_BadgeDescription = () => {
  return {
    badges: [{ label: "C", colorName: "blue" }],
    descriptions: {
      customer: "Live Trakway",
      product: "Long rigged panel",
      area: "Liverpool",
      postcode: "L3",
      status: "On my way"
    }
  };
};
const black_BadgeDescription = () => {
  return {
    badges: [{ label: "T", colorName: "black" }],
    descriptions: {
      customer: "Live Trakway",
      product: "Long rigged panel",
      area: "Liverpool",
      postcode: "L3",
      status: "Pending"
    }
  };
};

const addHoursMinutesToIso = (baseDate, hour, min) => {
  return moment(
    new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate())
  )
    .add(hour, "hours")
    .add(min, "minutes")
    .toDate()
    .toISOString();
};

/**
 * @param {Date} baseDay
 */
const oneDayEventsGenerator = (baseDay, numberOfItemPerDay = 3) => {
  let _startTime = [
    addHoursMinutesToIso(baseDay, 7, 0),
    addHoursMinutesToIso(baseDay, 8, 30),
    addHoursMinutesToIso(baseDay, 11, 0),
    addHoursMinutesToIso(baseDay, 13, 0),
    addHoursMinutesToIso(baseDay, 15, 0),
    addHoursMinutesToIso(baseDay, 17, 0)
  ];
  let _endTime = [
    addHoursMinutesToIso(baseDay, 8, 0),
    addHoursMinutesToIso(baseDay, 10, 30),
    addHoursMinutesToIso(baseDay, 12, 30),
    addHoursMinutesToIso(baseDay, 14, 30),
    addHoursMinutesToIso(baseDay, 16, 30),
    addHoursMinutesToIso(baseDay, 18, 30)
  ];
  let _badgeDescription = [
    red_BadgeDescription(),
    redGreen_BadgeDescription(),
    green_BadgeDescription(),
    blue_BadgeDescription(),
    purple_BadgeDescription(),
    black_BadgeDescription()
  ];
  return [...Array(numberOfItemPerDay).keys()].map(i => {
    return {
      eventId: commonFunctions.uuidv4(),
      startTime: _startTime[i],
      endTime: _endTime[i],
      ..._badgeDescription[i]
    };
  });
};

//--------------------------------------------

const _Names = [
  "Adam Davis",
  "Anthony Graham",
  "Barry White",
  "Barry Scott",
  "Colin Hulme",
  "Carl Archbold",
  "Gerard Rippin",
  "Clemmie Gorczany"
];
const _Vehicles = [
  "HGV . AD17 0GV",
  "8 Wheeler . AD17 0GV",
  "Flatbed . AD18 FCD",
  "HGV . AD17 0GV",
  "8 Wheeler . AD17 0GV",
  "Artic . FY12 EDS",
  "8 Wheeler . DE13 FES",
  "Transit . YD18 FAD"
];

/* Data-Structure that server have to pass us
{
  resourceId: 1,
  name: 'Adam Davis',
  vehicle: 'HGV . AD17 0GV',
  events: [
    {
      eventId: commonFunctions.uuidv4(),
      startTime: '2019-10-12T03:30:00.000Z',
      endTime: '2019-10-12T09:00:02.000Z',
      badges: [
        { label: '!', colorName: 'red' },
        { label: 'D', colorName: 'green' }
      ],
      descriptions: {
        title: 'Daily Vehicle Inspection',
        customer: 'Live Trakway',
        product: 'Long rigged panel',
        area: 'Liverpool',
        postcode: 'L3',
        status: 'Waiting Inspection'
      }
    }
  ]
},
*/

export const MockData = {
  dayViewItems: (date = new Date()) => {
    return [...Array(8).keys()].map(i => {
      return {
        resourceId: i + 1,
        name: _Names[i],
        vehicle: _Vehicles[i],
        events: oneDayEventsGenerator(date)
      };
    });
  }
};
