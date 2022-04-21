import { AttachFilesAcceptTypes, AttachFilesAcceptTypesList, getAcceptFileExtensinons, IAttachFileTypeElement } from "./index";
import { RefObject } from "react";
import FileContainer from "../../models/FileContainer";

import styles from "./AttachFiles.module.scss";
import { CancelButton } from "../Buttons";
import { clipString } from "../../utils";

interface IMenuProps {
    files: FileContainer[];
    removeFile: (file: FileContainer) => void;
    inputRef: RefObject<HTMLInputElement>;
}

const Menu = ({ inputRef, removeFile, files = [] }: IMenuProps) => {

    const handleUpload = (elem: IAttachFileTypeElement) => {
        inputRef!.current!.accept = getAcceptFileExtensinons(elem.type);

        inputRef?.current?.click();
    }

    return (
        <div className={styles.menu}>
            <ul className={styles.selector}>
                {AttachFilesAcceptTypesList.map(t => (
                    <li key={t.type} onClick={() => handleUpload(t)} >
                        <img src={t.pictureUrl} alt="" />
                        <span>{t.text}</span>
                    </li>
                ))}
            </ul>
            {files.length > 0 &&
                <ul className={styles.previews}>
                    {files.map(f => (
                        <li key={f.id}>
                            {f.type === AttachFilesAcceptTypes.image && f.url.length > 0 &&
                                <img src={f.url} alt="" />
                            }
                            <CancelButton onClick={() => removeFile(f)} />
                            <span>{clipString(f.file.name, 20)}</span>
                        </li>)
                    )}
                </ul>}
        </div >
    )
}

export default Menu;