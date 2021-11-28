import { ChatWindow } from "./pages/ChatWindow";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";

import styles from "./App.module.scss";

// точка входа
function App() {

  const Login = useSelector(state => state.app.Login);

  return (
    <div className={styles.Main}>
      {Login ? <ChatWindow /> : <Auth />}
    </div>
  );
}

export default App;
