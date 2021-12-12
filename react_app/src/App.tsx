import ChatWindow from "./pages/ChatWindow";
import ModalNotifications from "./components/ModalNotifications";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.Main}>
      <ChatWindow />
      <ModalNotifications />
    </div>
  );
}

export default App;
