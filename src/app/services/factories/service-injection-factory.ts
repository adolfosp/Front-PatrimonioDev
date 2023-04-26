import { Injectable, inject } from "@angular/core";
import { TipoService } from "@nvs-enum/tipo-service";
import { IService } from "@nvs-models/interfaces/IService";
import { IServiceInjectionFactory } from "@nvs-models/interfaces/IServiceInjectionFactory";
import { CategoriaService } from "@nvs-services/categoria/categoria.service";

@Injectable()
export class ServiceInjectionFactory implements IServiceInjectionFactory{


    obterIntanciaService(tipoService: TipoService): IService {
        console.log(tipoService);
       switch(tipoService){
        case TipoService.categoria:
            return inject(CategoriaService);

        default:
            throw new Error("Serviço não implementado.");
        }
    }


}
