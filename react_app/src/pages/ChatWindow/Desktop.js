import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

import { InputField } from "../../components/InputField";
import MessagesList from "../../components/MessagesList";

import { AppActionTypes } from "../../redux/types/App";
import { ChatActionTypes } from "../../redux/types/Chat";

import styles from "./ChatWindowDesktop.module.scss";

export default function Desktop() {
  const dispatch = useDispatch();

  const LOGIN = useTypedSelector(state => state.app.LOGIN);
  const CHAT_HUB = useTypedSelector(state => state.chat.CHAT_HUB);
  const INPUT_MESSAGE = useTypedSelector(state => state.chat.INPUT_MESSAGE);
  const MESSAGES = useTypedSelector(state => state.chat.MESSAGES);
  const MEMBERS_INFO = useTypedSelector(state => state.chat.MEMBERS_INFO);

  const dispatchInputMessage = (text) => {
    dispatch({ type: ChatActionTypes.SET_INPUT_MESSAGE, payload: text });
  }

  const handleSendMessage = () => {
    if (INPUT_MESSAGE.length > 10000) return; // 512
    if (CHAT_HUB.connectionStarted) {
      console.error("Соединение с chathub не установлено");
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: "Соединение с chathub не установлено" } });
      return; }

    try {
      CHAT_HUB.invoke("SendMessage", INPUT_MESSAGE);
      // draw my message
      dispatch({ type: ChatActionTypes.SET_INPUT_MESSAGE, payload: "" }); // clear input
    } catch (error) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: { message: error.message } });
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
