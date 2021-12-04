import React from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Desktop from "./Desktop";
import Message from "../../models/Message";

export function ChatWindow() {
  const dispatch = useDispatch();

  const LOGIN = useTypedSelector(state => state.chat.LOGIN);

  React.useEffect(() => {
    try {
      const chatHub = new HubConnectionBuilder()
        .withUrl("https://localhost:7115/chathub")
        .withAutomaticReconnect()
        .build();

      chatHub.start().catch(error => {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: error.message } });
        console.error(error.message);
      });
      chatHub.on("ReceiveMessage", (jsonMessage) => {
        if (jsonMessage.login === LOGIN) return;
        console.log(jsonMessage);
        dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(jsonMessage.login, jsonMessage.text, jsonMessage.date) })
      });

      dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });

    } catch (error) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: error.message } });
      console.error(error.message);
    }
  }, []);

  return (
    <Desktop />
  )
}