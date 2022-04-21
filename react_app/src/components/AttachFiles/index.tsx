import { BaseSyntheticEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ChatActionTypes } from "../../redux/types/Chat";
import { AppActionTypes } from "../../redux/types/App";

import Menu from "./Menu";
import FileContainer from "../../models/FileContainer";
import Notification from "../../models/Notification";

import styles from "./AttachFiles.module.scss";
import { clipString } from "../../utils";

export enum AttachFilesAcceptTypes {
    image = "image",
    video = "video",
    all = "all"
}

export interface IAttachFileTypeElement {
    type: AttachFilesAcceptTypes;
    text: string;
    pictureUrl: string;
}

export const AttachFilesAcceptTypesList: IAttachFileTypeElement[] = [
    {
        type: AttachFilesAcceptTypes.image,
        text: "Фото",
        pictureUrl: "pics/camera.png"
    }
];

export const getAcceptFileExtensinons = (type: AttachFilesAcceptTypes): string => {
    switch (type) {
        case "image":
            return ".png, .jpg, .jpeg";

        default:
            return "*";
    }
}

export interface IAttachFilesProps {
    files: FileContainer[];
    addFiles: (files: FileContainer[]) => void;
    removeFiles: (files: FileContainer[]) => void;
    lastAttachmentId: number;
    maxMBFileSize?: number;
    multiple?: boolean;
}

const AttachFiles = ({ files, addFiles, removeFiles, lastAttachmentId, maxMBFileSize = 4, multiple = true }: IAttachFilesProps) => {
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);

    const handleClick = (e: any) => {
        setMenuIsOpened(state => !state);
    }

    const handleChange = (e: BaseSyntheticEvent) => {
        handleAddFiles(e.target.files);
    }

    const isSizeValid = (file: File): boolean => {
        return file.size <= maxMBFileSize * Math.pow(2, 20);
    }

    const handleAddFiles = (fileList: FileList) => {
        let id: number = lastAttachmentId;

        if (multiple) {
            const newFiles: FileContainer[] = [];
            for (let i: number = 0; i < fileList.length; i++) {
                const f: File = fileList[i];

                if (!isSizeValid(f)) {
                    dispatch({
                        type: AppActionTypes.ADD_NOTIFICATION,
                        payload: new Notification(`Файл ${clipString(f.name, 20)} превышает максимальный объем = ${maxMBFileSize} МБ!`)
                    });
                    continue;
                }

                switch (f.type) {
                    case "image/png":
                    case "image/jpeg":
                        newFiles.push(new FileContainer(++id, f, AttachFilesAcceptTypes.image));
                        break;

                    default:
                        continue;
                }
            }

            addFiles(newFiles);
        }

        if (!multiple) {
            const f: File = fileList[0];
            if (!isSizeValid(f)) {
                dispatch({ type: AppActionTypes.ADD_NOTIFICATION, payload: new Notification(`Файл ${f.name} превышает максимальный объем!`) });
                return;
            }
            switch (f.type) {
                case "image/png":
                case "image/jpeg":
                    addFiles([new FileContainer(++id, f, AttachFilesAcceptTypes.image)]);
                    break;
            }
        }

        dispatch({ type: ChatActionTypes.SET_MY_LAST_ATTACHMENT_ID, payload: id });
    }

    const removeFile = (file: FileContainer) => {
        removeFiles([file]);
    }

    return (
        <>
            {menuIsOpened && <Menu
                inputRef={inputRef}
                files={files}
                removeFile={removeFile}
            />}
            <div className={styles.main}>
                <img className={styles.button} onClick={handleClick} src="pics/attach.png" alt="" />
                {(files.length > 0) && <span className={styles.attachmentsCount}>{files.length}</span>}
                <input
                    onChange={handleChange}
                    multiple={multiple}

                    type="file"
                    ref={inputRef}
                    hidden={true}
                />
            </div></>
    )
}

export default AttachFiles;