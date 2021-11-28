import styles from "./MessagesList.module.scss";

export default function Message({ data }) {

    const getStyles = () => {
        if (data.isMy)
            return styles.mymessage;          
        return styles.message
    }

    return (
        <div className={getStyles()}>
            <span className={styles.login}>{data.login}</span>: <span>{data.text}</span>
        </div>
    )
}