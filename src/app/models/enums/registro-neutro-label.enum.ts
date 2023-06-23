import { TipoService } from "./tipo-service.enum";

export enum RegistroNeutroLabel {
  "descricao" = TipoService.categoria,
  "razaoSocial" = TipoService.empresa,
  "nome" = TipoService.setor,
  "tipoEquipamento" = TipoService.equipamento,
  "nomeFuncionario" = TipoService.funcionario,
}
