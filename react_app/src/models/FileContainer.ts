import { AttachFilesAcceptTypes } from "../components/AttachFiles";

interface IFileContainer {
    file: File;
    type: AttachFilesAcceptTypes;
    url: string;
}

export default class FileContainer implements IFileContainer {
    public file: File;
    public type: AttachFilesAcceptTypes;
    public url: string;

    constructor(file: File, type: AttachFilesAcceptTypes, url: string = "") {
        this.file = file;
        this.type = type;
        this.url = url;
    }
}