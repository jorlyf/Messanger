interface IUserRegistration {
    username: string
}

export default class UserRegistration implements IUserRegistration {
    public username: string;

    constructor(username: string) {
        this.username = username;
    }
}