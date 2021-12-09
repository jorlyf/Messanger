import React from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Message from "../../models/Message";
import Notification from "../../models/Notification";

import Desktop from "./Desktop";
import Auth from "../Auth";

export function ChatWindow() {
  const dispatch = useDispatch();

  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);

  React.useEffect(() => {
    try {
      const chatHub = new HubConnectionBuilder()
        .withUrl("https://localhost:7115/chathub")
        .withAutomaticReconnect()
        .build();

      // handle events
      chatHub.on("ReceiveMessage", (stringMessage) => {
        const jsonMessage = JSON.parse(stringMessage);
        dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(jsonMessage.Id, jsonMessage.Username, jsonMessage.Text, jsonMessage.Date, false) })
      });
      chatHub.on("ReceiveRegistrationAnswer", (status) => {
        if (status == "ok")
          dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: true });
        else {
          dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: false });
          dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Ошибка регистрации. Ваше имя уже кем-то занято!") });
        }
      });
      chatHub.on("ReceiveMembersInfo", (stringMembersInfo) => {
        const jsonMembersInfo = JSON.parse(stringMembersInfo);
        console.log(jsonMembersInfo); // посмотреть в каком виде пришло
        dispatch({ type: ChatActionTypes.SET_MEMBERS_LIST, payload: jsonMembersInfo.Users });
      });

      chatHub.onclose(() => {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Ошибка соединения") });
      })

      // connect
      chatHub.start().catch(error => {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
        console.error(error.message);
      });

      dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });

    } catch (error) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
      console.error(error.message);
    }
  }, []);

  return (
    <>
      {IS_AUTHORIZED ? <Desktop /> : <Auth />}
    </>
  )
}