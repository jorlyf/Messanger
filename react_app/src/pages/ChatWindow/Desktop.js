import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import Message from "../../models/Message";
import Notification from "../../models/Notification";

import MessagesList from "../../components/MessagesList";
import { InputField } from "../../components/InputField";

import styles from "./ChatWindowDesktop.module.scss";

const Desktop = () => {
  const dispatch = useDispatch();

  const USERNAME = useTypedSelector(state => state.app.USERNAME);
  const CHAT_HUB = useTypedSelector(state => state.chat.CHAT_HUB);
  const INPUT_MESSAGE = useTypedSelector(state => state.chat.INPUT_MESSAGE);
  const MESSAGES = useTypedSelector(state => state.chat.MESSAGES);
  const NEXT_MESSAGE_ID = useTypedSelector(state => state.chat.NEXT_MESSAGE_ID);
  const MEMBERS_INFO = useTypedSelector(state => state.chat.MEMBERS_INFO);

  const dispatchInputMessage = (text) => {
    dispatch({ type: ChatActionTypes.SET_INPUT_MESSAGE, payload: text });
  }

  const handleSendMessage = () => {
    if (INPUT_MESSAGE.length > 512) return; // 512
    if (CHAT_HUB.connectionStarted) {
      console.error("Соединение с chathub не установлено");
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение с chathub не установлено") });
      return;
    }

    try {
      CHAT_HUB.invoke("SendMessage", INPUT_MESSAGE);
      const currentTime = new Date().toLocaleTimeString('ru', { hour12: false, hour: "numeric", minute: "numeric" });
      dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: new Message(NEXT_MESSAGE_ID, USERNAME, INPUT_MESSAGE, currentTime, true) });
      dispatch({ type: ChatActionTypes.SET_INPUT_MESSAGE, payload: "" }); // clear input
    } catch (error) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(error.message) });
      console.error(error.message);
    }
  }

  return (
    <div className={styles.Main}>
      <div className={styles.Chat}>
        <div className={styles.Messages} >
          <MessagesList messages={MESSAGES} />
        </div>

        <div className={styles.Send}>
          <InputField
            value={INPUT_MESSAGE}
            dispatchFunction={dispatchInputMessage}
            placeholder={"Напишите сообщение"}
          />

          <button onClick={handleSendMessage}></button>
        </div>

      </div>

      <div className={styles.MembersInfo}>

      </div>

    </div>
  )
}

export default Desktop;