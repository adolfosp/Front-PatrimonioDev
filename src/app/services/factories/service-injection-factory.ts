import { Injectable, inject } from "@angular/core";
import { TipoService } from "@nvs-models/enums/tipo-service.enum";
import { IService } from "@nvs-models/interfaces/IService";
import { IServiceInjectionFactory } from "@nvs-models/interfaces/IServiceInjectionFactory";
import { CategoriaService } from "@nvs-services/categoria/categoria.service";
import { EmpresaService } from "@nvs-services/empresa/empresa.service";
import { SetorService } from "@nvs-services/setor/setor.service";

@Injectable()
export class ServiceInjectionFactory implements IServiceInjectionFactory{


    obterIntanciaService(tipoService: TipoService): IService {
       switch (tipoService) {
         case TipoService.categoria:
           return inject(CategoriaService);
         case TipoService.empresa:
           return inject(EmpresaService);
         case TipoService.setor:
           return inject(SetorService);

         default:
           throw new Error("Serviço não implementado.");
       }
    }


}
