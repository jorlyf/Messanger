import useTypedSelector from "../../hooks/useTypedSelector";
import styles from "./MembrersInfo.module.scss";

const MembersInfo = () => {
	const MEMBERS_INFO = useTypedSelector(state => state.chat.MEMBERS_LIST);
	return (
		<ul className={styles.list}>
			{MEMBERS_INFO.Usernames.map(u =>
				<li key={u}>
					<div className={styles.onlineIcon} />
					{u}
				</li>
			)}
		</ul>
	);
}

export default MembersInfo;