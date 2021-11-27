import React from "react";
import SignalR from "@microsoft/signalr";

import { Desktop } from "./Desktop";

export function ChatWindow()
{
  React.useEffect(() => {
    const chatHub = new SignalR.HubConnectionBuilder()
      .withUrl("chathub")
      .build();

    chatHub.invoke()
  })

  return (
    <Desktop />
  )
}