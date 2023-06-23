import { ErrorHandler, ModuleWithProviders, NgModule } from "@angular/core";
import { CustomErrorHandler } from "./custom-error-handler";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalHttpInterceptor } from "./interceptors/global-http-Interceptor";

@NgModule()
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true },
      ],
    };
  }
}
