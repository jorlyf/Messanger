const defaultState = {
  Login: "",
  InputMessage: "",
  MembersInfo: true
}

// action types
const SET_Login = "SET_Login";
const SET_InputMessage = "SET_InputMessage";
const SET_MembersInfo = "SET_MembersInfo";


export function Chat(state = defaultState, action) {
  switch (action.type) {
    case SET_Login:
      return { ...state, Login: action.payload };

    case SET_InputMessage:
      return { ...state, InputMessage: action.payload };

    case SET_MembersInfo:
      return { ...state, MembersInfo: action.payload };


    default:
      return state;
  }
}