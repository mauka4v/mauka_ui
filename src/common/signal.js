export const messageTypeOptions = ["bullish", "bearish", "neutral"];
const intervalOptions = ["1h", "1d", "1wk"];
export const signalColumns = [
  {
    name: "ticker",
    isFilter: true,
    type: "input",
  },
  {
    name: "message_type",
    isFilter: true,
    type: "select",
    options: messageTypeOptions,
  },
  {
    name: "category",
    isFilter: true,
    type: "input",
  },
  {
    name: "time_range",
    isFilter: true,
    type: "select",
    options: intervalOptions,
  },
];
