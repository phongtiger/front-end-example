export class UserInfo {
  private password: string;
  private newpassword: string;

  constructor(password: string, newpassword: string) {
    this.password = password;
    this.newpassword = newpassword;
  }
}
