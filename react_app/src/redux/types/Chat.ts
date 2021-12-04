export interface IChatState {
    CHAT_HUB: any,
    INPUT_MESSAGE: string,
    MESSAGES: any[],
    LAST_MESSAGE_ID: number,
    MEMBERS_INFO: boolean
}

export enum ChatActionTypes {
    SET_CHAT_HUB = "SET_CHAT_HUB",
    SET_INPUT_MESSAGE = "SET_INPUT_MESSAGE",
    SET_MEMBERS_INFO = "SET_MEMBERS_INFO",
  
    ADD_MESSAGE = "ADD_MESSAGE"
}

export type IChatAction = I_SET_CHAT_HUB_ACTION | I_SET_INPUT_MESSAGE_ACTION | I_SET_MEMBERS_INFO_ACTION | I_ADD_MESSAGE_ACTION;

interface I_SET_CHAT_HUB_ACTION {
    type: ChatActionTypes.SET_CHAT_HUB,
    payload: any
}
interface I_SET_INPUT_MESSAGE_ACTION {
    type: ChatActionTypes.SET_INPUT_MESSAGE,
    payload: string
}
interface I_SET_MEMBERS_INFO_ACTION {
    type: ChatActionTypes.SET_MEMBERS_INFO,
    payload: boolean
}
interface I_ADD_MESSAGE_ACTION {
    type: ChatActionTypes.ADD_MESSAGE,
    payload: any
}