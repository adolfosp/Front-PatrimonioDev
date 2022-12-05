export class UsuarioPerfil {

    codigoUsuario: number;
    nomeUsuario: string;
    nomeSetor: string;
    razaoSocial: string;
    descricaoPermissao: string;
    email: string;
    senha: string;
    confirmeSenha: string;
    imagemUrl: string;

    public constructor(init?: Partial<UsuarioPerfil>){
      Object.assign(this, init)
    }

 }
