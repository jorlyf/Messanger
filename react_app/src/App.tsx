import { ChatWindow } from "./pages/ChatWindow";
import useTypedSelector from "./hooks/useTypedSelector";

import Auth from "./pages/Auth";

import styles from "./App.module.scss";
import Notifications from "./components/Notifications";

// точка входа
const App = () => {

  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);

  return (
    <div className={styles.Main}>
      {IS_AUTHORIZED ? <ChatWindow /> : <Auth />}
      <Notifications />
    </div>
  );
}

export default App;
