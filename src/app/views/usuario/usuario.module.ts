import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { SelectService } from "@nvs-services/componente/select.service";
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { PermissaoService } from '@nvs-services/permissao/permissao.service';
import { SetorService } from '@nvs-services/setor/setor.service';
import { TokenService } from '@nvs-services/token/token.service';
import { UsuarioService } from '@nvs-services/usuario/usuario.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { SharedComponentModule } from '../shared/shared-component.module';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  providers: [
    UsuarioService,
    BsModalService,
    TokenService,
    SetorService,
    EmpresaService,
    PermissaoService,
    SelectService,
  ],
  declarations: [UsuarioComponent, ListagemUsuarioComponent, PerfilComponent],
  imports: [
    UsuarioRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    SharedComponentModule,
    HeaderGridComponent,
    MatPaginatorModule,
  ],
})
export class UsuarioModule {}
