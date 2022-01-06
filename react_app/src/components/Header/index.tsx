import useTypedSelector from "../../hooks/useTypedSelector";
import ChangePlatformButton from "../ChangePlatformButton";
import MembersInfo from "../MembersInfo";
import Slider from "../Slider";
import styles from "./Header.module.scss";

const Header = () => {
    const IS_MOBILE = useTypedSelector(state => state.app.IS_MOBILE);
    const IS_AUTHORIZED = useTypedSelector(state => state.app.IS_AUTHORIZED);
    return (
        <nav className={styles.main}>
            <ChangePlatformButton />

            {(IS_MOBILE && IS_AUTHORIZED) && <Slider content={<MembersInfo />} />}
        </nav>
    )
}

export default Header;