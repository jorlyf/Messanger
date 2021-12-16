import MessagesList from "../../components/MessagesList";
import InputField from "../../components/InputField";
import MembersInfo from "../../components/MembersInfo";

import styles from "./ChatWindowDesktop.module.scss";

import { IProps } from "./index";
const Desktop = ({ data, handlers }: IProps) => {
  return (
    <div className={styles.Main}>
      <div className={styles.Chat}>
        <div className={styles.Messages} id={"messages-list"} >
          <MessagesList messages={data.MESSAGES} />
        </div>

        <div className={styles.Send}>
          <InputField
            value={data.INPUT_MESSAGE}
            dispatchFunction={handlers.dispatchInputMessage}
            handleEnter={handlers.handleSendMessage}
            placeholder={"Напишите сообщение"}
          />

          <button onClick={handlers.handleSendMessage}></button>
        </div>

      </div>

      <div className={styles.MembersInfo}>
        <MembersInfo membersList={data.MEMBERS_LIST} />
      </div>

    </div>
  )
}

export default Desktop;