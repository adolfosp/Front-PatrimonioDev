import { HttpStatusCodes } from '@nvs-models/enums/http-status-code.enum';

export type DadosRequisicao = {
  mensagem: string;
  httpStatus: HttpStatusCodes;
  data: any;
  sucesso: boolean;
}
