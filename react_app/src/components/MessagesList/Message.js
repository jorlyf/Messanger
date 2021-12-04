import styles from "./MessagesList.module.scss";

export default function Message({ data }) {
    console.log(data);

    const getStyles = () => {
        if (data.isMy)
            return styles.mymessage;          
        return styles.message
    }

    return (
        <div className={getStyles()}>
            <span className={styles.username}>{data.username}</span>: <span>{data.text}</span>
        </div>
    )
}