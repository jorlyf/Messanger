import { useDispatch, useSelector } from "react-redux";

import { ACTION_TYPES_APP } from "../../redux/App";
import { CancelButton } from "../Buttons";
import styles from "./Notifications.module.scss";

export default function Notifications() {
    const dispatch = useDispatch();
    const NOTIFICATIONS = useSelector(state => state.app.NOTIFICATIONS);

    const handleClose = (index) => {
        dispatch({ type: ACTION_TYPES_APP.DELETE_NOTIFICATION, payload: index });
    }

    return (
        <div className={styles.main}>
            {NOTIFICATIONS.map((notif, index) =>
                <div key={index} className={styles.notification}>
                    <span>{notif.message}</span>
                    <CancelButton onClick={() => handleClose(index)} />
                </div>
            )}
        </div>
    )
}