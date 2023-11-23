import { createSlice, current } from "@reduxjs/toolkit";
import { handleSignalFilters } from ".";

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    watchList: [],
    period: "1d",
    ticker: "",
    interval: "1d",
    signalFilters: "",
  },
  reducers: {
    addTickerToWatchList: (state, action) => {
      console.log(state, action.payload);
      const ticker = action.payload.ticker;
      state.watchList.push(ticker);
    },
    removeTickerToWatchList: (state, action) => {
      const ticker = action.payload.ticker;
      const filteredList = state.watchList.filter(
        (symbol) => symbol !== ticker
      );
      state = {
        ...state,
        watchList: filteredList,
      };
    },
    addTickerToBackTest: (state, action) => {
      console.log(state, action.payload);
      state.watchList.ticker = action.payload.ticker;
    },
    changeInvPeriod: (state, action) => {
      console.log(state, action);
      state = {
        ...state,
        period: action.payload.period,
      };
    },
    changeIntervalForBacktest: (state, action) => {
      console.log(state, action);
      state = {
        ...state,
        interval: action.payload.interval,
      };
    },
    setSignalFilters: (state, { payload }) => {
      const currentState = current(state);
      const oldFilters = currentState.signalFilters;
      console.log(currentState, "has filters ", oldFilters);
      const filters = handleSignalFilters(oldFilters, payload);
      console.log("Updating State from : ", oldFilters, "  to   ", filters);
      state.signalFilters = filters;
      console.log("Updated State to : ", state.signalFilters);
    },
    clearSignalFilters: (state) => {
      console.log("clearing all filters....");
      state.signalFilters = [];
    },
  },
});

export const {
  addTickerToWatchList,
  removeTickerToWatchList,
  changeInvPeriod,
  addTickerToBackTest,
  changeIntervalForBacktest,
  setSignalFilters,
  clearSignalFilters,
} = watchListSlice.actions;

export default watchListSlice.reducer;
