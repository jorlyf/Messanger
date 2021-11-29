const initialState = {
  IS_MOBILE: false,
  IS_AUTHORIZED: false,
  LOGIN: "",
  NOTIFICATIONS: []
}

const ACTION_TYPES_APP = {
  SET_IS_MOBILE: "SET_IS_MOBILE",
  SET_IS_AUTHORIZED: "SET_IS_AUTHORIZED",
  SET_LOGIN: "SET_LOGIN",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  DELETE_NOTIFICATION: "DELETE_NOTIFICATION"
};
export { ACTION_TYPES_APP };


export default function App(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES_APP.SET_IS_MOBILE:
      return { ...state, IS_MOBILE: action.payload };

    case ACTION_TYPES_APP.SET_IS_AUTHORIZED:
      return { ...state, IS_AUTHORIZED: action.payload };

    case ACTION_TYPES_APP.SET_LOGIN:
      return { ...state, LOGIN: action.payload };


    case ACTION_TYPES_APP.ADD_NOTIFICATION:
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS, action.payload] };

    case ACTION_TYPES_APP.DELETE_NOTIFICATION:
      state.NOTIFICATIONS.splice(action.payload, 1) // payload is INDEX
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS] };


    default:
      return state;
  }
}