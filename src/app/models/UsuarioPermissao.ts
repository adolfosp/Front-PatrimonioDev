export interface UsuarioPermissao {
    codigoPerfil: number;
    descricaoPerfil: string;
    ativo: boolean;
    codigoPermissao: number;
    codigoContexto: number;
    codigosPermissao: Array<number>;
    acoesPorContexto: Array<string>
  }
