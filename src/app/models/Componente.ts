import { TipoMensagem } from "@nvs-enum/tipo-mensagem.enum";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { ToastrService } from "ngx-toastr";

export default abstract class Componente {
  private _toaster: ToastrService;

  constructor(toaster: ToastrService) {
    this._toaster = toaster;
  }

  mostrarAvisoErro(error: unknown = null, mensagemInicial: string): void {
    const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
    this._toaster[template.tipoMensagem](`${mensagemInicial} Mensagem ${template.mensagemErro}`, template.titulo);
  }

  mostrarAvisoXLS(mensagem: string): void {
    this._toaster[TipoMensagem.error](mensagem, "Erro!");
  }


  mostrarAvisoSucesso(mensagem: string): void {
    this._toaster.success(`${mensagem}`, 'Sucesso!');
  }
}
