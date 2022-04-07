interface IMessage {
    id: number;
    username: string;
    text: string;
    time: string;
    isMy: boolean;
    imagesUrl?: string[];
}

export default class Message implements IMessage {
    public id: number;
    public username: string;
    public text: string;
    public time: string;
    public isMy: boolean;
    public imagesUrl?: string[];

    constructor(id: number, username: string, text: string, time: string, isMy: boolean, imagesUrl: string[] = []) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.time = time;
        this.isMy = isMy;
        this.imagesUrl = imagesUrl;
    }
}