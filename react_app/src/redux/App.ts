import { IAppState, IAppAction, AppActionTypes } from "./types/App";

const initialState: IAppState = {
  IS_MOBILE: false,
  IS_AUTHORIZED: false,
  AUTH_IS_PENDING: false,
  USERNAME: "",
  NOTIFICATIONS: [],
  CONNECTION_ID: ""
}


export const App = (state: IAppState = initialState, action: IAppAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.SET_IS_MOBILE:
      return { ...state, IS_MOBILE: action.payload };

    case AppActionTypes.SET_IS_AUTHORIZED:
      return { ...state, IS_AUTHORIZED: action.payload };

    case AppActionTypes.SET_AUTH_IS_PENDING:
      return { ...state, AUTH_IS_PENDING: action.payload };

    case AppActionTypes.SET_USERNAME:
      return { ...state, USERNAME: action.payload };

    case AppActionTypes.ADD_NOTIFICATION:
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS, action.payload] };

    case AppActionTypes.DELETE_NOTIFICATION:
      state.NOTIFICATIONS.splice(action.payload, 1) // payload is INDEX
      return { ...state, NOTIFICATIONS: [...state.NOTIFICATIONS] };

    case AppActionTypes.SET_CONNECTION_ID:
      return { ...state, CONNECTION_ID: action.payload };

      
    default:
      return state;
  }
}

export default App;