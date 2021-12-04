interface IMessage {
    id: number,
    username: string,
    text: string,
    date: string,
    isMy: boolean
}

export default class Message implements IMessage {
    public id: number;
    public username: string;
    public text: string;
    public date: string;
    public isMy: boolean;

    constructor(id: number, username: string, text: string, date: string, isMy: boolean) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.date = date;
        this.isMy = isMy;
    }
}