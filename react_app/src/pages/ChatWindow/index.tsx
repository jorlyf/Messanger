import useTypedSelector from "../../hooks/useTypedSelector";
import useChatHub from "../../hooks/useChatHub";

import Desktop from "./Desktop";
import Auth from "../Auth";

export function ChatWindow() {
  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);

  useChatHub();

  return (
    <>
      {IS_AUTHORIZED ? <Desktop /> : <Auth />}
    </>
  )
}