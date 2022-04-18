import FileContainer from "./FileContainer";

interface IInputMessage {
    messageText: string;
    attachments: FileContainer[];
}

export default class InputMessage implements IInputMessage {
    public messageText: string;
    public attachments: FileContainer[];
    
    constructor(messageText: string, attachments: FileContainer[]) {
        this.messageText = messageText;
        this.attachments = attachments;
    }
}
