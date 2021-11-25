import { ChatWindow } from "./components/ChatWindow";

import styles from "./App.module.scss";

// точка входа
function App()
{
	

  return (
    <div className={styles.Main}>
      <ChatWindow />
    </div>
  );
}

export default App;
