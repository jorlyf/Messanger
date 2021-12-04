import { ChatWindow } from "./pages/ChatWindow";

import styles from "./App.module.scss";
import Notifications from "./components/Notifications";

// точка входа
const App = () => {
  return (
    <div className={styles.Main}>
      <ChatWindow />
      <Notifications />
    </div>
  );
}

export default App;
