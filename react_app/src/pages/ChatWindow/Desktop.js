import { useDispatch, useSelector } from "react-redux";

import { InputField } from "../../components/InputField";
import MessagesList from "../../components/MessagesList";

import styles from "./ChatWindowDesktop.module.scss";

export function Desktop() {
  const dispatch = useDispatch();

  const ChatHub = useSelector(state => state.chat.ChatHub);
  const Messages = useSelector(state => state.chat.Messages);
  const InputMessage = useSelector(state => state.chat.InputMessage);
  const MembersInfo = useSelector(state => state.chat.MembersInfo);

  const dispatchInputMessage = (message) => {
    dispatch({
      type: "SET_InputMessage",
      payload: message
    });
  }

  const handleSendMessage = () => {
    console.log(ChatHub);
    if (InputMessage.length > 512) return;
    //if (!ChatHub.connectionStarted) console.log("Соединение с chathub не установлено");;

    ChatHub.invoke("SendMessage", InputMessage);
    dispatch({ type: "SET_InputMessage", payload: "" });
  }

  return (
    <div className={styles.Main}>
      <div className={styles.Chat}>

        <div className={styles.Messages}>
          <MessagesList messages={Messages} />
        </div>

        <div className={styles.Send}>
          <InputField
            value={InputMessage}
            dispatchFunction={dispatchInputMessage}
            placeholder={"Напишите сообщение"}
          />

          <button onClick={handleSendMessage}></button>
        </div>

      </div>

      <div className={styles.MembersInfo}>
        это можно будет отключить
      </div>

    </div>
  )
}
