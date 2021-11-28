import { useDispatch, useSelector } from "react-redux";

import { InputField } from "../../components/InputField";
import MessagesList from "../../components/MessagesList";

import styles from "./ChatWindowDesktop.module.scss";

export default function Desktop() {
  const dispatch = useDispatch();

  const ChatHub = useSelector(state => state.chat.ChatHub);
  const Messages = useSelector(state => state.chat.Messages);
  const Login = useSelector(state => state.chat.Login);
  const InputMessage = useSelector(state => state.chat.InputMessage);
  const MembersInfo = useSelector(state => state.chat.MembersInfo);

  const dispatchInputMessage = (message) => {
    dispatch({
      type: "SET_InputMessage",
      payload: message
    });
  }

  const handleSendMessage = () => {
    if (InputMessage.length > 10000) return; // 512
    if (ChatHub.connectionStarted) console.log("Соединение с chathub не установлено");

    const messageJson = { login: Login, text: InputMessage };

    try {
      ChatHub.invoke("SendMessage", JSON.stringify(messageJson));
      dispatch({ type: "SET_InputMessage", payload: "" }); // clear input
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className={styles.Main}>
      <div className={styles.Chat}>
        <div className={styles.Messages} >
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
        
      </div>

    </div>
  )
}
