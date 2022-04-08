import { AttachFilesAcceptTypesList, getAcceptFileExtensinons, IAttachFileTypeElement } from "./index";
import { RefObject } from "react";

import styles from "./AttachFiles.module.scss";

interface IMenuProps {
    files: File[];
    inputRef: RefObject<HTMLInputElement>;
}

const Menu = ({ inputRef, files = [] }: IMenuProps) => {

    const handleUpload = (elem: IAttachFileTypeElement) => {
        inputRef!.current!.accept = getAcceptFileExtensinons(elem.type);

        inputRef?.current?.click();
    }

    return (
        <>
            <ul className={styles.selector}>
                {AttachFilesAcceptTypesList.map((t, index) => (
                    <li key={index} className={styles.typeElement} onClick={() => handleUpload(t)} >
                        <img src={t.pictureUrl} alt="" />
                        <span>{t.text}</span>
                    </li>
                ))}
            </ul>
            {/* {files.length > 0 &&
                <div className={styles.menu}>
                    <h1>Прикрепленное:</h1>
                    <div className={styles.attachedList}>
                        {files.map(f => (
                            <div className={styles.attachedFile}>

                            </div>
                        ))}
                    </div>
                </div>
            } */}
        </>
    )
}

export default Menu;