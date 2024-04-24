import { combineReducers } from "@reduxjs/toolkit";
import { counterReducers } from "./reducer";

import { configureStore } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  table: counterReducers,
  // other slices would go here
}); // Import the combined reducers

const store = configureStore({
  reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch;
export default store;
