import useTypedSelector from "../../hooks/useTypedSelector";
import useChatHub from "../../hooks/useChatHub";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

import Auth from "../Auth";

const ChatWindow = () => {
  const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);
  const IS_MOBILE = useTypedSelector(state => state.app.IS_MOBILE);

  useChatHub();

  return (
    <>
      {IS_AUTHORIZED ?
        (IS_MOBILE ?
          <Mobile />
          :
          <Desktop />
        )
        :
        <Auth />}
    </>
  )
}

export default ChatWindow;