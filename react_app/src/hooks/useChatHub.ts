import React from "react";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder, HttpTransportType, HubConnection } from "@microsoft/signalr";

import { AppActionTypes } from "../redux/types/App";
import { ChatActionTypes } from "../redux/types/Chat";

import { scrollDown, isScrolledDown } from "../utils";
import { config } from "../utils/config";

import Message from "../models/Message";
import Notification from "../models/Notification";
import useTypedSelector from "./useTypedSelector";

const buildConnection = (): HubConnection => {

    return new HubConnectionBuilder()
        .withUrl(`${config.apiUrl}/api/chathub`, { // debug
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();
}

const useChatHub = () => {
    const dispatch = useDispatch();
    const CHAT_HUB = useTypedSelector(state => state.chat.CHAT_HUB);
    const CHAT_HUB_CONNECTION_IS_PENDING = useTypedSelector(state => state.chat.CHAT_HUB_CONNECTION_IS_PENDING);
    const USERNAME = useTypedSelector(state => state.app.USERNAME);
    const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);

    const refToUsername = React.useRef<string>("");

    React.useEffect(() => {
        refToUsername.current = USERNAME;       
    }, [USERNAME]);

    React.useEffect((): any => {
        if (IS_AUTHORIZED || CHAT_HUB !== undefined) return;
        if (CHAT_HUB_CONNECTION_IS_PENDING) return;
        console.log(CHAT_HUB);

        const chatHub = buildConnection();
        dispatch({ type: ChatActionTypes.SET_CHAT_HUB_CONNECTION_IS_PENDING, payload: true });

        // handle events
        chatHub.on("ReceiveMessage", (stringMessage: string) => {
            const jsonMessage = JSON.parse(stringMessage);
            const isDown: boolean = isScrolledDown("messages-list");

            dispatch({
                type: ChatActionTypes.ADD_MESSAGE, payload: new Message(
                    jsonMessage.Id,
                    jsonMessage.Username,
                    jsonMessage.Text,
                    jsonMessage.Time,
                    refToUsername.current === jsonMessage.Username,
                    jsonMessage.AttachmentUrls
                )
            });
            if (isDown) setTimeout(() => {
                scrollDown("messages-list");
            }, 10); // самый лучший костыль, что я делал
        });
        chatHub.on("ReceiveRegistrationAnswer", (jsonString: string) => {
            const answer = JSON.parse(jsonString);
            if (answer.Status === "ok") {
                dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: true });
                dispatch({ type: AppActionTypes.SET_CONNECTION_ID, payload: answer.ConnectionId });
            }
            else {
                dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: false });
                dispatch({ type: AppActionTypes.SET_CONNECTION_ID, payload: "" });
                dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Ошибка регистрации. Ваше имя уже кем-то занято!") });
            }
        });
        chatHub.on("ReceiveOnlineMembersList", (stringOnlineUsers: string) => {
            const jsonOnlineUsers = JSON.parse(stringOnlineUsers);
            dispatch({ type: ChatActionTypes.SET_MEMBERS_LIST, payload: jsonOnlineUsers });
        });

        chatHub.onclose(() => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение было закрыто") });
            dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });
        });
        chatHub.onreconnected(() => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Успешное переподключение") });
            dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });
        });

        // connect
        chatHub.start().catch(error => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
            console.error(error.message);
        }).then(() => {
            dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });
        });

        // onUnmount
        return () => {
            dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: null });
        };

    }, [dispatch, CHAT_HUB, IS_AUTHORIZED, CHAT_HUB_CONNECTION_IS_PENDING]);
}

export default useChatHub;