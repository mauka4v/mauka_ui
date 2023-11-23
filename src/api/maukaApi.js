import { apiEndpoint } from "./";
export const getTickerData = (tickers, range = "1d") => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickers: tickers, range: range }),
  };
  try {
    return fetch(`${apiEndpoint}/api/`, requestOptions)
      .then((response) => response.json())
      .then((data) => data);
  } catch (err) {
    console.log(`Failed with ${err}`);
  }
};

export const getBackTestData = (
  tickers,
  startDate = "",
  endDate = "",
  interval
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tickers: tickers,
      interval: interval,
      start_date: startDate,
      end_date: endDate,
    }),
  };
  try {
    return fetch(`${apiEndpoint}/api/backtest/`, requestOptions)
      .then((response) => (response !== undefined ? response.json() : {}))
      .then((data) => data)
      .catch(function (error) {
        // catch
        console.log("Request failed", error);
      });
  } catch (err) {
    console.log(`Failed with ${err}`);
  }
};

export const getSignalData = (tickers, range = "1d") => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    return fetch(`${apiEndpoint}/api/signal`)
      .then((response) => response.json())
      .then((data) => data);
  } catch (err) {
    console.log(`Failed with ${err}`);
  }
};

export const getSignalDataForWatchList = (tickers) => {
  let requestOptions = {};
  if (tickers.length > 0) {
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers: tickers }),
    };
  } else {
    requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
  }

  try {
    return fetch(`${apiEndpoint}/api/watchlist/`, requestOptions)
      .then((response) => response.json())
      .then((data) => data);
  } catch (err) {
    console.log(`Failed with ${err}`);
  }
};
