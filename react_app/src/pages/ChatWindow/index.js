import React from "react";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { Desktop } from "./Desktop";

export function ChatWindow() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const chatHub = new HubConnectionBuilder()
      .withUrl("https://localhost:7115/chathub")
      .withAutomaticReconnect()
      .build();

    chatHub.start();
    chatHub.on("ReceiveMessage", (message) => dispatch({ type: "AddMessage", payload: message }));

    dispatch({ type: "SET_ChatHub", payload: chatHub });
  }, []);

  return (
    <Desktop />
  )
}