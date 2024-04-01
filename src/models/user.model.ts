export interface User {
    username: string,
    firstName: string,
    lastName: string,
    useremail: string,
    userpassword: string
}

export class JoinUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(data?: User) {
        this.username = data?.username || '';
        this.firstName = data?.firstName || '';
        this.lastName = data?.lastName || '';
        this.email = data?.useremail || '';
        this.password = data?.userpassword || '';

    }

    toJSON() {
        return {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
        };
    }
}


