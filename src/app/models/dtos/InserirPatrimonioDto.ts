import { InformacaoAdicional } from "@nvs-models/InformacaoAdicional";
import { Patrimonio } from "@nvs-models/Patrimonio";

export default class InserirPatrimonioDto {
  constructor(patrimonio: Patrimonio, informacaoAdicional: InformacaoAdicional){
    this.patrimonio = patrimonio;
    this.informacaoAdicional = informacaoAdicional;
  }
  readonly patrimonio: Patrimonio;
  readonly informacaoAdicional: InformacaoAdicional;
}
