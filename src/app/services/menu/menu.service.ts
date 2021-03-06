import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  public obterMenu(): Array<any> {
    const menu = [
      { name: 'home', path: './home', children: [] },
      {
        name: 'Dashboard',
        path: './dashboard',
        children: [
          {
            name: 'Setor',
            path: './setor',
          },
          {
            name: 'Listagem de Setores',
            path: './listar-setor',
          },
          {
            name: 'Empresa',
            path: './empresa',
          },
          {
            name: 'Listagem de Empresas',
            path: './listar-empresa',
          },
          {
            name: 'Permissão',
            path: './permissao',
          },
          {
            name: 'Listagem de Permissões',
            path: './listar-permissao',
          },
          {
            name: 'Fabricante',
            path: './fabricante',
          },
          {
            name: 'Listagem de Fabricantes',
            path: './listar-fabricante',
          },
          {
            name: 'Patrimônio',
            path: './patrimonio',
          },
          {
            name: 'Listagem de Patrimônios',
            path: './listar-patrimonio',
            children:[
              {
                name: 'Listagem de Movimentações',
                path: './listar-movimentacao',
              },
              {
                name: 'Movimentação',
                path: './movimentacao',
              }
            ]
          },
          {
            name: 'Perca',
            path: './perca',
          },
          {
            name: 'Equipamento',
            path: './equipamento',
          },
          {
            name: 'Listagem de Equipamentos',
            path: './listar-equipamento',
          },
          {
            name: 'Usuário',
            path: './usuario',
          },
          {
            name: 'Listagem de Usuários',
            path: './listar-usuario',
          },
          {
            name: 'Perfil',
            path: './usuario-perfil',
          },
          {
            name: 'Funcionário',
            path: './funcionario',
          },
          {
            name: 'Listagem de Funcionários',
            path: './listar-funcionario',
          },
          {
            name: 'Categoria',
            path: './categoria',
          },
          {
            name: 'Listagem de Categorias',
            path: './listar-categoria',
          },
          {
            name: 'Relatório de Perdas',
            path: './relatorio-de-perda',
          },
          {
            name: 'Leitura de QR Code',
            path: './qr-code',
          }
        ]
      },
    ];

    return menu;
  }
}
