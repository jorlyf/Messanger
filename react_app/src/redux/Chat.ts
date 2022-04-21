import FileContainer from "../models/FileContainer";
import InputMessage from "../models/InputMessage";
import { IChatState, IChatAction, ChatActionTypes } from "./types/Chat";

const initialState: IChatState = {
  CHAT_HUB: undefined,
  CHAT_HUB_CONNECTION_IS_PENDING: false,
  INPUT_MESSAGE: new InputMessage("", []),
  MESSAGES: [],
  NEXT_MESSAGE_ID: 1,
  IS_MEMBERS_INFO: true,
  MEMBERS_LIST: { Usernames: [], Date: "" },
  MY_LAST_ATTACHMENT_ID: 0
}

export const Chat = (state: IChatState = initialState, action: IChatAction): IChatState => {
  switch (action.type) {
    case ChatActionTypes.SET_CHAT_HUB:
      return { ...state, CHAT_HUB: action.payload };

    case ChatActionTypes.SET_CHAT_HUB_CONNECTION_IS_PENDING:
      return { ...state, CHAT_HUB_CONNECTION_IS_PENDING: action.payload };

    case ChatActionTypes.SET_INPUT_MESSAGE_TEXT:
      return { ...state, INPUT_MESSAGE: new InputMessage(action.payload, [...state.INPUT_MESSAGE.attachments]) };

    case ChatActionTypes.ADD_INPUT_MESSAGE_ATTACHMENTS:
      return { ...state, INPUT_MESSAGE: new InputMessage(state.INPUT_MESSAGE.messageText, [...state.INPUT_MESSAGE.attachments, ...action.payload]) };

    case ChatActionTypes.REMOVE_INPUT_MESSAGE_ATTACHMENTS:
      const toRemove: FileContainer[] = action.payload;
      const files: FileContainer[] = state.INPUT_MESSAGE.attachments;

      const newFiles: FileContainer[] = files.filter(file => {
        let saveFlag = true;
        toRemove.forEach(remove => {
          if (file.id === remove.id) saveFlag = false;
        });
        return saveFlag;
      });

      return { ...state, INPUT_MESSAGE: new InputMessage(state.INPUT_MESSAGE.messageText, [...newFiles]) };

    case ChatActionTypes.CLEAR_INPUT_MESSAGE_ATTACHMENTS:
      return { ...state, INPUT_MESSAGE: new InputMessage(state.INPUT_MESSAGE.messageText, []) };

    case ChatActionTypes.CLEAR_INPUT_MESSAGE:
      return { ...state, INPUT_MESSAGE: new InputMessage("", []) };

    case ChatActionTypes.SET_IS_MEMBERS_INFO:
      return { ...state, IS_MEMBERS_INFO: action.payload };

    case ChatActionTypes.SET_MEMBERS_LIST:
      return { ...state, MEMBERS_LIST: action.payload };

    case ChatActionTypes.ADD_MESSAGE:
      state.NEXT_MESSAGE_ID++;
      return { ...state, MESSAGES: [...state.MESSAGES, action.payload] };

    case ChatActionTypes.SET_MY_LAST_ATTACHMENT_ID:
      return { ...state, MY_LAST_ATTACHMENT_ID: action.payload };

    default:
      return state;
  }
}

export default Chat;