import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";

import axios from "axios";
import channel from "./slices/channel";
import channels from "./slices/channels";
export const rootReducer = combineReducers({
  channel: channel.reducer,
  channels: channels.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: axios,
    },
  }),
});

export default store;
