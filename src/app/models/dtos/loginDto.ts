export default class LoginDto {
  constructor(senha: string, email: string, autenticacaoAuth: boolean){
    this.senha = senha;
    this.email = email;
    this.autenticacaoAuth = autenticacaoAuth;
  }

  readonly senha: string;
  readonly email: string;
  readonly autenticacaoAuth: boolean;
}
