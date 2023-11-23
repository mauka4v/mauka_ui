const IGNORE_TEST_LIST = ["insert", "update", "script", "delete", "./", "~"];
export const UNDEFINED = undefined;
export const isTextValid = (input) =>
  IGNORE_TEST_LIST.find((ignoreText) => input.includes(ignoreText));
export function isTextAllowed(input) {
  return IGNORE_TEST_LIST.find((ignoreText) => input.includes(ignoreText));
}

export const SIGNAL_CONF = {
  0: {
    color: "gray",
    rating: "Neutral",
    trend: "Neutral",
  },
  1: {
    color: "green",
    rating: "Buy",
    trend: "Bullish",
  },
  2: {
    color: "red",
    rating: "Sell",
    trend: "Bearish",
  },
};

export const intervalAgeMapping = {
  Weekly: "weekly_create_date",
  Daily: "daily_update_date",
};
export const TREND_CONF = {
  neutral: {
    color: "gray",
    rating: "Neutral",
    trend: "Neutral",
  },
  bullish: {
    color: "green",
    rating: "Buy",
    trend: "Bullish",
  },
  bearish: {
    color: "red",
    rating: "Sell",
    trend: "Bearish",
  },
};

export const periodButtonConf = {
  Weekly: "1wk",
  Daily: "1d",
  Hourly: "1h",
  "30min": "30m",
  "15min": "15m",
  "5min": "5m",
};

export const PRICE_ACTION = "TotSignal";
export const RSI = "RSI_SIGNAL";
export const MACD = "MACD_SIGNAL";
export const COLS_TO_PUBLISH = ["ticker", "category", "Daily", "Weekly"];
