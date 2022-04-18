import FileContainer from "../../models/FileContainer";
import InputMessage from "../../models/InputMessage";
import Message from "../../models/Message";

export interface IChatState {
    CHAT_HUB: any;
    CHAT_HUB_CONNECTION_IS_PENDING : boolean;
    INPUT_MESSAGE: InputMessage;
    MESSAGES: Message[];
    NEXT_MESSAGE_ID: number;
    IS_MEMBERS_INFO: boolean;
    MEMBERS_LIST: { Usernames: string[], Date: string };
    MY_LAST_ATTACHMENT_ID: number;
}

export enum ChatActionTypes {
    SET_CHAT_HUB = "SET_CHAT_HUB",
    SET_CHAT_HUB_CONNECTION_IS_PENDING = "SET_CHAT_HUB_CONNECTION_IS_PENDING",
    SET_INPUT_MESSAGE_TEXT = "SET_INPUT_MESSAGE_TEXT",
    ADD_INPUT_MESSAGE_ATTACHMENTS = "ADD_INPUT_MESSAGE_ATTACHMENTS",
    REMOVE_INPUT_MESSAGE_ATTACHMENTS = "REMOVE_INPUT_MESSAGE_ATTACHMENTS",
    CLEAR_INPUT_MESSAGE_ATTACHMENTS = "CLEAR_INPUT_MESSAGE_ATTACHMENTS",
    CLEAR_INPUT_MESSAGE = "CLEAR_INPUT_MESSAGE",
    SET_IS_MEMBERS_INFO = "SET_MEMBERS_INFO",
    SET_MEMBERS_LIST = "SET_MEMBERS_LIST",
    ADD_MESSAGE = "ADD_MESSAGE",
    SET_MY_LAST_ATTACHMENT_ID = "SET_MY_LAST_ATTACHMENT_ID"
}

export type IChatAction =
    I_SET_CHAT_HUB_ACTION |
    I_SET_CHAT_HUB_CONNECTION_IS_PENDING_ACTION |
    I_SET_INPUT_TEXT_MESSAGE_ACTION |
    I_ADD_INPUT_MESSAGE_ATTACHMENTS_ACTION |
    I_REMOVE_INPUT_MESSAGE_ATTACHMENTS_ACTION |
    I_CLEAR_INPUT_MESSAGE_ATTACHMENTS_ACTION |
    I_CLEAR_INPUT_MESSAGE_ACTION |
    I_SET_IS_MEMBERS_INFO_ACTION |
    I_SET_MEMBERS_LIST_ACTION |
    I_ADD_MESSAGE_ACTION |
    I_SET_MY_LAST_ATTACHMENT_ID_ACTION;

interface I_SET_CHAT_HUB_ACTION {
    type: ChatActionTypes.SET_CHAT_HUB,
    payload: any
}
interface I_SET_CHAT_HUB_CONNECTION_IS_PENDING_ACTION
{
    type: ChatActionTypes.SET_CHAT_HUB_CONNECTION_IS_PENDING,
    payload: boolean
}
interface I_SET_INPUT_TEXT_MESSAGE_ACTION {
    type: ChatActionTypes.SET_INPUT_MESSAGE_TEXT,
    payload: string
}
interface I_ADD_INPUT_MESSAGE_ATTACHMENTS_ACTION {
    type: ChatActionTypes.ADD_INPUT_MESSAGE_ATTACHMENTS,
    payload: FileContainer[]
}
interface I_REMOVE_INPUT_MESSAGE_ATTACHMENTS_ACTION {
    type: ChatActionTypes.REMOVE_INPUT_MESSAGE_ATTACHMENTS,
    payload: FileContainer[]
}
interface I_CLEAR_INPUT_MESSAGE_ATTACHMENTS_ACTION {
    type: ChatActionTypes.CLEAR_INPUT_MESSAGE_ATTACHMENTS,
    payload: void
}
interface I_CLEAR_INPUT_MESSAGE_ACTION {
    type: ChatActionTypes.CLEAR_INPUT_MESSAGE,
    payload: void
}
interface I_SET_IS_MEMBERS_INFO_ACTION {
    type: ChatActionTypes.SET_IS_MEMBERS_INFO,
    payload: boolean
}
interface I_SET_MEMBERS_LIST_ACTION {
    type: ChatActionTypes.SET_MEMBERS_LIST,
    payload: { Usernames: string[], Date: string }
}
interface I_ADD_MESSAGE_ACTION {
    type: ChatActionTypes.ADD_MESSAGE,
    payload: Message
}
interface I_SET_MY_LAST_ATTACHMENT_ID_ACTION {
    type: ChatActionTypes.SET_MY_LAST_ATTACHMENT_ID,
    payload: number
}