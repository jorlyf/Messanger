import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";
import Notification from "../../models/Notification";
import UserRegistration from "../../models/UserRegistration";

import { AppActionTypes } from "../../redux/types/App";

import styles from "./Auth.module.scss";

const Auth = () => {
  const dispatch = useDispatch();

  const USERNAME = useTypedSelector(state => state.app.USERNAME);
  const CHAT_HUB = useTypedSelector(state => state.chat.CHAT_HUB);

  const setUsername = (username: string) => {
    dispatch({ type: AppActionTypes.SET_USERNAME, payload: username });
  }

  const submitAuth = () => {
    if (USERNAME.length > 30) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком длинное имя! Введите не более 30 символов") });
      return;
    }
    if (USERNAME.length < 3) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком короткое имя! Введите не менее 3 символов") });
      return;
    }

    if (CHAT_HUB === undefined)
    {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение не установилось!") });
      return;
    }

    try {
      const registration: UserRegistration = new UserRegistration(USERNAME);
      CHAT_HUB.invoke("Registrate", JSON.stringify(registration));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className={styles.main}>
      <h3>Введите ваше имя:</h3>
      <input
        value={USERNAME}
        placeholder={"Имя"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={submitAuth} value={"Войти"}>Войти</button>
    </div>
  )
}

export default Auth;