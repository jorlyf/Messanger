export interface IAppState {
  IS_MOBILE: boolean,
  IS_AUTHORIZED: boolean,
  LOGIN: string,
  NOTIFICATIONS: any[]
}

export enum AppActionTypes {
  SET_IS_MOBILE = "SET_IS_MOBILE",
  SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED",
  SET_LOGIN = "SET_LOGIN",
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION"
}

export type IAppAction = I_SET_IS_MOBILE_ACTION | I_SET_IS_AUTHORIZED_ACTION | I_SET_LOGIN_ACTION | I_ADD_NOTIFICATION_ACTION | I_DELETE_NOTIFICATION_ACTION;

interface I_SET_IS_MOBILE_ACTION {
  type: AppActionTypes.SET_IS_MOBILE,
  payload: boolean
}
interface I_SET_IS_AUTHORIZED_ACTION {
  type: AppActionTypes.SET_IS_AUTHORIZED,
  payload: boolean
}
interface I_SET_LOGIN_ACTION {
  type: AppActionTypes.SET_LOGIN,
  payload: string
}
interface I_ADD_NOTIFICATION_ACTION {
  type: AppActionTypes.ADD_NOTIFICATION,
  payload: any 
}
interface I_DELETE_NOTIFICATION_ACTION {
  type: AppActionTypes.DELETE_NOTIFICATION,
  payload: number
}