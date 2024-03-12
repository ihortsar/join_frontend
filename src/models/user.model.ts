interface User {
    username: string,
    useremail: string,
    userpassword: string
}

export class JoinUser {
    username: string;
    email: string;
    password: string;

    constructor(data?: User) {
        this.username = data?.username || '';
        this.email = data?.useremail || '';
        this.password = data?.userpassword || '';
       
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
        };
    }
}


