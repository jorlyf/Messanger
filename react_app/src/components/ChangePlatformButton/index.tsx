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

    return (
        <button onClick={handleClick} className={styles.main} />
    )
}

export default ChangePlatformButton;