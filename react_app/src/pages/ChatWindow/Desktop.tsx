import MessagesList from "../../components/MessagesList";
import InputField from "../../components/InputField";
import MembersInfo from "../../components/MembersInfo";

import styles from "./Desktop.module.scss";

import { IChatWindowProps } from "./index";
const Desktop = ({ data, handlers }: IChatWindowProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.chat}>
        <div className={styles.messages} id={"messages-list"} >
          <MessagesList messages={data.MESSAGES} />
        </div>

        <div className={styles.input}>
          <InputField
            value={data.INPUT_MESSAGE}
            dispatchFunction={handlers.dispatchInputMessage}
            handleEnter={handlers.handleSendMessage}
            placeholder={"Напишите сообщение"}
          />

          <img className={styles.submit} alt="" src="pics/send.png" onClick={handlers.handleSendMessage} />
        </div>

      </div>

      <div className={styles.MembersInfo}>
        <MembersInfo />
      </div>

    </div>
  )
}

export default Desktop;