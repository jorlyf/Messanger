import MessagesList from "../../components/MessagesList";
import InputField from "../../components/InputField";

import styles from "./Mobile.module.scss";

import { IChatWindowProps } from "./index";
const Mobile = ({ data, handlers }: IChatWindowProps) => {
    return (
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
                    isOneRow={true}
                />
                <img className={styles.submit} alt="" src="pics/send.png" onClick={handlers.handleSendMessage} />
            </div>

            <div className={styles.downBorder} />
            
        </div>
    )
}

export default Mobile;