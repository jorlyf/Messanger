import { IChatState, IChatAction, ChatActionTypes } from "./types/Chat";

const initialState: IChatState = {
  CHAT_HUB: undefined,
  INPUT_MESSAGE: "",
  MESSAGES: [],
  NEXT_MESSAGE_ID: 1,
  MEMBERS_INFO: true
}

export const Chat = (state: IChatState = initialState, action: IChatAction): IChatState => {
  switch (action.type) {
    case ChatActionTypes.SET_CHAT_HUB:
      return { ...state, CHAT_HUB: action.payload };

    case ChatActionTypes.SET_INPUT_MESSAGE:
      return { ...state, INPUT_MESSAGE: action.payload };

    case ChatActionTypes.SET_MEMBERS_INFO:
      return { ...state, MEMBERS_INFO: action.payload };


    case ChatActionTypes.ADD_MESSAGE:
      state.NEXT_MESSAGE_ID++;
      return { ...state, MESSAGES: [...state.MESSAGES, action.payload] };


    default:
      return state;
  }
}

export default Chat;