const defaultState = {
  IsMobile: false,
  Login: ""
}

const SET_IsMobile = "SET_IsMobile";
const SET_Login = "SET_Login";


export default function App(state = defaultState, action) {
  switch (action.type) {
    case SET_IsMobile:
      return { ...state, IsMobile: action.payload };

    case SET_Login:
      return { ...state, Login: action.payload };


    default:
      return state;
  }
}