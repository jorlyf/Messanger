import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

import { AppActionTypes } from "../../redux/types/App";

import styles from "./Auth.module.scss";

export default function Auth() {
  const dispatch = useDispatch();

  const LOGIN = useTypedSelector(state => state.app.LOGIN);

  const setLogin = (login) => {
    dispatch({ type: AppActionTypes.SET_LOGIN, payload: login });
  }

  const auth = () => {
    if (LOGIN.length > 30 || LOGIN.length < 3) { console.error("Плохой ввод логина"); return; };

    try {
      // проверить доступность логина
    } catch (error) {
      console.error(error.message);
    }

    dispatch({ type: AppActionTypes.SET_IS_AUTHORIZED, payload: true });
  }

  return (
    <div className={styles.main}>
      <h3>Введите ваше имя:</h3>
      <input
        value={LOGIN}
        placeholder={"Имя"}
        onChange={(e) => setLogin(e.target.value)}
      />
      <button onClick={auth} value={"Войти"}>Войти</button>
    </div>
  )
}