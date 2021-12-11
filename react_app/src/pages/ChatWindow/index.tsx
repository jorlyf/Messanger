import React from "react";
import { useDispatch } from "react-redux";

import useTypedSelector from "../../hooks/useTypedSelector";
import useChatHub from "../../hooks/useChatHub";

import Desktop from "./Desktop";
import Auth from "../Auth";
import { ChatActionTypes } from "../../redux/types/Chat";

export function ChatWindow() {
  const dispatch = useDispatch();
  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);

  const chatHub = useChatHub();
  dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });

  return (
    <>
      {IS_AUTHORIZED ? <Desktop /> : <Auth />}
    </>
  )
}