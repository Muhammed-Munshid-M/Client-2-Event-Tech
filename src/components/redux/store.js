import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice } from './alertSlice';
import { userSlice } from './userSlice';
import companySlice from './companyDetails';
import serviceSlice from './services';
// import { imageSlice } from "./aadhar";
// import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from "redux-thunk";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  company: companySlice.reducer,
  services: serviceSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
