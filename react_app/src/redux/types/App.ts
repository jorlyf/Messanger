import Notification from "../../models/Notification";

export interface IAppState {
  IS_MOBILE: boolean,
  IS_AUTHORIZED: boolean,
  AUTH_IS_PENDING: boolean,
  USERNAME: string,
  NOTIFICATIONS: Notification[],
  CONNECTION_ID: string;
}

export enum AppActionTypes {
  SET_IS_MOBILE = "SET_IS_MOBILE",
  SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED",
  SET_AUTH_IS_PENDING = "SET_AUTH_IS_PENDING",
  SET_USERNAME = "SET_USERNAME",
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION",
  SET_CONNECTION_ID = "SET_CONNECTION_ID"
}

export type IAppAction =
  I_SET_IS_MOBILE_ACTION |
  I_SET_IS_AUTHORIZED_ACTION |
  I_SET_AUTH_IS_PENDING_ACTION |
  I_SET_USERNAME_ACTION |
  I_ADD_NOTIFICATION_ACTION |
  I_DELETE_NOTIFICATION_ACTION |
  I_SET_CONNECTION_ID_ACTION;

interface I_SET_IS_MOBILE_ACTION {
  type: AppActionTypes.SET_IS_MOBILE,
  payload: boolean
}
interface I_SET_IS_AUTHORIZED_ACTION {
  type: AppActionTypes.SET_IS_AUTHORIZED,
  payload: boolean
}
interface I_SET_AUTH_IS_PENDING_ACTION {
  type: AppActionTypes.SET_AUTH_IS_PENDING,
  payload: boolean
}
interface I_SET_USERNAME_ACTION {
  type: AppActionTypes.SET_USERNAME,
  payload: string
}
interface I_ADD_NOTIFICATION_ACTION {
  type: AppActionTypes.ADD_NOTIFICATION,
  payload: Notification
}
interface I_DELETE_NOTIFICATION_ACTION {
  type: AppActionTypes.DELETE_NOTIFICATION,
  payload: number
}
interface I_SET_CONNECTION_ID_ACTION {
  type: AppActionTypes.SET_CONNECTION_ID,
  payload: string
}