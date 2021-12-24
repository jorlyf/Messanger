import ChangePlatformButton from "../ChangePlatformButton";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <nav className={styles.main}>
            <ChangePlatformButton />
        </nav>
    )
}

export default Header;