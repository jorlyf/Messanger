import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

import { AppActionTypes } from "../../redux/types/App";
import { CancelButton } from "../Buttons";

import Notification from "../../models/Notification";

import styles from "./Notifications.module.scss";

export const ModalNotifications = () => {
    const dispatch = useDispatch();
    const NOTIFICATIONS: Notification[] = useTypedSelector(state => state.app.NOTIFICATIONS);

    const handleClose = (index: number) => {
        dispatch({ type: AppActionTypes.DELETE_NOTIFICATION, payload: index });
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

export default ModalNotifications;