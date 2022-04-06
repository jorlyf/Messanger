import { useDispatch } from "react-redux";
import InputField from "../../components/InputField";
import useTypedSelector from "../../hooks/useTypedSelector";
import Notification from "../../models/Notification";
import UserRegistration from "../../models/UserRegistration";

import { AppActionTypes } from "../../redux/types/App";

import styles from "./Auth.module.scss";

const Auth = () => {
  const dispatch = useDispatch();

  const AUTH_IS_PENDING = useTypedSelector(state => state.app.AUTH_IS_PENDING);
  const USERNAME = useTypedSelector(state => state.app.USERNAME);
  const CHAT_HUB = useTypedSelector(state => state.chat.CHAT_HUB);

  const setUsername = (username: string) => {
    dispatch({ type: AppActionTypes.SET_USERNAME, payload: username });
  }
  const submitAuth = () => {
    if (USERNAME.length > 16) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком длинное имя! Введите не более 16 символов") });
      return;
    }
    if (USERNAME.length < 3) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Слишком короткое имя! Введите не менее 3 символов") });
      return;
    }

    if (CHAT_HUB._connectionState !== "Connected") {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Соединение не установлено!") });
      return;
    }

    try {
      dispatch({ type: AppActionTypes.SET_AUTH_IS_PENDING, payload: true });
      const registration: UserRegistration = new UserRegistration(USERNAME);
      CHAT_HUB.invoke("Registrate", JSON.stringify(registration));
    } catch (error: any) {
      dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification("Не получается зарегистрироваться!") });
      console.error(error.message);
    } finally {
      dispatch({ type: AppActionTypes.SET_AUTH_IS_PENDING, payload: false });
    }
  }

  return (
    <div className={styles.main}>
      <h3>Введите ваше имя:</h3>
      <InputField
        value={USERNAME}
        dispatchFunction={setUsername}
        handleEnter={submitAuth}
        placeholder={"Имя"}
        disabled={AUTH_IS_PENDING}
        isOneRow={true}
      />
      <button onClick={submitAuth} value={"Войти"}>Войти</button>
    </div>
  )
}

export default Auth;