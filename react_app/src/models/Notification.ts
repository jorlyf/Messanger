interface INotification {
    message: string
}

export default class Notification implements INotification {
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}