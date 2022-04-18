import MessagesList from "../../components/MessagesList";
import InputField from "../../components/InputField";
import MembersInfo from "../../components/MembersInfo";

import styles from "./Desktop.module.scss";

import { IChatWindowProps } from "./index";
import AttachFiles from "../../components/AttachFiles";
const Desktop = ({ data, handlers }: IChatWindowProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.chat}>
        <div className={styles.messages} id={"messages-list"} >
          <MessagesList messages={data.MESSAGES} />
        </div>

        <div className={styles.input}>
          <div className={styles.attachButton}>
            <AttachFiles
              files={data.INPUT_MESSAGE.attachments}
              addFiles={handlers.handleAttachFiles}
              removeFiles={handlers.handleRemoveFiles}
              lastAttachmentId={data.MY_LAST_ATTACHMENT_ID}
              maxMBFileSize={8}
              multiple={true}
            />
          </div>

          <InputField
            value={data.INPUT_MESSAGE.messageText}
            dispatchFunction={handlers.handleChangeInputMessageText}
            handleEnter={handlers.handleSendMessage}
            placeholder={"Напишите сообщение"}
          />

          <img className={styles.sendMessageButton} alt="" src="pics/send.png" onClick={handlers.handleSendMessage} />
        </div>

      </div>

      <div className={styles.MembersInfo}>
        <MembersInfo />
      </div>

    </div>
  )
}

export default Desktop;