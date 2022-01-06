import React, { ReactChild } from "react";
import styles from "./Slider.module.scss";

const Slider = ({ content }: { content: ReactChild }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = () => setIsOpen((state) => !state);

    return (
        <>
            <img src="pics/arrow.png" onClick={handleClick} className={styles.pic} alt="" width={24} height={24} />
            {isOpen &&
                <div className={styles.content}>
                    {content}
                </div>
            }
        </>
    )
}

export default Slider;