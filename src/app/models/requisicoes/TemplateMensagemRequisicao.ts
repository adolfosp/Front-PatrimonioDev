import { TipoMensagem } from "@nvs-models/enums/tipo-mensagem.enum";

export class TemplateMensagemRequisicao {

  public mensagemErro: string;
  public tipoMensagem: TipoMensagem
  public titulo: string;

  constructor(mensagem: string, tipo: TipoMensagem, titulo: string){
    this.mensagemErro = mensagem;
    this.tipoMensagem = tipo;
    this.titulo = titulo;
  }

}
