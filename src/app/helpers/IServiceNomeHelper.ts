import { IService } from "@nvs-models/interfaces/IService";
import {nameof} from "ts-simple-nameof";

export const IServiceCadastrar: string = nameof<IService>(c => c.cadastrar);
export const IServiceObterRegistro: string = nameof<IService>(c => c.obterRegistro);
export const IServiceObterRegistros: string = nameof<IService>(c => c.obterRegistros);
export const IServiceAtualizar: string = nameof<IService>(c => c.atualizar);
export const IServiceRemover: string = nameof<IService>(c => c.remover);
