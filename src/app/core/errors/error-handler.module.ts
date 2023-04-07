import { ErrorHandler, ModuleWithProviders, NgModule } from "@angular/core";
import { CustomErrorHandler } from "./custom-error-handler";

@NgModule()
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        {provide: ErrorHandler, useClass: CustomErrorHandler},
      ]
    };
  }
}

