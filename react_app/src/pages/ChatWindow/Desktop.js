import { useDispatch, useSelector } from "react-redux";

import { InputField } from "../../components/InputField";
import MessagesList from "../../components/MessagesList";
import { ACTION_TYPES_APP } from "../../redux/App";

import { ACTION_TYPES_CHAT } from "../../redux/Chat";

import styles from "./ChatWindowDesktop.module.scss";

export default function Desktop() {
  const dispatch = useDispatch();

  const CHAT_HUB = useSelector(state => state.chat.CHAT_HUB);
  const MESSAGES = useSelector(state => state.chat.MESSAGES);
  const LOGIN = useSelector(state => state.chat.LOGIN);
  const INPUT_MESSAGE = useSelector(state => state.chat.INPUT_MESSAGE);
  const MEMBERS_INFO = useSelector(state => state.chat.MEMBERS_INFO);

  const dispatchInputMessage = (message) => {
    dispatch({ type: ACTION_TYPES_CHAT.SET_INPUT_MESSAGE, payload: message });
  }

  const handleSendMessage = () => {
    if (INPUT_MESSAGE.length > 10000) return; // 512
    if (CHAT_HUB.connectionStarted) {
      console.error("Соединение с chathub не установлено");
      dispatch({ type: ACTION_TYPES_APP.ADD_NOTIFICATION, payload: { message: "Соединение с chathub не установлено" } });
      return; }

    const messageJson = { login: LOGIN, text: INPUT_MESSAGE };

    try {
      CHAT_HUB.invoke("SendMessage", JSON.stringify(messageJson));
      dispatch({ type: ACTION_TYPES_CHAT.SET_INPUT_MESSAGE, payload: "" }); // clear input
    } catch (error) {
      dispatch({ type: ACTION_TYPES_APP.ADD_NOTIFICATION, payload: { message: error.message } });
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
