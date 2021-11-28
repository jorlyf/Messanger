import { combineReducers } from "redux";

import App from "./App";
import Chat from "./Chat";

export const Root = combineReducers({
  app: App,
  chat: Chat
});