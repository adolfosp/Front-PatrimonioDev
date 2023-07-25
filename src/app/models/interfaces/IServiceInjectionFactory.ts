import { IService } from "./IService";
import { TipoService } from '@nvs-models/enums/tipo-service.enum';

export interface IServiceInjectionFactory{
    obterIntanciaService(tipoService: TipoService): IService;
}
