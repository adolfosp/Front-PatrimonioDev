import { HttpStatusCodes } from './enum/http-status-code.enum';

export type DadosRequisicao = {
  mensagem: string;
  httpStatus: HttpStatusCodes;
  data: any;
  sucesso: boolean;
}
