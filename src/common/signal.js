export const messageTypeOptions = ["bullish", "bearish", "neutral"];
const intervalOptions = ["1h", "1d", "1wk"];
const categoryOptions = ["rsi", "price"];
export const signalColumns = [
  {
    name: "ticker",
    isFilter: true,
    type: "input",
    title: "Ticker",
  },
  {
    name: "message_type",
    isFilter: true,
    type: "select",
    options: messageTypeOptions,
    title: "Trend",
  },
  {
    name: "category",
    isFilter: false,
    type: "input",
    options: categoryOptions,
    title: "Technical",
  },
  {
    name: "time_range",
    isFilter: true,
    type: "select",
    options: intervalOptions,
    title: "Interval",
  },
];
