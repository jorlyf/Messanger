const initialState = {
  CHAT_HUB: undefined,
  INPUT_MESSAGE: "",
  MESSAGES: [],
  LAST_MESSAGE_ID: 0,
  MEMBERS_INFO: true
}

const ACTION_TYPES_CHAT = {
  SET_CHAT_HUB: "SET_CHAT_HUB",
  SET_INPUT_MESSAGE: "SET_INPUT_MESSAGE",
  SET_MEMBERS_INFO: "SET_MEMBERS_INFO",

  ADD_MESSAGE: "ADD_MESSAGE"
}
export { ACTION_TYPES_CHAT };

export default function Chat(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES_CHAT.SET_CHAT_HUB:
      return { ...state, ChatHub: action.payload };

    case ACTION_TYPES_CHAT.SET_INPUT_MESSAGE:
      return { ...state, InputMessage: action.payload };

    case ACTION_TYPES_CHAT.SET_MEMBERS_INFO:
      return { ...state, MembersInfo: action.payload };


    case ACTION_TYPES_CHAT.ADD_MESSAGE:
      state.LAST_MESSAGE_ID++;
      return { ...state, MESSAGES: [...state.MESSAGES, { id: state.LAST_MESSAGE_ID, login: action.payload.login, text: action.payload.text }] };


    default:
      return state;
  }
}