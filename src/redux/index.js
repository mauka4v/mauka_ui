import watchListReducer from "./reducers/watchlist"

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    watchList: watchListReducer
  }
})
