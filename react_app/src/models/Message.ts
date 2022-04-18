interface IMessage {
    id: number;
    username: string;
    text: string;
    time: string;
    isMy: boolean;
    attached_urls?: string[];
}

export default class Message implements IMessage {
    public id: number;
    public username: string;
    public text: string;
    public time: string;
    public isMy: boolean;
    public attached_urls?: string[];

    constructor(id: number, username: string, text: string, time: string, isMy: boolean, attached_urls: string[] = []) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.time = time;
        this.isMy = isMy;
        this.attached_urls = attached_urls;
    }
}