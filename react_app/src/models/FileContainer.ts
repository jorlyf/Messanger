import { AttachFilesAcceptTypes } from "../components/AttachFiles";

interface IFileContainer {
    id: number;
    file: File;
    type: AttachFilesAcceptTypes;
    url: string;
}

export default class FileContainer implements IFileContainer {
    public id: number;
    public file: File;
    public type: AttachFilesAcceptTypes;
    public url: string;

    constructor(id: number, file: File, type: AttachFilesAcceptTypes, url: string = "") {
        this.id = id;
        this.file = file;
        this.type = type;
        this.url = url;
    }
}