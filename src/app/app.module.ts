import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxSpinnerModule } from "ngx-spinner";

import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { ApiService } from "@nvs-services/api/api.service";
import { TableModule } from "ngx-easy-table";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./views/login/login.component";

import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "@nvs-services/auth/auth.service";
import { SidenavService } from "@nvs-services/componente/sidenav.service";
import { ServiceInjectionFactory } from "@nvs-services/factories/service-injection-factory";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { QRCodeModule } from "angularx-qrcode";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxMaskModule } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { CustomPreloader } from "./core/configs/custom-preload-strategy";
import { SidenavContentAreaDirective } from "./directives/sidenav-content-area.directive";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { P403Component } from "./views/error/403.component";
import { P404Component } from "./views/error/404.component";
import { GraficoComponent } from "./views/grafico/grafico.component";
import { RegistrarComponent } from "./views/login/registrar/registrar.component";
import { QrCodeComponent } from "./views/qr-code/qr-code.component";
import { ConfirmDialogComponent } from "./views/shared/confirm-dialog/confirm-dialog.component";
import { CustomPaginatorIntlModule } from "./views/shared/grid/custom-paginator-grid/custom-paginator-intl.component";
import { HttpCodeMensagemComponent } from "./views/shared/http-code-mensagem/http-code-mensagem.component";
import { SidenavLinkComponent } from "./views/sidenav-link/sidenav-link.component";
import { DefaultSidenavComponent } from "./views/sidenav/default-sidenav/default-sidenav.component";
import { PessoaSidenavComponent } from "./views/sidenav/default-sidenav/pessoa-sidenav.component";
import { SideNavComponent } from "./views/sidenav/sidenav.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HttpCodeMensagemComponent,
    P403Component,
    P404Component,
    QrCodeComponent,
    RegistrarComponent,
    SideNavComponent,
    SidenavLinkComponent,
    GraficoComponent,
    ConfirmDialogComponent,
    DashboardComponent,
    SidenavContentAreaDirective,
    PessoaSidenavComponent,
    DefaultSidenavComponent,
  ],
  imports: [
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({
      type: "square-jelly-box",
    }),
    ReactiveFormsModule,
    BrowserModule,
    QRCodeModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ZXingScannerModule,
    TableModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      tapToDismiss: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressBar: true,
    }),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CustomPaginatorIntlModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
    ApiService,
    JwtHelperService,
    ServiceInjectionFactory,
    SidenavService,
    AuthService,
    CustomPreloader,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector = null;
  constructor(public injector: Injector) {
    AppModule.injector = injector;
  }
}
