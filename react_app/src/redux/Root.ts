import { combineReducers } from "redux";

import App from "./App";
import Chat from "./Chat";


export const RootReducer = combineReducers({
  app: App,
  chat: Chat
});

export type RootState = ReturnType<typeof RootReducer>