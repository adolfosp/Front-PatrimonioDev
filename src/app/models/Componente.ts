import { inject } from "@angular/core";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { TipoMensagem } from "@nvs-models/enums/tipo-mensagem.enum";
import { ToastrService } from "ngx-toastr";


export default abstract class Componente {
  private _toaster: ToastrService;

  constructor() {
    this._toaster = inject(ToastrService);
  }

  mostrarAvisoErro(error: unknown = null, mensagemInicial: string): void {
    const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"]?.mensagem);
    this._toaster[template.tipoMensagem](`${mensagemInicial} Mensagem: ${template.mensagemErro}`, template.titulo);
  }

  mostrarAvisoXLS(mensagem: string): void {
    this._toaster[TipoMensagem.error](mensagem, "Erro!");
  }

  mostrarAvisoInfo(mensagem: string): void {
    this._toaster.success(`${mensagem}`, "Informação");
  }

  mostrarAvisoSucesso(mensagem: string): void {
    this._toaster.success(`${mensagem}`, "Sucesso");
  }
}
