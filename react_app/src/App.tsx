import ChatWindow from "./pages/ChatWindow";
import ModalNotifications from "./components/ModalNotifications";
import ChangePlatformButton from "./components/ChangePlatformButton";

import styles from "./App.module.scss";
import useDetectMobile from "./hooks/useDetectMobile";

const App = () => {
  useDetectMobile();
  return (
    <div className={styles.Main}>
      <ChangePlatformButton />
      <ChatWindow />
      <ModalNotifications />
    </div>
  );
}

export default App;