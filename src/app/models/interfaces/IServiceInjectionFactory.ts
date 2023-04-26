import { IService } from "./IService";
import { TipoService } from '../enum/tipo-service';

export interface IServiceInjectionFactory{
    obterIntanciaService(tipoService: TipoService): IService;
}
