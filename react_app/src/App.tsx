import useDetectMobile from "./hooks/useDetectMobile";
import ChatWindow from "./pages/ChatWindow";
import ModalNotifications from "./components/ModalNotifications";
import Header from "./components/Header";

import styles from "./App.module.scss";

const App = () => {
  useDetectMobile();
  return (
    <div className={styles.main}>
      <Header />

      <div className={styles.content}>
        <ChatWindow />
      </div>

      <ModalNotifications />
    </div>
  );
}

export default App;