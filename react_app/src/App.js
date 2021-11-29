import { ChatWindow } from "./pages/ChatWindow";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";

import styles from "./App.module.scss";
import React from "react";
import Notifications from "./components/Notifications";

// точка входа
function App() {

  const IS_AUTHORIZED = useSelector(state => state.app.IS_AUTHORIZED);

  return (
    <div className={styles.Main}>
      {IS_AUTHORIZED ? <ChatWindow /> : <Auth />}
      <Notifications />
    </div>
  );
}

export default App;
