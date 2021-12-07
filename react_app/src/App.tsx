import { ChatWindow } from "./pages/ChatWindow";

import styles from "./App.module.scss";
import ModalNotifications from "./components/ModalNotifications";

const App = () => {
  return (
    <div className={styles.Main}>
      <ChatWindow />
      <ModalNotifications />
    </div>
  );
}

export default App;
