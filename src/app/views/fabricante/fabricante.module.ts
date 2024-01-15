import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FabricanteService } from "@nvs-services/fabricante/fabricante.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { TableModule } from "ngx-easy-table";
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { SharedComponentModule } from "../shared/shared-component.module";
import { FabricanteRoutingModule } from "./fabricante-routing.module";
import { FabricanteComponent } from "./fabricante.component";
import { ListagemFabricanteComponent } from "./listagem-fabricante/listagem-fabricante.component";

@NgModule({
    providers: [FabricanteService, BsModalService],
    declarations: [FabricanteComponent, ListagemFabricanteComponent],
    imports: [
        FabricanteRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        TableModule,
        MatInputModule,
        MatIconModule,
        SharedComponentModule,
        HeaderGridComponent,
        MatPaginatorModule

    ]
})
export class FabricanteModule {}
