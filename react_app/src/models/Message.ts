interface IMessage {
    sender: string,
    text: string,
    date: string
}

export default class Message implements IMessage {
    public sender: string;
    public text: string;
    public date: string;

    constructor(_sender: string, _text: string, _date: string) {
        this.sender = _sender;
        this.text = _text;
        this.date = _date;
    }
}