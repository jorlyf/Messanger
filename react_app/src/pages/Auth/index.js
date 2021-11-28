import { useDispatch } from "react-redux";

import styles from "./Auth.module.scss";

export default function Auth() {
    const dispatch = useDispatch();

    const setLogin = (login) => {
      dispatch({type: "SET_Login", payload: login});
    }

    return (
        <div className={styles.main}>

        </div>
    )
}