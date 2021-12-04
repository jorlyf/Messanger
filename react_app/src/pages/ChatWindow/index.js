import React from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Desktop from "./Desktop";
import Message from "../../models/Message";
import Auth from "../Auth";

export function ChatWindow() {
  const dispatch = useDispatch();


  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);
  const LAST_MESSAGE_ID = useTypedSelector(state => state.chat.LAST_MESSAGE_ID);

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
        console.log(jsonMessage);
        dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(LAST_MESSAGE_ID, jsonMessage.Username, jsonMessage.Text, jsonMessage.Date, false) })
      });
      chatHub.on("ReceiveRegistrationAnswer", (status) => {
        if (status == "ok")
          dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: true });
        else {
          dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: false });
          dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: "ошибка регистрации" } });
        }

      });

      dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });

    } catch (error) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: error.message } });
      console.error(error.message);
    }
  }, []);

  return (
    <>
      {IS_AUTHORIZED ? <Desktop /> : <Auth />}
    </>
  )
}