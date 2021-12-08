import Message from "../../models/Message";
import User from "../../models/User";

export interface IChatState {
    CHAT_HUB: any,
    INPUT_MESSAGE: string,
    MESSAGES: Message[],
    NEXT_MESSAGE_ID: number,
    IS_MEMBERS_INFO: boolean,
    MEMBERS_LIST: User[]
}

export enum ChatActionTypes {
    SET_CHAT_HUB = "SET_CHAT_HUB",
    SET_INPUT_MESSAGE = "SET_INPUT_MESSAGE",
    SET_IS_MEMBERS_INFO = "SET_MEMBERS_INFO",
    SET_MEMBERS_LIST = "SET_MEMBERS_LIST",

    ADD_MESSAGE = "ADD_MESSAGE"
}

export type IChatAction = I_SET_CHAT_HUB_ACTION | I_SET_INPUT_MESSAGE_ACTION | I_SET_IS_MEMBERS_INFO_ACTION | I_SET_MEMBERS_LIST_ACTION | I_ADD_MESSAGE_ACTION;

interface I_SET_CHAT_HUB_ACTION {
    type: ChatActionTypes.SET_CHAT_HUB,
    payload: any
}
interface I_SET_INPUT_MESSAGE_ACTION {
    type: ChatActionTypes.SET_INPUT_MESSAGE,
    payload: string
}
interface I_SET_IS_MEMBERS_INFO_ACTION {
    type: ChatActionTypes.SET_IS_MEMBERS_INFO,
    payload: boolean
}
interface I_SET_MEMBERS_LIST_ACTION {
    type: ChatActionTypes.SET_MEMBERS_LIST,
    payload: User[]
}
interface I_ADD_MESSAGE_ACTION {
    type: ChatActionTypes.ADD_MESSAGE,
    payload: Message
}