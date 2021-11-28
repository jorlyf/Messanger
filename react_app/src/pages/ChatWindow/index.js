import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import Desktop from "./Desktop";

export function ChatWindow() {
  const dispatch = useDispatch();

  const Login = useSelector(state => state.chat.Login);

  React.useEffect(() => {
    const chatHub = new HubConnectionBuilder()
      .withUrl("https://localhost:7115/chathub")
      .withAutomaticReconnect()
      .build();

    chatHub.start();
    chatHub.on("ReceiveMessage", (message) => {
      if (message.login === Login) return;
      dispatch({ type: "AddMessage", payload: JSON.parse(message) })
    });

    dispatch({ type: "SET_ChatHub", payload: chatHub });
  }, []);

  return (
    <Desktop />
  )
}