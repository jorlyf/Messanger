interface IUserRegistration {
    Name: string
}

export default class UserRegistration implements IUserRegistration {
    public Name: string;

    constructor(name: string) {
        this.Name = name;
    }
}