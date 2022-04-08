import { BaseSyntheticEvent, useRef, useState } from "react";
import Menu from "./Menu";

import styles from "./AttachFiles.module.scss";

export enum AttachFilesAcceptTypes {
    image = "image",
    // video,
    // file
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
        pictureUrl: "pics/attachImage"
    },
    {
        type: AttachFilesAcceptTypes.image,
        text: "Фото",
        pictureUrl: "pics/attachImage"
    },
    {
        type: AttachFilesAcceptTypes.image,
        text: "Фото",
        pictureUrl: "pics/attachImage"
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
    onUploaded: (files: any) => void;
    maxMBFileSize?: number;
    multiple?: boolean;
}

const AttachFiles = ({ onUploaded, maxMBFileSize = 4, multiple = true }: IAttachFilesProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleClick = (e: any) => {
        setMenuIsOpened(state => !state);
    }

    const handleChange = (e: BaseSyntheticEvent) => {
        addFiles(e.target.files);
    }

    const handleSubmit = () => {
        onUploaded([...files]);
    }

    const isSizeValid = (file: File): boolean => {
        return file.size <= maxMBFileSize * Math.pow(2, 20);
    }

    const addFiles = (files: File[]) => {
        if (multiple) {
            const newFiles: File[] = [];
            for (let i: number = 0; i < files.length; i++) {
                const f: File = files[i];
                if (isSizeValid(f)) { newFiles.push(f) }
                else {
                    console.log("картинка " + f.name + " превышает размер(МБ) " + maxMBFileSize);
                };
            }
            setFiles(f => [...f, ...files]);
        } else {
            const newFile: File= files[0];
            setFiles([newFile]);
        }
    }
    const removeFiles = (files: File[]) => {

    }

    return (
        <>
            {menuIsOpened && <Menu
                inputRef={inputRef}
                files={files}
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