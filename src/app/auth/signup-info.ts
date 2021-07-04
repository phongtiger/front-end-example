export class SignUpInfo {
    private _name: string;
    private _username: string;
    private _email: string;
    role: [{ name: string }];
    private _password: string;

    constructor(name: string, username: string, email: string, password: string, roles: string) {
        this._name = name;
        this._username = username;
        this._email = email;
        this._password = password;
        this.role = [{name: roles}];
    }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
