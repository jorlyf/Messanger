import { IChatState, IChatAction, ChatActionTypes } from "./types/Chat";

const initialState : IChatState = {
  CHAT_HUB: undefined,
  INPUT_MESSAGE: "",
  MESSAGES: [],
  LAST_MESSAGE_ID: 0,
  MEMBERS_INFO: true
}

export const Chat = (state : IChatState = initialState, action : IChatAction) : IChatState => {
  console.log(action);
  
  switch (action.type) {
    case ChatActionTypes.SET_CHAT_HUB:
      return { ...state, CHAT_HUB: action.payload };

    case ChatActionTypes.SET_INPUT_MESSAGE:
      return { ...state, INPUT_MESSAGE: action.payload };

    case ChatActionTypes.SET_MEMBERS_INFO:
      return { ...state, MEMBERS_INFO: action.payload };


    case ChatActionTypes.ADD_MESSAGE:
      console.log(action.payload);
      
      state.LAST_MESSAGE_ID++;
      return { ...state, MESSAGES: [...state.MESSAGES, { id: state.LAST_MESSAGE_ID, login: action.payload.login, text: action.payload.text }] };


    default:
      return state;
  }
}

export default Chat;