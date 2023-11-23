import { createSlice } from '@reduxjs/toolkit'

export const backTestSlice = createSlice({
  name: 'backTest',
  initialState: {
    ticker: ["TSLA"],
    interval: "1d"
  },
  reducers: {
    addTickerToBackTest: (state, action) => {
        console.log(state, action.payload)
        state.backtest.ticker = action.payload.ticker
        },
//    removeTickerToWatchList : (state, action) => {
//         const ticker = action.payload.ticker
//         const filteredList = state.watchList.filter( symbol => symbol !== ticker )
//         state = {
//             ...state,
//             watchList: filteredList
//         }
//     },
    changeIntervalForBacktest : (state, action) => {
      state = {
        ...state,
        interval : action.payload.interval
      }
    }
}})

export const {addTickerToBackTest, changeIntervalForBacktest} = backTestSlice.actions

export default backTestSlice.reducer
