export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    role: [{ name: string }];
    password: string;

    constructor(name: string, username: string, email: string, password: string, roles: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = [{name: roles}];
    }
}
