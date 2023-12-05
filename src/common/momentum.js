export const messageTypeOptions = ["Bullish", "Bearish"];
const intervalOptions = ["1h", "1d", "1wk"];
export const momentumColumns = [
  {
    name: "ticker",
    isFilter: true,
    type: "input",
    title: "Ticker",
  },
  {
    name: "momentum",
    isFilter: true,
    type: "select",
    options: messageTypeOptions,
    title: "Trend",
  },
  {
    name: "interval",
    isFilter: true,
    type: "select",
    options: intervalOptions,
    title: "Interval",
  },
];
