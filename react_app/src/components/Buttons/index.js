import styles from "./Buttons.module.scss";

export function CancelButton({ onClick }) {
    if (onClick === undefined) console.error("Кнопка не получила обработчик!");
	return (
		<svg className={styles.cancelButton} onClick={onClick} viewBox="0 0 32 32">
			<path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
			<path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
		</svg>
	)
}