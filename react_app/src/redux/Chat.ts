import { IChatState, IChatAction, ChatActionTypes } from "./types/Chat";

const initialState: IChatState = {
  CHAT_HUB: undefined,
  INPUT_MESSAGE: "",
  MESSAGES: [],
  NEXT_MESSAGE_ID: 1,
  IS_MEMBERS_INFO: true,
  MEMBERS_LIST: { Usernames: [], Date: ""}
}

export const Chat = (state: IChatState = initialState, action: IChatAction): IChatState => {
  switch (action.type) {
    case ChatActionTypes.SET_CHAT_HUB:
      return { ...state, CHAT_HUB: action.payload };

    case ChatActionTypes.SET_INPUT_MESSAGE:
      return { ...state, INPUT_MESSAGE: action.payload };

    case ChatActionTypes.SET_IS_MEMBERS_INFO:
      return { ...state, IS_MEMBERS_INFO: action.payload };
    
    case ChatActionTypes.SET_MEMBERS_LIST:
      return { ...state, MEMBERS_LIST: action.payload };


    case ChatActionTypes.ADD_MESSAGE:
      state.NEXT_MESSAGE_ID++;
      return { ...state, MESSAGES: [...state.MESSAGES, action.payload] };


    default:
      return state;
  }
}

export default Chat;