import MessagesList from "../../components/MessagesList";
import InputField from "../../components/InputField";
import AttachFiles from "../../components/AttachFiles";

import styles from "./Mobile.module.scss";

import { IChatWindowProps } from "./index";

const Mobile = ({ data, handlers }: IChatWindowProps) => {
    return (
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
                    isOneRow={true}
                />

                <img className={styles.sendMessageButton} alt="" src="pics/send.png" onClick={handlers.handleSendMessage} />
            </div>

            <div className={styles.downBorder} />

        </div>
    )
}

export default Mobile;