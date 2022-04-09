import { BaseSyntheticEvent, useRef, useState } from "react";
import Menu from "./Menu";

import styles from "./AttachFiles.module.scss";
import FileContainer from "../../models/FileContainer";

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
    const [files, setFiles] = useState<FileContainer[]>([]);

    const handleClick = (e: any) => {
        setMenuIsOpened(state => !state);
    }

    const handleChange = (e: BaseSyntheticEvent) => {
        addFiles(e.target.files);
        handleSubmit();
    }

    const handleSubmit = () => {
        onUploaded([...files]);
    }

    const isSizeValid = (file: File): boolean => {
        return file.size <= maxMBFileSize * Math.pow(2, 20);
    }

    const addFiles = (toAdd: FileList) => {
        if (multiple) {
            const newFiles: FileContainer[] = [];
            for (let i: number = 0; i < toAdd.length; i++) {
                const f: File = toAdd[i];
                if (isSizeValid(f)) {
                    switch (f.type) {
                        case "image/png":
                        case "image/jpeg":
                            newFiles.push(new FileContainer(f, AttachFilesAcceptTypes.image));
                            break;

                        default:
                            continue;
                    }
                }
            }
            setFiles(files => [...files, ...newFiles]);
        } else {
            const newFile: File = toAdd[0];
            switch (newFile.type) {
                case "image/png":
                case "image/jpeg":
                    setFiles([new FileContainer(newFile, AttachFilesAcceptTypes.image)]);
                    break;
            }
        }
    }
    const removeFile = (file: FileContainer) => {
        setFiles(files => files.filter(f => f !== file));
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