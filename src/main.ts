import { ENVIRONMENT_INITIALIZER, enableProdMode, importProvidersFrom, inject } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { DialogService } from "@nvs-services/componente/dialog.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

if (environment.production) {
  enableProdMode();
}

export function initializeDialogService() {
  return () => {
    inject(DialogService);
  };
}


platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
    providers: [
    //   importProvidersFrom(MatDialogModule),
      {
        provide: ENVIRONMENT_INITIALIZER,
        useFactory: initializeDialogService,
        deps: [MatDialog],
        multi: true,
      },
    ],
  })
  .catch((err) => console.error(err));
