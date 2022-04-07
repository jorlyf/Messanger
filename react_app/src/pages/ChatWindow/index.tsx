import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";
import useChatHub from "../../hooks/useChatHub";
import { scrollDown, createFormData } from "../../utils";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Message from "../../models/Message";
import Notification from "../../models/Notification";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

import Auth from "../Auth";

interface IData {
  CHAT_HUB: any;
  IS_AUTHORIZED: boolean;
  IS_MOBILE: boolean;
  USERNAME: string;
  INPUT_TEXT_MESSAGE: string;
  ATTACHED_MESSAGE_IMAGES: any;
  MESSAGES: Message[];
  NEXT_MESSAGE_ID: number;
  IS_MEMBERS_INFO: boolean;
  MEMBERS_LIST: { Usernames: string[], Date: string };
}
interface IHandlers {
  handleSendMessage: () => void;
  dispatchInputMessage: (text: string) => void;
  handleAttachImages: (images: any) => void;
  handleSendImages: () => void;
}
export interface IChatWindowProps {
  data: IData;
  handlers: IHandlers;
}

const ChatWindow = () => {
  const dispatch = useDispatch();

  const data: IData = {
    CHAT_HUB: useTypedSelector(state => state.chat.CHAT_HUB),
    IS_AUTHORIZED: useTypedSelector(state => state.app.IS_AUTHORIZED),
    IS_MOBILE: useTypedSelector(state => state.app.IS_MOBILE),
    USERNAME: useTypedSelector(state => state.app.USERNAME),
    INPUT_TEXT_MESSAGE: useTypedSelector(state => state.chat.INPUT_TEXT_MESSAGE),
    ATTACHED_MESSAGE_IMAGES: useTypedSelector(state => state.chat.ATTACHED_MESSAGE_IMAGES),
    MESSAGES: useTypedSelector(state => state.chat.MESSAGES),
    NEXT_MESSAGE_ID: useTypedSelector(state => state.chat.NEXT_MESSAGE_ID),
    IS_MEMBERS_INFO: useTypedSelector(state => state.chat.IS_MEMBERS_INFO),
    MEMBERS_LIST: useTypedSelector(state => state.chat.MEMBERS_LIST)
  };
  
  const handlers: IHandlers = {
    handleSendMessage: () => {
      if (data.INPUT_TEXT_MESSAGE.length > 512) {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком длинное сообщение! >512 символов") });
        return;
      }
      if (data.INPUT_TEXT_MESSAGE.length < 1) return;
      if (data.CHAT_HUB._connectionState !== "Connected") {
        console.error("Соединение с chathub не установлено");
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение с chathub не установлено") });
        return;
      }

      try {
        data.CHAT_HUB.invoke("SendMessage", data.INPUT_TEXT_MESSAGE);
        const currentTime = new Date().toLocaleTimeString('ru', { hour12: false, hour: "numeric", minute: "numeric" });
        dispatch({ type: ChatActionTypes.SET_INPUT_TEXT_MESSAGE, payload: "" }); // clear input
        dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(data.NEXT_MESSAGE_ID, data.USERNAME, data.INPUT_TEXT_MESSAGE, currentTime, true) });

        setTimeout(() => {
          scrollDown("messages-list");
        }, 10); // самый лучший костыль, что я делал


      } catch (error: any) {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
        console.error(error.message);
      }
    },
    dispatchInputMessage: (text: string) => dispatch({ type: ChatActionTypes.SET_INPUT_TEXT_MESSAGE, payload: text }),
    handleAttachImages: (images: any[]) => {

    },
    handleSendImages: async () => {
      try {
        console.log(data.ATTACHED_MESSAGE_IMAGES);
        const formData = createFormData(data.ATTACHED_MESSAGE_IMAGES);
        const options = {
          method: "POST",
          // add connectionId SignalR in headers
          body: formData
        };
        console.log(formData);
        
        const response = await fetch("https://localhost:7115/api/FileReceiver/AttachMessageImages", options);
        console.log(response);
        
      } catch (error) {
        console.error(error);
      } finally {
        console.log("fetched!");
      }
    }
  };

  useChatHub(); // connection to backend (signalR)

  return (
    <>
      {data.IS_AUTHORIZED ?
        (data.IS_MOBILE ?
          <Mobile data={data} handlers={handlers} />
          :
          <Desktop data={data} handlers={handlers} />
        )
        :
        <Auth />}
    </>
  )
}

export default ChatWindow;