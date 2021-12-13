import styles from "./MembrersInfo.module.scss";

const MembersInfo = ({ membersList = { Usernames: [], Date: "" } }: { membersList: { Usernames: string[], Date: string } }) => {
	return (
		<ul className={styles.list}>
			{membersList.Usernames.map(u =>
				<li key={u}>
					<div className={styles.onlineIcon} />
					{u}
				</li>
			)}
		</ul>
	);
}

export default MembersInfo;