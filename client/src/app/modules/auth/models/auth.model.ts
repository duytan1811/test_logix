export class AuthModel {
  token: string;
  refreshToken: string;
  expiration: Date;

  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiration = auth.expiration;
  }
}
