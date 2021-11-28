const initialState = {
  ChatHub: undefined,
  Login: "",
  InputMessage: "",
  Messages: [],
  MembersInfo: true
}

// action types
const SET_ChatHub = "SET_ChatHub";
const SET_Login = "SET_Login";
const SET_InputMessage = "SET_InputMessage";
const SET_MembersInfo = "SET_MembersInfo";

const AddMessage = "AddMessage";


export function Chat(state = initialState, action) {
  switch (action.type) {
    case SET_ChatHub:
      return { ...state, ChatHub: action.payload };

    case SET_Login:
      return { ...state, Login: action.payload };

    case SET_InputMessage:
      return { ...state, InputMessage: action.payload };

    case SET_MembersInfo:
      return { ...state, MembersInfo: action.payload };


    case AddMessage:
      return { ...state, Messages: [...state.Messages, action.payload] };


    default:
      return state;
  }
}