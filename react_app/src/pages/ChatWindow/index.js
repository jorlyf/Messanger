import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { ACTION_TYPES_APP } from "../../redux/App";
import { ACTION_TYPES_CHAT } from "../../redux/Chat";

import Desktop from "./Desktop";

export function ChatWindow() {
  const dispatch = useDispatch();

  const LOGIN = useSelector(state => state.chat.LOGIN);

  React.useEffect(() => {
    try {
      const chatHub = new HubConnectionBuilder()
        .withUrl("https://localhost:7115/chathub")
        .withAutomaticReconnect()
        .build();

      chatHub.start().catch(error => {
        dispatch({ type: ACTION_TYPES_APP.ADD_NOTIFICATION, payload: { message: error.message } });
        console.error(error.message);
      });
      chatHub.on("ReceiveMessage", (message) => {
        if (message.login === LOGIN) return;
        dispatch({ type: ACTION_TYPES_CHAT.ADD_MESSAGE, payload: JSON.parse(message) })
      });

      dispatch({ type: ACTION_TYPES_CHAT.SET_CHAT_HUB, payload: chatHub });

    } catch (error) {
      dispatch({ type: ACTION_TYPES_APP.ADD_NOTIFICATION, payload: { message: error.message } });
      console.error(error.message);
    }
  }, []);

  return (
    <Desktop />
  )
}