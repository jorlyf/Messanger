const defaultState = {
  Login: "",
  InputMessage: "",
  MembersInfo: true
}

// action types
const Login = "SET_Login";
const InputMessage = "SET_InputMessage";
const MembersInfo = "SET_MembersInfo";


export function Chat(state = defaultState, action) {
  switch (action.type) {
    case Login:
      return { ...state, Login: action.payload };

    case InputMessage:
      return { ...state, InputMessage: action.payload };

    case MembersInfo:
      return { ...state, MembersInfo: action.payload };


    default:
      return state;
  }
}