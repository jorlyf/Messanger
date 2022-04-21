import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";
import useChatHub from "../../hooks/useChatHub";
import { createInputMessageFormData } from "../../utils";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Message from "../../models/Message";
import Notification from "../../models/Notification";
import FileContainer from "../../models/FileContainer";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

import Auth from "../Auth";
import InputMessage from "../../models/InputMessage";
import { config } from "../../utils/config";

interface IData {
  CHAT_HUB: any;
  IS_AUTHORIZED: boolean;
  IS_MOBILE: boolean;
  USERNAME: string;
  INPUT_MESSAGE: InputMessage;
  MESSAGES: Message[];
  NEXT_MESSAGE_ID: number;
  IS_MEMBERS_INFO: boolean;
  MEMBERS_LIST: { Usernames: string[], Date: string };
  MY_LAST_ATTACHMENT_ID: number;
}
interface IHandlers {
  handleSendMessage: () => void;
  handleChangeInputMessageText: (text: string) => void;
  handleAttachFiles: (files: FileContainer[]) => void;
  handleRemoveFiles: (files: FileContainer[]) => void;
}
export interface IChatWindowProps {
  data: IData;
  handlers: IHandlers;
}

const ChatWindow = () => {
  const dispatch = useDispatch();
  const CONNECTION_ID = useTypedSelector(state => state.app.CONNECTION_ID);

  const data: IData = {
    CHAT_HUB: useTypedSelector(state => state.chat.CHAT_HUB),
    IS_AUTHORIZED: useTypedSelector(state => state.app.IS_AUTHORIZED),
    IS_MOBILE: useTypedSelector(state => state.app.IS_MOBILE),
    USERNAME: useTypedSelector(state => state.app.USERNAME),
    INPUT_MESSAGE: useTypedSelector(state => state.chat.INPUT_MESSAGE),
    MESSAGES: useTypedSelector(state => state.chat.MESSAGES),
    NEXT_MESSAGE_ID: useTypedSelector(state => state.chat.NEXT_MESSAGE_ID),
    IS_MEMBERS_INFO: useTypedSelector(state => state.chat.IS_MEMBERS_INFO),
    MEMBERS_LIST: useTypedSelector(state => state.chat.MEMBERS_LIST),
    MY_LAST_ATTACHMENT_ID: useTypedSelector(state => state.chat.MY_LAST_ATTACHMENT_ID)
  };

  const handlers: IHandlers = {
    handleSendMessage: async () => {
      if (data.INPUT_MESSAGE.messageText.length > 512) {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком длинное сообщение! >512 символов") });
        return;
      }
      if (data.INPUT_MESSAGE.messageText.length < 1 && data.INPUT_MESSAGE.attachments.length < 1) return;
      if (data.CHAT_HUB._connectionState !== "Connected") {
        console.error("Соединение с chathub не установлено");
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение с chathub не установлено") });
        return;
      }

      try {
        const message: InputMessage = data.INPUT_MESSAGE;
        const formData: FormData = createInputMessageFormData(message);
        const options = {
          method: "POST",
          body: formData,
          headers: {
            connectionId: CONNECTION_ID
          }
        };

        const response = await fetch(`${config.apiUrl}/api/Chat/SendMessage`, options);

        dispatch({ type: ChatActionTypes.CLEAR_INPUT_MESSAGE });

        if (response.status !== 200) {
          console.error(response);
          return;
        }

      } catch (error: any) {
        dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
        console.error(error.message);
      }
    },
    handleChangeInputMessageText: (text: string) => dispatch({ type: ChatActionTypes.SET_INPUT_MESSAGE_TEXT, payload: text }),
    handleAttachFiles: (toAddFiles: FileContainer[]) => {
      dispatch({ type: ChatActionTypes.ADD_INPUT_MESSAGE_ATTACHMENTS, payload: [...toAddFiles] });
    },
    handleRemoveFiles: (toRemoveFiles: FileContainer[]) => {
      dispatch({ type: ChatActionTypes.REMOVE_INPUT_MESSAGE_ATTACHMENTS, payload: [...toRemoveFiles] });
    }
  };

  useChatHub(); // connection to backend (SignalR)

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