const initialState = {
  ChatHub: undefined,
  InputMessage: "",
  Messages: [],
  LastMessageId: 0,
  MembersInfo: true
}

// action types
const SET_ChatHub = "SET_ChatHub";
const SET_InputMessage = "SET_InputMessage";
const SET_MembersInfo = "SET_MembersInfo";

const AddMessage = "AddMessage";

export default function Chat(state = initialState, action) {
  switch (action.type) {
    case SET_ChatHub:
      return { ...state, ChatHub: action.payload };

    case SET_InputMessage:
      return { ...state, InputMessage: action.payload };

    case SET_MembersInfo:
      return { ...state, MembersInfo: action.payload };


    case AddMessage:
      state.LastMessageId++;
      return { ...state, Messages: [...state.Messages, { id: state.LastMessageId, login: action.payload.login, text: action.payload.text} ] };


    default:
      return state;
  }
}