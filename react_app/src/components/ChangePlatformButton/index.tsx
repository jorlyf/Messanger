import useTypedSelector from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AppActionTypes } from "../../redux/types/App";

import styles from "./ChangePlatformButton.module.scss";

const ChangePlatformButton = () => {
    const dispatch = useDispatch();

    const IS_MOBILE = useTypedSelector(state => state.app.IS_MOBILE);
    const handleClick = () => {
        dispatch({ type: AppActionTypes.SET_IS_MOBILE, payload: !IS_MOBILE });
    }
    const getPicture = () => IS_MOBILE ? "/pics/mobile.png" : "/pics/pc.png";

    return (
        <img src={getPicture()} width={10} alt="" onClick={handleClick} className={styles.main} />
    )
}

export default ChangePlatformButton;