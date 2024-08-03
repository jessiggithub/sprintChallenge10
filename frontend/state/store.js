import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filtersSlice.js'
import { pizzaApi } from './pizzaApi.js'


export const resetStore = () => configureStore({
  reducer: {
    filters: filtersReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const store = resetStore()
