import { IAppState, IAppAction, AppActionTypes } from "./types/App";

const initialState: IAppState = {
  IS_MOBILE: false,
  IS_AUTHORIZED: false,
  LOGIN: "",
  NOTIFICATIONS: []
}


export const App = (state: IAppState = initialState, action: IAppAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.SET_IS_MOBILE:
      return { ...state, IS_MOBILE: action.payload };

    case AppActionTypes.SET_IS_AUTHORIZED:
      return { ...state, IS_AUTHORIZED: action.payload };

    case AppActionTypes.SET_LOGIN:
      return { ...state, LOGIN: action.payload };


    case AppActionTypes.ADD_NOTIFICATION:
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS, action.payload] };

    case AppActionTypes.DELETE_NOTIFICATION:
      state.NOTIFICATIONS.splice(action.payload, 1) // payload is INDEX
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS] };


    default:
      return state;
  }
}

export default App;