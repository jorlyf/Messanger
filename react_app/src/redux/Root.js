import { combineReducers } from "redux";

import { Chat } from "./Chat";

export const Root = combineReducers({
  chat: Chat
});