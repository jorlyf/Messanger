import React from "react";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { AppActionTypes } from "../redux/types/App";
import { ChatActionTypes } from "../redux/types/Chat";

import { scrollDown, isScrolledDown } from "../utils";

import Message from "../models/Message";
import Notification from "../models/Notification";

const useChatHub = () => {
    const dispatch = useDispatch();

    React.useEffect((): any => {
        const chatHub = new HubConnectionBuilder()
            .withUrl("https://localhost:7115/chathub")
            .withAutomaticReconnect()
            .build();

        // handle events
        chatHub.onreconnected(() => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Успешное переподключение") });
        });
        chatHub.on("ReceiveMessage", (stringMessage: string) => {
            const jsonMessage = JSON.parse(stringMessage);
            const isDown: boolean = isScrolledDown("messages-list");

            dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(jsonMessage.Id, jsonMessage.Username, jsonMessage.Text, jsonMessage.Time, false) });
            if (isDown) scrollDown("messages-list");
        });
        chatHub.on("ReceiveRegistrationAnswer", (status: string) => {
            if (status === "ok")
                dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: true });
            else {
                dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: false });
                dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Ошибка регистрации. Ваше имя уже кем-то занято!") });
            }
        });
        chatHub.on("ReceiveMembersInfo", (stringMembersInfo: string) => {
            const jsonMembersInfo = JSON.parse(stringMembersInfo);
            dispatch({ type: ChatActionTypes.SET_MEMBERS_LIST, payload: jsonMembersInfo });
        });

        chatHub.onclose(() => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение было закрыто") });

        })

        // connect
        chatHub.start().catch(error => {
            dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
            console.error(error.message);
        });

        dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: chatHub });

        // onUnmount
        return () => {
            dispatch({ type: ChatActionTypes.SET_CHAT_HUB, payload: undefined });
        }

    }, [dispatch]);
}

export default useChatHub;