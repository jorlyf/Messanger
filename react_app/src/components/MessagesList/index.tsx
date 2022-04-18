import Message from "../../models/Message";
import { config } from "../../utils/config";

import styles from "./MessagesList.module.scss";

const MessagesList = ({ messages }: { messages: Message[] }) => {
    return (
        <>
            {messages.map((message: Message) =>
                <MessageComponent key={message.id} message={message} />
            )}
        </>
    )
}

const MessageComponent = ({ message }: { message: Message }) => {
    const getStyles = () => {
        if (message.isMy)
            return styles.mymessage;
        return styles.message;
    }

    return (
        <div className={getStyles()}>
            <div className={styles.messageHeader}>
                <span className={styles.username}>{message.username}</span>
                <span className={styles.time}>{message.time}</span>
            </div>
            <span>{message.text}</span>
            <div className={styles.attachments}>
                {message.attached_urls?.map(url => (
                    <img key={url} src={`${config.apiUrl}${url}`} alt="" />
                ))}
            </div>
        </div>
    )
}

export default MessagesList;