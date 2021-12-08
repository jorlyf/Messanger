interface IUser {
    connectionId: string;
    username: string;
    isRegistrated: boolean;
    connectedTime: string;
}

export default class User implements IUser {
    public connectionId: string;
    public username: string;
    public isRegistrated: boolean;
    public connectedTime: string;

    constructor(connectionId: string, username: string, isRegistrated: boolean, connectedTime: string) {
        this.connectionId = connectionId;
        this.username = username;
        this.isRegistrated = isRegistrated;
        this.connectedTime = connectedTime;
    }
}